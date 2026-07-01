---
layout: post
title: "cffinit: NOW is the time to get more recognition for your software!"
author: Faruk Diblen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/cffinit-now-is-the-time-to-get-more-recognition-for-your-software-e2e6ef617f8e
tags:
  - Citation
  - Git
  - Python
---

***Creating software citation files using cffinit  
***by [Abel S. Siqueira](https://orcid.org/0000-0003-4451-281X) and [Faruk Diblen](https://orcid.org/0000-0002-0989-929X) ([Netherlands eScience Center](https://www.esciencecenter.nl/))

![Image of cinema with many people watching a screen. Instead of a film, the screen shows the recognition image from Scriberia.](/assets/0_VMyjOtrq1IOnHncO-1e5ef4de.webp)

Modified photo of a cinema by Jake Hills on Unsplash https://unsplash.com/photos/23LET4Hxj\_U, and the image created by Scriberia for The Turing Way community and is used under a CC-BY licence. https://doi.org/10.5281/zenodo.5706310

Let’s think about your favorite movie. What is so good about it? The story? The animations? Sound effects? Maybe you only like the actor or actress? There must be something special about the movie that makes you feel different.

We move on to our next question: do you know of those involved in making your favourite movie? You may know the director and the main actor or actress, but what about the others? For example, do you know the artist who composed the soundtracks? Do you know the person who spent endless hours editing the movie? What about costume and make-up? We often refer to movies as *‘the movie director X directed’* or *‘the movie with Y in it’*. Although a lot of people work in movie production, only a few people get credit and share the fame. But what would happen if the most striking scene wouldn’t have a soundtrack or visual effects?

We have a similar story to modern research. In many research fields today, doing research without software is impossible. Researchers find an interesting problem, they devote their time to finding the answer and they rarely actually do it alone. Most of the time, they collaborate with many other people. For example, researchers need software that can make smart decisions (like an AI algorithm) or process a huge amount of data in a very efficient way. Finally, they get their research article published and are announced as the owner of the work. *But wait!* What happened to the people who developed the software? Are they included in the paper? Did they receive credit for the software they developed? In the best scenario, the software developers spent time creating a software paper and published it in a specialized journal. If there is no publication about the software, the developers don’t usually receive credit or are only added to the acknowledgement section.

## Citation File Format

![Recognition image from Scriberia. A banner with Recognition written on it appears above software developers and researchers standing on pillars. Software citation helps developers pillar to go to higher level, represented by an arrow.](/assets/0_SCmONGUG4gHQkhqA-42229c69.webp)

This image was created by Scriberia for The Turing Way community and is used under a CC-BY licence. https://doi.org/10.5281/zenodo.5706310

This was a big issue until a few research software developers, from the Netherlands eScience Center and the German Aerospace Center (DLR) introduced the idea of [Citation File Format](https://citation-file-format.github.io/) \[1\]. The Citation File Format helps you add machine-readable metadata for software or datasets. After adoption by GitHub, Zenodo, GitLab, Zotero, and JabRef, we believe it will be a standard format in the near future. You can read more about the story [here](https://www.esciencecenter.nl/news/code-citation-was-made-possible-by-research-software-engineers-in-germany-and-the-netherlands/). Thanks to [GitHub’s recent feature](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files), if you have a CITATION.cff in your GitHub repository, your software can be cited correctly and easily. **Yaaay for recognition!**

## cffinit: a tool to generate CITATION.cff files

To support the growing adoption of the Citation File Format, **there is now a dedicated tool to create these files from scratch**: [cffinit](https://research-software.nl/software/cffinit) \[2\]. cffinit is a web application that helps you create a CITATION.cff file. The application provides guidance for each field of the CFF schema and does the validation automatically. When there are issues, cffinit will provide visual feedback on relevant fields. The cffinit has a few advantages compared to manual editing such as:

- no need for installing extra tools such as conversion and validation tools;
- no need for further validation;
- guidance for each field;
- visual feedback to indicate issues.

Recently, the Netherlands eScience Center has released version 2.0.0 of the tool. This version handles the most up-to-date Citation File Format specification (1.2.0), and can help you easily create your CITATION.cff file.

![A cat looks at a computer screen where the landing page of cffinit is shown.](/assets/0_J2ZZyZSLxMFGZQGR-0312c8a3.webp)

Modified photo of Tim Mossholder on Unsplash https://unsplash.com/photos/gdsp6wNn7cM, with landing the page of cffinit v2.0.0

The Netherlands eScience Center also took part in The Turing Way November 2021 sprint and created a section about [software citation with CITATION.cff](https://the-turing-way.netlify.app/communication/citable/citable-cff.html) with an overview of all this information. In addition, we have created a tutorial on how to [create a CITATION.cff using cffinit](https://the-turing-way.netlify.app/communication/citable/citable-cffinit.html) to help you get your software to the next level of recognition. Instead of copy-pasting all of it here, we summarize a few of the points in The Turing Way and recommend that you follow the tutorial.

## Steps to Make Your Software Citable with cffinit

To make your software citable, you only need to follow the two steps below:

**Step 1. Create a CITATION.cff File:**

Use [cffinit](https://citation-file-format.github.io/cff-initializer-javascript/#/) to create a CITATION.cff file. For more details on using cffinit see [the tutorial on The Turing Way’s website](https://the-turing-way.netlify.app/communication/citable/citable-cffinit.html).

**Step 2. Add Your CITATION.cff to a Public Code Repository:**

After creating a valid CITATION.cff file, you will need to add it to the root of your code or data repository so that it can be easily found and cited.

## Updating your CITATION.cff file

When you need to update your CITATION.cff file, for example, to add an author or to change the information about releases, you will need to edit the file manually. It is recommended to update your CITATION.cff file before making a software release.

*Spoiler: we are working on adding this feature to cffinit.*

## How to Cite Using CITATION.cff

If you have found software or datasets that contain a CITATION.cff, there are a few ways to obtain the reference information to cite in your publication.

- You can use one of the tools, such as the [cffconvert](https://github.com/citation-file-format/cff-converter-python) command-line program, to convert your CITATION.cff file to one of the [supported formats](https://github.com/citation-file-format/cff-converter-python#supported-output-formats), such as APA, BibTeX or EndNote.
- Alternatively, if the software or datasets you want to cite are available on GitHub, you can use GitHub’s interface to copy the reference in either APA or BibTeX formats by clicking the “Cite this repository” button. See the green area in the image below for an example.
![GitHub repository with “Cite this repository” button clicked and popup showing the formatted citation information.](/assets/0_Mt6W7VkzjkCLICvz-118ee885.webp)

“Cite this repository” automatically converts the CITATION.cff file to APA’s and BibTeX’s format.

Note that the “Cite this repository” button only appears when there is a CITATION.cff file in the repository.

For more details on software citation on GitHub, please see [GitHub’s guide on software citation](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-citation-files).

## References

\[1\] Druskat, S., Spaaks, J. H., Chue Hong, N., Haines, R., Baker, J., Bliven, S., Willighagen, E., Pérez-Suárez, D., & Konovalov, A. (2021). Citation File Format (Version 1.2.0) \[Computer software\]. [https://doi.org/10.5281/zenodo.5171937](https://doi.org/10.5281/zenodo.5171937)

\[2\] Spaaks, J. H., Verhoeven, S., Diblen, F., Druskat, S., Soares Siqueira, A., & Garcia Gonzalez, J. (2021). cffinit (Version 2.0.0) \[Computer software\]. [https://github.com/citation-file-format/cff-initializer-javascript](https://github.com/citation-file-format/cff-initializer-javascript)

## How can you help?

You can help us in many ways. The first and easiest would be creating a CITATION.cff file for your software. If you encounter any issues or if you have suggestions, you can create tickets on our [GitHub repository](https://github.com/citation-file-format/cff-initializer-javascript). Finally, you can contribute to the code and help us make it even better.

## Get in touch with us

cffinit 2.0 was developed by [Abel S. Siqueira](https://www.esciencecenter.nl/team/abel-soares-siqueira/), [Faruk Diblen](https://www.esciencecenter.nl/team/faruk-diblen-msc/), [Jesus Garcia González](https://www.esciencecenter.nl/team/jesus-garcia-gonzalez-msc/), [Jurriaan H. Spaaks](https://www.esciencecenter.nl/team/jurriaan-spaaks-msc/) and [Stefan Verhoeven](https://www.esciencecenter.nl/team/stefan-verhoeven-bsc/). We thank [Stephan Druskat](https://sdruskat.net/) for the very useful feedback during the development of the tool and also our proofreaders [Lieke de Boer](https://www.esciencecenter.nl/team/dr-lieke-de-boer/), [Veronica Pang](https://www.esciencecenter.nl/team/veronica-pang/) and [Tom Bakker](https://www.esciencecenter.nl/team/dr-tom-bakker/).

If you have suggestions or questions, please feel free to reach us at generalization a-t esciencecenter.nl.
