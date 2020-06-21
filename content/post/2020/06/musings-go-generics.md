+++
author = "Preslav Rachev"
date = 2020-06-20T07:08:59Z
description = "This isn't yet another interpretation on the latest Go generics proposal, because I haven't fully read it through."
show_title = true
summary = "This isn't yet another interpretation on the latest Go generics proposal, because I haven't fully read it through."
tags = ["Programming", "Go", "Golang", "Generics", "2 Cents"]
title = "Musings on Go and Generics ..."

+++

I feel like I am the only person in the Go programming community these days, who hasn't expressed an opinion about the [latest generics proposal](https://blog.golang.org/generics-next-step). I wish, I could say that the reason was just a lack of time. Yet, what I really wanted was for the hype to die down a little, so that I could spend some unbiased time with the generics-enabled [playground](https://go2goplay.golang.org/) and see for myself, whether I like the proposal or not.

When I was still doing Java full-time, generics were the sort of thing that I would get for granted, and I would not question their use. They were just there, and everyone was using them, so I just went with the flow. From experience, they have worked well while trying to convince the compiler that what you are trying to do is right. Yet trying to decipher the author's intention by just reading generic code has always been awful.

Upon entering Go, programming without them felt like some sort of barbaric masochism at first. Al this type checking at all times ... ugh. Then, I realized that if the kind of problems I was trying to solve could usually be approached in a simpler manner than I thought. Not every piece of code needs to be battle-tested and ready to be used in every situation imaginable. Sometimes, all you need is code that solves your particular problem, and one that is easy to decipher later on.

Which brings me to the particular proposal. From the little I saw, it seems to be simple to comprehend for language newcomers, because it essentially essentially expands upon the concept of interfaces. Yet, the few examples of code I saw were also difficult enough to read (all those brackets) that I am quite doubtful that I would use it, and I certainly don't want to be the one having to read it and debug it. I fear that every new language feature becomes a sort of a golden hammer, which gets thrown at every problem, and I certainly don't want that to happen with generics. Utility libraries can certainly benefit from those, but I'd try not to us them a lot in application code.

Anyway, this became quite a lengthy post for someone who's had a very vague look. I can't imagine what would come out, once I have actually read the entire proposal through.

A few articles on the topic that are on my to-read list:

- [Early notes on the generics proposal · Go, the unwritten parts](https://rakyll.org/generics-proposal/)
- [A Concise Guide to the Latest Go Generics Draft Design | Preslav Mihaylov](https://pmihaylov.com/go-generics-draft-design/)
- [Go generics draft design: building a hashtable · Matt Layher](https://mdlayher.com/blog/go-generics-draft-design-building-a-hashtable/)