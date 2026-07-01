---
layout: post
title: "a license to science"
date: 2017-05-23
author: Lourens Veen
published: true
source: medium
tags:
  - Citation
  - Collaboration
  - Databases
  - Health
  - RSE
---

The Beastie Boys were [Licensed to Ill](https://en.wikipedia.org/wiki/Licensed_to_Ill), James Bond had a [licence to kill](https://en.wikipedia.org/wiki/Licence_to_Kill). I want a license to science.

Science, it is said, is standing on the shoulders of giants. We scientists design experiments, collect data, determine facts, and then we publish our findings in the scientific literature, so that others can read about them and build upon them.

As our technologies for doing science become more advanced, we do more experiments, and our experiments yield more data. We use computers and specialised software to help deal with the data deluge, and we use the internet to share our data and also our software. In some fields this has been happening for a long time, in others it’s a more recent development, but increasingly all science is becoming what we call [eScience](https://en.wikipedia.org/wiki/E-Science).

It is important to realize that sharing software and data brings with it a new element of scientific practice: the law.

![](/assets/1_xp0qkMsh77QMu93QaIOGoQ-2dd1ef0f.jpeg)

XKCD #14. Creator Randall Munroe licensed this comic under the CC-BY-NC 2.5 license, thus giving me explicit permission to use it in this blog post.

## Legal Trouble

Traditional science is legally pretty easy. Simple facts are not protected by any laws. So, if you read something in a paper, you are free to use it as the basis of an argument in your own paper, and if someone calculates and publishes the value of pi, then you are free to use that to calculate the circumference of a circle.

eScience, with its exchange of software and data, is a bit more complicated. Software is covered by copyright law, and data sets may be as well. Also, in some countries, data sets are covered by database rights. These rights magically appear the moment the software or data set is created, and by default they make it illegal for anyone who isn’t the owner to change the software, incorporate it into another program, or to use the data set as part of another one. The shoulders of eScience giants have fences around them.

> The shoulders of eScience giants have fences around them.

At the Netherlands eScience Center, we sometimes run into these fences. Someone publishes some software or a data set on the internet, intending to share it, but does not put a license on it. Without a license, the default legal protections apply. At best we can perhaps download the software and run it to see if we get the same result, or download the data and look at it. But we cannot modify the software, or combine it with other software to make something new and innovative, and we cannot combine the data with other data to make a new data set to publish.

Instead, we’ll have to use another program (with perhaps less of a scientific pedigree), write something ourselves, or just not do the science we want to do. So, we do more work, and you, the author, miss an opportunity for collaboration and/or a citation. Obviously, that’s not an optimal solution. If you license your work, rather than just putting it up on the web without a license, then people can actually build on it. A license is like a gate in the fence.

## Licensing your work

Of course, this may raise some questions. Do I need a lawyer? What’s in it for me? Where do I start?

### About that lawyer

While licensing copyrights and database rights is a legal activity, you don’t need a lawyer. We make many decisions with potential legal implications every day, and most of us don’t need a lawyer to not, say, violate any traffic laws, break into someone’s house, or commit a murder. (James Bond excepted, but then again, he’s got a license…) For both software and data, there are several standard licenses available that have been written by lawyers, that are widely accepted, and that can be used by anyone.

### Why licensing is good for you

Why would you add a license? First, these licenses contain a disclaimer, making it clear to anyone using your software or data that if it breaks, they get to keep both pieces, and that it’s up to them to glue them back together. A big bold text saying that the author doesn’t guarantee anything and disclaims all liability is very useful if someone decides to use your software for a self-driving car or a medical device.

Second, attribution. If someone shares a copy of your program or data, or uses it as part of another program or data set, then they’re required to include your license and your note saying that you wrote it.

Note that there is no requirement to cite any of your papers in the standard licenses. This would be difficult to do for technical reasons, and in the end your published papers don’t have such a legal requirement either. For software or data, it’s a good idea to put a request in the documentation to cite the paper you wrote about it, with a reference of course. You should do so! But be aware that this does not carry any legal weight.

Third, impact. Scientific impact is all about how many people build on your work, and if you don’t give them permission to do so, then that number will be low indeed.

Of course, there may be situations in which you do not want people to use your software or data at all, or only if they ask you nicely first and promise to not share with anyone. In that case, Open Source and Open Access is not what you want. However, rather than putting your software or data online without a license, you should then just keep it to yourself entirely.

### Picking a license

So where to start? First, you can only license copyrights and database rights you actually own. If you created your work as part of your job, then your employer (e.g. university) probably owns those rights. In that case, you should talk to your boss or your technology transfer office or similar department to find out whether you need permission to license your work on behalf of them. If you incorporated work created by others into your program or data set, then you’ll need to take into account the licenses of those works as well. The details of that are too much for this blog post; you’ll want to look into [license compatibility](https://www.google.com/#q=license+compatibility).

For software, the fine people at [GitHub](https://github.com/) have made a [license selection tool](https://choosealicense.com/). At the Netherlands eScience Center, we use the Apache License 2.0 by default. This license gives everyone as much freedom as possible to use and combine our software, while still requiring attribution. As we are a publicly funded organization, we want to allow people to build non- [free software](https://en.wikipedia.org/wiki/Free_software) using our code as well, so we try to avoid [copyleft](https://en.wikipedia.org/wiki/Copyleft) licenses such as the GNU General Public License (GPL) when we reuse software. However, if there is no good alternative, we’ll go with the GPL rather than rewriting something from scratch.

If you are licensing a data set, a [Creative Commons (CC)](https://creativecommons.org/) license is a good choice. There are several different CC licenses, with different terms, and the Creative Commons website has a [handy tool to help you choose](https://creativecommons.org/choose/). Make sure to use version 4.0 of your chosen license, as lower versions do not take into account database rights. At the eScience Center, we use the CC Attribution 4.0 license (CC-BY-4.0) by default. Like the Apache License, this license gives everyone as much freedom as possible to use the data sets we make, and combine them with others, but ensures that we’ll get attributed when they do. We also sometimes use other licenses, for instance if we’ve included someone else’s data and their license requires us to do so.

Which license to choose is up to you in the end, or up to your employer if they own the rights to your program or data set, and have a policy on this. But when you publish a program or a data set, please make sure it has a proper license! Thanks!
