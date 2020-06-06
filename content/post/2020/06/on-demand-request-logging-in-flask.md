+++
author = "Preslav Rachev"
categories = []
date = ""
description = ""
draft = true
feature_image = ""
slug = ""
summary = ""
tags = []
title = "On-Demand Request Logging in Flask"
toc = false

+++
Printing out just the right amount of production logs is an art that sometimes borders the realm of Dark Magic. From my experience building software, most developers either log too much, or don’t log anything at all. Not enough information can make bug hunting more difficult. On the other hand, too many log traces hamper code readability and don’t necessarily make one’s duties easier.

In reality, what everyone wants, are **logs on demand**. Most programming environments already partially take care of this, by logging errors separately. Yet, not always will a wrong behaviour lead to an error. Plus, an error log would rarely contain the particular execution context that led to the error.

It would be great, if one were able to manually turn on logging, and only in certain cases. In the context of a Web applications, _certain cases_ == _certain requests_. For the standard Flask-like Python Web app, this is actually very easy to achieve.

# Basic Request Tracing

I will use Flask, because it is the easiest to demonstrate. The idea should be relatively easy to reuse with other frameworks though.

Let’s say, we want to write a log every time our Flask API gets called with a certain URL parameter (let’s call it `trace_id`). The simplest thing one can do, is add a `@before_request` interceptor:

```python
app = Flask(__name__)

@app.before_request
def request_tracer():
    if "trace_id" in request.args:
        # DO something, like log the request args, body, etc
	      # Make sure to include the trace_id as well, so you can
        # search for it in the logs
```