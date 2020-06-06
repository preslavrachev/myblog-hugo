+++
author = "Preslav Rachev"
categories = []
date = 2020-06-07T05:00:00Z
description = "Not logging enough is as equally bad, as logging too much. What developers need is a turn-key way to log requests on demand."
feature_image = "https://images.unsplash.com/photo-1580894897591-ff1e18c89183?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1280&q=80"
hide_feature_image = true
slug = ""
summary = "Not logging enough is as equally bad, as logging too much. What developers need is a turn-key way to log requests on demand."
tags = ["Programming", "Python", "Flask"]
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

And this is one possible implementation of a tracing decorator:

```python
class Tracer:
    def __init__(self) -> None:
        self.current_trace_id = None

    def trace(self, f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            trace_id = kwargs.pop("trace_id", None)
            if trace_id:
                if self.current_trace_id:
                    # Do you really want to raise an error?
                    # Perhaps, logging the concurrent access and silently moving on is better.
                    raise Exception("Concurrent tracing requests are not allowed!")

                # "open" a new request
                self.current_trace_id = trace_id
                print(f"Tracing ID: {self.current_trace_id} - function call: {__name__}.{f.__name__} - Arguments: {args}")
                res = f(*args, **kwargs)

                # "close" the request, by simply clearing its state
                self.current_trace_id = None
                return res
            elif self.current_trace_id:
                print(f"Tracing ID: {self.current_trace_id} - function call: {__name__}.{f.__name__} - Arguments: {args}")
                return f(*args, **kwargs)
            else:
                return f(*args, **kwargs)

        return wrapper
```

Keep in mind the obvious limitation of my approach. The `tracer` instance is global. Storing state in global variables is usually a bad idea, but in some situations, you just don’t have any other choice.

In WSGI applications, global scope usually means _global per process_. Traditionally, a WSGI server would spawn a certain number of Python processes, and juggle incoming requests between them. A single request would run end-to-end as part of a single process. If this is the case, then our tiny decorator would do perfectly fine, due to process isolation. When threads or `async-await` come to play, scoping the decorator to the particular request at hand will become important.

In the case of Flask, one may make use of its [Request Scope](https://flask.palletsprojects.com/en/1.1.x/reqcontext/), which would ensure that a concurrent request won't overwrite the `trace_id` value of a currently running one. Of course, using a library-specific construct will make code more difficult to test. It will also require modifications to the decorator, in case you switch your Web framework of choice (luckily, most frameworks have the same concept of request scope built in).

At the end, it doesn't matter that much. One of the spirits of Python is writing simple code that gets most of the job done, rather than obsessing about making things uber-generic. If my approach doesn't work for your case, it is easy enough to adapt.

# The Inspiration

My inspiration came not from the Python community, but by Elixir's Phoenix framework. In its latest version Phoenix comes with an out-of-the-box [LiveDashboard](https://hexdocs.pm/phoenix_live_dashboard/Phoenix.LiveDashboard.html), which is extremely helpful in running an Elixir application in production. Among the many cool features, the dashboard features a Request Logger that pretty much does what I described above.

{{<oembed "https://nts.strzibny.name/phoenix-livedashboard-request-logger/">}}