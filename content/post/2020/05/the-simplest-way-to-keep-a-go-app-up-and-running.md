---
title: "A Simple Way to Keep a Go App Up and Running"
date: 2020-05-24T10:28:44+01:00
draft: false
summary: "Poor man’s Kubernetes"
summary: "Poor man’s Kubernetes"
tags: ["Programming", "Tips", "Golang", "Go", "DevOps", "Bash"]
hide_feature_image: true
show_summary: true
---

I am a lazy programmer, experimenting with new ideas all the time. For these, running and deploying tiny Go apps as single executables is the closest way to see something in action. Yet, quickly written Go apps often panic, and crash altogether. While I am a strong defender of making sure that all possible errors are checked, real software is bound to eventually crash, no matter what. In such situations, the fastest solution is usually a simple restart.

[Systemd](https://www.freedesktop.org/wiki/Software/systemd/), [Docker](https://www.docker.com/), [Kubernetes](https://kubernetes.io/) - all took process supervision to a new level. If you are working on production-level software, chances are you already have some infrastructure layer in place that will take care of this. On the other hand, setting up tons of infrastructure is the last thing you want to think about, when working on your quickly made side project. This is where the following 5-line Bash script comes in place:

```bash
#!/bin/sh

while true; do
    .myapp
done

# call this file run.sh and use nohup to start it
# nohup ./run.sh &
```

That’s it. Instead of running your app directly, you can use `nohup` to run it through the Bash script: `nohup run.sh &`.

---

NOTE: While fairly easy to set up, this is by no means a safe way to take care of process restarts. It is also not an excuse to avoid thorough error checking. It will help you see your app quickly, but as soon as it starts getting serious traffic, you need to consider setting up the proper infrastructure. I can [help](https://preslav.me/contact/) with that.
