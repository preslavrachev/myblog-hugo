+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-03-22T22:00:00+00:00"
description = ""
draft = true
featured_image = ""
slug = "give-me-back-my-monolith"
tags = ["2 Cents", "Dev Culture"]
title = "Give Me Back My Monolith"

+++
{{<oemned "http://www.craigkerstiens.com/2019/03/13/give-me-back-my-monolith/">}}

<p><a href="http://www.craigkerstiens.com/2019/03/13/give-me-back-my-monolith/">Give Me Back My Monolith</a> by Craig Kerstiens is something I have been ranting about for quite some time. It is thus good to see <a href="http://www.craigkerstiens.com">other people</a> standing on the same side of the bridge:</p><blockquote>As we ventured into micro-services onboarding time skyrocketed. Yes, we have docker and orchestration such as K8s these days to help, but the time from start to up and running a K8s cluster just to onboard a new engineer is orders of magnitude larger than we saw a few years ago. For many junior engineers this is a burden that really is unnecessary complexity.</blockquote><p>What most programmers forget is that a) <a href="https://en.wikipedia.org/wiki/Cargo_cult_programming">cargo-culting</a> is a thing, and b) micro-services are just a tool like anything else. I have fallen into this trap myself quite a few times myself. Just like you won't use Objective-C for Web development or embed an Oracle database inside your mobile app, <em>you don't have to use micro-services in every project you are working on</em>. You can, but in 90% of the cases, you won't need to. As with most things in life, a micro-service (or macro) architecture is something you reach out of necessity. Unless requirements force you right off the bat, focus on building your product as a single, unified core instead.</p><p><strong>Remember:</strong> A micro-service architecture shifts the complexity form the code to the infrastructure, Or, as I used to say: <em>"Before micro-services, I chased domain problems, now I am mostly chasing Kubernetes issues, in order to get to the domain problems"</em></p><p><a href="http://www.craigkerstiens.com/2019/03/13/give-me-back-my-monolith/">Give Me Back My Monolith</a> was also featured in the latest of the <a href="https://pythonbytes.fm">Python Bytes</a> podcast:</p><audio controls src="https://pythonbytes.fm/episodes/download/122/give-me-back-my-monolith.mp3"></audio><p></p><ul><li><a href="http://www.craigkerstiens.com/2019/03/13/give-me-back-my-monolith/">Give Me Back My Monolith</a></li><li><a href="https://pythonbytes.fm/episodes/show/122/give-me-back-my-monolith">Episode #122: Give Me Back My Monolith | Python Bytes Podcast</a></li></ul>