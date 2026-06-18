---
layout: post
title: "Still coding texts by hand for social science text analysis? Use Doccano instead to speed up the process!"
author: Sven van der Burg
published: true
source: medium
source_url: https://blog.esciencecenter.nl/still-coding-texts-by-hand-for-social-science-text-analysis-7e1cdbf691be
tags:
  - Community
  - Environment
  - Open Source
  - Privacy
  - Python
  - RSE
---

][Sven van der Burg]·Dec 21, 2021

**SubscribeRemember me for faster sign in

* Coder-centered: **It is designed to make the coder’s life as easy as possible. You view one text at a time at the center of your screen. All you have to do is this: select a piece of text with your pointer, and click or hit a shortkey to add a label (for example: `concept 1’). When the complete text is coded, just click next. It’s as simple as that.
* **No more errors in data entry: **As a data analyst, you don’t need to worry about how exactly a coder enters the data as you would, for example, when data is coded in an Excel sheet. Doccano enforces that any data entry results in nicely formatted data. You can download the data without any data entry errors.
* **Open-source: **The programming code for Doccano is open for everyone to see and edit (under sensible restrictions, of course). This makes it free to use and easy to setup yourself in any scenario. In addition, if you want to add a new feature, you can always add it yourself or request it in the community. Yay for open-source software!
* **Collaborative coding: **Doccano allows different coders to code the same text, which is very useful if you want to get reliable labels.

## How does Doccano compare to NVivo or MAXQDA?

[NVivo](https://www.qsrinternational.com/nvivo-qualitative-data-analysis-software/home) and [Maxqda](https://www.maxqda.com/) also allow you to select sections of documents, but they are only useful for thematic analysis using extensive coding trees. Both are paid packages, whereas Doccano is completely free and easier to work with. Doccano is easily combined with other analysis frameworks like SPSS, Excel, R, or Python, whereas NVivo and MAXQDA want you to do your complete analysis within their program.

## How does Doccano compare to Amcat?

[AmCAT](http://wiki.amcat.nl/3.4:AmCAT_Navigator_3) also allows token-level and sentence-level coding (see [their documentation](http://wiki.amcat.nl/3.3:Annotator)). But it’s certainly not as coder-centered as Doccano. In addition, it is much more complex compared to Doccano’s simple interface.

## Next steps

We hope that we’ve convinced you that using Doccano can be a simple improvement in text analysis pipelines. So, what’s next?

* Try out the [Doccano demo](http://doccano.herokuapp.com/demo/named-entity-recognition) to get a feel for how it works.
* Because of it’s open source nature, you have to run Doccano in a cloud environment yourself. Fortunately, you can do this without any technical knowledge. Just follow the first part of [this excellent guide](https://lingudocs.mcasado.org/posts/20210103_Tagging-a-linguistic-corpus-for-free/) to setup Doccano on Heroku (ignore the prerequisites, you don’t need them). You will have your own free Doccano environment within 15 minutes.
* Follow the further instructions in [that guide](https://lingudocs.mcasado.org/posts/20210103_Tagging-a-linguistic-corpus-for-free/) to add a dataset and tags within Doccano to kickstart your first coding project! NB: Double check whether you are allowed to upload your data to Heroku, maybe there are privacy or security concerns. If there are concerns you could discuss installing Doccano on your institution’s own infrastructure.
* You can download your coded data as .jsonl file. This file can be opened with notepad or transferred to .csv [online](https://www.convertcsv.com/json-to-csv.htm). The coded sections in the Doccano output can easily be transformed back from ‘token position’ into text via the text function ‘mid’ in Excel if you are not familiar with programming.
