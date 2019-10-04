+++
author = "Preslav Rachev"
categories = ["Project"]
date = "2019-06-20T22:00:00+00:00"
description = ""
featured_image = "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80"
slug = ""
tags = ["Project", "Web", "API", "Golang", "Medium"]
title = "Introducing NoEmbed"

+++

{{<oembed "https://noembed.preslav.me">}}

---

A picture is worth a thousand words. Everyone knows that. How about, *a preview is worth a thousand links*, however? If you have ever written a [Medium](https://medium.com/) article, more than certainly, you have tried adding links to videos or other Web pages. One of the cool features that distinguished Medium early on, were its really nice link previews. Simply, dropping a link will turn it into a block of information containing a title, an image, and an informative description:

![](/images/2019/06/noembed.gif)

In fact, if you keep looking around, you will find quite a few other apps adopting the same idea. [Slack](https://slack.com) and [Notion](https://www.notion.so/) are good examples that come to mind. Such previews are great, because unlike plain links, they deliver much more context, and therefore, help increase visitor engagement.

I wanted to provide similar link previews to my personal website, but what I found right away was how poorly adopted [oEmbed](https://oembed.com/) is out in the world. I will discuss [oEmbed](https://oembed.com/) in detail in a further post, but basically, it is a Web format allowing website owners to expose structured information for every particular link in that website. A good example is YouTube. If you check out the [following link](http://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3DM3r2XDceM6A&format=json), you will get a JSON object will all the information about the video in the URL parameter. This info is ready to be rendered as a preview in a site or an app that consumes it. 

The problems with oEmbed are apparent right away. In order for you to use it, the order side must have adopted it, and exposed an API endpoint for you to obtain metadata. Even if you built a proxy service that wrapped all the known oEmbed providers on the Web, you are essentially limited to the number of those providers. What about the rest of the Web?

Those were the thoughts that made me start working on what I called [NoEmbed](https://noembed.preslav.me/). It solves the problem with the limited number of oEmbed providers by employing smart content extraction characteristics where needed. By using an officially provided list of well-known oEmbed providers, the service proxies to them when possible. Most of the time, however, [NoEmbed](https://noembed.preslav.me/) grabs the content of the requested URL, extracts valuable information out of it (title, excerpt, main image, etc) and returns an oEmbed-compatible response, so it can be integrated by any other services that already use oEmbed in some form or fashion.

I built [NoEmbed](https://noembed.preslav.me/) in my spare time writing 100% Go code. It is still crude and unfinished, but already working, and with your help and feedback, I might be able to turn it into a real service. 

# FAQ

## Aren't there other services doing this already?
Of course, there are. [Embed.ly](https://embed.ly/) is a great example (used by Medium). Other notable examples are [Iframely](https://iframely.com/), [microlink.io](https://microlink.io/), and [Embed.rocks](https://embed.rocks/try). All of them are great services, of course, but I wanted to one first and foremost for myself; one that is lean and fast and also respects the privacy of its users. 

## What's with the name?
This is just a temporary name. NoEmbed is actually the name of a [famous oEmbed proxy](https://noembed.com/), which I wanted to use in the very begging. Yet, the small number of available oEmbed provides was a crucial factor that led me not to. 

That said, the name will most probably change, and I am open to hear your suggestions.

## What is the tech stack?
Pretty boring, actually. Nothing super fancy. At the moment, we are talking about a single tailor-made Web/API service written in pure Go, sitting behind nginx (doing the load-balancing and some heavy caching).

## Who is using it?
At the moment, the primary integrator of NoEmbed is the site you are reading at the moment. The embed that you saw at the beginning of this page, was generated with it.

## Are you planning on turning this into an actual product?
If you think you are ready to pay me for it, absolutely! If you already have a matching use case, do let me know, or sign up right away. I am planning to release a future update, which will allow consumers to use the API using secure tokens and authentication. 