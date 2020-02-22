---
title: "Using Gohack for Temporary Modifications to Go Module Dependencies"
date: 2020-01-10T19:14:17+01:00
draft: false
categories: ["Programming"]
tags: ["Programming", "Go", "Golang"]
---

I started programming Go right at the time when the topic of _modularization_ heated up. Of course, we all know how it all played out with Go modules. They are here and they are (IMO) great. I have spent a significant amount programming Python before virtual environments were really a thing, and believe me, things got really messed up at times.

One big disadvantage of modules is that one can’t really edit them. For a good reason, of course. You want them to be clean and reproducible, but occasionally, one needs to just insert a `log.Printf` or a tiny inspection function somewhere. One option is to call `mod vendor`, but this would copy all the dependencies to the vendor folder. Clearly, a lot more overhead than what one would need.

This is where [gohack](https://github.com/rogpeppe/gohack) comes in really handy. It uses a clever feature of the Go modules, called /replace/. It allows the user to manually override the path to a given dependency. Instead of doing all of this manually, however, gohack will do it all for you.

After installing go-installing gohack, go to your module-bound Go project and use it instead of `go get` for a given dependency:

```
gohack get example.com/foo/bar
```

gohack will fetch the code and store it in a special place inside your `$HOME` directory. It will also do the go.mod replacements for you:

```
replace example.com/foo/bar => /home/me/gohack/example.com/foo/bar
```

All the edits you now do to the dependency that was added to your `$HOME` folder, will now affect the project that uses it.

Once you have done checking, and want to revert to using the original dependency, you can simply use the undo functionality:

```
gohack undo example.com/foo/bar
```

or to revert all changes to all “hacked” dependencies:

```
gohack undo
```

---

{{<oembed "https://github.com/rogpeppe/gohack">}}
