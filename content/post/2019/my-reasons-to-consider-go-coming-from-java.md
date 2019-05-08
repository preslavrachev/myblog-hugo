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