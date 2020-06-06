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

This function will be called before each request. If you now add `trace_id=[RANDOM_ID_THAT_YOU_CAN_TRACE]` to a request that you want to test manually, or one used by another service, you should be able to easily search for the `RANDOM_ID_THAT_YOU_CAN_TRACE` in the logs. The best part is, turning it on an off is a matter of using/not using the URL param.

# A slightly more advanced Request Tracer

Of course, the example above is quite naive. It won’t be of much use to anyone, since most errors occur deeper in the call chain. Let’s take the following example:

```python
app = Flask(__name__)

@app.route("/")
def index():
    name = request.args.get("name")
		name = layer1(name)
    return f"Hello, {name}"

def layer1(name: str):
    return layer2(name)

def layer2(name: str):
    return name.upper()
```

Our API handler calls another function, which returns the result from yet another. A typical production application is way more complex, having loops and conditional logic all over the place. The problem with nested call chains is that to get the conditional tracing all the way through, one would need to add this to every function.

```python
if "trace_id" in request.args:
	# log trace_id, inputs and outputs
```

This is very impractical, and would make the code less readable.

## Custom tracing decorator

The least obtrusive option I could think of, is creating a custom decorator. We won’t go without modifying our code, but having a decorator on top of each function won’t mess with the readability of the code directly. This is how our tiny app from above would look like:

```python
app = Flask(__name__)

tracer = Tracer()

@app.route("/")
def index():
    name = request.args.get("name")
		# pass the tracer_id to the first function in your call chain
		name = layer1(name, trace_id=request.args.get('trace_id'))
    return f"Hello, {name}"

@tracer.trace
def layer1(name: str):
    return layer2(name)

@tracer.trace
def layer2(name: str):
    return name.upper()
```