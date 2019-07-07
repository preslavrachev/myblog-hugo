+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-07-07T10:17:00+00:00"
description = ""
draft = true
featured_image = ""
slug = "functional-style-builder-in-golang"
tags = ["Functional Programming", "Golang"]
title = "Implementing a Functional-Style Builder in Go"

+++
Go is definitely not the first language on my mind, when I hear the term “Functional Programming”. Yet, functions are [first-class citizens](https://golangbot.com/first-class-functions/) in Go, and one can achieve a lot using higher-order functions (those that can receive and/or return other functions) alone.

In this post, I want to demonstrate the use of functional constructs for implementing the well-known [Builder](https://en.wikipedia.org/wiki/Builder_pattern) pattern. Please, note that there are many ways to implement a Builder, and I don't claim that mine is certainly the best. Think of it as a neat and simple exercise that would teach you some introductory functional concepts in the scope of Go.

To begin with, what is a [Builder](https://en.wikipedia.org/wiki/Builder_pattern)? Builders help separate the *construction* of an object from its *representation*. Often, when dealing with complex object configurations, we end up writing code like this:

```golang
instance := NewInstanceBuilder().
	WithA(1).
	WithB(2).
	WithC(3).
	Build()
```

using an intermediate Builder `struct`, or more directly:

```golang
instance := NewInstance().
	WithA(1).
	WithB(2).
	WithC(3)
```

which is not safe, because the final instance is accessible at any point in time, and can be modified by any other goroutine running in parallel.

# A Functional Approach to Building
Functional programming guarantees the safety of providing the instance only at the final step. At the same time, it can help minimise boilerplate. Using the functional approach, no additional structs should be necessary. Let's see how we can achieve this. Start with our core `struct`:

```golang
type MyStruct struct {
	a int
	b int
}
```

Nothing special there. Now, pay attention to the next line of code:

```golang
type Decorator func(m *MyStruct) *MyStruct
```

What do we have here? One of the revelations for every new Go programmer is that everything in Go can be a type, including functions. In our case, we specify a type called `Decorator`, to which we pass an instance of `MyStruct`, it performs some modifications on it, and returns the modified instance.


<small>**Side note:** the use of a pointer makes the example simpler. It is also safe-enough, since the `MyStruct` instance will not be accessible until the final build step. Still, if you prefer [pure functions](https://en.wikipedia.org/wiki/Pure_function), the example should be equally easy to implement using value-copying.</small>


The really ingenious thing of thinking about a function as a type, is that we can reuse the type, and what's even more grounbreaking, add functionality to it. Check this out:

```golang
func (f Decorator) WithA(a int) Decorator {
	return func(m *MyStruct) *MyStruct {
		f(m).a = a
		return m
	}
}
```

What did we just do? We added more functionality to `Decorator` - a higher-order function, which unwraps the decorator it has been attached to by calling it, modifies the value, and wraps it in a new `Decorator`.

The same way, we can add a function that sets the `b` property of our `MyStruct`:

```golang
func (f Decorator) WithB(b int) Decorator {
	return func(m *MyStruct) *MyStruct {
		f(m).b = b
		return m
	}
}
```

By now you have probably started to guess that attaching decorators to each other will form a chain, which, when eventually executed, will unwrap itself in a reverse manner, each decorator applying its modifications to the passed `MyStruct` instance.

We are almost done, but how do we actually get our `MyStruct` instance out? We need some sort of a Go-style `constructor` function, right? Indeed, we do, but our `constructor` is a little different when we apply the `Builder` pattern. Instead of returning the `MyStruct` instance, it would rather create a simple no-op `Decorator` function, so we can attach other decorators to it:

```golang
func NewMyStruct() Decorator {
	return func(m *MyStruct) *MyStruct {
		// This function really does nothing 
		return m
	}
}
```

The last part of our construct is the actual `Build` method. Its role is to create an empty `MyStruct` instance and pass it onto the decorator that it gets attached to:

```golang
func (f Decorator) Build() *MyStruct {
	return f(&MyStruct{})
}
```

Please, recall that since the chain of `Decorator` functions gets unwrapped in a reverse fashion, even though `Build` is the last method to be called, it is actually the one that starts the unwrapping of the chain.

Finally, let's see how we can use our `Builder`:

```Golang
instance := NewMyType().
		WithA(42).
		WithB(123).
		Build()

// at this point, `instance` is fully configured and ready for use
```

You can see the entire example in action [here](https://play.golang.org/p/kmDh_oD-8qu)

I hope you liked my little take on Go-style functional programming, applied to the Builder pattern. Feel free to share your feedback.

Happy coding!