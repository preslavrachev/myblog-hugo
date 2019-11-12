+++
author = "Preslav Rachev"
categories = ["Programming"]
date = "2019-11-11T07:00:00+00:00"
description = ""
featured_image = ""
slug = ""
tags = ["Programming", "Tips", "Flutter", "Xcode", "iOS"]
title = "If You Can’t Get Flutter to Work with Your Beta Version of Xcode"

+++

You need to explicitly set the beta version of Xcode as your default one via the command line:

```bash
sudo xcode-select -s /Applications/Xcode-beta.app/Contents/Developer/
```

Afterwards, getting your app  to run via `flutter run` should work as it used to before.

## Related Resources

{{<oembed "http://iosdevelopertips.com/xcode/xcode-select-managing-multiple-versions-of-xcode.html">}}