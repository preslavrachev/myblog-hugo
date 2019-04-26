+++
author = "Preslav Rachev"
categories = ["Programming"]
date = 2017-02-03T05:29:00Z
description = ""
draft = false
slug = "securing-your-elasticsearch-instances"
tags = ["DevOps", "ElasticSearch", "Docker", "InfoSec", "SSH"]
title = "Securing your ElasticSearch instances"

+++

### Securing your ElasticSearch instances and keeping all the fun

Often, we choose convenience over security. Many modern tools such as MongoDB and ElasticSearch, have grown in popularity, partly because of their easy-to-set-up-and-tinker-with nature. Just spin off an instance, point your browser to the right URL and you're ready to start sending queries.

Unfortunately, one thing comes for another, and as [we have recently seen](http://www.zdnet.com/article/elasticsearch-ransomware-attacks-now-number-in-the-thousands/), ElasticSearch left in the open can be a vulnerable target, same as MongoDB was in its heyday. In light of the [recent attacks](http://www.zdnet.com/article/elasticsearch-ransomware-attacks-now-number-in-the-thousands/) on many open ElasticSearch instances across the world, I decided to share a quick tip on how to set remote ES instances, and keep them secure, by not compromising on its easy-to-play-with nature.

## Part One: Restricting the access to your ElasticSearch instance

Let's start. The easiest way to setup an ElasticSearch instance is [spinning up a container](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html) off the default Docker image:

```bash
docker pull docker.elastic.co/elasticsearch/elasticsearch:<VERSION>

docker run -p 9200:9200 -e "http.host=0.0.0.0" -e "transport.host=127.0.0.1" elasticsearch:<VERSION>
```

Running the above line, will create a portion mapping from 9200 within the container, to port 9200 on the host machine. One problem here, is that by doing so, it also exposes it to the outside world. This could easily be seen by running `iptables` against your host:

```bash
iptables -t nat -L -n

# Outputs
...
target     prot opt source               destination
DNAT       tcp  --  0.0.0.0/0            0.0.0.0/0            tcp dpt:9200 to:XXX.XXX.XXX.XXX:9200
...

```

Indeed, Docker takes the heavy-lifting of configuring your `iptables` firewall, but often, this may result in a configuration which is too permissive. What one should do instead, is provide a specific IP to the port mapping configuration. Thankfully, Docker supports this, so all we have to do is modify the above command, using the `IP:host_port:container_port` mapping:

```bash
docker run -p 127.0.0.1:9200:9200 -e "http.host=0.0.0.0" -e "transport.host=127.0.0.1" elasticsearch:<VERSION>
```

Perfect! Putting the `127.0.0.1` will guarantee that the container will be available inside the host machine, but not accessible outside. A quick proof of this is looking at iptables again:

```bash
target     prot opt source               destination
DNAT       tcp  --  0.0.0.0/0            127.0.0.1            tcp dpt:9200 to:XX.XXX.XXX.XXX:9200
```

if you point your browser to port 9200 you should not be able to see anything, but executing `curl 127.0.0.1:9200 from inside the host machine should work.

## Part Two: Accessing your ElasticSearch instance in a secure manner

What we did was all fine, but how do access our ElasticSearch instance now, without losing the flexibility of quickly testing stuff on ES? Easy, using \*NIX's Swiss Army Knife - `SSH`. SSH is a tool most programmers use on a daily basis, but fewer of them are aware that SSH allows for local and remote port forwarding. What this means is that SSH can create an encrypted tunnel between your machine and your server, such that you can accesses services running remotely, as if they were running on loclahost (local forwarding). There is also remote forwarding, which alternatively, allows you to securely access locally running services from your remote server.

While we are going to use local port forwarding in our case, both are analogous to each other:

```bash
ssh -L/-R <PORT_ON_THE_LOCAL/REMOTE_MACHINE>:<HOST_TO_MAP_TO>:<PORT_ON_THE_REMOTE/LOCAL_MACHINE> <USERNAME>@<REMOTE_IP>
```

In our particular case, this looks like this:

```bash
ssh -L 9200:127.0.0.1:9200  user@XX.XXX.XXX.XXX
```

This basically says: map my local port `9200` to a call to `127.0.0.1:9200` on the `XX.XXX.XXX.XXX` server. When you point your browser to `http://localhost:9200`, you should now see the familiar ElasticSearch output, even though, as before `XX.XXX.XXX.XXX:9200` returns nothing. You can let the above command run in the background and run as a daemon.

## Conclusion

These two steps are all you need, in order to keep enjoying the freedom of playing with ElasticSearch or MongoDB, but doing it in a fully secure manner. This recipe can be applied to just about any service. And you really don't need Docker even. The fact that I mentioned it in part one, is because it makes setting up easy, and also saves you from having to tinker with `iptables` yourselves.

**NOTE:** Please, keep in mind that while running a SSH tunnel is just about perfect for testing and development purposes, it may not be an optimal solution for production. The reason for this is the latency caused by en/decrypting the data and shuffling it through the tunnel. It may become a bottleneck with many incoming requests running in parallel. I am yet to stress-test this setup and will share my observations in a further post. I will also share some more ideas on how to access an ElasticSearch instance securely, but also in a productive manner.
