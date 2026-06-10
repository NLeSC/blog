---
layout: post
title: "what is the impact of visualization on science"
date: 2017-06-21
author: eScience Editorial Team
published: true
source: medium
tags:
  - 3D
  - Astronomy
  - Climate
  - Data Visualization
  - Health
  - Machine Learning
---

Scientific visualization impacts all research disciplines. Understanding our past, dealing with the challenges of climate change, discovering dark matter, and analyzing human behavior are all areas where scientific visualization is applied to gain scientific insight.

On 20 June 2017 we invited a diverse group of scientists to Rotterdam to show how they apply visualization technologies — from archaeology to astronomy. We recorded all presentations for you, which you can find below.

![](/assets/1_KaZi1Mej2bsU6Gjvb8X0fw-61d072c6.jpeg)

## Introduction to “Scientific Visualization: From Archaeology to Astronomy”

Willem van Hage (Netherlands eScience Center)

## From Information Visualization to Visual Analytics: Combining the strengths of man and machine

Jack van Wijk (Eindhoven University of Technology)

Information Visualization concerns the use of interactive computer graphics to obtain insight in large amounts of abstract data, like tables, hierarchies, and networks. The aim is to exploit the unique capabilities of the human visual system to detect patterns, structures, and irregularities, and thereby to enable experts to analyze big and messy data. In this talk Jack gives an overview, illustrated with examples of work from Eindhoven, and trends and challenges are discussed. The use of familiar representations in combination with fluent interaction is often highly effective, as well as integration of methods from statistics, machine learning, and data mining.

## Context-Aware Selection Techniques and Visual Storytelling

Lingyun Yu (University of Groningen)

Exploratory data visualization and analysis is a fundamental element of many visualization systems. It provides domain experts with tools to study unknown datasets, an activity during which the data is examined more closely to discover interesting or unexpected patterns. One essential tool for exploratory visualization is the ability to select different subsets of the dataset, based on the current state of the exploration and/or one’s own intuition. Lingyun presents a family of interactive Context-Aware Selection Techniques for the analysis of large 3D scientific datasets. She also briefly discusses how selection can be part of interactive visual storytelling.

## Visualization of large-scale cellular simulations of blood

Gábor Závodszky (University of Amsterdam) & Paul Melis (SURFsara)

Blood is a complex suspension constituted of various components suspended in plasma. Red blood cells are the major component and determine blood rheology. Platelets form the link between transport dynamics and several vital biochemical processes. Their collective behaviour can provide explanation to the most fundamental transport phenomena in blood, such as the non-Newtonian viscosity, the margination of platelets, the Fåhræus effect, or the appearance of a cell-free layer. The knowledge of the emergent complex rheology is gaining importance due to the spreading application of micro-medical devices in numerous clinical applications during the last years. The open questions are often targeted by cellular level simulations. In this talk Gábor and Paul focus on the evaluation of the output of such large-scale cellular level computations. Usually, it is infeasible to describe the overall behaviour of the system with single parameters and thus visualisation techniques can provide significant help in processing results, for example to select regions of interest, separate specific events, or to shed light on higher level correlations.

## Interactive visual exloration of the spatial and temporal human brain transcriptome

Boudewijn Lelieveldt (Leiden University Medical Center)

The Allen Institute for Brain Science was established in 2003, and over the past decade, it has grown into a world-leading neuroscience institution by launching a number of publicly available atlases of “where and when during development genes are expressed in the brain”. This presentation is a short introduction on the Allen Brain atlas: “What is it, and what can you do with it in the context of neuroimaging research?”.

BrainScope.nl is also presented: a web portal for fast, interactive visual exploration of the Allen Atlases of the adult and developing human brain transcriptome. Through a novel methodology to explore high-dimensional data (dual t-SNE), BrainScope.nl enables the linked, all-in-one visualization of genes and samples across the whole brain and genome, and across developmental stages. Boudewijn shows that densities in t-SNE scatter plots of the spatial samples coincide with anatomical regions, and that densities in t-SNE scatter plots of the genes represent gene co-expression modules that are significantly enriched for biological functions. Boudewijn also shows that the topography of the gene t-SNE maps reflect brain region-specific gene functions, enabling hypothesis and data driven research.

Boudewijn demonstrates the discovery potential of BrainScope.nl through three examples: (i) analysis of cell type specific gene sets, (ii) analysis of a set of stable gene co-expression modules across the adult human donors and (iii) analysis of the evolution of co-expression of oligodendrocyte specific genes over developmental stages. Brainscope is publicly accessible at [www.brainscope.nl](http://www.brainscope.nl/).

## Visualising a billion stars

Maarten Breddels (University of Groningen)

With large astronomical catalogues containing more than a billion stars becoming common, we are preparing for methods to visualize and explore these large datasets. Data volumes of this size requires different visualization techniques, since scatter plots become too slow and meaningless due to overplotting. Maarten solves the performance and visualization issue using binned statistics, e.g. histograms, density maps, and volume rendering in 3d. The calculation of statistics on N-dimensional grids is handled by Python library called vaex, which Maarten introduces. It can process at least a billion samples per second, to produce for instance the mean of a quantity on a regular grid. This statistics can be calculated for any mathematical expression on the data and can be on the full dataset or subsets, specified by queries/selections.

However, to visualize higher dimensional data in the notebook interactively, no suitable solution existed. This led to the development of ipyvolume, which can render 3d volumes and up to a million glyphs (scatter plots and quiver) in the Jupyter notebook as a widget. With the browser as a platform these 3d plots can also be embedded in static html files. This allows for sharing with colleagues, rendering on your tablet (paperless office), outreach, press release material, etc. Full screen stereo rendering allows for a virtual reality experience using your phone and Google Cardboard, a minor investment compared to other VR head mountables. Overlaying 3d quiver plots on a 3d volume rendering allows exploring a 6d (or higher) space.

Vaex and ipyvolume can be used together to explore and visualize any large tabular data set, or separately to calculate statistics, and render 3d plots in the notebook and outside.

## Painting in Hydrodynamic Models

Fedor Baart (Deltares)

The emergence of interactive art has blurred the line between computer graphics, natural user interfaces and art. Here we apply this artistic method to computer models. This presentation shows the transformation of a simple flow visualisation into an interactive painting. This interactive painting is used as an aesthetically representation of the environment, but also to solve real world problems. The beauty of the flow of water is shown with examples from oceans, seas, bays, and rivers.

## Golden Agents in Virtual Interiors. Visualizing Uncertainties in the Spatial Humanities

Charles van den Heuvel (Huygens ING / University of Amsterdam)

The NWO-Large Infrastructure project *Golden Agents. Creative Industries and the Making of the Dutch Golden Age* combines SW and multi-agent technologies to support analyses of interactions between various branches and between the production and consumption of the creative industries. Here Charles presents the plans for a new project for creating multilayered maps and multidimensional spaces as a virtual research environment on top of the knowledge graph.Visualizing uncertainties in the interfaces between these maps and virtual spaces is not only necessary for this project but for the spatial humanities in general.

## 3D Archaeology in Rome

Maurice de Kleijn (VU University Amsterdam)

The use of 3D technologies in archaeology has grown enormously over the past couple of decades. Nowadays, archaeologists use these technologies to record, present, analyse and reconstruct archaeological sites. Since the tools archaeologists apply mostly originate from other domains, the developments in the archaeological use of 3D technologies are characterized as technology-driven rather than methodology-driven. The recent trend of Free and Open Source Software (FOSS) and the technological improvements of digital infrastructures are changing this, allowing future innovations to be truly driven by archaeological needs.

Maurice discusses the advantages of approaching 3D technologies as an 3D GIS infrastructure, taking into account sustainability and different Information Technology literacy levels of the users. He does so by presenting the development of the FOSS-based 3D GIS for Mapping the Via Appia. Based on insights from this project, a research strategy for the development of future 3D GIS projects in archaeology is proposed.

## What’s Your Story, Morning Glory?

Tommaso Caselli (VU University Amsterdam)

StoryTeller visualises event-structures generated by the NewsReader software as structured stories. StoryTeller can show actor-centric, event-centric, and source-centric storylines, allowing to explore large collections of documents. In StoryTeller events are ordered in time, and connected to approximate a story pattern. The model behind StoryTeller assumes the existence of a climax event, a critical turning point in an event sequence. Starting from it, a story is reconstructed by connecting events which are conditional, i.e. precede, and consequential to, i.e. follow, the climax event. Users can interact selecting and zooming into elements of their choice, generating their story.

## Closing remarks

Wilco Hazeleger (Netherlands eScience Center)
