---
layout: post
title: "Experiences of a computational evangelist"
date: 2019-12-16
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/experiences-of-a-computational-evangelist-4cae135fa829
tags:
  - Biology
  - Git
  - Python
  - Testing
---

Pro tip: make sure that they have installed and set up all they need. The real magic happens when the students go home and try by themselves.

### Start with their basics, not with yours

The precise meaning of the term “basic” is given by your students, not by you.

For instance, if they are interested in unit testing, make sure they know a bit of factoring beforehand. If not, start with factoring even if this reduces the time available for unit testing.

It is highly unlikely that someone who walks into a best practices seminar for the first time comes out of it, two hours later, as the new Donald Knuth. Most importantly, this is not the purpose of such a seminar. Switching from Windows to Ubuntu, learning the basics of Python, getting introduced to Vim, pyTest, Git and (if there’s time) to Continuous Integration may be a bit too ambitious for a two-hour introduction (I didn’t try to go so far myself, but this list is inspired by true events). It doesn’t matter how cool those tools are, keep calm and start with the basics. Keep advanced topics for advanced stages. One step at a time.

### Take advantage of what they already know

If your students are familiar with a language you hate (say, MATLAB) it may be tempting to ask them to switch to your favorite one. It will be much easier to stick to their language of choice to teach some generally applicable principles, such as version control or unit testing. Switching from one language to another is extremely stressful for beginners.

### Avoid the command console

Before crucifying me, let me explain myself. Yes, I love the command console, and I am allergic to (most) graphical user interfaces. One of the aspects I love about the console is that it forces me to keep in mind a clear structure of what I am doing. But when it comes to teaching, I don’t want to keep things in my mind. I want to share them as explicitly as possible. Graphical user interfaces are great for this.

Last but not least, in a world dominated by graphical interfaces, the command console is very scary for most beginners. Yes, I know they should not* be scared (whatever that means), but the fact is that they are. Especially in the early stages, I suggest to avoid it as much as possible.

### Make education acronym-free again

If like me, you are Spanish, the acronyms *PSOE*, *IVA* or *IRPF* will be crystal clear for you. But most likely you, dear reader, are not from Spain. What did you feel while reading those acronyms? Probably something between slight annoyance and absolute nothingness. Well, beginners feel the same when they read *CI*, *GUI* or *CMD* for the first time. And not only beginners: each time I see an acronym in the title of a talk I take it as a cue to skip it and go get a coffee.

Using acronyms (and other jargon) with beginners is the quickest way to sound cryptic. Also, the easiest one to avoid.

### But I already have a system!

“Why do I need Git? I have Dropbox!”, “I store my code in email drafts”, “The code compiles, why do I need tests?”…

These kinds of questions will arise. Answer them once, and don’t insist much more, especially if they keep thinking their solution is good enough. For most people, it takes some time to abandon an old routine… but they are listening.

The previous list doesn’t try to be exhaustive. This is just an open reflection on my own experience. Feel free to comment on your own. After all, all of us were beginners once.

### References

* [Publish your computer code: it is good enough](https://www.nature.com/articles/467753a)
* [Good enough practices in scientific computing](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1005510)
* [Best practices for scientific computing](https://journals.plos.org/plosbiology/article?id=10.1371%2Fjournal.pbio.1001745)
