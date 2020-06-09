+++
date = 2020-06-09T05:06:29Z
draft = true
slug = "fell-into-the-same-rookie-python-trap"
tags = ["Python", "Programming"]

+++
Yesterday, I was busy writing a data migration script in Python. Nothing fancy, just a glorified `for-loop`that transforms one document (dict) into another, and writes it back. Let’s assume that `language`exists only in a few particular documents. It was later replaced by a list, called `languages`. All the old documents have both, newer have only `languages`.

One of the lines deserves particular attention:

```python
# add languages, if present, or wrap the single language value in a list
# 'languages' might not be present everywhere, but in those case, 'language' must be
new_doc["languages"] = old_doc.get("languages", [old_doc["language"]])
```

Anyone, who has spent more than a month writing Python, will immediately see the issue here. And yet, I let it slip in my hastiness to get the script done.

Where is the problem?

The line above would fail for all of the documents, which have only `languages` present. It would do so, because the second argument is evaluated immediately, rather than only in case the first condition fails. In retrospect, this should have been obvious, but it took me some time until I figured it out.

What I ultimately settled with:

```python
new_dict["languages"] = old_doc["languages"] if "languages" in old_doc else old_doc["language"]
```