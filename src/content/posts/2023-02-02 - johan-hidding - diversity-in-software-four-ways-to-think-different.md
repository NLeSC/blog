---
layout: post
title: "Diversity in Software: four ways to think different"
date: 2023-02-02
author: Johan Hidding
published: true
source: medium
source_url: https://blog.esciencecenter.nl/diversity-in-software-four-ways-to-think-different-ee4eaf72af79
tags:
  - uncategorized

---

![Diversity in Software: four ways to think different](/assets/diversity-in-software-four-ways-to-think-4a16eeee.jpg)
Photo by [Steve Johnson](https://unsplash.com/@steve_j?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

# Diversity in Software: four ways to think different

Diversity is a hot topic. Let’s talk about diversity in Software. Hackers need to wake up and face the truth: a lot of programming paradigms are underrepresented in the mainstream media. All the talk is about Python, Rust, Kotlin, and Julia. All of them are imperative languages. This just leaves no room for us wayward farers to express ourselves and be ourselves!

People who know me now think the rest of this piece is going to cover the other side of the isle: functional programming, but they’re wrong. Just two approaches to programming are not enough. The funny thing is, you will have heard of most of the languages that I will talk about. I’ll just teach you to treat them with a little more respect.

### Make

Make is a dependency-based programming language. You state a set of requirements, then other requirements for those, and so on. Then Make figures out a way to meet this cascade of requirements until your original goal is reached. This is a radical departure from imperative-style programming, where you have to be more explicit in what order you would like things to happen.

### Awk

Awk is a data streaming language. Given that you have some input file, Awk triggers actions on some regular expressions that you provide. This is ideal for processing text files. Because Regexes play a central role in the execution model of Awk, programs tend to suffer in readability. What you need to realize is how awesome the concept of Awk is. The rule-based control flow makes your program context-aware.

### SQL

In a landscape where the increasingly popular databases are graph-based or NoSQL, we need to champion our old hero: SQL. There’s nothing quite like juggling tables and inner joining them in holy matrimony. There’s a good reason why most databases work with tables and relations: for most cases, it is very efficient. The little extra effort of designing a table layout and indexing your data at strategic points is always well spent, as you gain insight into your problem.

### Excel

Say what!?! Excel is at its core a functional reactive programming language. Your data is a signal. Every time the signal changes all the depending cells are notified and updated live. Frameworks that generalize on this concept are known as functional reactive. I know Excel has its share of problems: cells that are not included in the computation, bad type heuristics, poor scaling… However, at its core Excel is a beautiful diamond that needs to be celebrated.

Ok, those were some very famous languages. What you need to understand is how they are different. Their diversity can teach you not to take the mainstream general-purpose programming sludge for granted.

In fact, the particular way that these languages or systems are different may teach you how to think about some problems on a higher level. The primitives of SQL are available in Python (and many other languages): for small things, you can use iterator comprehensions or the `itertools` library.

If your problem has a complex set of interlocking dependent tasks (like you’d have in Make), consider writing the dependencies down in a data structure and evaluate them using Asyncio or Dask. This helps separate the core logic from implementation details, giving you cleaner, i.e. more readable and better maintainable code.

The same goes for Awky problems: if you need to filter through a lot of text, write down some rules for a little state machine. Your life will improve!

As for Excel: (functional) reactive programming is a topic I can’t possibly do justice to here. For those interested: [Introduction to RxPy](https://blog.oakbits.com/introduction-to-rxpy.html), or more generally [Introduction to Functional Reactive Programming](https://www.manning.com/books/functional-reactive-programming).

What these languages have in common, is that they have a different control flow* from what you’re used to. Knowing how to work with these tools can be an invaluable addition to your skill set. Did I miss out on any? Please comment below!

If you’re interested in programming language history, check out this video.
