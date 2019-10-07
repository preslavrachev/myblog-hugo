+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-10-06T07:00:00+00:00"
description = ""
featured_image = ""
slug = ""
tags = ["Programming", "Go", "Golang", "Tips"]
title = "Simple Immutable Builders in Go, Using Value Receivers"

+++

Even in a simple language like Go, concurrently updating mutable state is like playing with fire. Take this piece of code, for example:

```go
l := content.NewLoader()
l.PageCount = 5
c := l.Load(bytes)
```

Can you be sure that what you are loading is actually going to contain five pages? What if another goroutine having access to `l`, interjects and sets `PageCount` to 1000? Or worse, updates the state of `l` such that a panic is inevitable?

The simplest solution to this is to pack as much of the initial state configuration into the initialisation step. Constructors do not exist in Go, but unless we speak about a data-only struct (no logic), I would always recommend providing an initialiZer func `NewLoader(...)` and keeping as much of the state   of the struct unexported. This will transform the previous piece of code into:

```go
l := content.NewLoader(pageCount: 5)
c := l.Load(bytes)
```

The problem there becomes apparent when you start having more than three arguments:

```go
l := content.NewLoader(pageCount: 5, offset: 3, protocol: "HTTP", //... )
c := l.Load(bytes)
```

How can we initialize `Loader` in a safe way, providing for some defaults, and without having to pack tens of parameters into the initializing func? There are various ways to achieve this. I have already written about [one way](https://preslav.me/2019/07/07/implementing-a-functional-style-builder-in-go/) to approach this, another could be the functional options approach, suggested by [Dave Cheney](https://dave.cheney.net/2014/10/17/functional-options-for-friendly-apis).

# Value receivers as builder methods

The simplest one I have found so far, takes advantage of an innate property of the Go language. Namely, the fact that everything is passed by value. One of the first questions many go beginners ask about, is the difference between [value and pointer receivers](https://tour.golang.org/methods/8). Pointer receivers are usually the preferred way to go, often, as an (premature) optimization, rather than because modifications are required. A bit underrated, value receivers have one big advantage, which is that they are safe for concurrent use. What a value receiver would get is a copy of the original value. This makes them perfect for implementing builder methods:

```go
type Loader struct {
	pageSize int
}

func NewLoader() *Loader {
	&Loader{
		pageSize:10, // default
	}
}

// check the use of a value receiver here
func (l Loader) WithPageSize(ps int) *Loader {
	l.pageSize = ps
	return &l
}

// The rest could be your usual pointer receivers
func (l *Loader) Load(bytes []byte) string {
	// ...
}
```

The fact that we use a value receiver will cause the value of `l` to be copied, so technically, what we set `pageSize` to is a completely different place in memory. This is why we have to return a pointer to it and and reassign `l`:

```go
l := content.NewLoader().
			withPageSize(5)

c := l.Load(bytes)
```

This will cause some copying and a bit of work for the garbage collector, but in the grand scheme of things, it will be a negligible overhead. The safety that you gain is far more important.

Let me know what you think.