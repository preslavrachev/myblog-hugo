---
title: "Elixir Month"
date: 2020-02-11T07:49:10+01:00
draft: false
categories: ["Programming"]
tags: ["Elixir", "Programming", "Ruby"]
---

Yes, the [Elixir](https://elixir-lang.org/). I’ve decided to use the cold February weather, as well as the relative project calm, and see how far I can go with it.

## But why Elixir and why just now?

There are a few reasons. Actually, this is not my first encounter with the language or the Erlang/BEAM ecosystem. About a year ago, a colleague at work and I started doing lunch break walks, in which we discussed tech topics, beyond the scope of our current projects. My colleague is a big Elixir fan and has mentioned many times the advantages of Erlang and the BEAM VM. More than anything else, one thing struck me the most. All of the challenges that the cloud community of today is trying to tackle, such as:

- resilience
- scalabiltiy
- distribution
- deployment

etc, have already been thought about, and solved by a research group at Ericsson around three decades ago (albeit, at a smaller scale). Sure, Erlang is not an easy language to work with, but thanks to [José Valim](https://twitter.com/josevalim) and his work on Elixir, it wouldn’t even be necessary. So, about a year back, I took my first plunge.

## That’s not for me

I got out of the water just as quickly as I got in there. Sure, Elixir is not nearly as obscure as Erlang, but it can be a bit overwhelming for the newcomer. Especially, if one is trying to swallow the whole OTP bit at the same time. At the time, I had discovered the simplistic philosophy of Golang, and despite all the alleged advantages, Elixir seemed way too much overhead. I (in)famously dismissed the language, as one where “the amount of punctuation might give you a headache”. Let alone the fact that similar to Java applications, Elixir ones also need the entire kitchen sink to be in place for an application to run. Compare this to a statically-bound Go app that you just throw onto a machine and you are good to go.

## Crystal enters the stage

As a side note, I have to mention that part of why I dropped my initial foray into Elixir was because of a bias. I felt that it was too, Ruby-esque, whatever that must have meant to me at the time. I have somehow missed the early Ruby and Rails train around 15 years ago. My programming career set me on a different path. I have always been aware of Ruby’s community spirit, but only during the past year, did I come to appreciate the language and its writing aesthetic. Ironically, not through a Ruby itself, but via a wonderful derivative language, named [Crystal](https://crystal-lang.org/). I already went into more detail about Crystal [in a previous post](https://preslav.me/2020/01/26/a-crystal-in-go-s-world/).

The more I started dabbling into Crystal, the more I started looking at its inspiration - Ruby. Ruby is certainly not a language without flaws, and the community is trying to work on those. Partially, via addressing those issues at the core - Ruby 3.0 is expected to arrive [at the end of this year](https://bugs.ruby-lang.org/versions/5). Yet, others are taking what the language is best known for, and applying it to other paradigms - such as Elixir’s functional approach to programming.

## Second attempt: Elixir Month

My second attempt to tackle Elixir seems to go much more smoothly than the first one. One day, I had the feeling that the constructs in the language just clicked for me- even the nasty OTP ones. I set out out a goal for myself to use Elixir for a month during February, and see how far I can go with it.

---

## Some starting resources

{{<oembed "https://www.goodreads.com/book/show/38732242-elixir-in-action">}}

Really, one of the best books on starting with Elixir. If you enjoy it, please help me support this site by [buying it on Amazon](https://amzn.to/2HFjtSR).

Let Saša Jurić himself convince you:
{{<youtube "JvBT4XBdoUE">}}

{{<youtube "gom6nEvtl3U">}}
