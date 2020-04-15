+++
author = "Preslav Rachev"
categories = []
cover = ""
date = ""
description = ""
draft = true
featured_image = ""
slug = ""
tags = ["WebRTC", "Phoenix", "Elixir"]
title = "My Short Deep Dive into WebRTC"
toc = false

+++
I spent some portion of the Easter weekend working on a demo of a WebRTC video chat prototype. I've wanted to test BEAM VM's concurrent and real-time communication capabilities, and Phoenix presented the right opportunity, with its support for socket channels and presence tracking. Though there is nothing to share yet, I wanted to write my thoughts down, in way to remind myself, and prepare others for potential traps along the way.

The server side was quite easy. Though, I hadn't had a lot of experience with either Phoenix Channels or Presence, I managed to set up a real-time server in no time. It exclusively relies on sockets for the critical communication between Web clients.

For the most part, developing the frontend was easy as well. Wiring up the sockets for the Phoenix Channels and Presence has its quirks, but I easily managed to get past that stage.

## Links

* [WebRTC 1.0: Real-time Communication Between Browsers](https://w3c.github.io/webrtc-pc/)
* [Trickle ICE](https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/) - helps with testing your STUN/TURN configuration.