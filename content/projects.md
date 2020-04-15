+++
author = "Preslav Rachev"
categories = []
cover = ""
date = 2018-12-06T06:29:15Z
description = ""
featured_image = ""
slug = "projects"
tags = []
title = "Projects"
toc = false
type = "page"

+++
<style scoped>
  .grid {
    display: flex;
    flex-wrap: wrap;
  }

  .card-wrapper {
    width: 50%;
    padding: 0.2rem;
  }

  @media (max-width: 960px) {
    .card-wrapper {
      width: 100%;
    }
  }

  .card {
    border: 1px solid #d4d4d4;
    border-radius: 8px;
  }

  .card a {
    text-decoration: none;
  }
</style>

What follows is a small showcase of applications, I have worked on over the past
years and I am really proud sharing. [Get in touch with me](/contact), if you'd
like to dsicuss them further.

<div class="grid" style="display:none">
  <div class="card-wrapper">
    <div class="card" style="display: flex; flex-direction: column">
      <div class="image-container">
        <img src="/images/projects/mixtape.jpg" alt=""
          style="width: 100%; height: 200px; object-fit: cover;">
      </div>
      <div class="title">

        <div class="card-content" style="padding: 1rem">
          <h2><a href="">Mixtape</a></h2>
        </div>
      </div>
    </div>
  </div>
  <div class="card-wrapper">
    <div class="card">
      B
    </div>
  </div>
  <div class="card-wrapper">
    <div class="card">
      C
    </div>
  </div>
</div>

- [**Mixtape:**](#mixtape) Go beyond the boundaries of the single podcast.
Discover and mix
podcast content around your favorite topics.
- [**NoEmbed:**](#noembed) A great preview is worth a thousand links.

---

## [Mixtape](https://mixtape.preslav.me/)

[Mixtape](https://mixtape.preslav.me/) is a search engine for podcast content.
It stands out from the rest, because of its _focus on episodes, rather than
entire feeds_. Just like mixtapes in the old days, it allows listeners to search
and subscribe to topics of interests, rather than to separate feeds. It also
allows audio enthusiasts to pick and share particular audio clips with friends.
Something like this:

<iframe
  src="https://mixtape.preslav.me/episode/d0901898/embed?start=00:07:21&stop=00:07:39"
  scrolling="no" width="400" height="300"
  style="border:none; margin: 0px auto; display: block"></iframe>

## [NoEmbed](https://noembed.preslav.me/)

[NoEmbed](https://noembed.preslav.me/) is an easy way to create engaging URL
previews from every link - even when the underlying site does not provide the
necessary metadata. NoEmbed strives to be smart, fast, and WYSIWYG - there are
no hidden ads, or suspicious analytics on behalf of end users. API consumers get
only what they paid for - engaging URL previews.

<div style="font-size: 0.8rem">
  {{<oembed "https://noembed.preslav.me">}}
</div>