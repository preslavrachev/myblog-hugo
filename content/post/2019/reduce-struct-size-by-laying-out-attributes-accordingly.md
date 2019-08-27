+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-08-27T15:00:00+00:00"
description = ""
draft = true
featured_image = ""
slug = ""
tags = ["Optimization", "Tips", "Struct", "Golang"]
title = "Reduce Struct Size by Laying out Attributes Accordingly"

+++
##### Many thanks to [@themaour](https://twitter.com/themaour) for sharing this tip on Twitter

TIL that in Go, struct size depends on how underlying types were defined.

```go
struct { 
		a bool 
    b int32 
    c string 
    d string 
}
```

The size of the struct above is is different from the one down below

```go
struct {
		b int32
    c string
    d string
    a bool 
}
```

Why is that? Well, think of memory as consisting of segments of certain size, where, if the amount of data you fill the segment with is bigger than the current remainder of the segment, the data will get written onto the next segment. The remaining space (a.k.a, _padding_) remains unused, and every instance of your struct might have some portion of unused padding when initialised.

There is a [great online resource](http://golang-sizeof.tips) where you can see this by providing a sample struct definition. Let's see what it shows for struct #1:

![](/images/2019/08/Image 2019-08-27 18-07-29.png)

and struct #2:

![](/images/2019/08/Image 2019-08-27 18-03-26.png)

Think of this the next time you get to process a slice of 1 mln instances of a given struct.

# Resources

{{<oembed "http://golang-sizeof.tips">}}
{{<oembed "http://www.catb.org/esr/structure-packing/">}}