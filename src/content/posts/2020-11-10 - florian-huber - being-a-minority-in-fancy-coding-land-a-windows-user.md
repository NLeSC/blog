---
layout: post
title: "Being a minority in fancy coding land: a Windows user."
date: 2020-11-10
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/being-a-minority-in-fancy-coding-land-a-windows-user-d853d80a6ef9
tags:
  - Containers
  - Git
  - Linux
  - R
  - Workflows
---

## How I slowly went from my imposter-syndrome hiding to accepting what I am. A Windows user, at least most of the time. (Don’t worry, this is NOT one of those Linux vs. Windows posts!)

In the end it’s luckily the results that matters most. I learned that you can write as good or bad code on Windows as on Linux. You can build great software on Windows that is then used by Linux people, and the other way around. Sure, for some things you better go the Linux way. But it turns out that in my projects this is less than 1% of my working time, which makes it OK to be a bit clumsy using it. And secretly (don’t point at them, that’s mean!*), I can also enjoy those moments when another colloquium presentation doesn’t run properly because Ubuntu did not work well with the projector, or the microphone, or both.

### Do better than pointing at each other

Windows is more convenient for running some very common software (e.g. MS office), Linux is more stable… so go some cliches. But instead of fighting about what’s better (or hiding what feels inferior) it makes more sense to me to accept what’s there and simply go along with it. If somebody lives in a very geeky bubble it works fine to safely assume everyone runs their code on a certain operating systems and knows the in and outs of object oriented programming and containerization. But many of the more exciting projects involve people outside this bubble: researchers, users, future contributors, students. And they might as well — lo and behold — be using Windows (and by the way: containers are still primarily big steel boxes** to most people).

So, even though in some IT-bubbles it can occasionally feel as if we are talking about a small unfortunate minority … in reality that’s really not true. Check out [the 2020 Stack Overflow Developer Survey](https://www.freecodecamp.org/news/stack-overflow-developer-survey-2020-programming-language-framework-salary-data/) to see that **most developers actually use Windows**.

### What can you do to get more Windows users to adopt your package?

Think of Windows what you want. I don’t work for Microsoft, and honestly, I don’t really care. But I assume that many coders out there working on great new software, methods, tools, tutorials, etc. actually want that people become happy users (paid by eternal gratitude). And that is a good enough reason to think about those Windows users as well.

* Consider setting up your next continuous integration for your software package, so that it runs on all systems and will be used by more people.**For instance with [continuous integration using GitHub](https://docs.github.com/en/free-pro-team@latest/actions/guides/about-continuous-integration) actions it can be as simple as adding a `‘windows-latest’` to your matrix:
`os: [‘ubuntu-latest’, ‘macos-latest’, ‘windows-latest’]
`(small warning: adding different operating systems to such a continuous integration workflow is comparably easy, the later debugging sometimes is not. One option can be to work with [Windows virtual machine](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/)).
* What about providing installation instructions for Windows users as well? Or did you just write a new tutorial? Great! But will it work for your fellow Windows users? You would be surprised how many packages and tutorials come with instructions that clearly won’t work for a Windows user. 
Don’t know how to do that? No Problem! Just ask a Windows user to help you. Believe me, they will be very glad to assist.

### Final symmetry

Most of my arguments will hold when we just swap the named OS. So, obviously if you are (like me) primarily a Windows user: Think of all those Linux and mac-OS people out there. Either way, it will require learning a bit about the differences. But it will help to avoid a lot of frustration on all ends due to failing notebooks or hard to install packages.

### Get in touch

If you have comments or questions please get in touch! You can also find me on twitter: [me_datapoint**](https://twitter.com/me_datapoint)

Special thanks to [Lourens Veen], [Patrick Bos], [Pablo Rodríguez-Sánchez], [*Stefan Verhoeven*](https://orcid.org/0000-0002-5821-2060)*,* for helpful comments and discussions.
