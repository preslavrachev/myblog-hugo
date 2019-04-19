+++
author = "Preslav Rachev"
categories = ["Programming", "Python", "Jupyter Notebook", "Tips"]
date = 2018-04-22T04:14:00Z
description = ""
draft = false
slug = "live-reloading-of-python-modules"
tags = ["Programming", "Python", "Jupyter Notebook", "Tips"]
title = "Live-reloading of Python Modules in the Python REPL / IPython / Jupyter Console"

+++

Often, I would work on a Python module and add changes to it live, which I would then want to test immediately. Piece of cake! Add the changes and execute the script again. Well, that’s certainly a way, but as modules get bigger, they tend to import other modules, or do some preliminary setup work. 

With time, I have developed this practice of opening up a Python REPL (though I recommend IPython or the Jupyter Console for that), importing my in-progress module and singling out separate functions I would like to test. The problem is, when I do changes to the Python code (like, add a new function), they are not immediately usable, because neither the Python REPL, nor IPython / Jupyter would auto-reload them. 

## Give me the code
Yes, we are coming to that
### General Way

Python 3 supports inline reloading of modules using a function called, well clever enough, `reload`. It used to be a built-in function in Python 2, but this is no longer the case. If you are using Python 3.2+, you should import it extra:

For Python 3.2 and 3.3:

```python
import importlib
importlib.reload(some_module)
```

For Python 3.4+:

```python
import imp
imp.reload(some_module)
```

### IPython/Jupyter Magic
Jupyter comes with a set of extensions only applicable to the Jupyter/iPython sessions, called [magics](https://ipython.org/ipython-doc/3/interactive/magics.html). One of these “magics” is the ability to load custom extensions, [one of which](http://ipython.readthedocs.io/en/stable/config/extensions/index.html) allows auto-reloading of modules. To enable this, you should add the following two commands, before any imports:

```python
%load_ext autoreload
%autoreload 2
# you can check out the the documentation for the rest of the autoreaload modes
# by apending a question mark to %autoreload, like this:
# %autoreload?
```

This way, as soon as you hit `Save` in your code editor, you should be able to re-run a Jupyter cell or an iPython line again, and if it is calling your  module, it should automatically call the latest version.

## Links
- [Jupyter / IPython: After editing a module, changes are not effective without kernel restart – Enthought Knowledge Base](https://support.enthought.com/hc/en-us/articles/204469240-Jupyter-IPython-After-editing-a-module-changes-are-not-effective-without-kernel-restart)

- [python - Reloading submodules in IPython - Stack Overflow](https://stackoverflow.com/questions/5364050/reloading-submodules-in-ipython#5399339)



