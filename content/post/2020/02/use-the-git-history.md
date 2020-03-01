---
title: "Use the Git History to Identify Pain Points in Any Project"
date: 2020-03-01T17:50:14+01:00
draft: false
categories: ["Programming"]
tags: ["Programming", "Git", "Tips"]
---

Have you heard of [Adam Tornhill](https://twitter.com/AdamTornhill)'s work? If not, I highly recommend that you set some time aside and check out _[Your Code as a Crime Scene](https://amzn.to/32DM1G9)_ or _[Software DEsign X-Rays](https://amzn.to/2vtbjdR)_. In both books, the author dives into a bit of an unexplored territory - looking at the evolution of a codebase as a factor of its changes over time.

Much of the tooling we use to mitigate tech debt is preventive. Compilers, linters, static analysis tools, etc. All trying to prevent developers from checking in code, which might cause problems in the future. What all of these fail to catch, is that the code might be perfectly fine, and still not lead to a well functioning system.

The process of software development is as much about _developer-to-self_ and _developer-to-others_ interaction, as much as it is about making the machine do certain things. This interaction can only be let to grow, and reflected upon at certain periods of time. And what better tool to help us do that, than the one we use on a daily basis - git.

## Git to the rescue

In his books, Tornhill discuses multiple evolutions on the same basic idea - files that change often (with some exceptions) tend to be the ones where most issues occur, hence the need to change. We rarely think of this simple fact when we work on the same project for a long period of time. Yet, when on-boarding a new team member, looking up an unknown piece of code, or simply, retrospecting over your code, such knowledge can be invaluable.

The code is surprisingly simple:

```bash
git log --format=format: --name-only | egrep -v '^$' | sort | uniq -c | sort -rg | head -10
```

What I like to do is add such commands to my list of git aliases. Open up your `~/.gitconfig` file and add the following two lines to the `[Aliases]`section:

```bash
code-changes = "!git log --format=format: --name-only | egrep -v '^$' | sort | uniq -c | sort -rg | head -10"
cc = "!git code-changes"
```

What this will do, is sort the files in your project by their number of changes, and take the first 10. Those are the ones where most changes have occurred over time, consequently there is a higher chance that those will require the most changes in the future.

Let's do an example. I chose (completely by accident) to look at Gorm, one of the popular Go ORMs. These are the top 10 files that appear at the time of this writing:

```bash
272 main.go
246 scope.go
208 README.md
155 scope_private.go
117 main_test.go
116 gorm_test.go
105 model_struct.go
97 do.go
81 model.go
80 utils.go
```

Excluding the `README.md` file, one can clearly see some dominance of certain files over others. Many Go projects start out from a single `main.go` file, and with time, logic phases out to other files and packages. In our case, this is certainly not the case. Gorm 's `main.go` is one big chunk of code, which can easily get split into two or more files, especially, since multiple files can share the same Go package.

I'll go into more details on Adam Tornhil's work. There's even more interesting stuff, like identifying which files get changed together, etc. For now, take this simple trick and try to use it on the projects you're working on, or the libraries you frequently work with.

What do you see?

---

{{<oembed "https://www.goodreads.com/book/show/23627482-your-code-as-a-crime-scene">}}
{{<oembed "https://www.goodreads.com/book/show/36517037-software-design-x-rays">}}
