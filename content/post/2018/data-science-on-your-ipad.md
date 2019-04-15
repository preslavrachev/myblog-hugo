+++
author = "Preslav Rachev"
categories = ["Data Science", "Programming", "Python", "iOS"]
date = 2018-08-12T05:29:00Z
description = ""
draft = false
featured_image = "https://images.unsplash.com/photo-1517421189533-dbc3211edf9a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
slug = "data-science-on-your-ipad"
tags = ["Data Science", "Programming", "Python", "iOS"]
title = "Data Science on Your iPad"

+++

This article is a follow-up transcription to a talk I recently gave at a local [Munich machine learning meetup](https://www.meetup.com/Hacking-Machine-Learning). Unlike [my previous talk](https://preslav.me/2018/05/25/my-first-machine-learning-talk/), this time I wanted to convey the idea of using an iPad for actively running data science experiments, as opposed to passively consuming information. I illustrated my point with a few example iOS applications I personally use on a daily basis, which I hope would be good starting points to get the audience interested in the idea. Being an iOS developer, who has once built a 3rd-party App Store search engine, I know first-hand how difficult it is to find anything inside the App Store, more so, when carefully specifying what one is looking for. Therefore, I believe that if nothing else, even having this one collection of links should be a valuable starting point for further exploration.

Before I get to the apps, let me start with some background: 

## Why a Tablet?
Although it might no longer get the media's attention as the tech sector's latest sexy gadget, the tablet has replaced the laptop/desktop in a number of activities, where one previously needed a "real machine". What is more, the tablet is slowly getting out of people's notion as being handy coffee table device for content consumption. It is rather becoming the preferred content creation choice of many, particularly, creative professions, such as writers, musicians, and visual artists. This has caught the eye of companies like Apple, who have decided to double-down on the iPad's Pro model, targeted primarily at professionals. 

If there is one thing that could describe our generation best, this would be our constant state of movement. We spend so much time commuting, or in some form of passive travel. We might as well try to start reclaiming some of this time and use it for creative and productive activities. This is where a tablet fits in for me.

Even at the bulkiest of sizes, an iPad is more convenient to carry around than a laptop. It is "always on", can be used while sitting, lying or standing, with or without a keyboard, and requires less interactions than a laptop. More than anything else, I find the level of multitasking exactly right for this type of medium. Indeed, one can do way less things at the same time on an iPad than one can do using a laptop. I tend to consider this a feature rather than a shortcoming: less multitasking => less distraction, i.e. more immersion.

Although my daily work involves sitting behind a laptop and crafting complex systems, it is rarely behind the laptop where these ideas originate. I feel most creative when discussing things with people or when I drift away somewhere outside, my iPad in my hand.

Now back to the main topic...

## Coding on an iPad?
It is certainly doable, and getting used to it takes way less time than one might expect. As an example, take developer Richard Morgan, who [developed an iOS game on his iPad](https://www.imore.com/starsceptre-ios-game-was-entirely-coded-ipad), entirely during his commute around London. Everything is possible when you have the right mindset and the right tools.

As for the tools, there are quite a few good ones, hidden inside the App Store. In fact, code editors for iOS have existed even before the release of the original iPad. Among them, many in-app IDEs of sorts. Yet, it wasn't until last year, when I started seriously taking look at the possibility writing code and running it entirely on an iPad. In 2017, Apple [permitted](https://www.macstories.net/linked/apples-app-store-guidelines-now-allow-executable-code-in-educational-apps-and-developer-tools/) the sharing and downloading of executable code on iOS devices, for teaching, learning and personal development purposes. A validation that writing code on iOS is here to stay.

The apps below are in no particular order, besides the fact that I will be specifically looking at Pythonista later on. All apps are paid, which is something I firmly stand behind and support, yet this post is no product or service endorsement of any kind. I am just a happy customer:

App Name | Languages
---|---
[Pythonista 3](http://omz-software.com/pythonista/)| Python 2 / 3
[Codea](https://codea.io/)| Lua
[Continuous](http://continuous.codes/)| C# / F# .NET
[iRstudio](https://itunes.apple.com/gb/app/irstudio/id1173749340)| R
[Analyser](https://itunes.apple.com/gb/app/analyser/id1083042861?mt=8)| Python
[Playgrounds](https://itunes.apple.com/us/app/swift-playgrounds/id908519492)| Swift

## Pythonista
[Pythonista](http://omz-software.com/pythonista/) is one the few apps, just like [iA Writer](https://ia.net/writer) (which I am using right now to write this post), which IMHO, deserves to come on an iPad pre-installed. To those having tried the Swift Playgrounds app on an iPad, it is just mere peanuts in comparison with what Pythonista offers:

* Fully featured support for both Python 2 and Python 3
* Excellent documentation, keyboard extensions, and code completion
* Has an integrated debugger, a property inspector, and its own REPL-like console
* Provides extensions for writing GUIs and communication with other apps on your device

![](/images/2018/august/pythonista-1.jpg)

![](/images/2018/august/pythonista-2.jpg)

<iframe width="560" height="315" src="https://www.youtube.com/embed/UYIZlqQPusw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Pythonista comes pre-packed with a ton of libraries we love and use every day: NumPy, Matplotlib, Requests, BeatufulSoup, etc. Yet, lacks some of our favourites, due to Apple's restrictions: Pandas, SciPy, Scikit-Learn, and unfortunately, TensorFlow. There are other apps like 
[Analyser](https://itunes.apple.com/gb/app/analyser/id1083042861?mt=8) and the now defunct Computable, which feature many of those as part of the app bundle, which lets me remain optimistic that we will see many of those included in future releases of Pythonista too.

Pythonista is great for quickly scrapping ideas, and doing exploratory data analysis. In fact, I am running most of my early-stage exploratory analysis on cryptocurrency pricing directly in the app. It is absolutely indispensable when learning new concepts, be those Python, or math / science-related. Last but not least, the integrated GUI and extension capabilities allow for creating entire iOS applications using Python. Think about it. An iOS app, built using Python, using only an iPad. It can't get better than this.

<iframe width="560" height="315" src="https://www.youtube.com/embed/a7QcX4Ke3Hc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## What about Jupyter?
Indeed, what about [Jupyter](https://jupyter.org/)? Unless you have been living in a cave, and self-proclaimed yourself a data scientist, you should know that Jupyter  Notebook, and similar tools which mix code and narrative have taken the scientific world by storm. Moreover, Jupyter Notebook is entirely Web-based. Therefore, it shouldn't be a big deal to run your private Jupyter instance, or use of the many readily available instances from [Microsoft](https://notebooks.azure.com/), [Kaggle](https://www.kaggle.com/kernels), [Google](https://colab.research.google.com/), and many other providers. My answer to this is **yes and no**. Although Jupyter Notebook is Web-based and technically opens up in mobile Safari, the actual usability of the Web version on mobile is less than ideal. Browsing through and reading code somehow works. It is the editing of code, where things get really painful. Many of the beloved Jupyter shortcuts are not supported, due to the lack of corresponding keys on the iPad's keyboard. When trying to type inside a cell, the browser tries to compensate by zooming in in and out in a horrible fashion. A very, very unpleasant thing.

So far, so good, but there must be an app that brings the best of Jupyter and the native iOS experience together, right? Indeed, but a bit later on that. First, a word about Computable.

[Computable](http://computableapp.com/index_old.html) was an app that promised to be the best of Pythonista, with  even more DS libraries under the hood, and its own native Jupyter support. The ultimate bliss. 

![](http://www.computableapp.com/img/keyboard@2x.png)
###### Computable in Action. [Photo Source](http://www.computableapp.com/index_old.html)

Sadly, the app is no longer available. It was pulled from the App Store in 2015 for various reasons, but the developer was kind enough to [put the original code up on GitHub](https://github.com/ktraunmueller/Computable), and make it open-source. In fact, as far as I know, I have been the first one to [fork](https://github.com/preslavrachev/Computable) the repository, and I am keen on trying to at least trying to revive it. I am looking for other contributors as well, so anyone willing to help is more than welcome.

Now, back to my dilemma. Indeed, there is a great app I discovered last year, which brings the best of both worlds. It is called 
[Juno](https://juno.sh/) and it is a slick, brand new, native iOS client for working with Jupyter Notebook and JupyterLab instances.

![](https://navoshta.com/images/posts/juno/screenshot_h_01@2x.png)
###### [Photo Source](https://navoshta.com)

Juno will easily connect to a self-hosted Jupyter server, or to a cloud-provided Jupyter VM (e.g. Azure, CoCalc, and many more coming soon). It also supports [Binder](https://mybinder.org/), for a series of pre-made tutorial notebooks, which is ideal for people to get on board without yet having an actual Jupyter instance running.

<iframe width="560" height="315" src="https://www.youtube.com/embed/6QNFi4EIz6U" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

Indeed, the lack of working truly offline might be a show-stopper for some, but I am more than sure that the developers are working hard to address this in future versions. Understanding the difficulties of having all Python libraries locally under the hood, I can only wish for an easy way to browse through, and perhaps, locally caching pre-rendered Jupyter notebooks for later reference. This would be great, and one won't have to render those to PDF or something more obscure.

## A few more apps
Before closings have decided to reiterate on my original statement that  the App Store is full of hidden gems which unfortunately, often did not really get the credit they deserve. This is the reason why I decided to share a few complementary apps that professionals from all disciplines will surely be interested in trying out. As before, those are not in any particular order, and I am not endorsing any of them, just sharing my personal opinion.

Purpose | Apps
---|---
Taking Notes and Documenting | [Quiver](http://happenapps.com/#quiver), [iAWriter](https://ia.net/writer), [Bear](http://www.bear-writer.com/), [FSNotes](https://fsnot.es/)
Source Control | [Working Copy](https://workingcopyapp.com/)
SSH and Terminal Emulation | [Termius](https://www.termius.com/), [Prompt](https://panic.com/prompt/)

---

Last but not least, here are [my slides](https://speakerdeck.com/preslavrachev/data-science-on-your-ipad) from the talk. Until next time!



