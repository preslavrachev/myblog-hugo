+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-10-26T22:00:00+00:00"
description = ""
slug = ""
tags = ["Python", "Tools", "Best Practices"]
title = "Any Code Style You like as Long It's Black"
featured_image="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Ford_Model_T_1924-1925.jpg/1280px-Ford_Model_T_1924-1925.jpg"
+++

The other day, I had to go over some (not so) old Python code I wrote. The moment I started pulling my hair, came not when I figured out that I could no longer understand what it does. It was when I looked at how the code was formatted. To be precise - at its total lack of **any** formatting.

{{<oembed "https://github.com/psf/black">}}

The first thing I do when I start a new project nowadays, is to set up an automatic code formatter. My personal favorite for Python is [Black](https://github.com/psf/black). It is an opinionated formatter made by [Łukasz Langa](https://github.com/ambv) - a Python Core developer. Black leaves little choice when it comes to configuration. You can think of it as the [gofmt](https://golang.org/cmd/gofmt/) or [Prettier](https://prettier.io/) of Python. Integrate it with your editor of choice, or use the CLI over your code base and Black will do the rest:

```python
from seven_dwwarfs import Grumpy, Happy, Sleepy, Bashful, Sneezy, Dopey, Doc
x = {  'a':37,'b':42, 'c':927}

if very_long_variable_name is not None and \
 very_long_variable_name.field > 0 or \
 very_long_variable_name.is_debug:
 z = 'hello '+'world'
else:
 world = 'world'
 a = 'hello {}'.format(world)
 f = rf'hello {world}'
if (this
and that): y = 'hello world'
```

will transform into this:

```python
from seven_dwwarfs import (
    Grumpy,
    Happy,
    Sleepy,
    Bashful,
    Sneezy,
    Dopey,
    Doc,
)

x = {"a": 37, "b": 42, "c": 927}

if (
    very_long_variable_name is not None
    and very_long_variable_name.field > 0
    or very_long_variable_name.is_debug
):
    z = "hello " + "world"
else:
    world = "world"
    a = "hello {}".format(world)
    f = rf"hello {world}"
if this and that:
    y = "hello world"
```

{{<oembed "https://black.now.sh">}}

# Isn't PEP8 enough?

When it comes to code style, most Python developers point out [PEP8](https://www.python.org/dev/peps/pep-0008). [PEP8](https://www.python.org/dev/peps/pep-0008) is a good style guide, but definitely not a set of strict formatting rules. The same piece of code might be written in different ways, and still be compliant with PEP8. This is by design, as much of the Python philosophy is to leave the freedom and the final decision to the programmer. For comparison, Go follows a different mentality, where most of the extra energy aspects of programming are taken over by the compiler and the available tooling.

Unfortunately, even PEP8-compliant code still leads to arguments when it comes to keeping a unified code base. I don't know about you, but I have reached a level of pragmatism, where I don't care much about style and formatting, as long as it has been standardized everywhere. This is where Black enters the stage.

# Black is relentless

Black has one guiding philosophy - produce diffs as small as possible. If one expression can fit on a single line (88 chars), regardless of how complex it is, it will be kept on a single line.

In most programming languages, nested expressions (multiple levels of indentation, as well as opening and closing brackets) are what makes code complex. Python list and dict comprehensions can be particularly nasty to comprehend, once they go over a certain length.

Black splits long expressions into multiple lines, where the outermost brackets get separated from the inner content. If the inner content is longer than the line limit, the same operation gets repeated recursively on and on.

The result is code, which, although taking more vertical space than writing a few one-liners, is much easier to read and reason about. The fact that Black will always format your code the same way makes even more sense when working with other people. Lines diffs are the way source control systems indicate changes. Therefore, uniformly splitting complex code into multiple lines makes code reviews easier and takes away almost discussions around style.

# Black is stubborn

Borrowing ideas from [gofmt](https://golang.org/cmd/gofmt/), Black has close to zero configuration options, especially, when it comes to variations of formatting style. I welcome such initiatives, because formatting is not something I would like to personally spend time dealing with. If this is not to your taste, however, you might try out the notable alternatives, such as [yapf](https://github.com/google/yapf) and [autopep8](https://github.com/hhatto/autopep8). [yapf](https://github.com/google/yapf), in particular, has multiple code style options, e.g. from Google, Facebook, which you can try and see if any fits your taste. You can always create your own, and share it across all fo your projects.

# Know when to be inconsistent

Contrary to everything I have said so far, there might be times when blindlyy following a consistent standard is just inapplicable. As PEP8 says it: _"When in doubt, use your best judgment. Look at other examples and decide what looks best. And don't hesitate to ask!"_

---

{{<youtube "esZLCuWs_2Y">}}

{{<oembed "https://www.python.org/dev/peps/pep-0008">}}
{{<oembed "https://www.kevinpeters.net/auto-formatters-for-python">}}
{{<oembed "https://github.com/google/yapf">}}
{{<oembed "https://github.com/hhatto/autopep8">}}
