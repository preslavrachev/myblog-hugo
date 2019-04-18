+++
author = "Preslav Rachev"
categories = ["Programming", "Python", "Tips"]
date = 2019-01-09T06:28:16Z
description = ""
draft = false
slug = "dotenv-files-python"
tags = ["Programming", "Python", "Tips"]
title = "Use Dotenv Files When Developing Your Python Apps"

+++

Hard-coding configuration is bad. This is one of the things that newbie programmers learn quickly after they realize that have committed sensitive information to a public GitHub repository. And it happens so easily. Often, you are in the spur of the moment, wanting to test something locally, when you figure out that you need some API key in order for your app to work. Adding the key to the code takes a second, and is just as easy to forget when committing. The [Twelve-Factor-App](https://12factor.net/) methodology calls this a _violation_, and has whole [section](https://12factor.net/config) on why should be externalized and read from the environment at runtime.

I used to avoid using environment variables, because they made it hard to set up a local environment for testing. I’d either pass all the assignments at the start, or use a cumbersome startup script to export them to the current shell.

Luckily, it is easy to improve the quality of your code, and ease testing in different environments at the same time. It has become somewhat of a standard practice to use `.env` (a.k.a dotenv) files for configuring sensitive data while testing across environments. A _dotenv_ file contains nothing more than text, where  it has one environment variable assignment per line:

```bash
ABC_KEY=1234xyz
DEF_KEY=2349875
DEBUG=True
```

**NOTE**: _Dotenv_ files **must be ignored** from version control for exactly the same reason mentioned at the beginning of this post: exposing sensitive information as part of the project is bad. These files are only used to quickly set up or change an environment when needed.

## Using a dotenv file in our app

How do we get our Python app to read a `.env` file? [python-dotenv](https://pypi.org/project/python-dotenv/) is a great Python package that does exactly that. It will search for a `.env` as part of the project, and if it finds one, will expose the variables in it to the app. All you need to do, is `pip install python-dotenv` and add the following couple of lines at the start of your project:

```python
from dotenv import load_dotenv
load_dotenv()
```

The starting point may vary, depending on whether your project is a command line script, a Flask, or a Django project. For instance, in a Django project, the above two lines need to be added at the top of the `settings.py` file.

Having set `python-loadenv` up, the rest is easy. Create a `.env` file at the root of your app with all the environment variables needed to configure it, and make sure that you invoke them properly from your code (e.g. use something like `os.getenv('MY_API_KEY')`). Don’t forget to exclude the `.env` file from being checked into your source code repository!

## Links

- [python-dotenv · PyPI](https://pypi.org/project/python-dotenv/)
- [http://12factor.net/](http://12factor.net/)

