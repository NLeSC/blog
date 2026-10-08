---
layout: post
title: "Research Software Engineers and generative AI"
author: ole
published: true
cover: ./walle.webp
tags:
  - RSE
  - Research software
---

<figure>
<img alt="A toy WALL-E robot sitting in front of a computer keyboard." src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wiwV4MeuEdJQBgoPzaoHnA.png" width=650 />
<figcaption>Image by Arthur Caranta under CC BY-SA 2.0, cropped.</figcaption>
</figure>

There are always disruptions in society; new technologies emerge, outdated ones die or are turned into a niche instead. There are still people out there that manufacture horse-wagons. But that’s not the dominant industry it used to be.

## The Job of a Research Software Engineer (RSE)

What is our job, at its core? It is not hand-crafting artisanal code. Code by itself is useless. Even worse, code itself is a liability¹. The value that we produce is the functionality that this code provides. Our job is to help scientists solve really hard problems with it. So cool! Let’s put aside for a moment that a large part of what we do is discussing and planning and mediating: people stuff. Instead, let’s focus on the tech part.

To be able to do our job technology-wise, we need to keep up to date with emerging technologies, and reasonably up to date with past ones. A new framework emerges to speed up computations? Better learn it. A language gets traction in the community? We learn it, too.

More important than being able to use one tool really well, is to be able to learn new stuff quickly, be it science or software. That’s a core quality that makes us good research software engineers.

Generative AI is just another technology that emerges. We need to learn to work with it instead of against it. Is it more disruptive than a new framework? Yes. Scary? Yes. An opportunity? Also yes.

People are worried, and that’s fair. But we need to be worried about the right thing.

## What to Worry About

I’m not worried about our jobs. There’s by far not enough RSEs per researcher in this country or any other. What we need to worry about — and what we can influence, going forward — is how we use this new thing. And this boils down to “centaurs”, “reverse centaurs” and a “moral crumple zone”. Let me explain.

A “centaur” is half horse, half person. More specifically, it’s person at the front, horse at the back. That’s kind of the most relevant parts of a human, with twice as many legs. Fast as fuck. A “reverse centaur” would be a horse’s head on a human body. Slow. Somewhat less intelligent. Eating hay and neighing.

Don’t worry, it will make sense in a minute. In my defense, [Cory Doctorow came up with this stuff](https://locusmag.com/feature/commentary-cory-doctorow-reverse-centaurs/) (or rather popularized it).

When I use an LLM to review my code, it can scan through a large code base in minutes. It can point out comments that are inconsistent with their code blocks, find obscure performance bottlenecks and advise me on a better code structure. And it can do so much faster than a human ever could. I’m in control, but all of a sudden I have twice as many legs. And I’m flying.

If my job is to create three dashboards and two papers in a day, then — with the help of generative AI — I can do that. However, now my job is different. Now I’m shepherding a zoo of LLMs that do so much stuff I will never have the time to review or fact-check. I can pump out content faster than ever. But it will lead inevitably to slop like [fabricated quotes in usually reputable news outlets](https://arstechnica.com/staff/2026/02/editors-note-retraction-of-article-containing-fabricated-quotations/) or [fake reading lists in newspapers](https://www.npr.org/2025/05/20/nx-s1-5405022/fake-summer-reading-list-ai). Instead of improving the quality of my work, I’m producing nonsense that will cost a lot of time to fix. And now I’m craving hay.

In the first approach, generative AI helps the human. In the second, the human helps the AI. Even worse, the human becomes an accountability sink, or — according to [Madeleine Clare Elish](https://estsjournal.org/index.php/ests/article/view/260/177) — they turn into a “moral crumple zone”.

## Why We Need Expertise

The last weeks I have played with AI coding assistants to tackle different types of coding challenges. And let me assure you, without expert knowledge (I’m totally not modest here), I’d be neighing all day. While the technology will surely continue to get better, our expertise is now more needed than ever.

Yes, basically anybody can produce code at lightning speed now. But this comes with a few rather gigantic caveats. Let’s have a look at some user archetypes.

I’d like to preface this section with the fact that I don’t mean the levels of knowledge to be seen in a derogative way. We all started from zero at some point. Not everybody has the time or affinity to become experts in everything, nor should they.

**Amateurs**

Let’s define an amateur as someone who does not have the skill to (fully) understand the code that they generate. Generative AIs are notoriously confident in anything they produce. Not being able to judge whether they spit out nonsense or not will, sooner or later, paint you into a corner with an enormous pile of tech debt.

However, there are cases where this is fine. Imagine a one-shot job that you can easily fact-check afterwards, like sorting a list or changing the conversational tone of a block of text. I see no issues with not understanding the code or algorithm here.

The rather large challenge with this approach is to know when to stop. When does a project become too large to be handled efficiently by a generative AI? Not being aware of this boundary leads to the self-owns mentioned above. Reverse-centaur danger.

**Intermediate**

Here we slowly begin to tame the horse. An intermediate would be able to understand the code that the machine spits out. Now the importance is to know when that would be necessary (hint: almost always) and then take the time and actually do that.

Flying too close to the sun means that your main job now is to be responsible for the code that is produced. And giving in to that temptation means that this *will* backfire at some point.

The skill here slowly shifts from being able to write the code yourself to constructively work with the coding assistant to produce what you need, and then check the output in excruciating detail. And if that takes more time than writing the code yourself then maybe generative AI is not the correct tool here.

**Experts**

These people might naturally be suspicious of anything AI generated, and that’s good. Of course they could write close to anything themselves. But can they do it faster than a machine? They cannot. The expert’s skills shift to knowing how to ask for what they need (a.k.a. efficient prompt engineering, depending on the model used) and knowing what parts of the code can be best generated. Unit test? Most likely. Docstrings? Maybe. Architecture? Probably not. Using AI to automate the boring stuff will most likely make the expert’s work easier and faster.

I’m not worried that experts would be fooled by AI’s hallucinations; they would smell bullshit from a mile away. The challenge would probably be to get experts to use generative AI in the first place.

## Where Does That Leave Us?

So what now? What shall we do with this generative AI thing? It’s a tool, so we use it. Our job is to find out how to use it efficiently and responsibly. Researchers won’t have the time for that, they barely have enough time for coding. So that’s where we step in.

Are our current ways of working threatened? Yes! As they always have been. Whenever a new language or tool comes along that makes coding easier, certain people decry the end of proper software-engineering². For better (more peaceful conversations) or worse (less entertainment), language has mellowed out a bit since the days of BASIC, but the cycle is still very much alive:

- New thing comes along, simplifies old thing.
- More people use simple, new thing and make mistakes.
- New thing matures into something that is useful in its niche.

For generative AI we are still learning about the types of mistakes one can make (looking at you, [OpenClaw](https://www.wired.com/story/malevolent-ai-agent-openclaw-clawdbot/)), but eventually, once we know the ins and outs, it will mature into something that is broadly useful.

Instead of a new framework, or a new language, we have to learn a new technology. We need to know its strengths and weaknesses, and its boundaries. When should we use it? And more importantly, when should we not? Should we use it for code generation, or only use it to check our code? How can we prompt-engineer most effectively? How can we check the output for mistakes? What’s the consensus on licensing generated code? Are we actually allowed to publish AI generated code? Is it even defensible to use AI, given the resources that it consumes? Those are the questions we research software engineers need to be able to answer.

Remember the “people stuff” that I brushed away at the beginning? That becomes even more important now. This is — plus domain knowledge, of course — what makes a *Research* Software Engineer. Navigating a playing field which boundary conditions are evolving daily; keeping code quality high despite AI being in the loop *somewhere³*; explaining and discussing ethical challenges… This is now a core part of our job.

Buckle up my friend, it will be a wild, fun ride.

1. Code rots and needs to be maintained.
2. Make a coffee and head to [https://www.cs.virginia.edu/~evans/cs655/readings/ewd498.html](https://www.cs.virginia.edu/~evans/cs655/readings/ewd498.html)
3. Whether you like it or not, (generative) AI is not going anywhere. People *will* use it. The best we can do is give the right guidance.
