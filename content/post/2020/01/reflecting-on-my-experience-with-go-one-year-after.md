+++
date = "2020-01-17T08:35:04+00:00"
categories = ["2 Cents", "Programming"]
slug = ""
title = "Reflecting on My Experience With Go, One Year After"
tags = ["Programming", "2 Cents", "Dev Culture", "Golang", "Go", "Java"]
+++

In my little more than a year day-to-day developer experience with Go, I have so far **learned three things**:

1. I can change my entire view of how programming works, even after 12+ years of doing it in one form or another.
2. People are blaming Java for all the wrong reasons
3. People are praising Go for all the wrong reasons

Let me explain. This post is not about saying that “language A is better than language B”, or vice versa. It is about asking ourselves the question why things work the way they do, and whether doing them differently is a bad, or potentially, good thing.

Before joining the Go camp, I had worked quite a few years as a Java developer, with all the stereotypes that this role could evoke in one’s head. I co-developed data-processing systems for various industries. Yet, much of the code I wrote was just boilerplate: passing data from one format to the other, or devising complex abstractions behind what should have really just been calling a function and obtaining its result. Yes, the code was difficult to comprehend, but I was proud of it for this exact reason. The more hoops I created, the more secure I felt that:

1. I was doing what I thought was right
2. If people didn’t understand the code, they’d have to come to me for an advice, further boosting my ego.

## The language is not to blame for this
The fact that much of the existing Java code is full of bureaucracy has nothing to do with the language itself, or with its platform. Our developer community should bear the sole responsibility. I can assure anyone that perfectly functioning Java applications can be written without 90% of the ceremony. They will be smaller and run faster. Most probably, easier to comprehend, too. And yet, they won’t get you hired in any well-respected company. They just won’t pass the *developer prejudice* test. I know. I’ve seen many elegant solutions and rejected them for not being /idiomatic/ enough.

## Go isn’t a silver bullet either
For much of the same reasoning, jumping ship towards Go, just because “it is not Java”, won’t bring anyone far. Even before I started writing Go, I had heard and read many stories, about how simple and fast it made everything, how little ceremony it had, compared to Java, how it would eventually kill all other languages, etc. All blah, blah. Despite all of the above being true, you have to discover the truth in each for yourselves. If you approach the language out of desperation with your current way of working, you’re going to be set for a rough path.

See, if you all you wanted was to get a faster running (name language of choice), you could certainly do it. Yet, holding on to the mental baggage of your previous experience will be hard and messy. My first Go project started out as a rewrite of a Spring Boot app I’d started earlier, so I thought I’d just organize it the same way. To keep the story short, let’s just say it was a spectacular disaster. Only after I started from scratch, did it really start taking off.

## Go is a language without (with less) idioms
Let’s do a naive math experiment. Imagine that you could create valid programming expressions combining any 3 keywords, from a programming language’s vocabulary. Thus, if a language only has 10 keywords, the maximum number of possible expressions is 10 * 9 * 8 = 720. In contrast, a language, with, say, 20 keywords would end up having 20 * 19 * 18 = 6840 expressions. Twice as many keywords would result in almost 10 times as many expressions!

Languages tend to encourage the creation and use of idioms. With that many possible expressions, it’s a normal behaviour for an individual, or a group of people to start associating and using expressions for certain things. The problems usually occur when another group comes with its own way of expressing the same thing. Both are perfectly valid, but each group would have issues understanding the other.

This is not to say that Go having a very strict and concise nature, is totally devoid of idioms. That would be impossible. It is in our nature to try to associate and abstract certain concepts. Yet, when a language has a deliberately smaller vocabulary, the chances for different groups accidentally finding multiple ways of doing the same thing are smaller. This helps the communication between people a great deal, but comes with a very obvious downside. Code (or any written expression, for that matter) without idioms is very, very verbose.

So, whoever told you that Go is not a verbose language, probably either lied to you on purpose, or had’n really seen any other programming languages up until that point. But hey, we agreed that verbosity in the name of communication and common understanding is a actually a good thing, right?s

## Go is a test for senior engineers
A lot has been said about the initial concept about Go, and how the idea was to design a language for juniors fresh out of college, and with little programming experience. I think that understanding the beauty of going back to the roots of programming, can be a cathartic experience for many seasoned programmers.

See, junior programmers start with little baggage and preconceptions, so in their view, anything that can be done with code is fair and justified. Including, burning a CPU, or erasing a disk due to an arithmetic error.

Somewhere along the middle of the career path, a bunch of principles start to pile up. All of them out of the desire to step on what’s already been learned, and to make sure that things are smoothly and safely without immediate supervision. Learning and applying the principles is great, because it ensures a gradual path forward. But for many, it becomes a dogma which they blindly stick to, without asking whether a simpler alternative could be better.

The problem with principles is that they only work well around 80% of the time. It is the remaining 20% that can be disastrous for a project, or for one’s career. It is the understanding where to apply a principle, and where to deliberately throw it away in the name of pragmatism, which turns a software engineer into a senior software engineer.

To really appreciate Go, one needs to learn how to discern what makes it and its community stand out from the rest. One needs to go through a phase of utter disgust with the language, for it “lacking” certain feature. Moving on despite the urge to go back to a familiar ground, would result in one of two things:

1. Make one realise that indeed, the Go language is not what they need or want
2. Learn to appreciate going back to the roots, as well as when to favour pragmatism over principles

In any case, it would be an interesting experience.