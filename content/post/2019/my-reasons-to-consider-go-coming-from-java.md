+++
author = "Preslav Rachev"
categories = ["Programming"]
date = ""
description = ""
draft = true
slug = ""
tags = ["Java", "Golang"]
title = "My Reasons to Consider Go Coming from Java"

+++
I hate listicles, and I am highly hoping that this doesn’t become one of them. Yet, I somehow felt the need to write down the reasons why I am giving Go a second (or maybe, third 🤔) chance. To the Java developers out there, searching for a new weapon of choice, I am hoping that this will give you a bit of perspective. This is not a description of Go-specific features. For those, readers can find plenty of information online.

# Go focuses on “less is more"

The first time I saw a relatively simple Go program, my internal reaction was “Why all the torture?”. Somehow, things I used to solve with a Python or even a Java one-liner, look ginormously over-bloated in Go. At least, on the surface. Searching for an answer, I found this talk by Rob Pike, which helped put things in some order:

The thing is, unlike other languages, Go has been left out of many “niceties” of modern programming, and this was an intentional decision. More features add a level of cognitive burden. Of course, they also add more productivity, but at the cost of a higher comprehension barrier. I remember the days before Java 8, and how excited I was to see lambdas and streams make it into the language. A lot of previously lengthy boilerplate code was about to get replaced by a more elegant and fluent approach. Suddenly, every problem I ran into, I tried to solve using those two alone. So much so, that I often ended up spending hours screwing the logic of my code, because suddenly, no other approach seemed elegant enough. And I was not alone in this - the rest of my team was doing it too. Not long after, some pieces of the code turned into crystal figures - beautiful at first sight, but very brittle and difficult to move around.

Some programming languages focus on developer satisfaction when writing, but miss on the long-term maintainability of the piece of software. Others, like Go, sacrifice the expressiveness, in favor of readability and easy comprehension.  I tend to over-engineer things (I believe you too, fellow Java engineers), so for me writing Go code feels a bit like therapy. By offering less, it teaches me to focus on getting the right things done, instead of getting stuck in the design phase, trying to make things “right”.

Don't trust much of what you read about Go online. It is a tough nut to crack. Be prepared for a change in how you write code, especially, if you switch from a more fluent language like Scala or Kotlin. If you are a fan of immutability as part of the language, you’re up for a change of thinking. As said before, nothing is impossible, it just takes time. Give it time and come back after a while. In my short history with Go, there have been some upsides, followed by a period of recapitulation, eventual comeback, and understanding why things are the way they are.

Remember:

> Verbosity is a feature. Simplicity is complicated

# The tooling and the standard library are outstanding

Despite being called an 80s language living in the 21st century, Go’s ecosystem has borrowed from many of the trends and best practices in software development nowadays. The setup process is nice and easy and brings in a myriad of tiny tools and utils that all fit in place right away. Formatting, package management, linting, module management (as of recent versions) are all things that one does not have to really think about. Those are really taken care of with the standard tooling.

Besides that, the Go standard library is one of the most complete Stdlibs I‘ve worked with so far, and understandably so. Go came out relatively recently, so a lot of the standards and practices in software had a chance to make it in the library right from the beginning, rather than get added years after. As a result, the Go standard library feels like something that a developer can actually use in their daily work, rather than something that always needs to get wrapped inside a third-party library.

That said, I don’t share the opinion of Go purists to use standard library only. There should be a balance, and although I am not a fan of _“npm install”_-ing everything, standard libraries are created to be building blocks, so don’t feel ashamed if you have to pull in some libraries to ease your work. There are some pretty [good ones](https://github.com/avelino/awesome-go) out there.