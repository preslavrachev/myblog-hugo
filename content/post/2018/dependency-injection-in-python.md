+++
author = "Preslav Rachev"
categories = ["Programming", "Python"]
date = 2018-12-20T13:34:36Z
description = "In this post, I will lay out my arguments why you might want to think about dependency injection for your next Python project. I am not trying to preach a certain style of \"best-practice\" programming, but simply, to share my perspective from the eyes of a seasoned Java developer."
draft = false
image = "https://images.unsplash.com/photo-1467733238130-bb6846885316?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ"
slug = "dependency-injection-in-python"
tags = ["Programming", "Python"]
title = "Dependency Injection in Python: The Java Guy's Perspective"

+++

Dependency Injection (DI) in Python? Seriously? 🤔

At this point, I am expecting people to yell at me for thinking like a Java guy, but just bear with me for a moment, will you? _Spoiler:_ I am going to mention Spring only once in this post, I promise.

**_NOTE:_** If you are already familiar with Dependency Injection and want to see it in action, you might want to jump right to [the example][1] at the end. Otherwise, keep reading. As always, feel free to send me a [✏️comment on Twitter][2]. Your feedback is more than appreciated.

...

# Let's Get Things Straight

While I am definitely approaching Python software development from my close-to-a-decade  experience building Java software, I am not trying to preach to you a certain style of programming. Take this simply as a different perspective on things. The Python Universe is so immense that it will be a crime to pretend that DI is necessary for every Python project. While certain types of Python projects will definitely benefit from a bit more structure, for many others, DI might become the worst nightmare. I will try to write down my reasons, and leave the final decision to the reader.

# A Quick Detour on Dependency Injection

I will save you the lecture here. I am sure that many of you already know what DI is all about. Perhaps, some of you have already looked at, if not even read Martin Fowler's [Dependency Injection essay][3]. Even if you haven't, don't panic. I will share you a secret, and that is, **you already know DI, and have used it many times,** even if you haven't used a particular name for it.

There is one golden prerequisite for Dependency Injection and that is, Separation of Concerns. Put simply, group logic in separable units, and let these units work together, without any of them knowing much about the implementation details of the other. OOP calls such units _classes_, and FP, _functions_. The point is, _units isolate common logic_. Let's add to this the requirement that no unit explicitly instantiates the units it works with (dependencies). Instead, dependencies are passed upon the unit (injected), usually, during its instantiation.

So, DI is a fancy term for instantiating classes in a top-level module, and passing them as initializer arguments to one another:
    
```python    
class Api:
    def fetch_remote_data(self):
        print('Api called')
        return 42


class BusinessLogic:
    def __init__(self, api: Api):
        self.api = api

    def do_stuff(self):
        api_result = self.api.fetch_remote_data()
        print(f'the api returned a result: {api_result}')
        # do something with the data and return a result

# ---

if __name__ == '__main__':
    api = Api()
    logic = BusinessLogic(api=api)

    # ...
    print(logic.do_stuff())
```    
    

There are of course, more Pythonic ways of implementing Dependency Injection. I realize that the one I provided above is very Java-like. I have tried to collect a list of Python-related resources you might want to consult. You will find it at the end of this post.

# Where Explicit Dependency Injection Might Help

I already tried to make it clear that DI is not a silver bullet, and due to Python's versatility of use, it might not fit to every project. In some, it might even hamper the development of the project.

Python was created to give its developers the freedom to just do things, without sweating much about structure or ceremony, when those are not needed. This is why the Python ecosystem is perfect for scratching out ideas and prototyping, single-purpose CLI tools, or scripts with limited scope and lifetime.

Yet, for many of these projects, there comes a time, when they grow, or are bound to grow from the onset, and with this growth comes a different set of challenges. Where I see DI fit best, are projects with established requirements, serving a large number of stakeholders. The challenge here is to scale and constantly improve the system, without compromising its stability.

**Advantages**

Adding DI to your project will potentially

* increase its testability and reusability, because by design, it allows for easily replacing one component with another (great for mocking, or replacing one concrete implementation with another)
* increase the readability. When applying DI your top-level model becomes sort of an orchestrator, instantiating your units and passing dependencies to them. Although this might add a bit of boilerplate, it helps ensure that all the LEGO-block wiring-up happens in one place, and this place will always be the starting point of your later investigations.
* adds a certain level of common understanding between programmers of different backgrounds. While I am sure that many of you would come up with some more elegant and more Pythonic ways for solving the dependency issue, some of them might be too obscure for non-Python gurus (hi there 👋🏼) and lead to misunderstanding, lost communication, and potentially, compromising the resilience of the end product.

**Disadvantages**

Well, the boilerplate and ceremony might be quite of an issue for some Python purists.

# A More Complex Example

I have already mentioned it a few times that doing all the instantiation and passing dependencies around by hand can be a bit tedious. It can also be complicated, because of the order of instantiation. The core dependencies must be instantiated first, the units that depend on them afterwards, and so on, until the top-level units, whose role is usually to coordinate the flow of data among their dependencies.

There are many Python libraries, which already facilitate this process. Among those, I looked at [python-dependency-injector][4], [serum][5], and [injector][6]. I found [injector][6] to be closest to what I have come to know and use on Java - [Spring][7] and [Guice][8]. It is not the least verbose, but it gets the job done. Let's see how it works:
    
```bash    
pip install injector
```    

Let's take the two classes, I have created above:
    
```python    
class Api:
    def fetch_remote_data(self):
        print('Api called')
        return 42


class BusinessLogic:
    def __init__(self, api: Api):
        self.api = api

    def do_stuff(self):
        api_result = self.api.fetch_remote_data()
        print(f'the api returned a result: {api_result}')
        # do something with the data and return a result
```
    

The only modification I made, was adding an explicit [type hint][9] to the `Api` dependency. This will be used by the library to determine the right object to pass at instantiation.

Injector, similar to Guice and Spring, adds the concept of a dependency `Module`. This is a class that inherits from `injector.Module` and has a bunch of methods, each corresponding to the initialization of one dependency or the other:
    
```python    
class AppModule(Module):

    @singleton
    @provider
    def provide_business_logic(self, api: Api) -> BusinessLogic:
        return BusinessLogic(api=api)

    @singleton
    @provider
    def provide_api(self) -> Api:
        # there is no complex logic in our case,
        # but you can use this method to hide the complexity of initial 
        configuration
        # e.g. when instantiating a particular DB connector.
        return Api()
```    

Each of these methods is decorated with `@provider` (required) and `@singleton` (optional, only if you want to ensure that the object instance will always remain the same). Pay attention to the use of type hinting here too. One the one hand, it makes the dependency module code more readable, on the other, it is used by the injector library to determine the right objects to return.

Let's see how to use our classes. We need to create an Injector and pass it an instance of our AppModule.
    
```python    
if __name__ == '__main__':
    injector = Injector(AppModule())

    logic = injector.get(BusinessLogic)
    logic.do_stuff()
```    

From now on, when you want to obtain an instance which is inside the dependency graph, from outside the graph, you would have to use the injector. Before you start grunting about the rising amount of boilerplate, let me point out that the actual places where you would need to do that, are either your app's main starting points, or API/Web endpoints in the context of a Web application. Actually, if you are building a Flask app, the creator of injector has got you covered. There is an extension for Flask, called [flask-injector,][10] which hides the boilerplate of having to use the injector object directly.

Back to our injector instance. The real benefit of having dependency modules, is when you have several of them, for running your app in different contexts. The simplest example is testing. Let's create a version of our Api class for testing purposes:
    
```python    
class TestApi(Api):
    def fetch_remote_data(self):
        print('Demo Api called')
        return 24
```    

Assuming that there might be more classes we'd like to mock, we create a separate dependency module for them:
    
```python    
class TestAppModule(Module):

    @singleton
    @provider
    def provide_api(self) -> Api:
        return TestApi()
```

The real magic happens when creating the injector. You can have as many injectors as you have, and each injector instance can be supplied with as many dependency module configurations as you wish:
    
```python    
if __name__ == '__main__':
    real_injector = Injector(AppModule())
    test_injector = Injector([AppModule(), TestAppModule()])

    real_logic = real_injector.get(BusinessLogic)
    real_logic.do_stuff()

    test_logic = test_injector.get(BusinessLogic)
    test_logic.do_stuff()
```
    
```  
Api called
the api returned a result: 42
Demo Api called
the api returned a result: 24
```   

# The End

I will stop here. I hope, if not really having managed to convince you, to have given you a slightly different perspective on things. Until next time!

* * *

# Related Resources

- [Inversion of Control Containers and the Dependency Injection pattern](https://martinfowler.com/articles/injection.html)
- [Pythonic Dependency Injection: A Practical Guide - Sune Andreas Dybro Debel - Medium](https://medium.com/@suneandreasdybrodebel/pythonic-dependency-injection-a-practical-guide-83a1b1299280)
- [Python 3 Patterns, Recipes and Idioms - Python 3 Patterns, Recipes and Idioms](https://python-3-patterns-idioms-test.readthedocs.io/en/latest/index.html)
- [Dependency injection and inversion of control in Python - Dependency Injector 3.14.2 documentation](http://python-dependency-injector.ets-labs.org/introduction/di_in_python.html)
- [alecthomas/injector](https://github.com/alecthomas/injector)
- [suned/serum](https://github.com/suned/serum)
- [ets-labs/python-dependency-injector](https://github.com/ets-labs/python-dependency-injector)
- [RobertoPrevato/rodi](https://github.com/RobertoPrevato/rodi)

[1]: #a-more-complex-example
[2]: https://twitter.com/intent/tweet?text=%40preslavrachev%20%5BADD%20YOUR%20COMMENT%20HERE%5D&url=https://preslav.me/p/3c4daf3d-607c-49e4-8aa9-c87a61be1697/&related=preslavrachev
[3]: https://martinfowler.com/articles/injection.html
[4]: https://github.com/ets-labs/python-dependency-injector
[5]: https://github.com/suned/serum
[6]: https://github.com/alecthomas/injector
[7]: https://spring.io/
[8]: https://github.com/google/guice
[9]: https://www.python.org/dev/peps/pep-0484/
[10]: https://github.com/alecthomas/flask_injector

