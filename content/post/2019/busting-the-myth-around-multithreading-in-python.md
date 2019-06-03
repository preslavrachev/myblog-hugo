+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-06-03T05:00:00+00:00"
description = ""
featured_image = "/images/2019/06/photo-1516259680870-b878830674f9.jpg"
slug = "busting-the-myth-around-multithreading-in-python"
tags = ["Python", "Concurrency"]
title = "Busting the Myth Around Multithreading in Python"

+++
One of the things I often hear from other developers, along with the usual _“Python is slow”_, is that _“multithreading in Python sucks”_. The sad reality is that I hear those from Python developers too. While I will pretend I have not heard the former accusation (hoping you’ve already heard how well Python integrates with C), I will try to bring up some light on the latter.

When I ask the same guys about why they think that multithreading in Python sucks, some of them mention the GIL (Global Interpreter Lock) as the root cause. _The GIL_, they say, _prevents you from running more than one thread a time_.

# TL;DR

Threads in python are perfect for issuing long-running I/O operations, such as database or remote API calls, file operations, etc. Where they show pretty miserable performance is heavy CPU operations (e.g. nested loops, recursion, etc)

If there is one thing you should remember from this whole article, it is that **multithreading is perfectly fine in Python**, as it is all other languages that make use of it. Yes, there are **some caveats** that you need to keep an eye on, but you should not be afraid to use just because someone told you so. Depending on the implementation of Python you are using, there **might be no GIL in place**, so you might be using your development life harder by not using threads.

OK? Good. Let me start with:

# What is the GIL anyway?

The Global Interpreter Lock (GIL) is a feature (yes, actually a feature) of CPython (the default Python implementation) which is highly related to how CPython manages memory. There are two popular ways for garbage collection in software applications: tracing garbage collection (also known simply as garbage collection) and reference counting. CPython uses reference counting, which is a simple and deterministic way of managing memory. Every time one acquires a reference to a variable, a reference counter gets automatically incremented. Every time a variable gets out of scope, the reference counter gets automatically decremented. When the reference counter reaches 0, the referred to memory gets disposed.

# GIL and multithreading

Sounds nice and easy, and it is for the most part. Which is, until multithreading comes in place. See, if two threads access the same reference at the same time, a few things might happen. Decrement in and incrementing the reference count take some technological time. It's not much, but it also doesn't happen instantaneously. Imagine that one thread finishes execution and the decrement process has just begun. Another thread enters right in the middle of this and tries to obtain a reference to the same portion of memory. If the dereferencing finishes first, but the time the second thread obtains a reference, the associated memory might have been disposed of, which will result in SEGFAULT.

It might also be the case that two or more threads try to increment the reference counter in parallel. This opens up a possibility for overwriting the counter with the lower value, unaware that it has already been incremented. The referenced memory will never be disposed of, which is a classical memory leak.

# Here comes the GIL again

And this is why we have the GIL. Locking on every reference counter operation is too cumbersome, and certainly, introduce performance drawbacks. Therefore, the GIL is a single, globally-shared instance that can be obtained by one **RUNNING** thread at a time, and released afterward.

# So, one RUNNING thread at a time

Keep in mind the word RUNNING. I am writing it in capitals, in order to distinguish between a thread’s RUNNING and WAITING states. When a thread issues a long-running I/O operation, such as a database call, it switches from a RUNNING to a WAITING state and drops the lock on the GIL. Since no further operations will be executed in that thread during the WAITING state, none of the scenarios mentioned above can happen, so another thread can grab the GIL and continue. When a thread gets out of the WAITING state back to RUNNING, it obtains a lock on the GIL again and performs a quick refresh on the reference counters of its claimed state.

Ideally, if the code executed in thread consists of only a blocking call (DB, remote API, disk, etc), it is a perfect candidate for concurrent execution. When the code starts getting more complex, and CPU-heavy operations get computed, performance starts dropping to the rate of serial execution, or even worse (due to the GIL lock overhead). This is where **multiprocessing** comes to the rescue. Though processes are limited by the number of available CPU cores, they share no memory, and consequently, there is no need for a GIL. If a heavy operation involves polling multiple I/O sources for data, before assembling a formatted result together, you’d rather do the I/O operations in separate threads, and if needed, the final transformations in separate processes.

# Not all Python implementations need a GIL

When we speak about the GIL, it is important to make certain that it is present in CPython, but not all Python implementations have it or need it. Since the vast majority of Python developers use CPython, the GIL is a relevant topic, but one should not forget there are other language implementations that don’t use it.

Note: Unlike popular belief, [PyPy](https://www.pypy.org/) (the Python JIT-compiler) **[actually** **has a GIL**](http://doc.pypy.org/en/latest/faq.html#does-pypy-have-a-gil-why), although it uses tracing garbage collection, instead of reference counting. This has been more of a design decision to stick to the original design of the language, rather than an actual technological need, There are other implementations, however, such as [Jython](https://www.jython.org/jythonbook/en/1.0/Concurrency.html#no-global-interpreter-lock), and [IronPython](https://wiki.python.org/moin/IronPython) which lack the GIL altogether.