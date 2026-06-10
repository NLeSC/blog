---
layout: post
title: "Visual Storytelling for data science"
date: 2021-06-17
author: Maarten van Meersbergen
published: true
source: medium
source_url: https://blog.esciencecenter.nl/visual-storytelling-for-data-science-2f9ef8a27474
tags:
  - uncategorized

---

][Maarten van Meersbergen]·Jun 7, 2021

When conducting research, the data collected can in itself be exciting and meaningful, but when it is presented as spreadsheets or bullet points it can be too boring or difficult to understand for the intended audience. Telling a visual story with data is not trivial however, depending on the level of expertise of your readers, you should choose your storyline structure well.

The excellent paper [Narrative Visualization: Telling Stories with Data](https://ieeexplore.ieee.org/document/5613452) by Edward Segel and Jeffrey Heer provides some good insights on this. The main takeaway from this paper I’d like to share is this:

Author-driven** VS **reader-driven**

Consider if you want to tell a ‘fixed’ story, or if you want the user to discover new stories based on the data you are providing. If telling a fixed story is what you want, an interactive slideshow would be a good option. Interactively ‘playing’ with the data on a slide-by-slide basis could build the reader’s trust in the author’s analysis, but the author’s conclusions are leading here.

Interactive slideshow — Martini glass structure — Drill down story, images from [Narrative Visualization: Telling Stories with Data](https://ieeexplore.ieee.org/document/5613452) by Edward Segel and Jeffrey HeerIn a more reader-driven discovery scenario, more interaction is definitely needed, and a martini-glass-structure is likely a good option. Provide a ‘narrow’ authored storyline at first to explain a possible interaction with the data for tutorial purposes, and then open up options to let the user discover new stories on their own. This allows the user to learn about the possibilities without getting overwhelmed, but gives them the freedom to discover their own stories.

Depending on your intended audience, a drill-down story structure could also be an interesting option. You provide a theme for all of the stories you present, but the user can choose which one they are interested in at their leisure. If your intended audience has enough expertise in both the subject matter and the interactive methods to display your data, letting them examine all of the interactive options for themselves from the start can be beneficial. Providing multiple starting points like this can allow for variations in user’s interests, which could then provide an inlet into other stories they would normally be less interested in.

## eScience application of Visual Storytelling

At the eScience center, we are actively working on visual storytelling applications for scientific purposes. We have three recent examples:

### Climate Science

In the European H2020 funded [RECEIPT](https://climatestorylines.eu/) (REmote Climate Effects and their Impact on European sustainability, Policy and Trade) project, we use storytelling as a framework for scientific discovery, modeling and communication. Many complex interactions between climate change in remote (non-EU) areas of the world and their impact on the EU cannot be easily communicated to policy makers and the public. Yet, a drought in South America or a flood in Asia can have major impacts on the European economy, or on the food supply that reaches our tables. The storytelling application we are developing allows the RECEIPT scientists to create storylines that link map locations and map-based data (displayed with [TerriaJS](https://github.com/TerriaJS/terriajs)) with text, images and custom graphs (created with [Vega](https://vega.github.io/)).

In the RECEIPT climate impact story application, we are using the **drill-down-story** structure. We Provide the common theme of climate changes in remote areas with impact on the EU, but we are letting the user decide what areas of the globe and/or what sectors they are most interested in, be that Agriculture, Finance, International Cooperation, Manufacturing or Coastal Infrastructure. This should provide an in* for many different users, hopefully educating many potential users about the possible impacts of climate change.

A screenshot from the RECEIPT prototype visual storytelling interface.

### Archeology and Art History

In the Via Appia: Revisited project, we are developing a storytelling application for 3d pointclouds (using [potree.js)](https://github.com/potree/potree). The goals of the project are to show the history of art and the (virtual) archeological reconstruction of monuments on the *Via Appia Antica*, an ancient Roman highway near Rome itself.

We will make two versions of this application with different storyline structures. The first instance will be a museum exhibit, where users will interact with physical *forward *and* back *buttons to interact with the application. We’ve chosen the **interactive slideshow** approach for the story structure to simplify the user interface and make sure nothing can go wrong, as well as to allow our authors (the researchers and artists responsible for the exhibit) to carefully craft the narratives.

The second instance of the application will be a public website, where users from the web can explore the Via Appia on their own. To guide the users towards interesting discoveries, we will adopt the **martini-glass structure** here. First, we will offer the same storylines as in the museum exhibit, but after these storylines have finished, we open up the interactivity and will let users explore the site on their own.

An screenshot of the Via Appia: Revisited (early alpha) application

### Medical Imaging

Vistories / CLUE — Gapminder visualizationAnother application area for visual storytelling we explored is medical imaging. The goal of this project was to see if we could improve the communication and support the building of trust between medical experts using Visual Storytelling techniques.

Our starting point was [Vistories / CLUE](https://gapminder.caleydoapp.org/#clue_graph=clue_gapminder0&amp;clue_state=30&amp;clue=P&amp;clue_slide=41), a library that uses interaction provenance as a basis for the authoring of Visual Storylines. The idea was that there could be an opportunity to increase the level of trust between a decision maker (the doctor planning treatment) and an expert doing analysis (a radiologist in the lab) by allowing the analysing expert to author a report directly from the tools used to analyse the images, with preservation of the links back to the data. This could then allow the decision maker to directly access the original analysis, and even directly try out alternate hypotheses or measurements. In this application, the **martini-glass structure** is also used to guide the users at first, but allow more freedom afterwards.

In the sister-blog to this one, we’d like to tell you more about the use of *provenance *for these (and other) purposes. Please read on [**here**](/konmari-for-science-tidying-up-provenance-aabed5da593)**.**

## In conclusion

Combining data, narratives and visuals can bring powerful messages forward in a way that fact, numbers and data alone can not. Visual stories allow us to be more inclusive, to connect better to our audience, and most importantly, to be more **memorable**.

At the eScience Center, we do really like to be remembered by both the scientists that we work with, and by their intended audience as well. Visual storytelling is one of the ways in which we try to achieve this.
