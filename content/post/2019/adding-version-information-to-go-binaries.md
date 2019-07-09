+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-07-09T05:00:00+00:00"
description = ""
featured_image = ""
slug = "adding-version-info-to-golang-binaries"
tags = ["Tips", "Golang"]
title = "Adding Version Information to Go Binaries"

+++
One of the things that I find really neat about Go, is the single-executable delivery model. For small projects, it's as simple as dragging and dropping the built executable right where I need it. After some time, however, I might easily forget which version of my codebase a given executable has been built upon. If I have to revert a change, how can I make sure that I build from the right commit?

In large projects, this is where CI/CD comes to save the day. For small prototypes, however, setting up CI might be an unnecessary overkill until a much later stage in the process.

Luckily, there is an easy way to "bake" the information about the current commit hash right into the built executable.

Go does not have a dedicated build system, but the standard practice across the community is to use [make](https://en.wikipedia.org/wiki/Make_(software)). Make is widely available across *nix operating systems (incl. macOS), so I would usually add a simple `Makefile` to most of my Go projects. In this case, my makefile would look like this:

```make
GOOS=linux
GOARCH=386

.PHONY: build

GIT_COMMIT := $(shell git rev-list -1 HEAD)

build:
	GOOS=$(GOOS) GOARCH=$(GOARCH) go build -ldflags "-X main.gitCommit=$(GIT_COMMIT)" .
```

Two things to note here:

1. `GIT_COMMIT` will store of the value of the current commit hash that our code base is at.
2. `-ldflags "-X main.gitCommit=$(GIT_COMMIT)"` is Go's way of telling the linker to pass the commit hash to a variable in the code (`main.gitCommit`). Think of this as "baking" the information right into the compiled executable.

All we need to make this happen, is use `make build` instead of `go build ...`

In our code, we can check for the presence of a flag (e.g. `-v`) and display the hash:

```go
package main

var gitCommit string

func printVersion() {
	log.Printf("Current build version: %s", gitCommit)
}

func main() {
	versionFlag := flag.Bool("v", false, "Print the current version and exit")
	flag.Parse()

	switch {
	case versionFlag != nil:
		printVersion()
		return
	}
	// continue with other stuff
}
```

--- 
Related reading:

{{<oembed "https://en.wikipedia.org/wiki/Make_(software)">}}
{{<oembed "https://blog.alexellis.io/inject-build-time-vars-golang/">}}
{{<oembed "https://goreleaser.com/">}}