+++
author = "Preslav Rachev"
categories = ["Programming", "JavaScript", "React Native", "Tips"]
date = 2017-03-26T05:25:00Z
description = ""
draft = false
slug = "debugging-network-calls-in-react-native-using-the-chrome-debugger"
tags = ["Programming", "JavaScript", "React Native", "Tips"]
title = "Debugging Network Calls in React Native Using the Chrome Debugger"

+++

## TL;DR! Just give me the code
In your `index.js` file (or your platform-specific index file for that matter), simply add the following line to the top, directly after the `import` statements:

```javascript
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? 
  GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
```

You will also need a Chrome plugin that overrides [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS). I use [CORS Toggle](https://chrome.google.com/webstore/detail/cors-toggle/omcncfnpmcabckcddookmnajignpffnh?hl=en). You may also decide to skip the plugin and start Chrome with CORS disabled:

```bash
chrome --disable-web-security
```

then, as usually, start remote debugging from your app, and open: `http://localhost:8081/debugger-ui` on your computer.

That's it. Please, make sure to never rely completely on the network infrastructure of the Chrome debugger. Many networking problems may be specific to your device/simulator, and will not be caught by the debugger.

## OK, now the longer explanation
One of the big advantages of React Native is the ease of debugging your code. When running an app in development mode, one can debug it remotely, using the well familiar Chrome DevTools. Logging to the console and setting breakpoints in the code work just as if the app were running in a normal browser's window.

It is, therefore, strange to many RN starters, why one of the core functionalities of the Chrome Inspector, namely the network call interception, is not available. Instead, if a network error occurs, all the JavaScript code gets access to, is an Error object that simply says "Network Error".

To fully explain why this is so is out of the scope of this post. There is a great Medium article that explains in detail how the "magic" behind the RN remote debugging works. I totally recommend you read, regardless of your experience with React and RN.

Long story short, when debugging RN remotely, the JavaScript code actually gets executed in the browser, and not on the device. This allows you to interrupt the flow with breakpoints, or log the console output in the Chrome DevTools window. While the JS code gets executed in the browser, the native calls happen on the device itself. The browser and the device running the app keep a WebSocket connection open and synchronize the code execution on every step.

All the native calls run on the device itself, and executing a network call makes no difference. As such, it is not an easy task to make network traces appear in the Inspector window. At least, not without overriding the default platform APIs (for each of the supported platforms) and communicate every state change with the browser. I am sure that the core dev team is working on a solution, and will deliver it in a future release.

Until then, you can test network calls by replacing the default implementation of `XMLHttpRequest` and use the one provided by the browser. As you saw in the beginning, it turns out that this is surprisingly simple. Once you do it, override the browser's default CORS rules, and reload the app, you should start seeing network requests in the Chrome Inspector. As I already pointed out, though, the Chrome Inspector can be helpful inasmuch as the requests and responses are concerned. It won't help you prevent issues with the native network infrastructure of your emulator/device. To inspect those, you will rather have to use a proxy, such as [Charles](https://www.charlesproxy.com/), or jump into tracing the native log files.



