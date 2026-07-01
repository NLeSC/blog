---
layout: post
title: "#KonMari for Science? Tidying up Provenance…"
author: Adriënne Mendrik
published: true
source: medium
source_url: https://blog.esciencecenter.nl/konmari-for-science-tidying-up-provenance-aabed5da593
tags:
  - Open Science
  - Python
  - RSE
  - Workflows
---

The term provenance mostly originates from the art world, where it aids in authenticating historical objects.

> “The primary purpose of tracing the provenance of an object or entity is normally to provide contextual and circumstantial evidence for its original production or discovery, by establishing, as far as practicable, its later history, especially the sequences of its formal ownership, custody and places of storage. The practice has a particular **value** in helping authenticate objects.” ([Wikipedia](https://en.wikipedia.org/wiki/Provenance))

The potential of provenance tracking as-standard has been identified by people far outside the art world, particularly by scientists. After all, tracing the source and transformations that led to a particular piece of data has clear implications for the reproduction of scientific results that sits at the heart of the scientific method. While the experimentalist’s trusty lab book has been the primary means of recording such information, the increasing use of computers in data generation and analysis has provided a natural drive towards more automated means of keeping track.

This is great, because if keeping track of the provenance can be automated, we can record everything, right? Well, maybe not everything, but a lot indeed. For example, the provenance in a Jupyter Notebook ([ProvBook](https://www.db-thueringen.de/receive/dbt_mods_00040396)), the provenance in visual exploration ([CLUE](https://onlinelibrary.wiley.com/doi/pdf/10.1111/cgf.12925?casa_token=Tmhtt4kxbLAAAAAA%3AXp0U4C7KCfCScGrGX_gE_2kuxyOSiHZrKqNrUV2XnjSGzF6uaLnx90zTEO_sznL-28CLNhBa3HB4CoG9jA)), and workflow provenance ([FAIR Computational Workflows](https://direct.mit.edu/dint/article/2/1-2/108/10003/FAIR-Computational-Workflows)). However, provenance is always stored for a purpose, even if the purpose is that it might be useful later on. Quite similar actually to collecting things at home.

Your house might be filled with stuff that you regularly use, sometimes use, think is beautiful, has emotional value, might come in handy someday, or just haven’t had the time to throw out yet. The thing is, if you collect too much stuff at home you run the risk of not knowing what you have in your home anymore or where you stored it. By the time you need the thing that might come in handy someday, you cannot seem to find it or it turns out to be so outdated that you need to buy a new one.

Something similar might happen with saving data and provenance. Saving data does not necessarily mean that it will be re-used later on. The more we save, the less overview we have of what is really important or valuable. This overview could be provided by using machine learning to dig through the data, but this is not magic either. Exhaust data can feel like a messy attic, there might be something valuable there, but machine learning requires the tedious work of [cleaning and processing the data](https://towardsdatascience.com/how-to-work-with-someone-elses-data-f33485d79ed4), before you might get something out of it.

In this blog we share some lessons learned about provenance in science and philosophize on how [Marie Kondo](https://konmari.com/), a world-renowned tidying expert, could teach us some lessons that might be valuable for science as well.

![](/assets/1_pdCYToZHSFGsbRDku6oONA-366217b0.jpeg)

Finding something valuable in here will take some time… (Photo by Cristina Gottardi on Unsplash)

Some people have the natural tendency to tidy up things, whereas others feel like children whose parents tell them to tidy up their rooms, while they actually want to go play outside.

A way to tidy up automatically tracked provenance is by providing tools that enable the presentation of provenance for easy human assessment. An example of this is [ProvBook](https://github.com/Sheeba-Samuel/ProvBook), which can automatically track the provenance in a [Jupyter Notebook](https://jupyter.org/) and enables sharing and easy viewing of the cell history in a notebook (saved in the [REPRODUCE-ME ontology](https://www.db-thueringen.de/receive/dbt_mods_00040396)).

## [ProvBook: Provenance of the Notebook](https://figshare.com/articles/media/ProvBook_Provenance_of_the_Notebook/6401096?source=post_page-----aabed5da593---------------------------------------)

### ProvBook: Provenance of the Notebook.This is the demo video for the introduction of ProvBook. ProvBook is an extension…

figshare.com

[Gratzl et al](https://onlinelibrary.wiley.com/doi/pdf/10.1111/cgf.12925?casa_token=swxhYSB8GwwAAAAA%3A8uLR0LZORrq2haxpBS3kcMY-JEGNDmGKes4wRaqkoURjD641X9WpVuj-UoMKMLJvbBYiAs0akKr9amnj). take this idea of presenting provenance tracking one step further for [visual story telling](https://blog.esciencecenter.nl/visual-storytelling-for-data-science-2f9ef8a27474).

![](/assets/1_lX4tPi4pqtcp1IgRKr-aKw-6003612e.png)

If you like, you can try it out here.

In the **exploration mode**, for example while exploring data in a visualization tool, the provenance (user actions) is automatically tracked. Then in the **authoring mode**, the provenance is presented to the person who performed the exploration, who is given the option to create a visual story from it. This story can then be used to communicate to others how you gained insight while exploring the visualization, by using the **presentation mode**.

![](/assets/1_uMeyOX5M5jKIVLppjpZgAA-d894935d.png)

From Visual Exploration to Storytelling and Back Again (S. Gratzl et al, 2016)

From the presentation mode you can switch back to the exploration mode and start a new branch of explorations from the last or any of the previous time points in the tracked provenance. Theoretically this sounds great, but in practice it is quite hard to make a tool that presents the automatically tracked provenance in an easy and efficient human readable format. So the question is whether the value outweighs the work that needs to be done either by the person viewing the exploration or by the person creating the visual story.

In terms of tidying up provenance, the realm of computational workflows deserves a lot of credit as well, where concerted efforts in standardization produced the now ubiquitous [W3C PROV model](https://www.w3.org/TR/prov-overview/) and its family of ontologies. A key development in this field is the strict separation of the recorded workflow execution (*retrospective provenance*) from the workflow specification (*prospective provenance*). The prospective provenance is the high level description of the scientific procedure, whereas the retrospective provenance is the ‘exhaust’ collection of all fine-grained execution details we mentioned earlier. The creation of prospective provenance can be viewed as an attempt to distill the scientifically crucial and useful “story” out, leaving the remaining residue (retrospective provenance) that is more specific and cluttered.

![](/assets/1_YvOryy1NoYPq361GOK7aVg-908d75fb.png)

Prospective versus retrospective provenance? (Photos by Bernard Hermant and Sammy Williams on Unsplash )

But where do you store all this provenance once you have it? It could of course just lie around on your hard drive or local cluster but if you want to participate in open science then it would be good to publish it. In the semantic web/linked data space there are a number of ways available, such as packaging it up in a [Research Object Crate](https://www.researchobject.org/ro-crate/) and publishing it e.g. to the [workflowhub registry](https://workflowhub.eu/), or by publishing the RDF description of your workflow as one or more [nanopublications](https://blog.esciencecenter.nl/nano-publish-your-research-with-python-b81aa54eb1a2).

These are great efforts, but what if you are one of those people that would rather play outside then tidy up your room? Funding agencies can of course play the role of the parent, demanding that research objects and provenance is being saved for possible re-use, adding another checkbox to the long list of boxes that researchers already need to check. The question is, does this really work? Or do we end up with something that seems neat on the outside, but is more like children stuffing their toys anywhere in boxes in their rooms, just to make it look tidy? While underneath the surface, the boxes are a colorful mixture of all sorts of toys in which it is hard to find that specific toy that they must have later on…

![](/assets/1_-RQR9OMVtltNMGBAQHS0ng-f2dd9525.jpeg)

(Photo by Nareeta Martin on Unsplash)

In her book “Spark Joy”, [Marie Kondo](https://konmari.com/) mentions that most people tidy up by moving stuff from one room to another, occasionally throwing some things away. This does not seem to lead anywhere, since there is no system behind it. Her method is much more thorough and requires people to make choices. There is no gray area, you either keep something and cherish it or throw it away. The trick is to focus on the things you would like to keep, the rest can go. The way you decide on what to keep is to learn what sparks joy inside you. You go through everything you collected in your house, based on categories, ordered in a way that was designed to slowly teach you what sparks joy inside you.

What is key here, is that for people following this method, tidying up changes from a painful process of saying goodbye, to an inner journey discovering who they are, what they like and what fits them. This does not only provide an inner drive to tidy up their house, but changes their mindset with respect to [future decisions on what to buy](https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/2754612). Knowing who they are and having overview in their home, they think twice before buying something new, because they cherish what they have in their home. In a way, it provides a sense of direction and relieves them from the fear of missing out.

Is there a lesson to learn here for science? Well, maybe there is.

First of all, in the past couple of decennia, the focus in science has been more on quantity then on quality, pushed by funding agencies counting the number of publications as a metric for good science. As a result, a lot of publications were written and scientific literature to date is like a home so full of stuff that even scientists themselves have trouble keeping the overview and determining the current state-of-the-art in human knowledge. Is the solution then changing the metrics? Or adding more metrics? Or will this mostly lead to a different form of [consumerism](https://www.investopedia.com/terms/c/consumerism.asp)?

![](/assets/1_NMKBcvriZFShx8COTneP_A-f118c2a3.jpeg)

Goodhart’s Law Explained ( Source )

Maybe a more thorough approach is required, making clear choices on what to keep and get rid of the rest. But who needs to make this decision and based on what?

What the #KonMari method does, is teach people how to make choices that are in line with their “inner joy”, so people themselves are able to make the choices that fit best. In translating the work of Kondo, another phrase was considered as the central question. Instead of “does it spark joy?”, the phrase “does it speak to your heart?” was considered as a translation for *tokimeku*, which can be understood as “how does it move the *kokoro* (heart / mind)?” ([Tokimeku: The Poetics of Marie Kondo’s KonMari Method](https://spectrajournal.org/articles/10.21061/spectra.v7i2.146/)).

![](/assets/1_TT22KUEpnXuvE_hwJ6g9TQ-7ca18d90.jpeg)

(Photo by Aziz Acharki on Unsplash)

Well, this is not something we can use in science, because science is all about reasoning and has nothing to do with the heart or mind… Yes, that is one way to look at it, but if you have read the book “ [Hare brain, Tortoise Mind](https://www.goodreads.com/book/show/599317.Hare_Brain_Tortoise_Mind) ”, you might want to reconsider this. The quick thinking hare brain is what we would use for reasoning, whereas the tortoise mind could be described as intuition, the inner drive, sudden inspiration, or a spark of creativity. Both are important, but if you think about it, most of the big leaps in science came from people with an inner drive, following their intuition, not seldom against the main stream in academia.

So, to recap, what can we learn from all of this with respect to provenance? Maybe, that we should be careful that saving or publishing data and provenance does not become another box to check for already overloaded researchers. Maybe, the less is more approach of Marie Kondo could spark a little joy in the lives of researchers, and free up some time to learn how to use their tortoise mind. Provenance should be saved if there is value in saving it, and if we save it, we should cherish it for human knowledge, communicate it clearly and make sure people can use it. Either for reproducibility purposes or communicating findings or insights, such as in visual story telling. What is required is a mindset change from [consumerism](https://www.investopedia.com/terms/c/consumerism.asp) to value (that which moves the *kokoro)* for science, and methods and tools that aid this.

![](/assets/1_iWIvBdVdJayjhRx4NlXEUw-d2394d7f.jpeg)

(Photo by Fahrul Azmi on Unsplash)

*With thanks to Jiri Kosinka, Carlos Martinez-Ortiz, and Lourens Veen.*
