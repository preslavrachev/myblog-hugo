---
title: "Elixir-Style Actors in Go"
date: 2020-03-07T17:04:29+01:00
draft: false
categories: ["Programming"]
tags: ["Programming", "Golang", "Elixir", "Erlang"]
---

My foray into [Elixir](https://elixir-lang.org/) brought forward many more similarities between it and Go, than I originally expected. One of them is how both handle concurrency. With respect to that, creating Elixir-style stateful actors in Go is surprisingly easy. Answering the question, whether one needs them, or can make use of them, I’d leave to the user. If you approach me back saying that the same thing can be achieved using a channel or a map with `sync.Mutex` slapped on it, you’d be (almost) right. Yet, it’s worth exploring different ways of thinking.

# A 10.000-foot view of Elixir

For those not aware of it, Elixir is a functional language. Everything runs inside an immutable function scope, and no state remains on the table. A function can only work on what it has been fed with. Functions reside inside modules and are being executed inside Erlang processes.

Technical differences aside, you can think of processes as the equivalent of Go’s goroutines. A function chain call runs inside a process/goroutine. When the outermost function returns, the process/goroutine ends. A process/goroutine can spawn other processes/goroutines to achieve concurrent execution of tasks. Go synchronizes over channels while Elixir over a message inbox that is built into every process. Using the built-in receive keyword, a function’s execution blocks inside a process, until a certain type of message gets received

```elixir
receive do
    # Don't get too caught up on the Elixir syntax.
    # For now, it is only important to know that :message_a is equivalent
    # to a string with the value of "message_a"
    # Those are called "atoms" and are quite often used in Ruby-like laguages
    {:message_a, msg} ->
        do_something_with(msg)
end
```

Fundamentally, this is the same as having a [goroutine block its execution waiting on a channel](https://play.golang.org/p/rZkdET2ZhJl):

```go
type message struct {
    val string
}

msgStream := make(chan message)

go func(out chan message) {
    out <- message{val: "hello world"}
}(msgStream)

msg := <-msgStream
fmt.Printf("%+v", msg)
```

Whether you are waiting on a message to arrive in your inbox, or explicitly set a blocking channel as a communication mechanism, to me, it describes the same paradigm.

# Turn goroutines into stateful actors

Clear until now? Alright. Let’s move on. I already mentioned that Elixir is a functional language. Everything that gets passed to a function is immutable, and the only way to change it, is to return a new version of it. This means that looping constructs are not possible, since it would imply modifying and keeping track of a counter variable. The way functional languages achieve the effect of looping is through recursion (or to be more precise tail recursion):

```elixir
def loop(5) do
    # Elixir uses pattern-matching when choosing which function to call.
    # In our case, as soon as its gets a count == 5, it will stop the loop
    5
end

def loop(count) do
    # Just print the count, but use pipes (|>)
    # instead of wrapping in a function call -> IO.puts(count)
    # Pipes totally save the day, when you have multiple call chains
    count
    |> IO.puts()

    loop(count + 1)
end
```

## From recursion to actors

What if we take this recursion example and think of it as a never-ending loop. The first call to the function sets the initial state, and the function keeps calling itself ad-infinitum.

Now, this is where the purely functional paradigm breaks. We already learned that Erlang allows for other processes to communicate to us. This means that if our never ending recursive function receives a message from the outside, it can use its payload to call itself with a modified version of its initial state. Keeping in mind that receiving a message is a blocking operation, the process will simply linger around, not using any CPU resources, until our the right message arrives.

We can use the same messaging paradigm to poke inside the state of our never-ending function. Since it runs inside a separate process, the only way to do that is to send an appropriate message to it, pass our current process’ ID (PID) and let it send us a message back.

```elixir
defmodule Calculator do
    def start do
    # creates a separate process with its own internal state
    spawn(fn -> loop(0) end)
    end

    defp loop(current_value) do
    new_value =
        receive do
        # with this type of message, we can fetch the state of our calculator
        {:get, caller_pid} ->
            send(caller_pid, {:response, current_value})
            current_value

        # with this type of message, we can modify the state of our calculator
        {:add, value} ->
            current_value + value
        end

    loop(new_value)
    end
end
```

Let's test our calculator process:

```elixir
defmodule CalculatorTest do
    def test_calculator do
    calc_pid = Calculator.start()

        # Like `receive`, `send` is built-in and take a PID, as well as a message
        # self() returns the process id (PID) of the current process
        # Like in Go, every piece of Elixir/Erlang code runs in a process
    send(calc_pid, {:get, self()})

        # `receive` will block, until we receive a message,
        # that matches the expected pattern - {:response, value}
    receive do
        {:response, value} ->
        value |> IO.puts()
    end

    send(calc_pid, {:add, 100})

    send(calc_pid, {:get, self()})

    receive do
        {:response, value} ->
        value |> IO.puts()
    end
    end
end
```

In essence, our never-ending function becomes what Elixir calls a stateful server process, an implementation of the [Actor model](https://en.wikipedia.org/wiki/Actor_model). Actors are great for isolating critical state and allowing for concurrent communication to it, ensuring that only one change happens at a time.

## From Elixir to Go

Ok now that we know how things work in Elixir land, achieving the same thing on Go is super straightforward.

```go
func main() {
    in := make(chan message)
    out := make(chan int)
    go newCalculator(0, in, out)

    in <- message{operation: "get"}
    state := <-out
    log.Printf("Current state: %d", state)

    in <- message{operation: "add", value: 100}
    in <- message{operation: "get"}
    state = <-out
    log.Printf("Current state: %d", state)
}

type message struct {
    operation string
    value     int
}

func newCalculator(initialState int, in chan message, out chan int) {
    state := initialState
    for {
        p := <-in
        switch p.operation {
        case "add":
            log.Printf("Adding %d to the current state", p.value)
            state += p.value

        case "get":
            out <- state
        }
    }
}
```

One thing to note is that since we can use an infinite-loop, we should just use that, especially, since based on my knowledge Go is not particularly optimized for long-cycle recursion. But the main premise remains the same. A function gets called with some initial state and returns a channel. The function starts an endless loop, blocking on the channel. If we push a value to that channel, the function will take it, update the state and block again.

# What are actors good for?

## Private state

So, now that we unveiled the mystery behind actors, it’s a good point to discuss what they might be useful for.

One thing that immediately comes to mind, is achieving globally accessible, but truly private, synchronized state. This is currently achieved with the use of channels, `sync.Mutex`, or the new `sync.Map`.

```go
type SynchronizedMap struct {
    sync.RWMutex
    internal map[string]interface{}
}

func (rm *SynchronizedMap) Store(key string, value interface{}) {
    rm.Lock()
    rm.internal[key] = value
    rm.Unlock()
}
```

The fragility of this approach comes from the fact that there is no real private state in Go applications. The map we named `internal` in the above example is only protected from outside access. Any piece of code inside the same package as our `SynchronizedMap` can freely access and modify its internals, leading to unexpected consequences. While this shouldn't be a concern in most cases, it's definitely good to keep in mind for special cases.

## Stateful autonomous agents

Where the Actor model shines is the orchestration of systems of Actor instances - autonomous agents. Each Actor instance is able to change its state, reacting to the messages sent to it. Actor instances can easily spawn other Actor instances, which only the creating actors (supervisors) have control over (private state, remember). Supervisors can also take over failures of the actors their are responsible for, potentially, killing some off, and restarting them with a clean state. Taking this example to extremes, groroutines being fairly cheap, one can easily imagine a swarm of thousands of Actor instances, in a deeply nested hierarchy, with multiple levels of supervising actors taking over their "progeny". This is the unique selling proposition of Erlang, but as I hope to have demonstrated, could be replicated in Go too.

As discussed in the beginning, I would leave the discussions about this approach's practicality, as well as its other applications to the reader. I would love to hear your thoughts. Do not hesitate to drop me a comment, or start a new discussion.

---

# Resources

{{<oembed "https://www.goodreads.com/book/show/38732242-elixir-in-action">}}

One of the best books about learning Elixir, and certainly, the one that inspired me to write this post. Saša Jurić's explanations are clear and demonstrative, especially on complex topics such as this one. If you like this blog, and would love to support my passion for reading great books, you can [buy it on Amazon using this special link](https://amzn.to/39AXJ6T). Thanks!
