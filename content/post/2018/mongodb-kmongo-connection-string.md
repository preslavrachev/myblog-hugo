+++
author = "Preslav Rachev"
categories = ["Programming"]
date = 2018-12-28T16:45:41Z
description = ""
draft = false
slug = "mongodb-kmongo-connection-string"
tags = ["Kotlin", "Tips", "MongoDB", "Java"]
title = "Connecting to a MongoDB Instance Using KMongo"

+++

Often, the seemingly simple things can make you spend hours chasing around your tail. Like trying to connect to a MongoDB instance using [KMongo](https://litote.org/kmongo/quick-start/).

Basically, if you have checked out the KMongo [quick start](https://litote.org/kmongo/quick-start/), setting up a client and fetching some data should be extremely easy:

```kotlin
val client = KMongo.createClient() //get com.mongodb.MongoClient new instance
val database = client.getDatabase("test") //normal java driver usage
val col = database.getCollection<Jedi>() //KMongo extension method
```

The quick start tutorial assumes that your DB resides on `mongodb://localhost:27017`, but in reality, your MongoDB connection string looks more like this:

```text
mongodb://<USERNAME>:<PASSWORD>@<HOST>:<PORT>/<DATABASE>
```

and in proper production environments, it is unknown until runtime. Let's assume that it was passed to the running application as an environment variable, e.g. `MONGODB`. Simply passing this string to `KMongo.createClient()`won't do it. The problem is that KMongo assumes that this string is simply the `<HOST>` part and creates a `ServerAddress`out of it. This results in an error when connecting.

The solution is to use a class called `MongoClientURI`instead. `MongoClientURI` parses the string argument and splits it into its corresponding parts.

So, the solution to my problem:

```kotlin
val uri = MongoClientURI(System.getenv("MONGODB"))
val collection = KMongo.createClient(uri = uri)
        .getDatabase(uri.database)
        .getCollection<Jedi>()
```

---

# Related
- [https://www.mongodb.com/blog/post/getting-started-with-mongodb-and-java-part-i](https://www.mongodb.com/blog/post/getting-started-with-mongodb-and-java-part-i)

