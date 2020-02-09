+++
date = "2020-01-26T08:35:04+00:00"
categories = ["Programming"]
slug = ""
title = "A Crystal in Go’s World"
tags = ["Programming", "Crystal", "Ruby", "Golang", "Go"]
+++

Imagine a programming language with the ergonomic syntax of Ruby, the speed of execution of C, the concurrency model of Go, and last but not least, a compiler that performs null checks at compile time. Sounds like a dream? Well, this language exists, but chances are, you haven’t heard of it so far.

Meet [Crystal](https://crystal-lang.org/)!

{{< image src="/images/2020/image-crystal.png" alt="Crystal home page" position="center" style="border-radius: 8px;" >}}

Crystal is all of the above, plus it has types, [outstanding documentation](https://crystal-lang.org/reference/overview/), and a strong community, delivering a steady stream of new libraries (a.k.a “shards”). Don’t get fooled by the current version number (0.32.1). Crystal has been around for quite a few years (since 2012) and has a mature set of language features and an ecosystem of good libraries.

## Where does the speed come from?

Crystal produces fast and lightweight native applications using the LLVM infrastructure. When I say fast, I mean, [really fast](https://github.com/kostya/benchmarks). Take the fastest Go code you can find and chances are, the same code in Crystal will perform at least on par with it, and often quite a bit faster. Measuring Crystal’s performance against that of Ruby makes no sense. 

There are no runtime frameworks or virtual machines necessary. One can just grab the compiled binary and deploy it. When compared with deploying and running a Ruby application, this feels like a whole different league.

Note that there are some caveats, which I am going to discuss in a future blog post. For now, let’s just say that building and distribution are equally as easy, as those in Rust. As of yet, nothing can beat the Go compiler speed-wise, but my experience with the Crystal tooling has been more than pleasant so far.

## CSP-style concurrency

One of the things that make Go so interesting is its concurrency model. The idea about goroutines that communicate via channels is based on an approach dating back to the late 1970s, called [Communicating Sequential Processes (CSP)](https://en.wikipedia.org/wiki/Communicating_sequential_processes). Crystal uses an analogous approach. Programs run in what is known as [“fibers”](https://crystal-lang.org/reference/guides/concurrency.html). The main fiber can spawn any number of concurrent fibers that send and receive data via blocking channels.

```crystal
channel = Channel(Nil).new 
spawn do    
	puts "Before send"    
	channel.send(nil)    
	puts "After send" 
end  

puts "Before receive" 
channel.receive 
puts "After receive"
```

## Why re-invent Ruby in 2020?

The creators of Crystal obviously didn’t intend on changing the world of programming by creating a new language. They just [loved Ruby](https://web.archive.org/web/20181126095302/https://manas.tech/blog/2016/04/01/the-story-behind-crystal.html) and felt it sad to leave it for a more performant and type-safe alternative. Due to a series of trade-offs at the implementation level, Ruby is still slower and more memory-hungry than its competitors. Despite perfectly serving the needs of a large segment of Web users through Rails, its performance puts it at the back of the pack, when it comes to other use cases.

The point is fair and valid. As a language, Ruby has a concise and elegant syntax for writing. Once beyond the basic idioms, writing Ruby evokes pure joy. Crystal brings that joy to an even higher level through type-safety, native speed, and extremely simple concurrency model.

Don’t get me wrong, I like Go too, precisely because of its verbosity and lack of idioms. When working with others on a big project, I’d prefer more ceremony and hoops, in the name of transparency and equal code comprehension. Different languages exist to serve different purposes and be used by different groups of people. The trick is knowing when to use and when the other.

## So, is Crystal worth having a look?

Absolutely! If only to know that it exists and keep an eye on it, I’d go check it out and write a few applications with it. Whether Crystal will take off in the future is a bit more difficult to say, however. As mentioned, the 99% resemblance to Ruby is nice, and so is the blazing-fast performance. Yet, I am missing the Crystal community’s drive towards more prominence. There has been a long-awaited move towards a 1.0 release, which is a crucial milestone and would surely bring in many newcomers. To my understanding, the language and its tooling are stable enough for a 1.0 release.

I understand that Crystal does not have the backing of either Google or Mozilla. Neither does it have multi-billion-dollar use-cases to put on its home page. I understand that fighting for the same space with Go, C/C++, and Rust is an unfair battle. Yet, I also believe that we’re long past the days when choosing one technology over another was a zero-sum game. All it needs is a little push.

I am hoping for the best!