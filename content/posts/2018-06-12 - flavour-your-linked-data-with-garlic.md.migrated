---
title: "Flavour your linked data with garlic"
author: Carlos Martinez-Ortiz
published: true
source: medium
tags:
  - uncategorized
---

## Explore linked data collections via Web-API’s — zero coding required!

[Linked data](https://en.wikipedia.org/wiki/Linked_data) is growing in importance — and rightly so: it facilitates machine readability of data, making it easier for machines to explore connections in meaning (semantic) which are obvious to humans but not to machines.

SPARQL! In the world of linked data, [SPARQL queries](https://www.w3.org/TR/rdf-sparql-query/) are used extensively as the query language to extract data from a [triple store](https://ontotext.com/knowledgehub/fundamentals/what-is-rdf-triplestore/) (a special type of database for storing linked data): they are our main tool to interact with linked data.

![](/assets/1_AAfUPXTqK7n7GFxLRUm8IA-22c7fd43.jpeg)

A SPARQL query

But writing SPARQL queries is not the most trivial of tasks. Most researchers who *want* to work with linked data do not *know* how to write SPARQL queries — and maybe they shouldn’t need to know! Let the SPARQL expert write a few queries which can search through the data and the domain expert can use these queries as required.

Enter [***grlc***](https://github.com/CLARIAH/grlc) — grlc (pronounced ‘garlic’) is a tool which *“automatically builds Web APIs using SPARQL queries stored in git repositories”*. What this means in practice is that you can store your [SPARQL queries on GitHub](https://github.com/albertmeronyo/lodapi/) and then you can run your queries on your favourite programming language (Python, Javascript, etc.) using a Web API (including [swagger](https://swagger.io/) documentation) just as easily as loading data from a web page.

![](/assets/1_a3nAq2OlHti-wvFN3TGLVw-cbf7c688.jpeg)

Grlc — from GitHub to data

### Who is using grlc?

*grlc* was initially developed as one of the tools used in [CLARIAH](https://www.clariah.nl/), the Dutch research infrastructure for the arts and humanities. It was then adopted to be part of the CLARIAH [MediaSuite](https://www.clariah.nl/werkpakketten/focusgebieden/media-studies).

Within the [Netherlands eScience Center](https://www.esciencecenter.nl/), we are promoting the use of *grlc* in our projects which have a linked data component. So far, it has been used within the [*CandyGene*](https://www.esciencecenter.nl/project/prediction-of-candidate-genes-for-traits-using-interoperable-genome-annotat) and [*DataQuality*](https://www.esciencecenter.nl/project/data-quality-in-a-distributed-learning-environment) projects. In both cases, the Web API is used to load data on a [Jupyter](http://jupyter.org/) notebook to visualize the results of the queries. This enables researchers to interact with data in triple stores without having to type a single line of SPARQL.

![](/assets/1_ZgE1l17dt7laWb5bca6K-g-bba2c7c4.jpeg)

Loading data via grlc into Jupyter notebooks — these plots were created from data loaded via a grlc Web API.

### Extra features

But where is the data stored? Do I need to load all my data at once, or can I paginate my query? Do my results get cached? Can I customize the output of my query? What if I want… — all valid questions, but the answers are beyond the scope of this blog post. If you want to know more details of what *grlc* can and cannot do, please [head to the usage section](https://github.com/CLARIAH/grlc#usage).

### Conclusion

If you are working with linked data, you should use *grlc*!
