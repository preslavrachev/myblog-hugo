+++
author = "Preslav Rachev"
categories = ["Life Hacking"]
date = "2018-04-02T04:00:00+00:00"
description = ""
featured_image = "/images/2019/06/photo-1494059980473-813e73ee784b.jpg"
slug = "how-to-use-twitter-more-efficiently-with-these-hidden-search-features"
tags = ["Social Media", "Tips", "Twitter"]
title = "How to Use Twitter More Efficiently with These Hidden Search Features"

+++
Twitter can be a mess sometimes. If you follow tons of people, it’s easy to get lost in the torrent of constant updates. This was one of the reasons why Twitter decided to move away from the purely chronological timeline a couple of years ago. In a move that almost ditched the diehard Twitter fans in favor of the mainstream, predominantly passive content consumers, the company started pushing more and more in favour of algorithmically adjusted timelines, much like Facebook does it.

{{<twitter "697420917253668868">}}

A couple of years later, some might argue that this was a good move, others, that it kills the natural springing momentum which is what made Twitter what it is today. I personally tend to stay away from the algorithmic timeline, which is why I am mostly relying on TweetBot — perhaps, one of the last bastions of the real, unsavored Twitter experience.

To keep on top of the stream, I have devised a series of heuristics that help me filter the massive Twitter stream down to what matters to me. Down to where real, actual human discussions are happening. Because Twitter is about active engagement and not just scrolling around, right? Let me share my few tips with you.

**_NOTE_**_: Many of the search parameters have remained largely undocumented, so I cannot really guarantee that they will be around forever._

# The Basics

Since the beginning of time, there has been a [page](https://twitter.com/search-advanced) on the Twitter website that allowed you to perform some of what they called “advanced search” operations. If you type a few queries and see how they get executed in the search box, you can deduce the syntax for a couple of basics that I am sure, most of you have learned by now:

## **Exact phrase matching**

    "this query will be treated like a whole phrase"

## **Boolean operators**

    word1 word2 OR word3 -word4 -word5

`Word1` and `word2` will be treated as “must be present”, whereas `word3` is optional, and `word4` and `word5` will not be present in any of the search results.

As with any syntax that allows boolean expressions, you can also put words in parentheses, if you think this will help make the syntax easier to understand. In my experience, parentheses actually made the syntax more complex. At the end, it is up to you. All you have to remember is that if you don’t explicitly put an OR or a minus before a word, the relation between words is always AND, all of them must appear in the end result.

# Social Engagement Thresholds

Moving to the less documented stuff. How many of you did you know that you can apply minimum thresholds of favorites, retweets, and even replies as part of your search?

    my search query min_retweets:5 min:faves:5 min_replies:5

How cool is that? I discovered this myself a couple of years ago, while hacking around TweetDeck. It was the first Twitter app that allowed something like that, so I did not hesitate to look under the hood. Turns out, it was pretty simple. All you need to do, is apply any of the following as part of your search query, and results will get filtered to only those that that match desired level of engagement. Of course, you will have to play around adjusting the desired numbers. Depending on the popularity of the rest of your search, the result might return too little or too much. You have to also keep in mind that the different actions were designed with different intentions in mind, and this will reflect in your search results. While the number of faves and retweets might be an indication that the particular tweet is viral (ideal for news and sudden events), the number of replies indicates narrative or content provoking a discussion.

Two tiny things before I move on:

1. As with the rest of the syntax, you can apply boolean logic operators here too. So the following query:

   my search query min_retweets:5 OR min:faves:5

will return results that match either of the engagement thresholds, or both.

1. The results are limited back in time to the most recent 10 days.

## Search in Lists

Another relatively unknown keyword is the `list` one. It allows you to filter your search results only to tweets written by members of a particular list. Keeping people in thematically curated lists instead of, or as a supplement to following, is a whole other topic, which I’ll elaborate on in another post. Generally, if you organize people around topics, it will be way easier for you follow streams where things roughly revolve around the same topic, instead of trying to stay up-to-date with your timeline.

Back to the syntax, this is how you can restrict you search query to a given list:

    list:username/list_name my search query

Needless to say, Boolean logic, as well as all the previous syntax rules apply here too.

## Content Type Filters and Excludes

The `filter` keyword allows you to specify whether:

 1. tweet results include a certain feature:
 2. `filter:links` - links to Web sites
 3. `filter:news` - tweets from or containing links to identified news sources
 4. `filter:mentions` - tweets containing `@mentions` inside the tweet content
 5. `filter:replies` - tweets that are explicit replies. Keep in mind that this has no effect on the tweet containing `mentions`. Those should be explicitly filtered with the above mentioned `filter:mentions`
 6. `filter:media` - Tweets that include any kind of media. These might be native videos, images, audios or links to the same, coming from external Web sites.
 7. `filter:images` - Tweets that contain any kind of images. Those might include ones uploaded via Twitter, as well as ones coming from external Web sites. For photos, explicitly loaded via the Twitter app or the API, use `filter:twimg`
 8. `filter:videos` - Tweets that include either attached videos, or links to externally hosted ones (e.g. form YouTube, Vimeo, etc). If you want to see videos, explicitly loaded via the Twitter app or the API, use `filter:native_video`
 9. `filter:quote` - returns only quoted tweets.
10. `filter:verified` lists only tweets written by verified accounts, while `filter:safe` will return ones that do not contain obscene words, imagery, or come from accounts known to produce such content.

Adding a `-` to any of those filters will essentially negate the meaning, and can be used for filtering out posts without media, links, etc.

# Examples

## Example #1: Interesting discussions from the Apple developer community

    list:preslavrachev/ios-macos-developers exclude:retweets exclude:replies min_retweets:10 swift OR apple OR iOS OR objC

{{<oembed "https://twitter.com/search?src=typd&q=list%3Apreslavrachev%2Fios-macos-developers%20exclude%3Aretweets%20exclude%3Areplies%20min_retweets%3A10%20filter%3Alinks%20swift%20OR%20apple%20OR%20iOS%20OR%20objC">}}

## Example #2: Top Bitcoin news from verified German sources

If you want to see what the mainstream press (e.g. in Germany) writes about Bitcoin, write something like this:

    bitcoin filter:news filter:verified -filter:quotes -filter:hashtags lang:de

{{<oembed "https://twitter.com/search?src=typd&q=bitcoin%20filter%3Anews%20-filter%3Aquotes%20filter%3Averified%20-filter%3Ahashtags%20lang%3Ade">}}

# Links

{{<oembed "https://www.labnol.org/internet/twitter-search-tricks/13693/">}}