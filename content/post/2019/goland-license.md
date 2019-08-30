+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-08-29T22:00:00+00:00"
description = ""
featured_image = ""
slug = ""
tags = ["Golang", "IntelliJ", "IDE", "JetBrains", "Tools"]
title = "Bought a Year-Long License for GoLand"

+++

##### NOTE: This is not a paid product endorsement. I'm just a happy customer.

I have recently bought a full license of [GoLand](https://www.jetbrains.com/go/) for a year. The trial served me well for a few months, but the IDE shutting down automatically after every 30 minutes of work, became way too annoying. I know, I shouldn't rely on an IDE for writing Go, when VS Code or Vim would have worked just fine. It's just that the entire experience of writing, and more importantly, refactoring Go code in GoLand is so amazing.

Picking up a JetBrains product when coming to Go was a natural move. As a Java developer, I have used IntelliJ Idea for years. I am used to much of the refactoring goodness, and know most of the available key shortcuts by heart, so switching literally took me a minute. This one is a big plus, and JetBrains deserves a big thanks for it. Knowing that developers often switch platforms, offering the same experience everywhere is nothing short of great. I know, I know, in reality, those "IDE"s are nothing other than platform-specific plugins that run in the same core. One gets a similar experience when installing various officially-supported plugins for say, Visual Studio Code.

Almost. The official language support plugin for Go in VS Code uses much of the available open-source tooling for Go, developed by the community. While this is great, it also presents a temporary drawback. A large portion of the tooling still relies on projects using `GOPATH` and need to be updated in order to support Go modules. Since all of my projects have used Go modules from the start, I have experienced issues doing even basic refactoring in VS Code (e.g. renaming across the project)

The transition is happening and will sooner or later be no longer a problem. Luckily, GoLand does not seem to suffer from much of this, because it uses a different mechanism of indexing and analyzing code. I think that I'll stick to it for a year while community tooling gets to a stage, where modules are fully supported.
