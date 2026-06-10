---
layout: post
title: "#KonMari for Science? Tidying up Provenance…"
date: 2021-06-14
author: Adriënne Mendrik
published: true
source: medium
source_url: https://blog.esciencecenter.nl/konmari-for-science-tidying-up-provenance-aabed5da593
tags:
  - uncategorized

---

Subscribe*Remember me for faster sign in

In terms of tidying up provenance, the realm of computational workflows deserves a lot of credit as well, where concerted efforts in standardization produced the now ubiquitous [W3C PROV model](https://www.w3.org/TR/prov-overview/) and its family of ontologies. A key development in this field is the strict separation of the recorded workflow execution (retrospective provenance*) from the workflow specification (*prospective provenance*). The prospective provenance is the high level description of the scientific procedure, whereas the retrospective provenance is the ‘exhaust’ collection of all fine-grained execution details we mentioned earlier. The creation of prospective provenance can be viewed as an attempt to distill the scientifically crucial and useful “story” out, leaving the remaining residue (retrospective provenance) that is more specific and cluttered.

![#KonMari for Science? Tidying up Provenance…](/assets/konmari-for-science-tidying-up-provenanc-6ec5e621.png)
Prospective versus retrospective provenance? (Photos by [Bernard Hermant](https://unsplash.com/@bernardhermant) and [Sammy Williams](https://unsplash.com/@sammywilliams) on [Unsplash](https://unsplash.com/))But where do you store all this provenance once you have it? It could of course just lie around on your hard drive or local cluster but if you want to participate in open science then it would be good to publish it. In the semantic web/linked data space there are a number of ways available, such as packaging it up in a [Research Object Crate](https://www.researchobject.org/ro-crate/) and publishing it e.g. to the [workflowhub registry](https://workflowhub.eu/), or by publishing the RDF description of your workflow as one or more [nanopublications](/nano-publish-your-research-with-python-b81aa54eb1a2).

These are great efforts, but what if you are one of those people that would rather play outside then tidy up your room? Funding agencies can of course play the role of the parent, demanding that research objects and provenance is being saved for possible re-use, adding another checkbox to the long list of boxes that researchers already need to check. The question is, does this really work? Or do we end up with something that seems neat on the outside, but is more like children stuffing their toys anywhere in boxes in their rooms, just to make it look tidy? While underneath the surface, the boxes are a colorful mixture of all sorts of toys in which it is hard to find that specific toy that they must have later on…

![#KonMari for Science? Tidying up Provenance…](/assets/konmari-for-science-tidying-up-provenanc-d381473b.jpeg)
(Photo by Nareeta Martin on Unsplash)In her book “Spark Joy”, [Marie Kondo](https://konmari.com/) mentions that most people tidy up by moving stuff from one room to another, occasionally throwing some things away. This does not seem to lead anywhere, since there is no system behind it. Her method is much more thorough and requires people to make choices. There is no gray area, you either keep something and cherish it or throw it away. The trick is to focus on the things you would like to keep, the rest can go. The way you decide on what to keep is to learn what sparks joy inside you. You go through everything you collected in your house, based on categories, ordered in a way that was designed to slowly teach you what sparks joy inside you.

What is key here, is that for people following this method, tidying up changes from a painful process of saying goodbye, to an inner journey discovering who they are, what they like and what fits them. This does not only provide an inner drive to tidy up their house, but changes their mindset with respect to [future decisions on what to buy](https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/2754612). Knowing who they are and having overview in their home, they think twice before buying something new, because they cherish what they have in their home. In a way, it provides a sense of direction and relieves them from the fear of missing out.

Is there a lesson to learn here for science? Well, maybe there is.

First of all, in the past couple of decennia, the focus in science has been more on quantity then on quality, pushed by funding agencies counting the number of publications as a metric for good science. As a result, a lot of publications were written and scientific literature to date is like a home so full of stuff that even scientists themselves have trouble keeping the overview and determining the current state-of-the-art in human knowledge. Is the solution then changing the metrics? Or adding more metrics? Or will this mostly lead to a different form of [consumerism](https://www.investopedia.com/terms/c/consumerism.asp)?

![#KonMari for Science? Tidying up Provenance…](/assets/konmari-for-science-tidying-up-provenanc-d9c12be0.jpeg)
Goodhart’s Law Explained ([Source](http://www.sketchplanations.com/post/167369765942/goodharts-law-when-a-measure-becomes-a-target))Maybe a more thorough approach is required, making clear choices on what to keep and get rid of the rest. But who needs to make this decision and based on what?

What the #KonMari method does, is teach people how to make choices that are in line with their “inner joy”, so people themselves are able to make the choices that fit best. In translating the work of Kondo, another phrase was considered as the central question. Instead of “does it spark joy?”, the phrase “does it speak to your heart?” was considered as a translation for *tokimeku*, which can be understood as “how does it move the *kokoro* (heart / mind)?” ([Tokimeku: The Poetics of Marie Kondo’s KonMari Method](https://spectrajournal.org/articles/10.21061/spectra.v7i2.146/)).

![#KonMari for Science? Tidying up Provenance…](/assets/konmari-for-science-tidying-up-provenanc-e4c7fa49.jpeg)
(Photo by Aziz Acharki on Unsplash)Well, this is not something we can use in science, because science is all about reasoning and has nothing to do with the heart or mind… Yes, that is one way to look at it, but if you have read the book “[Hare brain, Tortoise Mind](https://www.goodreads.com/book/show/599317.Hare_Brain_Tortoise_Mind)”, you might want to reconsider this. The quick thinking hare brain is what we would use for reasoning, whereas the tortoise mind could be described as intuition, the inner drive, sudden inspiration, or a spark of creativity. Both are important, but if you think about it, most of the big leaps in science came from people with an inner drive, following their intuition, not seldom against the main stream in academia.

So, to recap, what can we learn from all of this with respect to provenance? Maybe, that we should be careful that saving or publishing data and provenance does not become another box to check for already overloaded researchers. Maybe, the less is more approach of Marie Kondo could spark a little joy in the lives of researchers, and free up some time to learn how to use their tortoise mind. Provenance should be saved if there is value in saving it, and if we save it, we should cherish it for human knowledge, communicate it clearly and make sure people can use it. Either for reproducibility purposes or communicating findings or insights, such as in visual story telling. What is required is a mindset change from [consumerism](https://www.investopedia.com/terms/c/consumerism.asp) to value (that which moves the *kokoro) *for science, and methods and tools that aid this.

![#KonMari for Science? Tidying up Provenance…](/assets/konmari-for-science-tidying-up-provenanc-3a26ef92.jpeg)
(Photo by Fahrul Azmi on Unsplash)*With thanks to Jiri Kosinka, Carlos Martinez-Ortiz, and Lourens Veen.*
