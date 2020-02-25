---
title: "iEx Is Dope!"
date: 2020-02-24T07:45:20+01:00
draft: false
categories: ["Programming"]
tags: ["Programming", "Elixir"]
---

[iEx (Elixir's interactive shell)](https://hexdocs.pm/iex/IEx.html) is pure dope! It helped bring my development efforts back to the "let's play and see what happens" level. Since Elixir modules are stateless and made up of pure functions, reloading a module is as easy as calling `r MyModule` inside iEx.
During development, I'd try to keep one module called `Demo`, or `Scratch`, etc, where I'd do the quick and dirty setting up of things. This scratch module would usually have one function only, called `demo` or `run`. This is what I call in iex. The rest I do in the respective modules, which I reload after every change.

At work, I get to work with Python a lot and one of the things I love there is [iPython](https://ipython.org/). It's such a strong REPL that I would often try and get my hands dirty there, before formalizing into code/test. In Python [module reloads are not always trivial](https://preslav.me/2018/04/22/live-reloading-of-python-modules/), however. This is where Elixir's functional, "share-nothing" nature steps up the game. It's easy to reload modules that have essentially no state.

{{<oembed "https://blog.echobind.com/tips-and-tricks-for-iex-161d0049cfcd">}}
