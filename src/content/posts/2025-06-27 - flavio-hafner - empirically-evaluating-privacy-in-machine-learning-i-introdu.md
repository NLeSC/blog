---
layout: post
title: "Empirically evaluating privacy in machine learning I: Introduction"
date: 2025-06-27
author: Flavio Hafner
published: true
source: medium
source_url: https://blog.esciencecenter.nl/empirically-evaluating-privacy-in-machine-learning-i-introduction-de5fe808d186
tags:
  - Differential Privacy
  - Health
  - Machine Learning
  - Privacy
  - Statistics
  - Testing
---

Research in the social and health sciences often relies on accessing data sourced from statistical agencies or healthcare organizations. Such data sets contain sensitive information, which requires restrictions on who can access the data. This can slow down not only scientific progress — if data were completely open, more researchers could investigate them — , but also the translation of progress to applications — for instance, machine learning models trained on medical data cannot easily be shared and re-used for personalized treatments.

![Empirically evaluating privacy in machine learning I: Introduction](/assets/empirically-evaluating-privacy-in-machin-4e61e1c6.jpg)
Photo by [National Cancer Institute](https://unsplash.com/@nci?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Differential privacy is one technology that aims to solve this problem. Intuitively, it is a method that adds calibrated noise to the data, and so prevents a malevolent actor from learning sensitive attributes about any person in the underlying data. But because statistical noise makes statistical inference harder, there is an inherent trade-off between statistical utility and privacy — making differential privacy challenging to deploy in practice ([Cummings &amp; Sarathy, 2023](https://arxiv.org/abs/2406.12103)).

In addition, using differential privacy in machine learning has its own challenges. First, often it’s impossible to have reasonable privacy and utility at the same time. Second, differential privacy for machine learning makes strong assumptions about the capabilities of the malevolent actor. Third, implementing it in software is not straightforward, and there is evidence of bugs ([Cummings et al, 2023](https://arxiv.org/abs/2304.06929); [Nasr et al, 2023](https://arxiv.org/abs/2302.07956); [Ponomareva et al, 2023](https://arxiv.org/abs/2303.00654)).

For this reason, empirically evaluating the privacy of machine learning models has become an important field of research. Privacy testing probes whether a trained machine learning model leaks sensitive information. It can be an important indicator for model developers and owners of sensitive data whether the privacy-preserving training mechanism can be trusted.

### The plan for this series of blog posts

Despite this, most resources in this topic are in research articles. The goal of this series of blog posts is to make the topic more accessible. We will build knowledge from the ground up:

* The first blog posts introduces differential privacy, and gives some economic intuition. It is aimed at readers unfamiliar with differential privacy.
* The [second](/empirically-evaluating-privacy-in-machine-learning-ii-hypothesis-testing-647806e2985c) post explains how differential privacy can be interpreted from a perspective of statistical hypothesis testing. It is aimed at readers familiar with differential privacy and some concepts from statistics and machine learning.
* The [third](https://medium.com/escience-center/empirically-evaluating-privacy-in-machine-learning-iii-functional-gaussian-differential-privacy-ccef13153e12) post discusses how the hypothesis testing perspective has been used to reformulate differential privacy with functional differential privacy and Gaussian differential privacy. It is aimed at readers interested in understanding privacy testing of machine learning.
* The fourth blog post discusses some recent papers that audit machine learning models and make use of Gaussian differential privacy. It is aimed at an audience similar to the third post.

![Empirically evaluating privacy in machine learning I: Introduction](/assets/empirically-evaluating-privacy-in-machin-6ef4dfa5.jpg)
Photo by [Tobias Tullius](https://unsplash.com/@tobiastu?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)

## A short introduction with an example

This section builds on [Dwork &amp; Roth (2013)](https://www.cis.upenn.edu/~aaroth/Papers/privacybook.pdf).

### Randomized response

Imagine a researcher wants to know the fraction of people that engage in a behavior that is illegal or socially not accepted — for instance, if they have income that they do not declare to the tax agency. The researcher runs a survey and asks people whether they have such income. Denote this behavior by the variable *X*, and let’s say it can take values 0 or 1, where 1 indicates the person earns undeclared income, and 0 indicates the person does not.

How can the researcher ensure that people are willing to share this sensitive information with them? To solve this problem, social scientists have developed a method called *randomized response*, which gives survey participants the following instructions:

* Flip a coin privately
* If it comes up heads, answer truthfully
* If it comes up tails, flip again. If the second flip is heads, answer with “1”, if the second flip is tails, answer with “0”.

This approach strikes a balance between privacy and statistical utility. First, privacy comes from plausible deniability — anyone can always plausibly claim not to engage in behavior *X, *independently of the answer they have given. Second, statistical accuracy comes from understanding how the noise was generated: because we know the response mechanism, we can infer the mean of *X* in the population.

In addition, in a more general setting, one could replace the first coin flip with a draw from a continuous random variable that takes values between 0 and 1, and instruct people to respond truthfully if the random variable is above some threshold `p`. Varying `p` amounts to varying the amount of noise we introduce to the response. On one hand, if `p=0` , we have perfect accuracy but no privacy. If `p=1` , we have perfect privacy but no accuracy.

### Formal definition of differential privacy

Define `db` as a tabular database where each row corresponds to the data of one person. We call `db0` and `db1` neighboring databases when they differ by one record: they hold the exact same information, except for one person called Anne. For instance, it can be that Anne is not present in database `db0` but in `db1`, or that some column in Anne’s row is altered in `db1` but not `db0` .

Now, consider an algorithm `M` that takes `db` as input and creates some output. The algorithm is randomized because its outcome is not deterministic, but drawn from some distribution: The distribution of outcomes of the algorithm when fed with `db` is denoted `M(db)`.

Such an algorithm is called `(epsilon,0)` -differentially private** if the distribution of `M(db0)` and the distribution `M(db1)` are not too different from each other — formally, if the log odds of observing any outcome from `M(db0)` vs `M(db1)` are not larger than `epsilon`. The `0` in the `(epsilon,0)` expression is a second parameter called `delta`, which denotes the probability that this guarantee fails. It is typically a very small number that decreases in the size of the database `db`.

### Differential Privacy of randomized response

This is an abstract definition, but we now show that randomized response satisfies differential privacy. To do so, we assume that the database `db` only consists of one person — one row — , and one variable — the answer to the survey. We will relax this assumption later.

Let `y_i = M(x_i)=1` denoting that person `i `with attribute `x_i` answers 1 to the survey. Note that we only observe `y_i` and `x_i` is kept private. The randomized mechanism `M` is the protocol that instructs people to flip coins and respond accordingly; `M` generates a Bernoulli distribution of outcomes over neighboring databases with the following probabilities.

We can construct neighboring databases by varying person `i`‘s sensitive attribute `x_i`: One input database has `x_i=1`, and the other has `x_i=0` . Running randomized response, what are the probabilities of `y_i=1` given values for `x` ? If `x_i=1`, the person answers “1” with probability 0.75; if `x_i=0` , the person answers “1” with probability 0.25. In other words, for person`i` , the odds ratio for randomized response returning `y_i=1` when having `x_i=1` as opposed to having `x_i=0` is `P[y_i=1|x_i=1]/P[y_i=1|x_i=0]=(3/4)/(1/4)=3` . We can do a similar analysis for the outcome `y_i=0` . Therefore, randomized response satisfies `(ln(3),0)` differential privacy.

### Economic intuition

What does differential privacy promise? Let’s continue with the example of undeclared income. Suppose the researcher publishes the finding that 50% of people have some undeclared income. In response, the tax agency improves their enforcement, finds the people that do not declare income, and fines them.

![Empirically evaluating privacy in machine learning I: Introduction](/assets/empirically-evaluating-privacy-in-machin-c531cffb.jpg)
Photo by [The New York Public Library](https://unsplash.com/@nypl?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Pick one person, Bob, who is a tax dodger and who participated in the original survey of the researcher. Because of better enforcement, he gets caught by the tax office and needs to pay a fine. Does differential privacy guarantee that Bob is not being penalized for his behavior?

No. Recall that differential privacy guarantees a similar distribution of outcomes under two neighboring databases. Releasing the survey result does impact Bob’s utility, but it does so independently of whether Bob is in the data or not: Even if Bob did not participate in the original survey, the tax office would have learned that many people do not declare their income, and started stronger enforcement, possibly leading to Bob being caught and fined.

In other words, Bob’s expected utility is similar in the two scenarios considered, and no differential harm* is caused to Bob from releasing the survey results. This highlights a crucial aspect of differential privacy: **what matters is the difference in outcomes from being in the database and from not being in the database**. Differential privacy makes no guarantees about the *level* of utility of records in the database. And in consequence, “Statistical Inference is Not a Privacy Violation” ([Bun et. al., 2021](https://differentialprivacy.org/inference-is-not-a-privacy-violation/)).

## The limits of this example

Above, we made the simplifying assumption that a database consists only of one row and one column. In real life, databases have multiple rows and columns. That’s why it is common to define neighboring databases by taking two databases that vary exactly by one row, but are otherwise identical.

But working with this definition, applying randomized response to the sensitive attribute `x_i` is not enough anymore to guarantee the privacy of each person in the survey. For instance, if for each person, the researcher published the randomized response `y_i` along with some of their true identifying information — for instance their address and age — , it would be possible for the tax office to prosecute people with `y_i=1`, since they are more likely to have `x_i=1`.

Instead, the researcher needs to collect the real answers of all participants, decide which statistic to use for publishing the results, and apply a respective algorithm that satisfies differential privacy. But this then also requires that the survey participants trust the researcher that they will not use the sensitive data against them.

### Differential privacy’s model of computation

These questions bring us to two important assumptions behind the theory of differential privacy. The first assumption is that there is a **trusted curator** of the data — in our case the researcher that holds the individual survey responses are trusted to not leak the individual responses to the tax office.

The second assumption is that only results to **queries** are released — in our case, a relevant statistic of the survey such as “the fraction of people that have undeclared income”.

Another important aspect of differential privacy is that multiple queries of the same data weaken privacy, even if each query itself satisfies differential privacy. For instance, suppose the researcher allowed the tax office to get multiple differentially private queries of the original data. Then, the tax office could gradually refine their queries and potentially identify a certain person that does not pay their taxes.

This problem is known as **composition**, and differential privacy provides mathematical tools to study how exactly privacy degrades with composition. We will touch on it again in the context of differentially private machine learning.

## Conclusion

We used an example from social science research to illustrate how differential privacy can strike a trade-off between utility and privacy. The example helped illustrate the assumptions that are important for privacy guarantees. In the [next](/empirically-evaluating-privacy-in-machine-learning-ii-hypothesis-testing-647806e2985c) blog post, we will look at the hypothesis testing interpretation of differential privacy.

> 

Thanks to Kody Moodley, Erik Tjong Kim Sang and Lourens Veen for commenting on and discussing an earlier draft.
