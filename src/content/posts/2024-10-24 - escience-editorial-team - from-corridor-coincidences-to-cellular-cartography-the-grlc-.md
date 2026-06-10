---
layout: post
title: "From Corridor Coincidences to Cellular Cartography: The grlc Story"
date: 2024-10-24
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/from-corridor-coincidences-to-cellular-cartography-the-grlc-story-25988a65541d
tags:
  - API
  - Collaboration
  - Community
  - Databases
  - Digital Humanities
  - Git
---

1

This is the story of [grlc](https://grlc.io/), a tool that transforms complex linked data queries into user-friendly web interfaces. We interviewed grlc’s developers [Albert Meroño-Peñuela](https://github.com/albertmeronyo) and [Carlos Martinez-Ortiz](https://www.esciencecenter.nl/team/dr-carlos-martinez-ortiz/), to explore grlc’s origins, development, and real-world impact. We’ll also hear from [Bruce Herr](https://github.com/bherr2), a user from the [HuBMAP](https://hubmapconsortium.org/) software project who’s putting grlc to work in groundbreaking research. The story is a testament to the power of open-source collaboration and the unexpected journeys of software tools.

![From Corridor Coincidences to Cellular Cartography: The grlc Story](/assets/from-corridor-coincidences-to-cellular-c-cec5731c.jpg)
Photo by [Steve Richey](https://unsplash.com/@steverichey?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## Part 1: In Conversation with grlc Developers

### Q: Let’s start at the beginning. What exactly is grlc, and what problem does it solve for its users?

Albert: grlc is a server that automates the publication of knowledge graph APIs. It takes SPARQL queries as input and generates a functional Open API specification without requiring any coding.

Imagine you have a collection of linked data about music bands that you want to share with music enthusiasts who don’t know SPARQL. With grlc, you can write a SPARQL query to retrieve band information, put it on GitHub, and grlc will create an API that allows users to access this data using a simple URL. Users can even modify parameters in the URL to get information about different bands, effectively exploring your data without needing to understand the complexities of SPARQL.

Here is a traditional SPARQL query for a linked dataset:

![From Corridor Coincidences to Cellular Cartography: The grlc Story](/assets/from-corridor-coincidences-to-cellular-c-2002d6ee.png)
A traditional (complicated) SPARQL query without using grlcIf you are a researcher only interested in music genres, you may not have the time or energy to learn SPARQL. grlc makes it easy to do the same thing:

![From Corridor Coincidences to Cellular Cartography: The grlc Story](/assets/from-corridor-coincidences-to-cellular-c-5b2851f8.png)
The grlc generated API for the same query displayed aboveThe output of this is a URL, through which you can view and download the data you are after:

![From Corridor Coincidences to Cellular Cartography: The grlc Story](/assets/from-corridor-coincidences-to-cellular-c-cc5687e2.png)
The URL that grlc generated through which you can access the data. You can view this data in your browser, but you can also use your favourite programming language to fetch and analyse data from different genres

### Q: That’s quite useful. How did the idea for grlc come about?

Albert: The story of grlc begins in 2016. The original contributors were developers who frequently found themselves creating Open API specifications for SPARQL endpoints. Like many programmers, they were looking for ways to automate this repetitive task.

While some tools existed at the time, they all had limitations — either requiring SPARQL queries to be buried in a database or failing to comply with the emerging Open API specification (then known as Swagger). Faced with these constraints, they decided to build a better solution themselves. This solution ended up becoming grlc.

### Q: How did the eScience Center play a role in the development of grlc?

Carlos: I was an eScience Center RSE at the time (now Community Manager, ed.), working on a digital humanities project, building a linked data exploration tool. The other team members on that project had diverse expertise, so they needed a way to separate concerns — front-end developers shouldn’t need to know about data storage, and data specialists shouldn’t have to worry about front-end presentation.

That’s when I discovered grlc. Albert, the original grlc developer was coincidentally working just down the hall, but we had never met. I started contributing to improve the codebase, bridging the gap between our two teams.

After that project concluded, another colleague at the eScience Center began [candYgene](https://research-software-directory.org/projects/candygene): a life sciences project using linked data. I suggested using grlc, and as they reported issues and suggested improvements, we kept enhancing the tool. It’s been a rewarding cycle of continuous improvement driven by real-world use cases.

### Q: It’s fascinating to see how tools evolve in practice. How is grlc being used now, and how do you track its adoption?

Carlos: One of the exciting aspects of open-source development is seeing your creation take on a life of its own. We often discover new use cases when users report issues or reach out for support.

A particularly interesting example is [HuBMAP](https://hubmapconsortium.org) (the Human Biomolecular Atlas Program) using grlc in their groundbreaking work. It’s rewarding to see our tool contributing to such important scientific endeavors, especially ones we never anticipated when we first started development.

## Part 2: grlc in Action — A Conversation with a HuBMAP User

### Q: Can you tell us a bit about what HuBMAP is and what you’re working on?

Bruce: [HuBMAP](https://hubmapconsortium.org), or the Human Biomolecular Atlas Program, is an NIH-funded consortium with an ambitious goal: building a comprehensive map of the human body at the cellular level.

I’m part of the [Indiana University](https://cns.iu.edu) Mapping Component, where we’re creating the [Human Reference Atlas](https://humanatlas.io/) (HRA). It’s a fascinating project that combines ontologies, expert-curated data (including 2D and 3D anatomical imagery), and experimental data from various providers. The end result is an interconnected map of the human body that’s opening new frontiers in biomedical research.

### Q: That sounds like complex and important work. How does grlc fit into this picture?

Bruce: grlc has become an important tool for us. The HRA is built as a [set of RDF graphs](https://lod.humanatlas.io/), which allows us to represent complex relationships in our data. However, we often get requests for specific data from researchers who may not be familiar with SPARQL or RDF.

This is where grlc comes in handy. We can write a SPARQL query to extract the requested data, and grlc transforms that into a user-friendly interface and API. It’s accessible to both programmers and non-programmers, which is crucial given the diverse backgrounds of our collaborators and data users.

### Q: So grlc is bridging the gap between your complex data structure and the end-users who need that data. What specific capabilities has grlc unlocked for your team?

Bruce: The key advantage is that grlc allows us to maintain our data in a rich, expressive format (RDF) while still providing straightforward reports and interfaces for our end users. It’s lowered the barrier for getting derived data products out to folks who need them.

Before grlc, there was often a tension between having a powerful, flexible data structure and providing easy access to that data. grlc helps resolve that tension. We can focus on creating comprehensive RDF graphs and writing powerful SPARQL queries and be confident that we can easily share the results with collaborators who might not have the same technical background.

### Q: How did you first discover grlc?

Bruce: It was actually through a collaboration. Around 2022, we were working with EBI (European Bioinformatics Institute), one of our partners. We noticed they were using this tool called grlc for their Ubergraph project. At the time, we had our own SPARQL server and were looking for better ways to share queries and data. After seeing how effectively EBI was using grlc, we decided to [give it a try](https://github.com/hubmapconsortium/ccf-grlc/). Now we’re using it for sharing queries and data in our CCF (Common Coordinate Framework) project.

### Q: Looking ahead, do you see the [sustainability](https://xkcd.com/2347/) of tools like grlc as a potential consideration for large-scale projects like HuBMAP?

Bruce : It’s definitely something we think about. The continued development and maintenance of grlc is valuable to HuBMAP and the HRA project. While we could theoretically pivot to another technology if needed, grlc has become an important part of our workflow.

It’s a good example of how open-source tools can become key components of scientific projects. We appreciate the work the grlc team has done and continues to do. Their efforts are helping to advance not just our project, but potentially many others in the scientific community.

Interview by Lieke de Boer*
