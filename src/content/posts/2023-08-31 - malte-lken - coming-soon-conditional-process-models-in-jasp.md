---
layout: post
title: "Coming Soon: Conditional Process Models in JASP"
date: 2023-08-31
author: Malte Lüken
published: true
source: medium
source_url: https://blog.esciencecenter.nl/coming-soon-conditional-process-models-in-jasp-627b67b2c0aa
tags:
  - uncategorized

---

By [Malte Lüken](https://www.esciencecenter.nl/team/malte-luken/), [Thijs Vroegh](https://www.esciencecenter.nl/team/thijs-vroegh/), [Johnny van Doorn](https://www.uva.nl/en/profile/d/o/j.b.vandoorn/j.b.vandoorn.html), and [Eric-Jan Wagenmakers](https://www.uva.nl/en/profile/w/a/e.m.wagenmakers/e.m.wagenmakers.html)

*This post is also published on the JASP *[*blog*](https://jasp-stats.org/blog/)*.*

![Coming Soon: Conditional Process Models in JASP](/assets/coming-soon-conditional-process-models-i-28f59e63.jpg)
Photo by [Huma Kabakci](https://unsplash.com/@humakabakci?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)
![Coming Soon: Conditional Process Models in JASP](/assets/coming-soon-conditional-process-models-i-1571ecc2.jpg)
Many students, teachers and researchers use the popular [PROCESS](https://www.processmacro.org/) macro for SPSS (Hayes, 2022a, 2022b) to estimate conditional process models involving mediation and moderation effects. Recently, however, these models were also criticized because they make causal assumptions, which do not hold in many applied settings (Bullock et al., 2010, Rohrer et al., 2022). The popularity and criticism warrant a new module to make conditional process models easily accessible to the JASP community. Moreover, the module should provide a better understanding of the underlying causal assumptions for users and tools to explicitly test them. The JASP Team and the [Netherlands eScience Center](https://www.esciencecenter.nl/) are currently working on such an endeavor, and we give a short teaser in this blog post.

## Estimating Models as in SPSS

![Coming Soon: Conditional Process Models in JASP](/assets/coming-soon-conditional-process-models-i-c574f468.gif)
The new *Process* module has two graphical user interfaces: One interface resembles the interface of the original SPSS macro where users first select a model configuration from a predefined list. In contrast to SPSS, JASP immediately shows the user a graphical representation of the specified model (i.e., a path plot), which facilitates the search for the right model. As the user adds more variables to the model, the graphical representation is updated. The module will provide both conceptual and statistical path plots, where the statistical path plot includes the estimated parameters.

## Building Models Step-by-step

![Coming Soon: Conditional Process Models in JASP](/assets/coming-soon-conditional-process-models-i-da35f929.gif)
With a second, complementary interface users can build models step-by-step starting from scratch. They can iteratively add paths (i.e., relations) between selected variables and define how other variables influence each path (e.g., through mediation or moderation). Below, we reproduce predefined Model 5 with two path specifications: We first add a path between Extraversion and Neuroticism (X and Y) and specify Openness as a mediator for this path (M). Then, we add a second path specification between Extraversion and Neuroticism, but this time we include Agreeableness as a moderator for this path (W). Again, every time a path is added or modified, JASP will immediately show the user the corresponding graphical representation of the model to facilitate the model-building process. This approach enables users to build models intuitively and flexibly, avoiding the restrictions of predefined model configurations.

## Addressing Criticisms of Process Models

Conditional process models make strong causal assumptions about the relationships between variables. A mediation model, for example, states that there is a causal relationship from X to Y, X to M, as well as M to Y. Critics have argued that researchers cannot assume these causal assumptions to hold in most applications, even in experimental settings (Bullock et al., 2010, Rohrer et al., 2022). In the new module, we aim to address some of these arguments by making the causal assumptions more explicit via footnotes and warnings. Importantly, we will also enable users to test the statistical patterns implied by the causal assumptions (i.e., via conditional independence tests; see Rohrer et al., 2022). Users can then conclude which assumptions are violated and modify their model or experimental design accordingly. Because of its step-by-step interface, the module allows users to build more complex models to accommodate the requirements of their application (e.g., by adding confounding variables to different paths). Despite these features, many challenges remain when applying conditional process models, most of which are related to careful experimental design (see Bullock et al., 2010). We aim to draw the users’ attention to these challenges and improve the statistical use of process models in practice.

## Behind the Project

This project is a collaboration between the JASP Team and the Netherlands eScience Center. As the national institute for research software, the Netherlands eScience Center awards projects as part of calls for proposals. Instead of monetary funding, it provides in-kind support by Research Software Engineers to create innovative digital solutions. This project was granted as part of the Small-Scale Initiatives Digital Approaches to the Social Sciences call 2022.

We kindly thank *[*Tom Bakker*](https://www.esciencecenter.nl/team/dr-tom-bakker/)* and *[*Lieke de Boer*](https://www.esciencecenter.nl/team/dr-lieke-de-boer/)* for providing feedback on earlier versions of this post.*

## References

Bullock, J. G., Green, D. P., &amp; Ha, S. E. (2010). Yes, but what’s the mechanism? (don’t expect an easy answer). *Journal of Personality and Social Psychology, 98*(4), 550–558. [https://doi.org/10.1037/a0018933](https://psycnet.apa.org/doi/10.1037/a0018933)

Hayes, A. F. (2022a). *Introduction to mediation, moderation, and conditional process analysis *(3rd Ed.). New York: The Guilford Press.

Hayes, A. F. (2022b). The PROCESS macro for SPSS, SAS, and R (Version 4.2) [Computer software]. [https://processmacro.org](https://processmacro.org)

Rohrer, J. M., Hünermund, P., Arslan, R. C., Elson, M. (2022). That’s a lot to process! Pitfalls of popular path models. *Advances in Methods and Practices in Psychological Science, 5*(2). [https://doi.org/10.1177/25152459221095827](https://doi.org/10.1177/25152459221095827)
