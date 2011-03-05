---
layout: post
title: Four misconceptions Flash developers have about javascript
---

The [creativecodingpodcast](http://creativecodingpodcast.com/?p=1) is a new series released by [Seb Lee-Delisle](http://twitter.com/#!/seb_ly) and [Iain Lobb](https://twitter.com/#!/iainlobb). I really enjoyed the first episode, but did disagree with a few points. Here’s the expanded version.

### You can't write OO code without classes

If you insist on thinking of everything as an object, then [javascript lets you do this](http://eloquentjavascript.net/chapter8.html). Prototypal and class-based inheritance clearly affect how object-orientated concepts are implemented, but doesn’t mean either is more "pure" than the other.

More importantly, OO isn't the only way to think about complex structures. Functional programming is becoming increasingly important and [javascript allows you to implement some of these concepts](http://eloquentjavascript.net/chapter6.html), which are often more suited to asynchronous environments.

### Dynamic typing is evil

As an ex/occasional Flash developer I completely understand why this idea has such a hold in the community. Adobe pushed static-typing pretty hard in its move to convert everyone from AS2 to AS3. I at least, gained the impression that static-typing was a progression rather than one possible way of doing things.

Debugging is more difficult in dynamically typed languages, but not as difficult as it is generally made out to be. Firebug and Chrome’s developer tools allow you to set break points and step through code as you can in Eclipse. Unit tests are more important and with sufficient coverage can make compile time error checking unnecessary.

There are many languages (e.g. ruby, python, scheme) that use dynamic-typing, which are being used by a lot of smart people. I think both have their strengths and weaknesses, but it's important to realise that static-typing isn't always the best option.

### Where's my IDE?

Language issues aside, the most common complaint is that there aren’t any good IDEs. The main reason for this is again due to dynamic typing because IDEs aren't able to do a lot of the things that make them useful without a static type system. 

The other reason is dynamic typing offers the advantage of being more concise - making a full blown IDE unnecessary. Simple text-editors are generally favoured - my choice is [vim](http://code.google.com/p/macvim/), [textmate](http://macromates.com/) is also good.

### Javascript is the biggest threat to Flash

Javascript has quite rightly replaced Flash for a lot of things that it should never have been used for in the first place - carousels, accordions, and even [entire fucking websites](http://thefwa.com/). 

There is still a need for rich interactive experiences on the web, such as games, which Flash undeniably handles better than javascript. But in this area Flash is in direct competition with native applications, not javascript.
