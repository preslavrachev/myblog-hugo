+++
author = "Preslav Rachev"
categories = ["Q&A"]
date = "2019-10-31T22:00:00+00:00"
description = ""
slug = ""
tags = ["Q&A", "Apple", "iPhone", "Android"]
title = "Q/A: Why Does an iPhone Need Less Memory Than an Android Phone?"

+++

**Note:** _Unlike my usual posts, this is a very basic, non-technical explanation. A friend asked me this question, and I thought I might share the answer here. You can use it on your next cocktail party 🍻_

---

It mainly boils down to how memory garbage gets collected on each platform. iOS applications rely on an approach called [Automatic Reference Counting (ARC)](https://en.wikipedia.org/wiki/Automatic_Reference_Counting). Every piece of memory that gets assigned some value gets tracked and released, as soon as the number of its accessors reaches zero.

Android on the other hand, uses a mark-and-sweep garbage collector, known from the [Java virtual machine (JVM)](https://en.wikipedia.org/wiki/Java_virtual_machine?wprov=sfti1). It won’t clean up memory right away, but will occasionally free big chunks of it in one big pass (also known as stop-the-world). This approach assumes that there is a lot of memory available on the device so that these stop-the-world cleanups occur less frequently.

Both approaches have their advantages and disadvantages.
