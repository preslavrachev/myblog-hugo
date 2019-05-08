+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-05-07T22:00:00+00:00"
description = ""
draft = true
slug = ""
tags = ["Java", "Golang"]
title = "My Reasons to Consider Go Coming from Java"

+++
I hate listicles, and I am highly hoping that this doesn’t become one of them. Yet, I somehow felt the need to write down the reasons why I am giving Go a second (or maybe, third 🤔) chance. To the Java developers out there, searching for a new weapon of choice, I am hoping that this will give you a bit of perspective. This is not a description of Go-specific features. For those, readers can find plenty of information online.

# Go focuses on “less is more"

The first time I saw a relatively simple Go program, my internal reaction was “Why all the torture?”. Somehow, things I used to solve with a Python or even a Java one-liner, look ginormously over-bloated in Go. At least, on the surface. Searching for an answer, I found this talk by Rob Pike, which helped put things in some order:

{{ youtube "rFejpH_tAHM" }}

The thing is, unlike other languages, Go has been left out of many “niceties” of modern programming, and this was an intentional decision. More features add a level of cognitive burden. Of course, they also add more productivity, but at the cost of a higher comprehension barrier. I remember the days before Java 8, and how excited I was to see lambdas and streams make it into the language. A lot of previously lengthy boilerplate code was about to get replaced by a more elegant and fluent approach. Suddenly, every problem I ran into, I tried to solve using those two alone. So much so, that I often ended up spending hours screwing the logic of my code, because suddenly, no other approach seemed elegant enough. And I was not alone in this - the rest of my team was doing it too. Not long after, some pieces of the code turned into crystal figures - beautiful at first sight, but very brittle and difficult to move around.

Some programming languages focus on developer satisfaction when writing, but miss on the long-term maintainability of the piece of software. Others, like Go, sacrifice the expressiveness, in favor of readability and easy comprehension.  I tend to over-engineer things (I believe you too, fellow Java engineers), so for me writing Go code feels a bit like therapy. By offering less, it teaches me to focus on getting the right things done, instead of getting stuck in the design phase, trying to make things “right”.

Don't trust much of what you read about Go online. It is a tough nut to crack. Be prepared for a change in how you write code, especially, if you switch from a more fluent language like Scala or Kotlin. If you are a fan of immutability as part of the language, you’re up for a change of thinking. As said before, nothing is impossible, it just takes time. Give it time and come back after a while. In my short history with Go, there have been some upsides, followed by a period of recapitulation, eventual comeback, and understanding why things are the way they are.

Remember:

> Verbosity is a feature. Simplicity is complicated

# The tooling and the standard library are outstanding

Despite being called an 80s language living in the 21st century, Go’s ecosystem has borrowed from many of the trends and best practices in software development nowadays. The setup process is nice and easy and brings in a myriad of tiny tools and utils that all fit in place right away. Formatting, package management, linting, module management (as of recent versions) are all things that one does not have to really think about. Those are really taken care of with the standard tooling.

Besides that, the Go standard library is one of the most complete Stdlibs I‘ve worked with so far, and understandably so. Go came out relatively recently, so a lot of the standards and practices in software had a chance to make it in the library right from the beginning, rather than get added years after. As a result, the Go standard library feels like something that a developer can actually use in their daily work, rather than something that always needs to get wrapped inside a third-party library.

That said, I don’t share the opinion of Go purists to use standard library only. There should be a balance, and although I am not a fan of _“npm install”_-ing everything, standard libraries are created to be building blocks, so don’t feel ashamed if you have to pull in some libraries to ease your work. There are some pretty [good ones](https://github.com/avelino/awesome-go) out there.

# Go apps are fast and small

We have all heard that, but the actual outcome blew my mind away!

I have spent the bulk of the past decade working with Spring, and it has gradually become my go-to solution for all things Web. Despite working with Flask on my current projects, Spring (Boot) will always remain near and dear to my heart.

Yet, Spring is a beast. You might not notice it, because the hardware has gotten quite cheap these days, but a lot of otherwise useful resources get locked up when running a hefty JVM app.

To see where Go stands on this, I rebuilt a not-so-smallish Spring Boot app of mine using Go. I did not even take the purist approach but was quite liberal in my choice of libraries. The results blew all of my previous expectations by a factor of ten. The Spring app took nearly half a GB right away, keeping around 5-10% of my MacBook Pro's CPU busy at all time (spiking when requests came in). For deploying a single artifact, I had built a fat JAR, which is quite a standard procedure for developing Java apps these days. It took a couple of hundred of MBs as well. Due to the JVM warmup and Spring's loading all dependencies, it took almost a minute until the app was ready.

For comparison, the Go app ran instantaneously (let's be fair, there was literally no component scanning and reflection involved). Even at the height of handling requests, the CPU barely reached 1% (mostly sitting around 0.1%). With all libraries and assets included, the final binary ended up being around 20MB. The RAM usage, however, I found to be a metric that changed everything. In an age where a typical messaging application might eat up to a couple of GBs, this app was sitting there minding its business, rocking a 20MB?!? footprint. 20MB? Even if following a very naive logic, this is close to fitting 20 of these apps together, for the cost of running one Spring Boot app!

Before the expert readers start criticizing, yes, none of this is really a fair comparison. The fact that an app is built in Go does not guarantee a blazing fast performance if there is a lot of runtime loading and checks. Also, experts can tweak a JVM app in various ways, significantly reducing the footprint of the app. It takes time and effort, but it is certainly doable. And of course, there is always the argument about cheap hardware and premature optimization. 

I am not saying that this should necessarily resonate with you, but it certainly does with me. I strive to be a minimalist. Exactly because the hardware is so cheap these days, I believe that people and companies spend way more on it than they probably should. There are various articles out there speculating about the millions and hundreds of millions of dollars that big software companies pay for server costs every year. All of it to pay for servers that get powered by electricity generated from burning fossil fuels.

# The community

The Go community is welcoming and very helpful. Part of the helpfulness factor comes from the fact that many gophers have already spent years programming in a different domain. What makes these people stick around and help each other, is the experience of the past, having taught them that complexity does not equal productivity.

# Instead of conclusion

As people say in stock trading, “always do your own research”. I don’t want to convince you to switch and use Go full-time, because I haven’t convinced myself yet. As with everything else, programming languages are just tools, and there will always be a different tool which is better for the particular circumstances. What I hope to have managed to convince you, is to try to understand where the need for the language came from and what it tries to solve

As always, happy coding!

P.S. if you have an interesting project that you are considering using Go for, feel free to reach out to me. I’d love to help.