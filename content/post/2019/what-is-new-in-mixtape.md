+++
author = "Preslav Rachev"
categories = ["Project"]
date = "2019-10-10T22:00:00+00:00"
description = ""
slug = ""
tags = ["Podcast", "Podcasting", "Project", "ElasticSearch"]
title = "What's New in Mixtape"

+++

## Give me more like these...

Search engines are a great tool for content discovery beyond the simple text searching. Often, it is difficult to express exactly what we are looking for. This may be due to limitations of the interface, or our own struggle to explain it in enough detail. There is one thing, however, which we are fairly good at. Given two things, we can easily say which one we like more than the other.

With the most recent update on [Mixtape](https://mixtape.preslav.me/), I have added the ability to use Mixtape as a way to discover new podcast episodes, by simply providing the IDs of ones that might be of interest to you. Those who have worked with search engines before, probably know that this is something that this type of applications are fairly well-suited, but not often used for. In particular, ElasticSearch (the brain behind the whole search operation) has a particular type of search query, which allows for just that.

{{<oembed "https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-mlt-query.html">}}

## Next steps

Currently, this is still an API-only feature, but it will open up the door for applications of various sorts. One particular thing I am working on, is in the form of a chat bot application, which one will be able to send podcast episode links to (e.g. from [Overcast](https://overcast.fm/), [Pocket Casts](https://www.pocketcasts.com/), [Apple Podcasts](https://www.apple.com/itunes/), etc) and get related podcast episodes to keep listening to.

Stay tuned!