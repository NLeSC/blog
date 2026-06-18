---
layout: post
title: "Scripting vs. Programming"
author: Lourens Veen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/scripting-vs-programming-8d7d276f3ba3
tags:
  - C++
  - Containers
  - Environment
  - Git
  - Python
  - RSE
---

][Lourens Veen]·Apr 26, 2023

Subscribe*Remember me for faster sign in

Any remaining differences are usually due to particular features supported by certain languages. In R for example, you can write down a statistical model equation, for which it has a special syntax using the `~` symbol. There’s no equivalent of that in Python or C or Pascal, because those languages weren’t designed for statistics.

### Structure

Scripts typically have a simple structure. They consist of a single file, all variables are global, and there may be a function or two but mostly it’s a straightforward list of instructions. This works fine for small scripts, but it becomes impossible to manage for a thousand- or million-line library. To keep those organised, you need functions, classes, packages/modules and namespaces.

Languages like Java and C++ are designed for this, and do well on this criterion. Python is actually pretty good as well, it does have all of these and there are some large programs written in it. These features are anyway quite common in modern languages, even ones intended for scripting-type work.

Of course, adding features makes the language more complex (i.e., it makes the manual bigger). Even if you don’t use them, others will, and so you’ll have to learn how they work if you want to be able to use other people’s packages for example. So there is a cost to this additional functionality as well as a benefit, which is what Jisk was getting at with his comment on languages being too “computer science oriented” for what he wants to do.

### Error handling

Finally, error handling. Your basic script handles errors in a basic way: it prints an error message (comprehensible or not) and then halts. Normally, this isn’t done by the script itself but by the programming environment it runs in, with the script simply ignoring the possibility of anything going wrong. This actually works quite well in a notebook environment, where you execute one statement at a time (so it’s usually clear where the problem is) and where there’s a human to read the error message and handle the problem.

For a web service, or a complex library, or a desktop application, crashing whenever something goes wrong is not acceptable. Errors need to be handled, and only if there’s nothing the program can do to fix it does the error get forwarded to a human, after which we continue with handling the next request. At the language level, this is implemented either through returning an error code from a function, or by using exceptions. Older languages like C and Fortran don’t support exceptions, so all errors have to be signalled and handled explicitly. This means that if you do it right, basically every function call is [followed by an “if” block that checks for errors and handles them](https://github.com/SecConNet/net-admin-helper/blob/8bd39c6ca5fb4c7787bba72b060485e7cc57e3aa/src/container_wireguard.c#L205).

This gets very very wordy, so newer languages like Java and Python support exceptions. Exceptions automate keeping track of errors, and by default escalate any errors in a function you called to the function that called you, and so on. In other words, if something goes wrong, you tell the boss, who tells her boss, etc. until the problem reaches someone who can decide what to do. If the error reaches the top without having been solved then the program crashes and the user will have to figure it out, but ideally something handled the problem before we got to that point. Crucially, if the programmer ignores the possibility of errors, then they will end up with the user. That’s not so good, but it’s better than the error being quietly ignored, as would be the case with ignoring returned error codes.

One disadvantage of exceptions is that to be completely robust, you need to carefully keep track of which exceptions can be raised by functions you call, and make sure you handle them all. In Python, this is pretty much impossible because they’re not documented very well. Java provides syntax for this, and forces you to declare all exceptions a function can raise, which is much better for reliability but is also sure to make Jisk unhappy in his quest for a simple language.

It’s interesting to see that after all the exceptions in C++ and Java, in yet newer languages like Rust and Go there’s a bit more emphasis on returning errors again. There’s the idea there that most errors are just “normal” possible outcomes of calling a function that should be handled immediately, and that an exception-like “panic” system is to be used only in truly exceptional circumstances. Meanwhile in Python it’s the other way around, and exceptions are sometimes even used for things that are expected to happen during normal control flow (e.g. StopIteration).

There’s more to say and explain about error handling, and we’ll come back to it in a future TEC. For now, the point is that languages that allow you to completely ignore the possibility of an error occurring are more suitable for scripting, while languages that require you to take possible errors into account lead to more reliable programs.

### Conclusions

So, which language is best for which purpose? Python is obviously good for scripting, and Julia is an interesting alternative that I think may be a better fit for Jisk than Go, seeing as he is interested in calculating things. R seems to work well as a command-line interface for doing statistics but I don’t like it as a programming language (although the Tidyverse is a good development).

On the programs and libraries side, I’ve built a few slightly bigger systems (in the tens-of-files, thousands-of-lines range) in Python, and it works pretty well, plus you can still put something together very quickly. The downside is that the dynamic typing, lack of encapsulation and lack of exception specifications make it more difficult to make things robust, and performance is also nothing to write home about. Potentially better if slower to work in alternatives would be Java, (modern) C++, and new kid on the block Rust. For now, C++ is my go-to language if I need more performance, even though it’s very complex and by no means perfect.

What works best for you depends on what you want to do, how much time you have available to learn, a bit on taste, and on external factors like availability of software and of support from the people around you. Many concepts carry over from one language to another though, so don’t worry too much about choosing the wrong one: once you know one programming language, learning others gets a lot easier.

Well, that concludes the first instalment of The Engineering Corner*. Hope you liked it! Do you write scripts or programs or both? What’s your favourite programming language? Did you like this topic? Was this too basic or too advanced or maybe just right? What would you like to read about next? I’d love to hear about all these things in the comments below. In the mean time:

Choo choo! Happy Engineering!

Lourens

← &lt;previous TEC not found&gt; — TEC 1: [Better scripts with typing](https://medium.com/escience-center/dynamic-types-static-types-oh-my-py-25c9743b72c4) →

[[0]](#2e2f) *Control flow* refers to the order in which commands are executed, and to branches (if..then) and loops (for.., while..) causing them to be executed not at all, or more than once. In other words, the path through the code taken by the computer’s “cursor” as the code runs.
