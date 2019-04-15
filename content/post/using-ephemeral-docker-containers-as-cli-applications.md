+++
author = "Preslav Rachev"
categories = ["Programming", "Docker", "Python"]
date = 2019-03-18T06:30:04Z
description = ""
draft = false
featured_image = "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
slug = "using-ephemeral-docker-containers-as-cli-applications"
tags = ["Programming", "Docker", "Python"]
title = "Using Ephemeral Docker Containers as CLI Applications"

+++

Docker containers have proven themselves extremely useful in allowing developers to sandbox environments and ease the deployment of services. Have a complicated service setup? No worries. Simply, describe the steps in a `Dockerfile` and you should be able to replicate the process on every host OS that has Docker support.

When I said services, I bet that the first thing you thought about was HTTP servers, or some sort of persistent, always running processes that send or accept requests to such services. While the majority of Docker use cases fit exactly into this scenario, the realm of possible applications it offers, far exceeds that.

One such application is the use of Docker containers to sandbox the complex inner workings of a command-line (CLI) application. Most data projects involve the running of scheduled scripts which access remote services, do data processing and eventually, write the results either to disk, or to dedicated data storage. Such scripts have required dependencies, and often, the dependencies of one may collide with the ones required by another, which ends up in a big mess. This is the primary reason, why things like virtual environments in Python or Node.js' notorious `node_modules` folder exist in the first place. Yet, we all know one or two about `node_modules`...

[![](https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1600%2F0*i5S2tUk0CQBh1Euc.&f=1)](https://hackernoon.com/circleci-performance-difference-between-cache-and-workspace-5567679c3601)

The ideal case for such applications would be statically-bound executable files containing everything needed, and running into their own dedicated processes. One such approach is championed by languages like Go, Swift, and Kotlin's Native option (and of course, good old C/C++). Others, like Java (fat Jars) and Python (wheels) offer a somewhat reasonable compromise by putting the code and every dependency into a single deployable artifact. I call this a compromise, because it still requires the presence of either JDK or a Python runtime on the host OS. 

The majority of the time however, we won't have the opportunity to deploy everything into a single executable. Much of the time, we also won't have the freedom to install different runtimes globally. In such cases, baking a CLI application together with all of its dependencies into a dedicated Docker image can be a good option. Let's try a simple example:

## An Example

Here is a simple Python script, which will fetch the current price of Bitcoin, and convert it to a desired fiat currency of our choice ("USD", "EUR").

```python
import argparse
import requests

def fetch(currency):
    price = requests.get("https://api.coindesk.com/v1/bpi/currentprice.json").json()["bpi"][currency]["rate_float"]

    print(price)

parser = argparse.ArgumentParser(description="My Fancy CLI")
parser.add_argument(
    '--currency',
    help='Choose currency to convert to',
)
args = parser.parse_args()

if __name__ == "__main__":
    print(args)
    if args.currency:
        fetch(args.currency)
    else:
        parser.print_help()
```

There are two things to keep a note on, in this example. First, is the use of `requests`, a popular HTTP request/response library, but not a part of the Python standard library, so it has to be installed separately. Second, is the use of command-line arguments, namely `--currency`.

Next, is the `Dockerfile`:

``` Dockerfile
FROM python:3.7
RUN pip install requests
COPY script.py .
ENTRYPOINT ["python", "script.py"]
```

Again, very simple. In light of keeping the example simple, we will install `requests` right in the `Dockerfile` and using a `requirements.txt` file or some kind of a setup script, which are the common practice.

Let's build the image, assuming that both files are in our current directory:

```bash
docker build -t my-command .
```

Great, now we can grab our newly baked image and run it:

```bash
docker run --rm -it my-command --currency USD
```

The `--rm` option will remove the container immediately after the command has been executed. If you have ever ran `docker ps -a`, you would know that inactive containers do not get deleted immediately, but are left for a possible later restart. Assuming that we would like to run our command multiple times per day, this will result in lots of wasted resources.

The other interesting option is `-i`. This one, combined with the fact that we chose `ENTRYPOINT` instead of `CMD` for our starting point in the `Dockerfile` would allow us to pass the `--currency` argument at the very end. There are a few subtle differences between `ENTRYPOINT` and `CMD` but the very basic is the ability to adapt `ENTRYPOINT`, while `CMD` is more or less final.

You can, of course, create an alias fo your command to make the execution easier:

```bash
alias my-cmd="docker run --rm -i my-command"

my-cmd --currency USD
```

That's it! Now you can ahead and run your application as a scheduled cron task and e.g. accrue data over time:

```bash
*/10 * * * * user ./my-cmd --currency USD >> prices.csv
```

## Limitations

Once again, the solution is far from the ease of a drag-and-drop that Go executables allow. Also, it assumes a working Docker setup (less and less of an issue nowadays), and quite a bit of space, because of the images. It also, for the most part, requires building the image locally, or at least, pulling the ingredients from an image registry. Docker allows for an option to save an image with all of its dependencies and load it on a remote host OS. Think of it as a sort of fat-Jar. I tried it just for the sake of demonstration, but it seems very impractical, as it resulted in an enormous zip file for that tiny Python script (of course, it bakes a whole Linux bistro inside):

```bash
docker save -o my-command.zip my-command
```

```bash
rw------- 1 user user 920M Mar 17 08:47 my-command.zip
```



