---
layout: post
title: "Build your own mass spectrometry analysis pipeline in Python using matchms — part I"
date: 2023-01-31
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/build-your-own-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-i-d96c718c68ee
tags:
  - NumPy
  - Python
  - RSE
  - Workflows
---

## Python is a very powerful language and brings the potential for designing computational mass spectrometry analysis workflows of any desired type and complexity. Here, you can find a quick introduction on how to import, process, and analyze a tandem mass spectra dataset using Python and matchms.

Let’s first inspect what scores we have by running:

scores.score_namesLet’s inspect some of the number of matching peaks by first converting our sparse score array into a regular Numpy array and then slicing the first 5x5 entries:

scores_array = scores.scores.to_array()
scores_array[:5, :5]["CosineGreedy_score"]or access the corresponding number of matching peaks by running:

scores_array = scores.scores.to_array()
scores_array[:5, :5]["CosineGreedy_matches"]

### Get most similar spectra for spectrum of interest

If we want to see which spectra are most similar to the i-th spectrum (according to the here used Cosine score), then we can call:

best_matches = scores.scores_by_query(spectrums[5], name="CosineGreedy_score", sort=True)[:10]
print([x[1] for x in best_matches])which returns the scores for the top-10 candidates (Cosine score + number of matching peaks):

Out[]:[(1., 30),
 (0.99711049, 2),
 (0.99534901, 2),
 (0.99214557, 2),
 (0.98748381, 2),
 (0.98461111, 3),
 (0.98401833, 2),
 (0.97598497, 2),
 (0.9757458, 2),
 (0.97547771, 2)]The first, highest ranked results is the spectrum itself, but what are those other candidates, all with pretty high Cosine scores? Let’s find out by looking at the respective smiles ([smiles](https://en.wikipedia.org/wiki/Simplified_molecular-input_line-entry_system) are notations for the chemical structure of the compounds):

[x[0].get("smiles") for x in best_matches]which here returns:

Out[]:['OC(COC(=O)c1ccccc1)C(O)C(O)COC(=O)c2ccccc2',
 'Cc1cc(=O)oc2cc(OC(=O)c3ccccc3)ccc12',
 'O=C(Nc1ccccc1OC(=O)c2ccccc2)c3ccccc3',
 'COc1cc(CC=C)ccc1OC(=O)c2ccccc2',
 'O=C(OCC1OC(C(OC(=O)c2ccccc2)C1OC(=O)c3ccccc3)n4ncc(=O)[nH]c4=O)c5ccccc5',
 'O=C(Oc1cccc2ccccc12)c3ccccc3',
 'O=C(N1[C@@H](C#N)C2OC2c3ccccc13)c4ccccc4',
 'COC(=O)CNC(=O)c1ccccc1',
 'COc1c2OCOc2cc(CCN(C)C(=O)c3ccccc3)c1C=C4C(=O)NC(=O)NC4=O',
 'COc1c2OCOc2cc(CCN(C)C(=O)c3ccccc3)c1/C=C\\4/C(=O)NC(=O)N(C)C4=O']For those who are not used to reading smiles all the time (like me), let’s display the structures. There are many online and offline tools for plotting structures from smiles. Here, I used the Python package [rdkit](https://www.rdkit.org/) for it by running:

from rdkit import Chem
from rdkit.Chem import Drawfor i, smiles in enumerate([x[0].get("smiles") for x in    best_matches]):
    m = Chem.MolFromSmiles(smiles)
    Draw.MolToFile(m, f"compound_{i}.png")
![Build your own mass spectrometry analysis pipeline in Python using matchms — part I](/assets/build-your-own-mass-spectrometry-analysi-b73e3c5e.png)

Figure 4.** Compounds of the highest 9 Cosine scores within the dataset with respect to spectrums[5], the first being the spectrum of interest itself (hence named “query compound”).

### Alternative: Get best matches above ‘min_match’ threshold

Maybe having two matching peaks is not good enough and you want to be more certain of your Cosine score based candidates. Let’s then only consider the best Cosine scores for which we have at least min_match* matches:

min_match = 5**sorted_matches = scores.scores_by_query(spectrums[5], name="CosineGreedy_score", sort=True)
best_matches = [x for x in sorted_matches if x[1]["CosineGreedy_matches"] &gt;= min_match][:10][x[1] for x in best_matches]which will give a very different result than the previous run. Here we do not find any other spectrum in the dataset that shows a very high Cosine score (again, except the first entry which is the similarity of the spectrum with itself and hence obviously = 1):

Out[]:[(1., 30),
 (0.44857215, 6),
 (0.39605775, 5),
 (0.33880658, 5),
 (0.03942863, 6),
 (0.03429136, 5),
 (0.03028157, 5),
 (0.02845932, 5),
 (0.01924283, 7),
 (0.01890612, 5)]

## 4. Compute spectra similarities: Modified Cosine score

The modified cosine score aims at quantifying the similarity between two mass spectra. Unlike the Cosine score it does not only look at nearly identical spectra, but also considers the mass shift between two compounds. The score is calculated by finding best possible matches between peaks of two spectra. Two peaks are considered a potential match if their m/z ratios lie within the given ‘tolerance’, or if their m/z ratios lie within the tolerance once a mass-shift is applied. The mass shift is simply the difference in precursor-m/z between the two spectra. See [Watrous et al. (PNAS, 2012)](https://www.pnas.org/content/109/26/E1743) for further details.

As done above for the Cosine score, we can calculate the similarities for all possible spectrum pairs by running:

from matchms.similarity import ModifiedCosinesimilarity_measure = ModifiedCosine(tolerance=0.005)
scores = calculate_scores(spectrums, spectrums, similarity_measure,
                          is_symmetric=True)Let’s then visualize the results for the first 50 x 50 spectrum pairs.

scores_array = scores.scores.to_array()plt.figure(figsize=(6,6), dpi=150)
plt.imshow(scores_array[:50, :50]["score"], cmap="viridis")
plt.colorbar(shrink=0.7)
plt.title("Modified Cosine spectra similarities")
plt.xlabel("Spectrum #ID")
plt.ylabel("Spectrum #ID")
![Build your own mass spectrometry analysis pipeline in Python using matchms — part I](/assets/build-your-own-mass-spectrometry-analysi-b0ee4396.png)

Figure 5.** Modified Cosine scores for all possible pairs between the first 50 imported spectrums. As to be expected, the diagonal is always =1 (score for spectrum with itself). But also several other very high Modified Cosine scores stick out suggesting highly related spectra.Now, let’s accept Modified Cosine scores for a minimum number of matching peaks (min_match).

min_match = 5plt.figure(figsize=(6,6), dpi=150)**plt.imshow(scores_array[:50, :50]["ModifiedCosine_score"] \
           * (scores_array[:50, :50]["ModifiedCosine_matches"] &gt;= min_match), cmap="viridis")
plt.colorbar(shrink=0.7)
plt.title("Modified Cosine spectra similarities (min_match=5)")
plt.xlabel("Spectrum #ID")
plt.ylabel("Spectrum #ID")
![Build your own mass spectrometry analysis pipeline in Python using matchms — part I](/assets/build-your-own-mass-spectrometry-analysi-5d737491.png)

Figure 6.** Modified Cosine scores for all possible pairs between the first 50 imported spectrums (with ≥ 5 matching peaks!).There’s for instance a bright spot far outside the diagonal for `spectrums[11]` so let’s have a look at that one!

min_match = 5sorted_matches = scores.scores_by_query(spectrums[11], name="ModifiedCosine_score", sort=True)**best_matches = [x for x in sorted_matches if x[1]["ModifiedCosine_matches"] &gt;= min_match][:10]
[x[1] for x in best_matches]Which gives

Out[]:[(1., 151),
 (0.95295779, 15),
 (0.94542762, 13),
 (0.89735889, 17),
 (0.7886489, 12),
 (0.77433041, 9),
 (0.74935776, 8),
 (0.72854032, 8),
 (0.55896333, 7),
 (0.52331993, 9)]And, probably more interesting, the corresponding smiles:

[x[0].get("smiles") for x in best_matches]Out[]:['CC(C)[C@H](NS(=O)(=O)c1ccc(C)cc1)C(=O)N2CCC(CC2)C(=O)N[C@@H](CC(=O)O)C(=O)O',
 'CCCCCC(NC(=O)C1CCN(CC1)C(=O)[C@@H](NS(=O)(=O)c2ccc(C)cc2)C(C)C)C(=O)O',
 'CC(C)[C@H](NS(=O)(=O)c1ccc(C)cc1)C(=O)N2CCC(CC2)C(=O)N[C@H](C(=O)O)c3ccccc3',
 'CC(C)[C@H](NS(=O)(=O)c1ccc(C)cc1)C(=O)N2CCC(CC2)C(=O)N[C@@H](CCC(=O)N)C(=O)O',
 'COC(=O)C1CCN(CC1)C(=O)C2CCN(CC2)C(=O)[C@@H](NS(=O)(=O)c3ccc(C)cc3)C(C)C',
 'CCC(C)[C@H](NS(=O)(=O)c1ccc(C)cc1)C(=O)N2CCC(CC2)C(=O)N[C@H](C(=O)O)c3ccccc3',
 'CC(C)C[C@H](NS(=O)(=O)c1ccc(C)cc1)C(=O)N2CCC(CC2)C(=O)N[C@@H](C(C)C)C(=O)O',
 'CC(C)C[C@H](NS(=O)(=O)c1ccc(C)cc1)C(=O)N2CCC(CC2)C(=O)N[C@@H](Cc3ccccc3)C(=O)O',
 'CCC(C)[C@H](NS(=O)(=O)c1ccc(C)cc1)C(=O)N2CCC(CC2)C(=O)N3CCC(CC3)C(=O)N',
 'CCC(C)[C@H](NS(=O)(=O)c1ccc(C)cc1)C(=O)N2CCC(CC2)C(=O)N3CCC(CC3)C(=O)OC']OK, smiles, nice. But let’s better move on and have a look at how those compounds actually look like (as above, plotted using rdkit):

![Build your own mass spectrometry analysis pipeline in Python using matchms — part I](/assets/build-your-own-mass-spectrometry-analysi-f6234fec.png)

Figure 7.** Compounds of the highest 9 modified Cosine scores within the dataset with respect to spectrums[11], the first being the spectrum of interest itself (hence “query compound”).I wouldn’t dare calling myself a natural product expert. But those chemical structures clearly do look more consistent to what we saw in Figure 4…

> 

Now it’s up to you to come up with things to do with this ;)

I hope this helped you getting started with using ***matchms*** for working with your MS/MS data! Soon there will be additional tutorials to go a bit more depth:

## Other parts of this tutorial

### [part I — Build you own mass spectrometry pipeline](/build-your-own-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-i-d96c718c68ee)

### [part II — Compute spectra similarities using Spec2Vec](/build-a-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-ii-spec2vec-8aa639571018)

### [part III — Network analysis based on spectra similarities](/build-a-mass-spectrometry-analysis-pipeline-in-python-using-matchms-part-iii-molecular-91891248ee34)

### matchms library

***matchms*** is freely available and open-source. You can find the [code on Github](https://github.com/matchms/matchms), the package is available as [conda package](https://anaconda.org/nlesc/matchms) (recommended) or [from pypi](https://pypi.org/project/matchms/). It was developed by a bunch of very nice people (see [here](https://github.com/matchms/matchms/blob/master/CITATION.cff)) and is [published in Joss](https://joss.theoj.org/papers/10.21105/joss.02411).

You can find more information in the [matchms documentation](https://matchms.readthedocs.io/en/latest/).

### Code

The code shown in this blog post can also be found as [a Jupyter notebook here](https://github.com/matchms/matchms/blob/tutorial/tutorial/matchms_tutorial_01_building_analysis_pipeline.ipynb).

### Help us develop matchms further!

We really hope that matchms will help people to build new, better analysis pipelines. So, please help us to further improve matchms. You can help us by **(1)** Cite our work if you use our package for your research: [matchms article in JOSS](https://joss.theoj.org/papers/10.21105/joss.02411).**(2)** Let us know if you run into any issues using matchms, or if you are missing any key functionalities! You can simply do so by starting a new issue on the [matchms GitHub repository,](https://github.com/matchms/matchms) or contact me on twitter [@me_datapoint](https://twitter.com/me_datapoint?lang=en).**You are of course more than welcome to also become an active contributor to the package and help extend its functionality!
(3)** Please let us know if you successfully applied matchms in your research project (makes us happy + we can maybe share the good news!).

Thanks a lot!

I would like to thank [Carlos Martinez-Ortiz,] [Jorislouwen], Niek de Jonge, [Justin van der Hooft] for helpful comments and suggestions on this blog post.
