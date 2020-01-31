+++
author = "Preslav Rachev"
categories = ["Programming", "Git", "Tips"]
date = 2015-02-21T06:59:00Z
description = ""
draft = false
featured_image = "/images/2015/february/1_756pH2sfB-0227AkUe1VXA.png"
slug = "what-s-with-the-50-72-rule"
tags = ["Programming", "Git", "Tips"]
title = "What’s with the 50/72 rule?"
remote_redirect = "https://p5v.me/2015/02/what-s-with-the-50-72-rule/"
+++

It is part of common sense to assume that the worthiest commit messages lie far from any extremes. Years ago, I often fell in the trap of hastily sending a commit after commit, annoyed by the fact that I have to add a summary to it (let alone a description). I've seen many projects whose commit summaries consist primarily of one-word verbs like [FIX], [CLEAN], [TEST], etc.

They don't tell much do they? Six months down the road, you'd be scratching your head, trying to remember what you were thinking exactly six months before, when you wrote that commit.

On the other hand are the "novels". Some programmers go into much detail of what they've done, both in the summary, and in the description. This makes it difficult to read, and understand later on, what they did exactly.

Being verbose is by no means a bad thing. In fact, programmers are encouraged to put lengthy details about their commits, but only in the description. The summary is what helps you and other programmers to skim through thousands of commits, so it must be both concise and insightful.

In a [2008 blog post][1], [tpope][2], described a system for creating commit messages, which I started calling simply, the _"50 / 72"_ rule. The rules of the game are simple:

1. The first line of your commit message must be maximum 50 characters long. No more, and (ideally), no less.
2. Leave a blank line
3. Start writing your description. The description can be as verbose as it suits you. Each line in your description should though wrap at the 72nd mark.

Git is smart enough to distinguish the first line of your commit message as your summary. In fact, if you try _git shortlog_, instead of _git log_, you will see a long list of commit messages, consisting of the id of the commit, and the summary only. The reason for wrapping your description lines at the 72nd mark is that _git log_ adds a padding of 4 blank spaces when displaying the commit message. To center the message perfectly, and make it read well on an 80-column terminal, you'd want to leave space for 4 more blank spaces at right side. That's where 72 comes from.

What about the 50? An analysis of the average length of commit messages in the linux kernel suggests that the ideal size of a git commit summary is around 50 characters in length:

![][3]Most commit messages average around 50 characters in length

Most code editors display the current line and column number that the cursor is at. Many support automatic wrap-line settings. If you are using GitHub's desktop app (as I used to), it will also show you warnings when you are over the limit.

Writing a great commit summary is like writing a great tweet, only shorter. Id suggest to try and write your thoughts at first, to see how long it gets. Then you's paraphrase it, and put the extra content (the details) in the summary. Try to use the 50-column mark as a guideline for your thoughts. Try to reach as close as possible to it, without going over. Remember, short commit messages do not help, too long don't either.

How does your team compare to the linux kernel contributors? You can check yourselves, using the code below:

You can use the data and plot it on a real histogram, using [matplotlib][4]. Many thanks to [mgalgs][5] for posting the [code][6], and the [histogram][6] originally on [StackOverflow][6].

[1]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[2]: https://twitter.com/tpope
[3]: /images/2015/february/0_Hm0dO0UnjFBprfV-.png
[4]: http://stackoverflow.com/a/5328669/1107412
[5]: http://stackoverflow.com/users/209050/mgalgs
[6]: http://stackoverflow.com/a/11993051/1107412
