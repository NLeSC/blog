---
layout: post
title: "Could AI be (in) FAIR?"
date: 2025-07-10
author: Carsten Schnober
published: true
source: medium
source_url: https://blog.esciencecenter.nl/could-ai-be-in-fair-94bbc19602f2
tags:
  - Community
  - FAIR
  - Git
  - Machine Learning
  - NLP
  - Open Science
---

*Open Science is driven by FAIR principles. Made for data, adapted for software, how can they survive the current wave of "Artificial Intelligence"? Resistance from those selling it as a solution for all problems is to be expected.*

Scientific progress is actively hindered if research data is stored on inaccessible servers or private hard disks, in proprietary formats, or preprocessed in unknown ways. The authors of the [original FAIR](https://www.nature.com/articles/sdata201618) [paper](https://www.nature.com/articles/sdata201618) have therefore demanded to leave non-collaborative practices behind: instead, make data F**indable, **A**ccessible, **I**nteroperable and **R**eusable (FAIR)!

![Could AI be (in) FAIR?](/assets/could-ai-be-in-fair-4309ea06.jpg)
Photo by [Shantanu Kumar](https://unsplash.com/@theshantanukr?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)The underlying ideas have been pillars of scientific methodology [for thousands of years](/fair-principles-5000-years-of-common-sense-ba85086ba79c), but the rise of computerized methods in practically all research fields has created the need to make the FAIR principles explicit. The increase of computational processing power and algorithms to make efficient use of it have interwoven disciplines including Natural Language Processing, Information Retrieval, Information Science, and Computer Science. Artificial Intelligence is one of the products and has now impacted not only academic research, but also medicine, [education](https://doi.org/10.48550/arXiv.2412.06651), libraries and archives, and even [spirituality](https://www.rollingstone.com/culture/culture-features/ai-spiritual-delusions-destroying-human-relationships-1235330175/).

## Fair vs. AI

Not reinventing the wheel for each study is the essence of scientific progress; hence, reusability is the primary goal of the FAIR principles. Promises about advances to be expected by current AI generations are bold. Supposedly, they achieve "[PhD-level intelligence](https://arxiv.org/abs/2311.12022)" already, even though a closer look reveals that this merely refers to the ability to fill in exam questions accurately. Anyway, the FAIR principles seem to be falling off the wagon, as ChatGPT and its colleagues are happy to confirm (see Figures 1–3).

![Could AI be (in) FAIR?](/assets/could-ai-be-in-fair-9836fa99.png)
Figure 1: According to ChatGPT, the letters “A” and “I” do not appear in FAIR.The paper "[FAIR for AI: An interdisciplinary and international community building perspective](https://www.nature.com/articles/s41597-023-02298-6)" proposed the following definitions for FAIR AI models:

* An AI model is **Findable** when a digital object identifier (DOI) can direct a human or machine to a digital resource […];
* it is **Accessible** when it and its metadata may be readily downloaded […];
* it is **Interoperable** when it can seamlessly interact with other models, data, software, and hardware architectures;
* and it is **Reusable** when it can be used by humans, machines and other models to reproduce its expected inference capabilities […].

These definitions are a promising step forward, but apply to models as static artifacts. However, they do not address the methodology that uses AI.

![Could AI be (in) FAIR?](/assets/could-ai-be-in-fair-4394aa7c.png)
Figure 2: Gemini cannot see the "AI" in "FAIR", either.

## FAIR Software

Software did not fit into the original FAIR principles that assumed static data sets, hence specific FAIR principles for research software were [introduced](https://www.nature.com/articles/s41597-022-01710-x), along with a [checklist](https://fairsoftwarechecklist.net/):

* **F**indable: the software should have a globally unique identifier and be registered in e.g. the [Research Software Directory](https://research-software-directory.org/), […].
* **A**ccessible: users can access the software, including its source code […].
* **I**nteroperable: the software should read and write open data formats, […].
* **R**eusable: all information to compile the software is provided, […].

Together with DANS, we have also provided [recommendations](https://fair-software.eu/) on how to practically implement these criteria using available services.

## AI in Science

AI impacts scientific methods in different ways than software did, though. A [report by the Royal Society](https://royalsociety.org/news-resources/projects/science-in-the-age-of-ai/) lists six use cases for AI in research:

* Extract and learn features from raw data and extensive datasets
* Gain insights from unstructured, multi-modal and fragmented data
* Generate predictions and synthetic data from existing content
* Information synthesis in academic writing, literature reviews and summarization
* Generate software code
* Automate labour-intensive tasks to test diverse hypotheses

In these examples, machine learning and language models are not the subject of research but instead serve as means to various ends.

![Could AI be (in) FAIR?](/assets/could-ai-be-in-fair-fc40bcad.png)
Figure 3: the Llama model is certain that there is no AI in FAIR.Computational linguists have shown that (Large) Language Models serve as [parrots](https://doi.org/10.1145/3442188.3445922) that remix the data they have been trained on in unpredictable ways, which entails risks including ecological harm, economic monopolization and encoded biases. When putting those aside for a moment, 'parroting' might not sound too bad from a reproducibility point of view. However, nobody knows what a generative language model is parroting exactly. Not even the developers, let alone the users, can trace back the [impact of specific data samples on the weights of a model](https://suchir.net/fair_use.html).

The [Royal Society report](https://doi.org/10.1145/3442188.3445922) lists additional concerns, for instance, researchers with misconceptions about statistics, overreliance on machine learning outputs, and a lack of skills and incentives for academic researchers. Lack of transparency is often built into proprietary products, but LLMs are a particularly hard-to-open black box, as they involve complex stochastic processes. Misleading marketing claims and bold promises from the companies behind the chatbots increase transparency even more, rather than mitigating them.

## New FAIR Principles

FAIR principles for AI must make sure that all information about AI-based research is provided so that other researchers can understand, verify and reproduce the results of a colleague. The enormous resources required to develop a new language model make reusability particularly relevant. Reinventing a wheel of that size again and again is too costly for any society.

The fuzziness of the decades[-old term Artificial Intelligence](https://doi.org/10.3233/HSM-1985-5207), as well as its misuse [for utopian and dystopian myths](https://bookshop.org/p/books/empire-of-ai-dreams-and-nightmares-in-sam-altman-s-openai-karen-hao/22156498) and [cons,](https://thecon.ai/) has created a semantic fog around AI that is counterproductive for spreading technical understanding, sometimes causing [catastrophic consequences for the users](https://www.theatlantic.com/culture/archive/2025/06/artificial-intelligence-illiteracy/683021/). Recent studies have shown how the most recent trend within the AI community, "reasoning models", creates an [illusion of thinking](https://substack.com/inbox/post/166103484). At the same time, the go-to methods for evaluating Chatbots have turned out to be misleading, as shown in the [Leaderboard Illusion](http://arxiv.org/abs/2504.20879).

![Could AI be (in) FAIR?](/assets/could-ai-be-in-fair-b427a737.jpg)
Figure 4: LLMs tend to fail on reasoning tasks if they do not exactly match the training data.Those who sell the promise of redemption through AGI (Artificial General Intelligence*) are not interested in transparency or Open Science. Bringing FAIRness into the field, on the other hand, facilitates scientific progress. FAIR principles for AI must allow researchers to understand AI and enable them to make informed decisions about how to incorporate it into their research.

The first step is to move away from referring to LLM-based, generative AI in a mystifying manner. Instead, researchers must discuss tangible tasks and techniques that can be evaluated objectively. Only this will allow us to define FAIR principles for AI: how can we make sure, LLM outputs can be f**ound by anyone, are **a**ccessible through open protocols, **i**nteroperable with other research data, and — perhaps most importantly — become **r**eproducible?
