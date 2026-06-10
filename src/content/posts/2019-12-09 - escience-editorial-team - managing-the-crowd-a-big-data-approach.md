---
layout: post
title: "Managing the crowd: a big data approach"
date: 2019-12-09
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/managing-the-crowd-a-big-data-approach-cf2f053b2235
tags:
  - uncategorized

---

# **Managing the crowd: a big data approach**

About 1.5 years.

What were some of the challenges you faced in the project?**

Our initial plans were to use data from crowd simulators to train machine learning algorithms to recognize dangerous situations. The trained neural network would then be able to recognize such situations live, when applied on the visitors’ locations as estimated from phone data. However, after analyzing the “localization” data, we quickly realized that our goals are unattainable due to the localization ambiguity observed from the data.

Digging deeper into this problem, I found out that it was in theory unsolvable. So we needed another plan. I subsequently proposed we use a probabilistic model instead, so as to be able to estimate the crowd density based on the data at hand. This approach, inspired by statistical mechanics, takes advantage of the large amount of data and bypasses the ambiguity problem. We also applied the same “big data” approach to other issues related to imperfections of the data source. However, this was not the end of the challenges. Another problem was to find ways to analyze experimentally our methodology, because a theoretical validation by itself cannot yield practical error estimates. Thus, most of my efforts and time, as well as that of the PhD student Philip Rutten, were spent on this last part.

**Were the project aims achieved?**

The solutions to the aforementioned problems were documented in the article “[Detecting high indoor crowd density with Wi‑Fi localization: a statistical mechanics approach](https://link.springer.com/epdf/10.1186/s40537-019-0194-3?author_access_token=LQ3AsWc2lq7dXDR1BnVo7m_BpE1tBhCbnbw3BuzI2RPQC37zeIK9tWYgVfnoEwKL8vmjNY0D5TTQLTqxST1MSryuuybsO3YJtCNOHMgWC2iZV1wP3MuOYWAG_Zy1KHz2Wuf0trh_piZtkvLtacc2_A%3D%3D)”, published this year in the Journal of Big Data*. So yes, we are happy with the output.

![Managing the crowd: a big data approach](/assets/managing-the-crowd-a-big-data-approach-4782eefa.jpeg)
**What was the single most important insight you gained from this project (e.g. on crowd behavior and algorithmic prediction?**

Despite the imperfections in the data source, in this case signals from smart phones, and despite some remaining theoretical limitations for tracking individual users, the availability of so much data, technology and the big-data-analytics approach allowed us to analyze the crowd as a whole. To do this, we combined classical mathematics from the 19th and 20th century, physics from the 20th century, and big data technologies from the 21st century in one package, which was very exciting in itself!

Read more about the [project](https://esciencecenter.nl/project/detecting-anomalous-behavior-in-stadium-crowds)

Read more about [Sonja Georgievska](https://esciencecenter.nl/profile/dr.-sonja-georgievska)
