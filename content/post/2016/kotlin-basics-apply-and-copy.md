---
layout: post
title: 'Kotlin Basics: apply() and copy()'
date: '2016-06-26 12:56:00'
tags:
- kotlin
---

Without any doubt, Java is a verbose language. This verbosity of the language makes it easy to understand Java code by new programmers. It is though one of the reasons, why many Java programmers find writing Java code tedious. Kotlin brings a touch of succinctness in places, where even programmers new to Java, may find code unnecessarily over-bloated. 

How many times have you had to do the same thing over and over again: 

```java
private A updateA(A objA, B objB) {
    objA.setC(objB.getC());
    objA.setD(objB.getD());
    return objA;
}
```

Having an object, you want to modify some of its properties and simply return the same object. In Java, you can't do this in a single chained fashion. In Kotlin, you can squeeze the above method to the following single line of code:

```java
fun updateA(objA: A, objB: B): A = objA.apply { c = objB.c; d = objB.d }
```

### apply()
By definition, [`apply`](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/apply.html) accepts a function, and sets its scope to that of the object on which apply has been invoked. This means that no explicit reference to the object is needed. `Apply()` can do much more than simply setting properties of course. It is a transformation function, capable of evaluating complex logic before returning. At the end, the function simply returns the same object (with the added changes), so one can keep using it on the same line of code. 

**Note:** Please, note as well the direct use of properties instead of explicitly calling getters and setters. This is not a bad practice, since Kotlin implicitly invokes provided getters and setters of a property, when working with the property (similar to C#). 

### copy()
Please, remember that using apply on an object is NOT a thread-safe operation, and mutates the state of the object. If you want to retain the original object and return an immutable copy of it, you can use the function [`copy()`](https://kotlinlang.org/docs/reference/data-classes.html#copying), provided in all instances of data classes. 

Assuming that your class contains only data (usually a good practice to separate logic from data), you can turn it into a [data class](https://kotlinlang.org/docs/reference/data-classes.html):

```java
data class User(val name: String, val age: Int)
```

Data classes have a few advantages, and one of them is definitely the [`copy()`](https://kotlinlang.org/docs/reference/data-classes.html#copying) function, provided to each and every instance. It not only provides a copy of the original object, leaving its state intact, but also allows setting new values to some of its properties at copy-time:

```java
val user1 = User("John Smith", 24)
val user2 = user1.copy(age = 31)
```

Kotlin supports [named parameters](http://blog.preslav.me/2016/05/29/kotlin-tips-named-parameters-default-arguments/), known from other languages, such as Python and Scala. In this case, they make life much easier, as all you need to do, is specify the name of the particular property (or properties) you want to modify by copying.

At the end you can combine the power and succinctness of both `apply()` and `copy()` by calling apply after copying:

```java
val user2 = user1.copy(age = 31).apply { // execute some logic here }
```
