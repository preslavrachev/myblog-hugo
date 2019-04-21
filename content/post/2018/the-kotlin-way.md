+++
author = "Preslav Rachev"
categories = ["Programming"]
date = 2018-12-28T07:10:00Z
description = "Is Kotlin chasing the footsteps of Scala? Does being Kotlin-first mean abandoning the foundations laid out by Java, and how much \"idiomatic Kotlin\" is too much? You decide."
draft = false
featured_image = "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
slug = "the-kotlin-way"
tags = ["Kotlin", "2 Cents", "Scala", "Java"]
title = "How Much of \"The Kotlin Way\" Is the Right Way?"

+++

*NOTE: This post was originally intended to provoke a discussion, and despite its length, the original goal is still the same. Please, share your feedback on [Twitter](https://twitter.com/intent/tweet?text=%40preslavrachev%20%5BADD%20YOUR%20COMMENT%20HERE%5D&url=https://preslav.me/p/72a4a26e-c120-428f-af5d-98f09f88e2db/&related=preslavrachev), [Reddit](https://www.reddit.com/r/Kotlin/comments/aa9anw/q_how_much_of_the_kotlin_way_is_the_right_way/), or [Dev.to](https://dev.to/preslavrachev/q-how-much-of-the-kotlin-way-is-the-right-way-3129).*

---

My experience with the JVM dates back from around 2010. Java in those days was a bit different from todays' standpoint. Java 6 was the current standard at the time, but most projects I got to work on, were stuck between Java 4 and 5. Those were tough beasts. More verbose and tedious to write code in.

At that time, we began searching for a way to release the burden of writing code, but keep relying on the vast adoption of the JVM. Groovy and Scala were the two alternatives offering more language expressiveness with less boilerplate and ceremony. And, while Groovy somehow never picked up the self-esteem to be seen as something more of a scripting language for build orchestration and runtime in-app plumbing, Scala looked like the bold and sexy future of the JVM.

That is, until the language and its community ideologically drifted apart from Java. Although most of the existing Java libraries at the time were compatible and accessible from the Scala runtime, those were seen as archaic, tedious to work with, and simply not built _"the Scala way"_. This slogan was used to justify the building of a whole new ecosystem of tools, libraries, and frameworks, written from the ground up with Scala in mind. It is safe to say that nowadays for every Java library out there, one could find two or three Scala equivalents written _"the Scala way"_. I am not much of a Scala expert, but IMHO, this has led to a total separation between the two communities, each re-inventing the wheel its own way.

Kotlin was supposed to help solve all of that. Having joined the game late enough, JetBrains put a bet on Kotlin's inter-operability with standard Java code. To achieve this, a language has to be perceived as a companion, and not as a true paradigm shift. For the three years I have worked with and followed Kotlin's development, there have been only a few minor occasions when the inter-operability did not work on 100%, and those were more or less edge cases. It seemed that had finally reached the golden mean, where multiple language paradigms can co-exist and their communities cooperate in order to achieve a common goal.

Yet, this is not quite what is happening. I have seen the birth of a Kotlin-first community of developers, preaching things _"the Kotlin way"_. Soon enough, tools, libraries, and frameworks started appearing, having perfectly working equivalents in Java, but written in _"idiomatic Kotlin"_. I started wondering where I had seen this before 🤔.

Don't get me wrong, I am 100% for challenging the Status Quo, but by stepping on what already works well, and not merely throwing it off-board, because it was not built _"the XYZ way"_.

And what do you think?

