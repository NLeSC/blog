---
layout: post
title: "Build a mass spectrometry analysis pipeline in Python using matchms — part II: Spec2Vec"
date: 2023-01-31
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/build-a-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-ii-spec2vec-8aa639571018
tags:
  - uncategorized

---

## After “part I” which gave an introduction on how to import, process, and analyze a tandem mass spectra dataset using Python and matchms, “part II” will add Spec2Vec to the game, a machine learning tool to assess spectrum similarities.

][Florian Huber]·Feb 17, 2021

Instead of looking at a few individual query spectra, lets have a look at the “bigger picture” by plotting part of the similarity score matrix we just computed to generate Figure 2**.

from matplotlib import pyplot as pltscores_array = scores.scores.to_array()  # for matchms &gt;= 0.18.0plt.figure(figsize=(6,6), dpi=150)**plt.imshow(scores_array[:50, :50], cmap="viridis")
plt.colorbar(shrink=0.7)
plt.title("Spec2Vec spectra similarities")
plt.xlabel("Spectrum #ID")
plt.ylabel("Spectrum #ID")
plt.clim(0, 1)  # Spec2Vec scores can be between -1 and 1
#plt.savefig("spec2vec_scores.png")
Figure 2**. Show the first 50 x 50 Spec2Vec similarity scores. The diagonal are scores between spectra and themselves, hence always = 1.0 (boring). But the few brighter (green/yellowish) dots here and there point out some apparently related spectra, according to Spec2Vec. Those might be worth a closer look.

## 2. Train a new Spec2Vec model from scratch

Training a Spec2Vec model is fairly straightforward and relatively fast (usually minutes to one hour max). In general, training a new model from scratch makes sense when a lot a data is present to train on as it gives more options to optimize the results when compared to simply using a pretrained model as done above.

First, the spectrum data has to be converted into “documents” where peaks and neutral losses have become “words” (e.g. `peak@289.29`). This can be done by running:

from spec2vec import SpectrumDocumentspectrum_documents = [SpectrumDocument(s, n_decimals=2) for s in spectrums]Then, a new model can simply be trained by using `train_new_word2vec_model`. The following code will create a new model which is trained for 25 iterations (for machine learning people: that is ”epochs”) on 2 workers (you can change this, e.g. to 4 if you have 4 cores, the difference is not drastic though). Depending on your hardware, the training of this model should not take longer than a couple of minutes.

from spec2vec.model_building import train_new_word2vec_modelmodel_file = "tutorial_model.model"**model = train_new_word2vec_model(spectrum_documents, iterations=[25], filename=model_file,
                                 workers=2, progress_logger=True)The above code snippet will automatically save the model under the name `tutorial_model.model`, which could later load again by running `model = gensim.models.Word2Vec.load("tutorial_model.model")`.

### Calculate spectrum similarities

Once we have our trained model we can again (as above with the pretrained model) compute spectrum similarities.

from matchms import calculate_scores
from spec2vec import Spec2Vecspec2vec_similarity = Spec2Vec(model=model, intensity_weighting_power=0.5,
                               allowed_missing_percentage=5.0)scores = calculate_scores(spectrum_documents, spectrum_documents, spec2vec_similarity, is_symmetric=True)Here again we can search for the best matching compounds according to Spec2Vec.

best_matches = scores.scores_by_query(spectrum_documents[11], sort=True)[:10]
[x[0].get("smiles") for x in best_matches]And we can plot the resulting smiles to .png files by running:

from rdkit import Chem
from rdkit.Chem import Drawfor i, smiles in enumerate([x[0].get("smiles") for x in best_matches]):
    m = Chem.MolFromSmiles(smiles)
    Draw.MolToFile(m, f"compound_{i}.png")The best 8 matches are plotted in Figure 3**.

**Figure 3.** Compounds of the highest 9 Spec2Vec similarity scores within the dataset with respect to spectrums[11], the first being the spectrum of interest itself (hence “query compound”).This example in figure 3 looks already quiet promising and all selected candidates clearly show chemical similarities! But this is of course just one mostly random pick out of many spectra. In our [Spec2Vec paper](https://www.biorxiv.org/content/10.1101/2020.08.11.245928v2) we compared the different similarity scores (Cosine, modified Cosine, Spec2Vec) in much more detail and found that Spec2Vec often — but not always — outperformed the classical scores. We also found a general trend that such scores are generally more reliable for larger compounds, supposedly because those will come with a higher number of chemically meaningful fragments.

**Figure 4.** Working with different datasets from GNPS we evaluated the quality of Spec2Vec based spectrum suggestions and found that they get better with increasing compound mass. Taken from [Spec2Vec article](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1008724).
> OK. Done for now. Really curious to see what you can get out of Spec2Vec!

## Other parts of this tutorial

### [part I — Build you own mass spectrometry pipeline](/build-your-own-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-i-d96c718c68ee)

### [part II — Compute spectra similarities using Spec2Vec](/build-a-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-ii-spec2vec-8aa639571018)

### [part III — Network analysis based on spectra similarities](/build-a-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-iii-molecular-91891248ee34)

## matchms library

**matchms*** is freely available and open-source. You can find the [code on Github](https://github.com/matchms/matchms), the package is available as [conda package](https://anaconda.org/nlesc/matchms) (recommended) or [from pypi](https://pypi.org/project/matchms/). It was developed by a bunch of very nice people (see [here](https://github.com/matchms/matchms/blob/master/CITATION.cff)) and is [published in Joss](https://joss.theoj.org/papers/10.21105/joss.02411).

## spec2vec library

**Spec2Vec** is of course also freely available and open-source. You can find the [code on Github](https://github.com/iomega/spec2vec), the package is available as [conda package](https://anaconda.org/nlesc/spec2vec) (recommended) or [from pypi](https://pypi.org/project/spec2vec/). The [article published in PLOS Computational Biology can be found here](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1008724).

You can find more information in the [matchms documentation](https://matchms.readthedocs.io/en/latest/) and the [spec2vec documentation](https://spec2vec.readthedocs.io/en/latest/?badge=latest).

## Code

The code shown in this blog post can also be found [as Jupyter notebook on GitHub](https://github.com/matchms/matchms/blob/tutorial/tutorial/matchms_tutorial_02_compute_similarities_with_Spec2Vec.ipynb).

## Help us develop matchms and spec2vec further!

We really hope that matchms will help people to build new, better analysis pipelines and that spec2vec can improve your analysis results. So, please help us to further improve matchms and spec2vec. You can help us by **(1)** Cite our work if you use our package for your research: [matchms article in JOSS,](https://joss.theoj.org/papers/10.21105/joss.02411) [spec2vec article in PLOS Computational Biology](https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1008724).**(2)** Let us know if you run into any issues using matchms and/or spec2vec, or if you are missing any key functionalities! You can simply do so by starting a new issue on the [matchms GitHub repository,](https://github.com/matchms/matchms) or contact me on twitter [@me_datapoint](https://twitter.com/me_datapoint?lang=en).**You are of course more than welcome to also become an active contributor to the package and help extend its functionality!
(3)** Please let us know if you successfully applied matchms and/or spec2vec in your research project (makes us happy + we can maybe share the good news!).

Thanks a lot!

I would like to thank [Carlos Martinez-Ortiz], [Justin van der Hooft] and [Kontoueftychia] for helpful comments and suggestions on this blog post.
