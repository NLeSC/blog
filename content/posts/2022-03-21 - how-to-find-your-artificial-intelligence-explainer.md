---
layout: post
title: "How to find your Artificial Intelligence explainer"
author: Elena Ranguelova
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-to-find-your-artificial-intelligence-explainer-dbb1ac608009
tags:
  - Deep Learning
  - Git
  - Python
  - Tensors
  - Visualization
  - Workshop
---

Here, we will use the LRP method to illustrate the principle of determining which features in an input contribute most strongly to the output of a trained DNN model. In this example, the input to the network is an image.** We are interested in figuring out the relevance* of each image pixel to a given image class. This could be the final DNN classification decision for that image (“cat”) or any other class known to the model (e.g. “dog”, “cow”, “bee”, etc. if the model is trained to classify animals). The output relevance is considered a weighted sum of the relevancies of all the **pixels** of the input image. The relevance at the output node in the network graph is decomposed by iterative propagation backward through the network layers until the input layer. The trained model weights are used in this decomposition. Using this *relevance propagation* process, the final *relevance scores map *(*or heatmap*) is obtained. The final relevance map gives us an indication for the DNN’s hidden logic.

![How to find your Artificial Intelligence explainer](/assets/how-to-find-your-artificial-intelligence-2cffbfad.png)
Relevance scores of the image pixels in respect to the class “cat” obtained via relevance propagation.Besides LRP, there are many other XAI methods, which use different ways of determining relevance. In order to determine which of the plethora of post-hoc XAI methods to include in DIANNA, we started by compiling an initial list of 18 XAI post-hoc feature-relevance methods following [*Arrieta et al. (2020)*](https://www.sciencedirect.com/science/article/abs/pii/S1566253519308103):

* **Deep Taylor decomposition (DTD):** [Paper](https://www.sciencedirect.com/science/article/pii/S0031320316303582)| [Presentation](https://www.youtube.com/watch?v=gy_Cb4Do_YE)| [Code](https://github.com/marcoancona/DeepExplain)
* **Layer-wise Relevance Propagation (LRP): **[Paper](https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0130140)|[Blog](http://danshiebler.com/2017-04-16-deep-taylor-lrp/)| [Code](https://github.com/albermax/innvestigate)
* **Integrated Gradients (IG): **[Paper](https://arxiv.org/pdf/1703.01365.pdf)| [Tutorial](https://captum.ai/docs/extension/integrated_gradients/)| [Code](https://github.com/pytorch/captum)
* **Local Interpretable Model-agnostic Explanations (LIME):** [Paper](https://arxiv.org/abs/1602.04938)| [Blog](https://towardsdatascience.com/lime-how-to-interpret-machine-learning-models-with-python-94b0e7e4432e)| [Code](https://github.com/marcotcr/lime)
* **SHapley Additive exPlanations (SHAP): **[Paper](https://arxiv.org/abs/1705.07874)| [Blog](https://towardsdatascience.com/shap-how-to-interpret-machine-learning-models-with-python-2323f5af4be9)|[Code](https://github.com/slundberg/shap)
* **PatternNet **and** PatternAttribution: **[Paper](https://arxiv.org/pdf/1705.05598.pdf)| [Code](https://github.com/albermax/innvestigate)
* **Deep Learning Important FeaTures (DeepLIFT):** [Paper](https://arxiv.org/pdf/1704.02685.pdf)| [Tutorial](http://goo.gl/qKb7pL)| [Presentation](https://vimeo.com/238275076)| [Code](https://github.com/marcoancona/DeepExplain)
* **SmoothGrad: **[Paper](https://arxiv.org/abs/1706.03825)| [Demo](https://pair-code.github.io/saliency/)| [Code](https://github.com/pair-code/saliency)
* **CLass-Enhanced Attentive Response(CLEAR): **[Paper](https://openaccess.thecvf.com/content_cvpr_2017_workshops/w26/papers/Kumar_Explaining_the_Unexplained_CVPR_2017_paper.pdf)
* **(Adaptive) deconvolutional network (Deconvnet):** [Paper](https://link.springer.com/content/pdf/10.1007/978-3-319-10590-1_53.pdf https://www.matthewzeiler.com/mattzeiler/adaptivedeconvolutional.pdf)
* **Gradient-weighted Class Activation Mapping (Grad-CAM): **[Paper](https://ieeexplore.ieee.org/document/8237336)| [Blog](https://www.pyimagesearch.com/2020/03/09/grad-cam-visualize-class-activation-maps-with-keras-tensorflow-and-deep-learning/)|[Code](https://github.com/ramprs/grad-cam/)
* **Randomized input sampling for explanation of black-box models (RISE): **[Paper](https://arxiv.org/abs/1806.07421)| [Code](https://github.com/facebookresearch/TorchRay)
* Extremal Perturbations (EP)| [Paper](https://openaccess.thecvf.com/content_ICCV_2019/papers/Fong_Understanding_Deep_Networks_via_Extremal_Perturbations_and_Smooth_Masks_ICCV_2019_paper.pdf)| [Code](https://github.com/facebookresearch/TorchRay)
* Saliency Analysis (SA): [Paper](https://arxiv.org/pdf/1312.6034.pdf)| [Code](https://github.com/osu-xai/pytorch-saliency)
* Anchors: [Paper](https://homes.cs.washington.edu/~marcotcr/aaai18.pdf)| [Code](https://github.com/viadee/javaAnchorExplainer)
* Deep visualization: [Paper](https://arxiv.org/pdf/1506.06579.pdf)| [Demo](https://yosinski.com/deepvis)| [Code](https://github.com/yosinski/deep-visualization-toolbox)
* AutomaticSTRucture IDentification (ASTRID): [Paper](https://arxiv.org/pdf/1707.07576.pdf)| [Code](https://github.com/bwrc/astrid-r)

We excluded all XAI methods without a working and well-maintained open-source implementation or proven user community. That resulted in a subset of the **13 methods** highlighted above.

### ***Evaluation criteria***

The large variety of XAI approaches benefits the AI community by providing freedom in the search for explainability. However, it also increases the difficulty of choosing the most appropriate method for each use case. Every XAI approach has pros and cons. In order to select the best methods for our task, we needed a framework to evaluate these methods systematically. Fortunately, this topic has already been visited by the XAI researchers and there is an extensive list of objective criteria defined in the [Explainability fact sheet](https://dl.acm.org/doi/abs/10.1145/3351095.3372870) paper [*Sokol, K., &amp; Flach, P. (2020)*]. The authors look at an abundant set of XAI aspects and cluster the requirements towards an explainer into **5 groups **(or **dimensions**):

* Functional (F1-F9)
* Operational (O1-O10)
* Usability (U1-U11)
* Safety (S1-S4)
* Validation (V1-V2)

For each dimension, there are specific criteria, e.g. the “Functional” group has 9 and in total there are 36 criteria. We will describe our choices next.

### ***The selection***

In our [DIANNA project](https://github.com/dianna-ai/dianna), we built a Python package that brings XAI to non (X)AI experts and various scientific domain researchers. The XAI methods to be included in the package had to have the capacity to work with different types of data, various AI architectures and we chose to focus on the model explanation. Most importantly, the resulting explanations had to be easy to interpret. Based on our goals, we have compiled a shortlist of **18 requirements** from the 36 requirements in the [XAI fact sheet](https://dl.acm.org/doi/abs/10.1145/3351095.3372870). Using these relevant for our target users' requirements, we evaluated the selected 13 methods listed in the XAI overview section.

Apart from the requirements on the list, we have also considered the similarity and the “popularity” of these methods, the quality of the existing implementations, and the difficulty of integrating them in DIANNA. The evaluation procedure can be summarized with the table shown below: (**Deconvnet** and **GradCAM** are filtered out since they can only work with Convolutional NNs and are therefore not included in the table.)

Finally, we narrowed down our list to **5 methods:**

* **Layer-wise Relevance Propagation (LRP)**
* **Local Interpretable Model-agnostic Explanations (LIME)**
* **SHapley Additive exPlanations (SHAP)**
* **PatternAttribution (PA)**
* **Randomized input sampling for explanation of black-box models (RISE)**

Within limited project time, we were able to include three of them in our [DIANNA library](https://github.com/dianna-ai/dianna): RISE, LIME &amp; SHAP. A preview of the explanations that we obtained using our DIANNA library is shown below:

![How to find your Artificial Intelligence explainer](/assets/how-to-find-your-artificial-intelligence-72ccdcf5.png)
Explanation for “0” with RISE, LIME, and SHAP using DIANNA library for a model trained on binary MNIST data. Red indicates high or positive relevance, blue- low or negative.We could observe that the methods are complimentary to each other in respect to their output, which can be particularly useful for researchers seeking new insights to their data and problem. We also believe that simpler datasets, e.g. a binary (only 0s and 1s) MNIST should be used as “Hello world” example for the XAI (user) community!

Our library is open-source and it is ready to help you decrypt your neural network models. Wait, you want to ask which format do we support? TensorFlow? PyTorch? Don’t worry. We can work with all of them, as we support [ONNX](https://onnx.ai/) — the de-facto DNN format standard! Any contributions to our repository are very welcome (talk is cheap, show me your pull request! Want to give it a try? Check out the link below our logo!

![How to find your Artificial Intelligence explainer](/assets/how-to-find-your-artificial-intelligence-004f98d9.png)
[https://github.com/dianna-ai/dianna](https://github.com/dianna-ai/dianna)

### Acknowledgments

The work described in this blog has been performed by the members of the DIANNA team: [Christiaan Meijer](https://orcid.org/0000-0002-5529-5761), [Leon Oostrum](https://orcid.org/0000-0001-8724-8372), [Yang Liu ](https://orcid.org/0000-0002-1966-8460)and [Elena Ranguelova](https://orcid.org/0000-0002-9834-1756) with the big help of [Patrick Bos](https://orcid.org/0000-0002-6033-960X) and [Giulia Crocioni](https://orcid.org/0000-0002-0823-0121). Special thanks to [Christiaan Meijer](https://orcid.org/0000-0002-5529-5761), [Giulia Crocioni](https://orcid.org/0000-0002-0823-0121), [Matthieu Laneuville,](https://orcid.org/0000-0001-6022-0046) [Pablo Rodríguez-Sánchez](https://orcid.org/0000-0002-2855-940X) and [Lieke de Boer](https://orcid.org/my-orcid?orcid=0000-0003-3381-2040) for their valuable contributions. The DIANNA project is supported by [Netherlands eScience Center](https://www.esciencecenter.nl/) and [SURF](https://www.surf.nl/en).

### *References*

[*[Arrieta et al. (2020)*](https://www.sciencedirect.com/science/article/abs/pii/S1566253519308103)*] Arrieta, A. B., Díaz-Rodríguez, N., Del Ser, J., Bennetot, A., Tabik, S., Barbado, A., … &amp; Herrera, F. (2020). Explainable Artificial Intelligence (XAI): Concepts, taxonomies, opportunities and challenges toward responsible AI. Information fusion, 58, pp. 82–115.[[Sokol, K., &amp; Flach, P. (2020)*](https://dl.acm.org/doi/abs/10.1145/3351095.3372870)] *Sokol, K., &amp; Flach, P. (2020, January). Explainability fact sheets: a framework for systematic assessment of explainable approaches. In Proceedings of the 2020 Conference on Fairness, Accountability, and Transparency, pp. 56–67.*
