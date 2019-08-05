+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-08-03T22:00:00+00:00"
description = ""
draft = true
featured_image = ""
slug = ""
tags = ["Podcasting", "Mixtape", "Go", "Golang", "Project"]
title = "Mixtape Retrospective: Time to Split the Monolith?"

+++
I have recently made my project [Mixtape](https://mixtape.preslav.me/) open to the world. [Mixtape](https://mixtape.preslav.me/) is a search and discovery platform for podcasts, built exclusively using Go. I decided to use Go primarily because of its compiler's ability to deliver small, self-contained executables with close-to-metal native performance and extremely low memory footprint. It was also a way to battle-test the stack and figure out where and how it will benefit future projects in my portfolio.

In the few months running to the initial release, I learned a lot and was confronted by a couple of challenges that other fellow programmers have also been raving about:

- Panics are lurking at every corner. A single panic can kill your entire app. The single (thought not 100% reliable) cure is to handle every error explicitly. This leads to code which is often interrupted by the same three lines:

```go
result, err := doSomething()
if err != nil {
    // do something with the error, and potentially return or throw a Panic
}
```

- Codebases do not scale well. Whether due to the simplistic syntax of the language, data types, or its approach to packaging and encapsulation, there is a certain point, in which either the cost of setting up proper abstractions or that of copying the same piece of code multiple times, ultimately slows down development efforts.

# Build, deploy, take a step back 
I had to build a whole app in Go, only to realize that what I initially considered shortcomings, were features in disguise, intentionally put by the design team as protection against bloat. They are a very good indicator of when the time has come to split an application into two or more smaller apps. Some call them micro-services. I tend to think of them as commands, in the UNIX sense of single-purpose apps that do one thing and one thing alone.

When you start thinking this way, you realize that resilience and fault tolerance move away from the responsibilities of the single app/service/command and shift to the orchestration layer. That is not to say that you should not check for errors in your Go apps. On the contrary, check and cover what you can. However, not every error can be, or even, **should be** covered by your app. Some are even out of your control. Especially, when using 3rd-party code. Admit it, services fail and will fail, and that's their natural behavior. 

By having the components split from one another at the service level, you allow each one to fail separately, without these causing problems on the rest or bringing the entire system down. With infrastructure tech such as Docker and Kubernetes, restarting a faulty service, or load-balancing between a myriad of service copies has become rather easy.

# No s**t, Sherlock!
All of that should have seemed obvious, you say? After, all, Go has been pointed time and again as the programming language of the Cloud (which, TBH, is pure marketing BS, from the same people that called MongoDB "web-scale" back in the day). Why did I go for a monolith, then? Because, developing a monolith is the most natural way you can start a project, especially when working on it alone. I come from the world of Java, where, assuming you have enough CPU and RAM to sustain it, your app can practically run forever out of a single instance. You can have as many separate threads as your hardware allows for, and each of those may fail, without this necessarily bringing your entire app down. You might end up in deadlocks and resource starvation might cause the app to crash, but this won't happen as often as people imagine.

So, it was our of practicality that I started building [Mixtape](https://mixtape.preslav.me/) as a monolith. Now, I am at a crossroads. I have tried to stay away from messing up with infrastructure configuration for as long as I could. However, if I decide to continue with Go, I might have to eventually start splitting the app. Only time will tell.