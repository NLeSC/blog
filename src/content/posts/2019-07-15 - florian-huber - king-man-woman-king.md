---
layout: post
title: "King - Man + Woman = King ?"
date: 2019-07-15
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/king-man-woman-king-9a7fd2935a85
tags:
  - uncategorized

---

## Some of the best known examples used to explain the power of prominent Natural Language Processing tools (like Word2Vec) only seem to work with some cheating.

Recently, three researchers from the University of Groningen tested many of the given examples from some of the key publications on Word2Vec. While some examples indeed worked as intended, a frustratingly high number of the given examples really only worked when using the little ‘trick’ of not allowing the query word itself (see also: [[Nissim 2019](https://arxiv.org/abs/1905.09866)]).

![King - Man + Woman = King ?](/assets/king-man-woman-king-ff608b64.jpeg)
Table taken from Nissim et al. (2019): [https://arxiv.org/abs/1905.09866](https://arxiv.org/abs/1905.09866). The authors tested a list of analogy examples from key articles using Word2Vec. They did a query of the type C is to B as A is to X. “Index” denotes the position the reported answer (“Reported”) was actually found (very often NOT “1”!). In addition the 1st and 2nd answer given by the algorithm is displayed in the two right columns.2 Unfortunately, things get worse. 
Finley et al. [2017] did a more thorough analysis of analogies other than Male-Female/King-Queen/Man-Woman. They evaluated a wide range of syntactic and semantic analogies and found that such calculations based on word embeddings (i.e. word vectors) do perform well for some types of analogies, but really poor for others. In the category ‘lexical semantics’ those algorithms seem to perform particularly badly…. with one very notable outlier: male-female analogies! So, in a way those examples typically given in lectures or tutorials rather represent an exception than the rule (see also [[Finley 2017]](https://www.aclweb.org/anthology/S17-1001)).

3When it comes to going beyond this one shiny example and comparing different methods for producing word-embeddings, people usually compare the methods accuracy across a large corpus of texts. Even here, things seem to be more complex than often told. Some interesting studies (see [Levy et al., 2016]) clearly demonstrate that we need to be really careful when comparing different algorithms. And that includes Word2Vec.

Quite often the “new” method is optimized towards a test dataset to perform well. Then it is compared to the “old” methods, which is fine. Only that those were much less optimized for the respective datasets. When done properly the outcome often is much less convincing, and in many cases reveals that there is very little difference between old methods (done right) and new methods (see also [[Levy 2016]](https://www.aclweb.org/anthology/Q15-1016), [[Levy 2014]](https://papers.nips.cc/paper/5477-neural-word-embedding-as-implicit-matrix-factorization.pdf)).

All of this tells me two things:

Be careful when comparing methods using benchmarks on one or few particular datasets. That holds true far beyond this Word2Vec example!

And stop reducing Word2Vec to the “King - Man + Woman = Queen”* example. It creates unrealistically high expectations. Well… and it’s actually not even working without cheating.

## Resources:

* A very good free online course on NLP is done by the HSE in Moscow and can be found on Coursera. This was clearly one of the better NLP courses I’ve seen, and it also puts Word2Vec very clearly into perspective.
→ [Link to HSE/Coursera NLP course](https://www.coursera.org/learn/language-processing).
→ [Link to video from that course on King-man-woman-queen example](https://www.coursera.org/lecture/language-processing/word-analogies-without-magic-king-man-woman-queen-lpSIA).
→ [Link to their GitHub repository](https://github.com/hse-aml/natural-language-processing).
* Like to play with some word embeddings? There is a lot of pre-trained, ready-to-use stuff out there. [Try for instance this semantic calculator**](http://vectors.nlpl.eu/explore/embeddings/en/calculator/). You can choose between different models trained on Google News, English Wikipedia and others. Fun to play with, and good to get a first glimpse of what it can and cannot do.
* [**Nissim, van Noord, van der Goot (2019)**: Fair is Better than Sensational:** Man is to Doctor as Woman is to Doctor](https://arxiv.org/abs/1905.09866)
* [Levy, Goldberg, Dagan (2016)**: Improving Distributional Similarity** with Lessons Learned from Word Embeddings.](https://www.aclweb.org/anthology/Q15-1016)
* [Levy and Goldberg (2014)**: Neural Word Embedding** as Implicit Matrix Factorization.](https://papers.nips.cc/paper/5477-neural-word-embedding-as-implicit-matrix-factorization.pdf)
* [Finley, Farmer, Pakhomov (2017)**: What Analogies Reveal about Word Vectors and their Compositionality.](https://www.aclweb.org/anthology/S17-1001)

As a side note: In this blog post I mainly write about Word2Vec (or very related algorithms). But given the severity of the issues listed above I also expect that the same problem could be found for many other popular word embeddings as well. It certainly seems worth testing.

*Thanks to *[*Patrick Bos,*][*Carlos Martinez-Ortiz,*][*Erik Tjong Kim Sang*]*, and *[*Tom Bakker*]* for helpful discussions and comments.*
