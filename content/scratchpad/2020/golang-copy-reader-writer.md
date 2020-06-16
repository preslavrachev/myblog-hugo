+++
author = "Preslav Rachev"
date = 2020-06-16T07:08:59Z
description = "Something so simple, and yet, so easy to forget right when you need it. How does one read from a Reader and write to a Writer at the same time?"
show_title = true
summary = "Something so simple, and yet, so easy to forget right when you need it. How does one read from a Reader and write to a Writer at the same time?"
tags = ["Programming", "Go", "Golang", "Tips"]
title = "Go: Copy a Reader Into a Writer"

+++

Something so simple, and yet, so easy to forget right when you need it. How does one read from a `Reader` and write to a `Writer` at the same time?

`io.Copy` to the rescue. I can best demonstrate it with a small HTTP server, where the contents of a JSON is being written directly into the HTTP response:

```go
package main

import (
	"io"
	"log"
	"net/http"
	"os"
)

func main() {
	log.Panic(http.ListenAndServe(":8080", http.HandlerFunc(handle)))
}

func handle(w http.ResponseWriter, r *http.Request) {
	fp, err := os.Open("store.json")
	defer fp.Close()
	if err != nil {
		log.Printf("ERR: %s", err)
	}

	io.Copy(w, fp)
}
```
