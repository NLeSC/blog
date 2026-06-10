---
layout: post
title: "A mathematician in quarantine"
date: 2020-03-18
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/a-mathematician-in-quarantine-4555cfbf9f60
tags:
  - Biology
  - Git
  - Health
  - Nix
---

## Flattening the curve, and why you should stay at home

Check again the differential equations given above with this picture of inflows and outflows in mind. Note that inflows are positive and outflows are negative. The equations will just come to life.

## How do the solutions look?

The specific solutions of the SIR model depend on the initial state and the values of the parameters r** and **a**. An interactive Shiny applet can be found [here](https://pabrod.shinyapps.io/SIRmodel/) (source [here](https://github.com/PabRod/SIR)). A possible solution is sketched below.

![A mathematician in quarantine](/assets/a-mathematician-in-quarantine-d04dbe90.png)
Generated with [https://pabrod.shinyapps.io/SIRmodel/](https://pabrod.shinyapps.io/SIRmodel/)

## What is this good for?

The SIR model is an extremely simple model of a very complex phenomenon. Nevertheless, it suffices to teach us a couple of lessons. By playing with the contagion (**r**) and recovery (**a**) parameters in the applet linked above, you’ll notice that the evolution curves change.

Lowering **r **(lower contagion rate) and/or increasing **a **(higher recovery rate) sound like good news, and they are. Their main effect is to **flatten the contagion curve**, spreading the number of cases in time and avoiding a potential collapse of the health system.

How can we achieve this? Well, increasing **a** (the relative recovery rate) is currently not in our hands, as right now there is no cure for the COVID19. A vaccine will dramatically reduce the susceptible population, but this is also still not developed. But lowering the contagion rate **r** can be achieved, for instance, by minimizing social contact and staying at home as much as possible.

Your friends said it, the authorities said it, and now the mathematics say it: just stay at home.

## References

* Kermack, W. O. and McKendrick, A. G. “A Contribution to the Mathematical Theory of Epidemics.” Proc. Roy. Soc. Lond. A* **115**, 700–721, 1927.
* Murray, James D. *Mathematical Biology I. An Introduction*. 3 Vol. 17. New York: Springer, 2002.
* Agent-based simulation at [The Washington Post](https://www.washingtonpost.com/graphics/2020/world/corona-simulator/).
* This and more elaborate models can be found in [Wikipedia](https://en.wikipedia.org/wiki/Compartmental_models_in_epidemiology).
* An accessible article about modelling of the *COVID19* in [Ars Technica](https://arstechnica.com/science/2020/03/new-model-examines-impact-of-different-methods-of-coronavirus-control/).

## Attribution

The tap icon used in the figures was made by [Iconixar](https://www.flaticon.com/authors/iconixar) from [www.flaticon.com](http://www.flaticon.com)
