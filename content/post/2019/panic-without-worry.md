+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-12-14T22:00:00+00:00"
description = ""
featured_image = ""
slug = ""
tags = ["Programming", "Golang", "Go"]
title = "Panic Without Worry"
remote_redirect = "https://p5v.me/2019/12/panic-without-worry/"
+++

In the Go community, there is some kind of paranoia around panicking, as if it’s the worst thing that can happen to your application. In fact, it often is the better option. Think about Go programs as CLI applications. Would you rather crash right away and let the user react, or hang, trying to recover? The same applies to applications running as services. Modern tooling makes it easy to automatically restart a crashing service within seconds.

When necessary, panic without worry.
