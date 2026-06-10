---
layout: post
title: "Causal Inference in JASP: The Process Module"
date: 2024-02-01
author: Malte Lüken
published: true
source: medium
source_url: https://blog.esciencecenter.nl/causal-inference-in-jasp-the-process-module-b8c01abfb2fb
tags:
  - uncategorized

---

By [Malte Lüken](https://www.esciencecenter.nl/team/malte-luken/), [Julia M. Rohrer](https://juliarohrer.com/), [Thijs Vroegh](https://www.esciencecenter.nl/team/thijs-vroegh/), [Johnny van Doorn](https://www.uva.nl/en/profile/d/o/j.b.vandoorn/j.b.vandoorn.html), and [Eric-Jan Wagenmakers](https://www.uva.nl/en/profile/w/a/e.m.wagenmakers/e.m.wagenmakers.html)

*This post is also published on the JASP *[*blog*](https://jasp-stats.org/blog/)*.*

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-4987f6a5.png)
In a recent [blog post](https://jasp-stats.org/2023/07/27/conditional-process-models/), we announced the development of a JASP module for conditional process models, similar to the popular [PROCESS](https://www.processmacro.org/) macro for SPSS (Hayes, 2022a, 2022b). We can now share that we reached a milestone in our development efforts: The latest JASP release 18.2 includes a beta version of the Process module which allows users to apply frequentist process models. Besides covering many of the features of the SPSS macro, the JASP Process module provides a flexible and easy-to-use interface. It also makes the causal assumptions of process models more explicit and provides functionality to test them. In this blog post, we will introduce the main features of the module using a real-world example.

## Mediation, Moderation, and Conditional Process Models

The aim of our module is to test models that involve mediation and moderation effects. A mediation effect is a causal chain between three variables. For example, when X → M, M → Y, and X → Y, then the causal effect from X to Y is (partly) mediated by M. A moderation effect implies that the relationship between two variables changes depending on a third variable, e.g., the effect X → M changes as the moderator W changes. A model that includes at least one mediation and one moderation effect is called a conditional process model because it makes assumptions about the causal process between variables, but the process is conditional on moderator variables (Hayes, 2022a).

Conditional process models can also be conceptualized as parametric directed acyclic graphs (DAGs) or structural equation models (SEMs) that only include manifest variables (Pearl, 2012). We can use the properties of DAGs to test the implications of the causal model against data while SEMs are a useful framework for parameter estimation.

The PROCESS macro for SPSS uses a regression-based approach to estimate process models which allows predictors (including independent variables, covariates, and mediators) to be correlated when there is no explicit causal path between them. Because the JASP Process module uses SEMs for model estimation, these correlations need to be explicitly allowed by the user. We believe this design choice prompts users to think more explicitly about the assumptions of their models. For a discussion of differences between PROCESS and SEM-based estimation, see Hayes et al. (2017).

## Example: Age and Listening-related Fatigue

To illustrate the features of the Process module, we use openly available [data](https://osf.io/hc8n4/) from the study “Predictors of listening-related fatigue across the adult life span” by McGarrigle et al. (2021) which was published in *Psychological Science*. The study investigates how different variables mediate and moderate the causal effect of age on listening-related fatigue using conditional process models. The analysis was pre-registered and the data set has a relatively large sample size (N = 281) which is roughly evenly distributed across age groups. These properties make the study a good example for conditional process analysis with observational data. As the authors of the original study, we assume that age is an exogenous (independent) variable which allows us to clearly identify the direction of the causal effect from age to fatigue.

In our illustration of the module, we will reproduce the original analysis of the study but also test the implications of the hypothesized causal model. Note that our example only uses z-standardized variables which we renamed so they can be easily identified. The included candidates for mediators or moderators are auditory attention ability (“AudAttention”), perceived hearing impairment (“HearImpair”), perceived memory ability (“Memory”), and perceived mood disturbances (“MoodDisturb”). The example data set is also available in the internal JASP Data Library.

## The Basics: Flexible Conditional Process Models in JASP

To estimate a conditional process model in JASP, we first load the data set and enable the Process module by clicking the blue “+” sign in the top right corner and selecting “Process (beta)”.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-5daca690.jpg)
We then click on the available module to start the “Classic Process Model” analysis. First, we drag the variable “Fatigue” into the box *Dependent Variable* and the variables “Age”, “AudAttention”, “HearImpair”, “Memory”, as well as “MoodDisturb” into the box *Continuous Predictors*.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-d67427be.jpg)
In this example, we use a new interface that differs from the way process models are specified in SPSS. In the *Models* section, we can construct the hypothesized model by adding causal paths between variables. We add three paths from “Age” to “Fatigue” by selecting the variables in the *From* and *To* dropdowns. For each path, we choose *Mediator* in the *Process Type* dropdown and select “AudAttention”, “HearImpair”, “Memory” as the *Process Variable*, respectively.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-914a5c82.jpg)
After completing each path, JASP provides the output of the estimated model including a path diagram showing the conceptual model structure. The path diagram resembles the hypothesized parallel mediation model after the third path.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-54c3bb79.jpg)
Before we look at the results, we select *Bootstrap* under *Method* in the *Options* section to enable bootstrapped confidence intervals; this is done because we cannot assume that indirect effects are normally distributed. Bootstrapping in JASP can take a few minutes to finish.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-3640843a.jpg)
Below the path diagram, under “Parameter estimates”, the output shows a table with estimated parameters and effects. The second table “Mediation effects” contains the direct and indirect effects. As in the original study, the table shows a negative direct effect from age to fatigue and a positive indirect effect via perceived hearing impairment, both with bootstrapped confidence intervals excluding zero.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-9a885c40.jpg)
To add a moderation effect to our model, we go back to the “Models” section and click the green “+” button in the top left corner to add a second model to our analysis. As in the previous model, we add three mediation paths from “Age” to “Fatigue”. Then we add a fourth path from “Age” to “Fatigue” and specify “MoodDisturb” as a moderator.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-9285476b.jpg)
Now, JASP provides output for both models. In the “Model summary” table, we can see that Model 2 has lower AIC and BIC values indicating a better model fit compared to Model 1 (the weights for both criteria lie almost exclusively on Model 2; AIC and BIC weights can be enabled in the “Options” section).

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-b7f6e2f7.jpg)
Under “Parameter estimates” for Model 2, we can see that the direct effect of mood disturbances on fatigue is positive and its bootstrap confidence interval excludes zero. However, this is not the case for the interaction between age and mood disturbances. Thus, the model does not provide evidence for the hypothesized moderation effect, reproducing the result of the original study.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-d5746641.jpg)
How can we explain that Model 2 fits the data better but shows no evidence for a moderation effect? Model 2 does show a strong direct effect of mood disturbance on fatigue, which is not included in Model 1, and we assume that it leads to the better model fit. This suggests that we should include mood disturbances in our model but not as a moderator on the path between age and fatigue.

## Advanced: Testing Implications of Causal Models

Because the estimated effect from age to fatigue pointed in the opposite of the expected direction, McGarrigle et al. (2021) estimated alternative process models in an exploratory analysis. The Process module provides a useful tool that indicates where the assumed causal model does not fit the observed relationships in the data. DAGs have implications for the variables they involve, specifically, for which variables should be independent in the data (Pearl, 2012; Textor et al., 2016). These implications can be tested against data with (conditional) independence tests. In our model, all variables are assumed to be continuous and all relationships to be linear, so we test for (conditional) independence by estimating (partial) correlation coefficients.

In JASP, we can test local implications by ticking the box *Local tests* under *Tests *in the *Models* section*. *Here, we apply local tests to Model 2. Underneath the box, we can select the type of test we want to use, which is the default (*Linear*) in our case. If the model contains categorical variables or relationships are assumed to be nonlinear, a different type should be chosen (e.g., *Loess* or *Chi-square*).

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-ebfb687a.jpg)
After ticking the *Local tests* box, a new table appears in the output under “Local tests”. In the first three columns, the table shows which implied relationship is tested: For example, in the first row, auditory attention is assumed to be conditionally independent from hearing impairment given age. This can also be seen in the model diagram, which does not contain any direct arrows between the two variables (i.e., age accounts for the entire covariance between auditory attention and hearing impairment). The estimated partial correlation for this implied relationship is very small and not significant indicating that this implication is not violated. The opposite is true for row four: The model implies that age and mood disturbances are independent since there are no direct (or indirect) arrows between the two variables. However, the estimated correlation is negative and significant suggesting that the implication is violated and the model is misspecified. Rows five to seven also show significant (partial) correlations increasing the evidence that the model is inappropriate for the data.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-0ac11436.jpg)
Note that the PROCESS macro for SPSS behaves differently to our module by automatically allowing mediators to correlate. In a SEM context, this behavior can be imitated by estimating the residual covariances between mediators in the model. Ticking the box *Mediators* under *Residual Covariances* in the *Models* section enables this.

## Advanced: Adjusting the Model in an Exploratory Analysis

In the original study, McGarrigle et al. conducted an exploratory analysis where they used “MoodDisturb” as a mediator instead of a moderator. Our implication tests of the previous model with “MoodDisturb” provide a rationale for this: The data showed a negative correlation between “Age” and “MoodDisturb” which was not expected by the model. Our exploratory model should therefore account for this correlation by including a direct causal path from “Age” to “MoodDisturb”.

We open a new Classical Process Model* analysis and select the same variables for *Dependent Variable* and *Continuous Predictors* as in the previous analysis. In our exploratory model, we specify “MoodDisturb” as a mediator between “Age” and “Fatigue”. We add “HearImpair” as a second mediator and leave out the other variables for simplicity.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-5fc4cb9f.jpg)
In the output, we can see the conceptual diagram of our exploratory model.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-344aaf01.png)
Again, we test the local implications of our new model. We can see that the model expects mood disturbances and hearing impairment to be conditionally independent given age, which is violated in the data.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-2aefc199.jpg)
Thus, we need to further adjust our model, for example, by adding a direct causal path from “HearImpair” to “MoodDisturb” assuming that increased perceived hearing impairment leads to increased mood disturbance and not vice versa. In JASP, we can add a direct path by selecting *Direct* in the *Process Type* dropdown under the *Models* section.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-6557220d.jpg)
The output now shows the conceptual diagram of the adjusted exploratory model.

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-e967f275.png)
If we compare the AIC to the first exploratory model without the direct path, we can see that the AIC of the second model with the direct path is lower, indicating a better model fit (the AIC weight lies almost exclusively on the second model).

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-214cf25e.jpg)
Looking at the direct and indirect effects in the “Mediation effects” table, we can see that the adjusted exploratory model estimates one direct (first row) and three indirect effects (rows two to four).

![Causal Inference in JASP: The Process Module](/assets/causal-inference-in-jasp-the-process-mod-fd6ec0c4.jpg)
The bootstrap confidence interval for the direct effect overlaps with zero but the intervals for the three indirect effects do not. That is, the adjusted exploratory model suggests a threefold causal process from age to fatigue: Via mood disturbances, hearing impairment, and via a path from hearing impairment to mood disturbances.

## Using Conditional Process Models with Caution

As has been emphasized by Rohrer et al. (2021), process models should be used with caution. They assume that the model structure is appropriate for the problem and data to identify causal effects. While the JASP Process module allows users to test the implications of the causal structure, other assumptions are much more difficult or even impossible to test: For example, to identify causal effects, all potential confounding variables must be accounted for in the model. This is difficult for indirect effects, even in experiments, because unobserved confounders can bias causal effects from the mediator to the dependent variable (Bullock et al., 2010; Rohrer et al., 2021). The Process module allows users to include confounders on all paths; however, they must be known and measured.

Another common challenge is to correctly establish the direction of causality and ruling out alternative causal models (Kline, 2012; Rohrer et al., 2021; Fiedler et al., 2018). While in our example, it was easy to determine the causal direction from age to fatigue, the direction of causal paths between two mediators or the mediators and the dependent variable was much less evident. Some alternative causal models (stating different directions of causality) can be ruled out through causal implications. However, more often, the most appropriate causal model needs to be justified from theory or established through experimental manipulation.

Furthermore, moderation effects as part of conditional process models pose several challenges to researchers, such as scale-dependency, choosing hypothesis-appropriate effect sizes, and distinguishing between causal interaction or effect modification (see Rohrer &amp; Arslan, 2021, for details, examples, and recommendations).

If there is evidence that a model is misspecified, the adjustment must also be done with care to avoid overfitting (Textor et al., 2016). While the modification can be done in an exploratory fashion, the modified model should always be tested on an independent dataset to draw robust conclusions. At the same time, it should be consistent with theoretical expectations.

## Conclusion

The new JASP Process module allows users to apply frequentist conditional process models using an intuitive and flexible interface. Using data from a study by McGarrigle et al. (2021), we demonstrated how users can estimate models involving multiple mediation and moderation effects. We also explained how the module enables users to test the local implications of specified models. In the case of violated implications, users can modify misspecified models accordingly. We believe that the JASP Process module can pave the way toward a more responsible and appropriate use of conditional process models. By providing an intuitive and flexible interface, we also aim to make process models more accessible to researchers and students.

## Behind the Project

This project is a collaboration between the JASP Team and the Netherlands eScience Center. As the national institute for research software, the eScience Center awards projects as part of calls for proposals. Instead of monetary funding, it provides in-kind support by Research Software Engineers to create innovative digital solutions. This project was granted as part of the Small-Scale Initiatives Digital Approaches to the Social Sciences call 2022.

## References

Bullock, J. G., Green, D. P., &amp; Ha, S. E. (2010). Yes, but what’s the mechanism? (don’t expect an easy answer). *Journal of Personality and Social Psychology, 98*(4), 550–558. [https://doi.org/10.1037/a0018933](https://psycnet.apa.org/doi/10.1037/a0018933)

Fiedler, K., Harris, C., &amp; Schott, M. (2018). Unwarranted inferences from statistical mediation tests — An analysis of articles published in 2015. *Journal of Experimental Social Psychology, 75*, 95–102.[ https://doi.org/10.1016/j.jesp.2017.11.008](https://doi.org/10.1016/j.jesp.2017.11.008)

Hayes, A. F., Montoya, A. K., &amp; Rockwood, N. J. (2017). The analysis of mechanisms and their contingencies: PROCESS versus structural equation modeling. *Australasian Marketing Journal, 25*(1), 76–81. [https://doi.org/10.1016/j.ausmj.2017.02.001](https://doi.org/10.1016/j.ausmj.2017.02.001)

Hayes, A. F. (2022a). *Introduction to mediation, moderation, and conditional process analysis *(3rd Ed.). New York: The Guilford Press.

Hayes, A. F. (2022b). The PROCESS macro for SPSS, SAS, and R (Version 4.2) [Computer software]. [https://processmacro.org](https://processmacro.org)

Kline, R. B. (2012). Assumptions in structural equation modeling. In R. H. Hoyle (Ed.), *Handbook of structural equation modeling* (pp. 111–125). Guilford Press.

McGarrigle, R., Knight, S., Hornsby, B. W. Y., &amp; Mattys, S. (2021). Predictors of listening-related fatigue across the adult life span. *Psychological Science, 32*(12), 1937–1951. [https://doi.org/10.1177/09567976211016410](https://doi.org/10.1177/09567976211016410)

Pearl, J. (2012). The causal foundations of structural equation modeling. In R. H. Hoyle (Ed.), *Handbook of structural equation modeling* (pp. 68–91). Guilford Press.

Rohrer, J. M., &amp; Arslan, R. C. (2021). Precise answers to vague questions: Issues with interactions. *Advances in Methods and Practices in Psychological Science, 4*(2), 25152459211007368.[ https://doi.org/10.1177/25152459211007368](https://doi.org/10.1177/25152459211007368)

Rohrer, J. M., Hünermund, P., Arslan, R. C., Elson, M. (2022). That’s a lot to process! Pitfalls of popular path models. *Advances in Methods and Practices in Psychological Science, 5*(2). [https://doi.org/10.1177/25152459221095827](https://doi.org/10.1177/25152459221095827)

Textor, J., van der Zander, B., Gilthorpe, M. S., Liśkiewicz, M., &amp; Ellison, G. T. (2016). Robust causal inference using directed acyclic graphs: The R package ‘dagitty.’* International Journal of Epidemiology, 45*(6), 1887–1894. [https://doi.org/10.1093/ije/dyw341](https://doi.org/10.1093/ije/dyw341)
