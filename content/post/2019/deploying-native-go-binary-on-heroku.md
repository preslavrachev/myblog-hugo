+++
author = "Preslav Rachev"
categories = ["Programming"] 
date = 2019-04-20T07:30:04Z
description = ""
draft = false
slug = "deploying-native-go-binary-on-heroku"
tags= ["Golang", "Heroku", "Tips"]
title = "Deploying a Native Go Binary on Heroku"

+++

My company, [KI labs](https://www.ki-labs.com/) recently held its first hackathon in our Munich office. My team and I  went for a very cool mobile app idea that promotes healthy walking competitions among colleagues and friends. Though the app itself deserves a proper introduction, I will talk about it in a separate post. This time I will focus on one problem I experienced while working on the app's backend part, written in Go.

The challenges with using the Go language aside, one unanticipated hurdle was actually getting the backend to run in Heroku. I know, I could have gone for a different solution, but my usual workflow is to deploy to Heroku, until the requirements push for an alternative approach. And Heroku already supports deploying Go applications. Or at least, that's what the [documentation](https://www.heroku.com/go) says. And indeed, after the stress of the hackathon, I figured it out, but at the time, getting Heroku to build a Go application that uses modules seemed like it needed more time than we actually had. 

Due to the limited time constraints, I decided to take a shortcut and use what has traditionally been one of the Go's strongest selling points - creating a static binary and running it natively inside a VM or a container. But Heroku can't run native apps directly, can it? Or at least, it won't allow you to run those directly.

## The Solution
The trick is to make the installer think that it is going to use a certain [Buildpack](https://devcenter.heroku.com/articles/buildpacks), but actually in your Procfile you override the control and execute a native binary directly.

Heroku uses certain triggers to initiate the start of an instance. For example, the presence of a `package.json` file (Node.js) or `pom.xml` / `build.gradle` (Java), `requirements.txt` / `setup.py` (Python), etc.

```bash
GOOS=linux go build server.go
```

For our needs, we might as well hijack the [Node.js Buildpack](https://github.com/heroku/heroku-buildpack-nodejs). This is relatively simple. In order to trick Heroku, all we need is a `package.json` file, which lists a few basic properties needed for the Buildpack initialization:

```json
{ "name": "appname", "version": "0.0.1", "dependencies": {} }
```

With the `package.json` file in place, we need a simple `Procfile`, which will tell Heroku what to execute once the Buildpack initialization has finiehsed. In our case, this will be the already compiled Go executable:

```yaml
web: ./main $PORT
```

A minor disadvantage of this approach is that we need to check the compiled binary into our git repository. I would do this on a separate branch, which I would try not to merge back to master and delete as soon as no longer necessary. By default, Heroku would use the `master` branch when buiding an application, so we need to be assertive when pushing our special deployment branch:

```bash
git push heroku my-deployment-branch:master
# tell Heroku to use my deployment branch as its `master`
```

That's it! If fyour application is built using a technology that Heroku might not be actively supporting, or you are in for an extra performance boost (e.g. using Swift, Rust, C, etc) this tip might help you. 

# Related Resources

- [Heroku with C](http://blog.jan-ahrens.eu/2014/06/17/heroku-with-c.html)
- [heroku/heroku-buildpack-go: Heroku Go Buildpack](https://github.com/heroku/heroku-buildpack-go)
- [heroku/go-getting-started: Getting Started with Go on Heroku https://devcenter.heroku.com/articles/getting-started-with-go](https://github.com/heroku/go-getting-started)
- [Heroku Go Support | Heroku Dev Center](https://devcenter.heroku.com/articles/go-support)
- [Deploy, manage, scale Go apps in the cloud | Heroku](https://www.heroku.com/go)