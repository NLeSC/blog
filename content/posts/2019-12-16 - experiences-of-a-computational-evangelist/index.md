---
layout: post
title: "Experiences of a computational evangelist"
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

What I’ve learned spreading the gospel of computational best practices among scientists

![](./0_U-HMVgB8PS9IQXF0-845426ce.webp)

Photo by NESA by Makers on Unsplash

Just a few days ago, I gave a talk at the [FAIR (Findable, Accessible, Interoperable and Reusable) software parallel session](https://blog.esciencecenter.nl/fair-software-at-the-2019-escience-symposium-6117f310aa34) of the [National eScience Symposium 2019](https://www.esciencesymposium2019.nl/). During the questions session, several topics were raised: the impossibility of true reproducibility, the challenges of the interaction between *FAIRness* and privacy, the problem of long-term software sustainability, the potential problems of including libraries with restrictive licenses, and so on.

Just a few weeks ago, I was still enrolled as a mathematical modeler in an aquatic ecology department. Although my former colleagues are interested in improving the quality and FAIRness of their research code, I never heard any of the previously mentioned concerns. I don’t mean that those concerns aren’t important, it is just that I felt an enormous gap between researchers’ concerns and *state-of-the-art* ones. To begin with, most researchers I’ve collaborated with didn’t know of the mere existence of public repositories, coding guidelines, version control systems or unit tests. Like me, they were just never told.

In my opinion, this is the elephant in the room: the narrowest bottleneck of FAIR scientific software is the fact that those who are aware of its importance are still a minority. And those who are aware and have the time and motivation to take effective actions are a minority inside the minority.

As a result, thousands of researchers are not only not producing FAIR software, but also managing their projects using the most inefficient and frustrating system: blood and sweat. As a side effect, millions of lines of code are rotting in researchers’ hard disks, the reproducibility crisis is a trending topic and job dissatisfaction is becoming endemic among young researchers (okay, maybe this last one has other causes too).

Everything starts with the way most scientists are introduced to programming: a course on scripting if they are lucky, or plain “baptism by fire” if they are not. The only guideline seems to be: if it works, it is good programming. Isn’t it?

Those of us who have been lucky enough to learn “good programming” know that the answer is no. Even more, we know how extremely useful good programming skills can be for researchers… and we try to do our best to spread the word and teach others. When I started teaching these topics to whoever wanted to pay attention to me, I made some mistakes. I would certainly include the following advice if I could send a letter to my past self. Unfortunately, I cannot, but I can send a letter to you, dear reader. Hopefully, you’ll find it interesting.

### Motivation: you already need best practices

Or put differently: this is not a computer geeks’ thing.

Let’s use a bit of empathy here. Imagine you’ve studied biology, probably dreaming of traveling to exotic locations, swimming with sharks in the Caribbean and taking water samples from Antarctica… and one day you see yourself behind a desk, analyzing thousands of rows of taxonomic data. Sure, you understand the importance of this kind of work, but most likely this is not your favorite hour of the day. Why would you invest even more time in learning computational skills?

Well, answer me this:

- Do you keep a bunch of copies of your manuscripts at different stages?
- Did your code work yesterday, but not today after what seemed to be a minor edition?
- Are you unable to understand the code you wrote yourself just a few months ago?
- Are you interested in sharing your code with coauthors, or even with readers?

And maybe more importantly:

- Are you interested in making your computational work more enjoyable?

Did you answer yes to any of them? You are not alone! Those problems have been the daily routine of thousands of people all around the world for decades. And you know what? Some of them developed really handy tools, known under the umbrella term of “best practices” to tackle them.

### Goal: plant a seed

Making your students discover that there are tools that can help them is a minimum. Convincing them that anyone can use those tools and showing where to start is already a big success.

Pro tip: make sure that they have installed and set up all they need. The real magic happens when the students go home and try by themselves.

### Start with their basics, not with yours

The precise meaning of the term “basic” is given by your students, not by you.

For instance, if they are interested in unit testing, make sure they know a bit of factoring beforehand. If not, start with factoring even if this reduces the time available for unit testing.

It is highly unlikely that someone who walks into a best practices seminar for the first time comes out of it, two hours later, as the new Donald Knuth. Most importantly, this is not the purpose of such a seminar. Switching from Windows to Ubuntu, learning the basics of Python, getting introduced to Vim, pyTest, Git and (if there’s time) to Continuous Integration may be a bit too ambitious for a two-hour introduction (I didn’t try to go so far myself, but this list is inspired by true events). It doesn’t matter how cool those tools are, keep calm and start with the basics. Keep advanced topics for advanced stages. One step at a time.

### Take advantage of what they already know

If your students are familiar with a language you hate (say, MATLAB) it may be tempting to ask them to switch to your favorite one. It will be much easier to stick to their language of choice to teach some generally applicable principles, such as version control or unit testing. Switching from one language to another is extremely stressful for beginners.

### Avoid the command console

Before crucifying me, let me explain myself. Yes, I love the command console, and I am allergic to (most) graphical user interfaces. One of the aspects I love about the console is that it forces me to keep in mind a clear structure of what I am doing. But when it comes to teaching, I don’t want to keep things in my mind. I want to share them as explicitly as possible. Graphical user interfaces are great for this.

Last but not least, in a world dominated by graphical interfaces, the command console is very scary for most beginners. Yes, I know they *should not* be scared (whatever that means), but the fact is that they are. Especially in the early stages, I suggest to avoid it as much as possible.

### Make education acronym-free again

If like me, you are Spanish, the acronyms *PSOE*, *IVA* or *IRPF* will be crystal clear for you. But most likely you, dear reader, are not from Spain. What did you feel while reading those acronyms? Probably something between slight annoyance and absolute nothingness. Well, beginners feel the same when they read *CI*, *GUI* or *CMD* for the first time. And not only beginners: each time I see an acronym in the title of a talk I take it as a cue to skip it and go get a coffee.

Using acronyms (and other jargon) with beginners is the quickest way to sound cryptic. Also, the easiest one to avoid.

### But I already have a system!

“Why do I need Git? I have Dropbox!”, “I store my code in email drafts”, “The code compiles, why do I need tests?”…

These kinds of questions will arise. Answer them once, and don’t insist much more, especially if they keep thinking their solution is good enough. For most people, it takes some time to abandon an old routine… but they are listening.

The previous list doesn’t try to be exhaustive. This is just an open reflection on my own experience. Feel free to comment on your own. After all, all of us were beginners once.
