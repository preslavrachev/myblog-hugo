+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-02-20T05:27:00+00:00"
description = ""
slug = "my-baby-steps-with-go"
tags = ["Golang"]
title = "My Baby Steps with Go"

+++
Last week, I made my first tentative foray into Go programming. [My company](https://www.ki-labs.com/) uses Go in a couple of projects, but although I have heard many positive things about the language, so far I have tried to stay away from it. The mere thought that Go is a 21st Century version of C and has been explicitly designed from the start to not try to be much more than that, can make everyone coming from Kotlin and Swift pull a few hairs at first. The mere mentioning of C makes me shiver when I think about the crazy stuff I wrote in early high school  (circa. 2000/02). After school, I never gave C a chance anymore, but instead, moved on to languages, which at the time made my life easier.

In reality, programming with Go is not as harsh as I expected. Okay, it does look a lot like C, there are no classes, and pointers are everywhere, but you quickly get used to these, when you see the full picture. Unlike C, Go has a garbage collector, which means that a whole class of problems I had with memory management will simply not be present.

As for OOP, objects are still there, but their construction is slightly different. Go has eradicated inheritance and fosters composition instead. Go  The lack of a `class` construct has been more than sufficiently replaced by structs and [interfaces](https://gobyexample.com/interfaces). If all you need is a bag of properties (also referred to as "data class" in other languages), a `struct` should be perfectly sufficient. If you want to add functionality to your objects, Go's system of [attachable method receivers](https://gobyexample.com/interfaces) makes it fairly easy to do so. In fact, after an hour of hour of work, I got pretty confident with it.

Pointers are also not the pain I expected them to be. In fact, they help things more transparent and explicit. Since in Go (almost) everything is passed by value (with the exception of <code>map</code> and <code>slice</code>) pointers actually help distinguish when the function you are passing the object will potentially want to mutate it or not.

Where Go really shines for me at the moment is the native performance and the build process. Five years ago, I would have screamed at the mere thought of this: statically compiling a binary and directly throwing it onto a remote machine where it just ... works. But it does, and compared to the complexity of modern containerized systems and dependency hell, this is just a breeze of fresh air.

I am leaving you with the video that made me open up my eyes for Go:

{{<youtube "cQ7STILAS0M">}}