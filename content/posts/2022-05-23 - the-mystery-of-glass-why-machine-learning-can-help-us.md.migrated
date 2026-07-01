---
layout: post
title: "The mystery of glass: why machine learning can help us"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/the-mystery-of-glass-why-machine-learning-can-help-us-c1b9690565a3
tags:
  - API
  - Machine Learning
  - Neural Networks
  - Performance
---

*This blog is part of our blog series: The Small-Scale Initiative on Machine Learning, how did it go?, where groups who were invited to participate in a project with eScience Center Research Software Engineers write about the projects and their experience. This week:* Ilian Pihlajamaa *from the* [Non-Equilibrium Soft Matter group of Liesbeth Janssen](http://tps.phys.tue.nl/janssen/): *They trained a deep neural network to predict the properties of glass-like materials that have not been produced before. In just a few milliseconds.*

![](/assets/0_HK_lRdLKr8YtS5CU-ed91b41f.webp)

Photo by Quino Al on Unsplash

In school, you may have been taught that there are three main states of matter: the gas, liquid and solid state. In the gas and liquid states, molecules or atoms are free to move around, whereas in the solid state, particles are stuck in place and form a three-dimensional geometric structure we refer to as a *crystalline lattice*.

While this is an accurate description for most materials, there are some that do not fit it. Glasses are a prime example. A glass is created by cooling down a liquid sufficiently fast that the constituent particles do not have time to order themselves in a lattice, but get stuck in the place that they happened to occupy when the material was still a liquid. The resulting material is a solid (otherwise we couldn’t use it to drink from), but its microscopic structure is disordered. In material science, the word “glass” does not only refer to the glass that we are used to, but also to many other disordered solids. ==When we think of it this way, any liquid can form a glass. Some examples are plastics, rubbers, ceramics and many metals.==

![](/assets/1_0Anxd3YW-rHn4Vnyljj6KQ-edfb4490.png)

In contrast to the standard crystallization transition (from liquid to solid), the glass transition is not understood by science. As Nobel laureate Phillip W. Anderson put it in 1995: “ ==The deepest and most interesting unsolved problem in solid state theory is probably the theory of the nature of glass and the glass transition.==” Many research groups around the world are working on theories that try to quantitatively predict the material properties of a glass, given some information on the microscopic arrangement of the particles. One of these theories, developed in the 80s, is called Mode Coupling Theory. It does an excellent job of describing the way in which the viscosity (“thickness”) of a liquid grows when it is rapidly cooled down, but fails to accurately predict at what temperature the liquid turns into a glass. This failure is due to a small number of approximations that are made in the theory. Recently, a method was proposed to systematically correct the approximations that Mode Coupling Theory makes. The resulting new theory, called Generalized Mode Coupling Theory, clearly does a better job than standard Mode Coupling Theory, and looks like it agrees very well with experimental data and simulations:

![](/assets/1_u_crRy_Nw1JvYArBS9G70Q-5cc7710e.png)

We say “looks like” since we are not actually sure what the results of the full Generalized Mode Coupling Theory are, because its equations are too difficult to solve by hand and must therefore be solved approximately on a computer.\*

Together with the eScience Center, as a part of the Small-Scale Initiative in Machine Learning, we set out to come up with a more intelligent approach to solving these equations. Instead of solving them by brute force on a supercomputer, we trained a deep neural network that predicts the solution of these equations for any order in milliseconds. In order to do so, we first engineered a large data set of ten thousand fictional materials for which we solved the full GMCT equations up to a randomly chosen order between 1 and 5 by brute force. We were then able to train a deep neural network with roughly one hundred thousand free parameters to reproduce these calculations with an average error of less than one per cent.

![](/assets/1_XzU0STC7jp-IB4G6GXlImw-03504016.png)

Because of the instrumental speed-up that this machine learning method brings, compared to a brute force calculation, it is now possible to explore the glass forming behavior of new materials with an unprecedented speed. As a test, we used the deep neural network to study a sticky hard spheres liquid. This is a model that is commonly used to study many kinds of large particles that attract each other, and displays very interesting behavior and gives fundamental insights into the dynamics of actual particles. Even though the machine learning model had never seen a sticky hard sphere liquid before, it was able to predict the glass transition curve for this material with an error of only four per cent compared to the brute force method, which took almost one hundred thousand times as long to compute.

![](/assets/1_icjlF-nR52aXe0FTqYmDjw-410e391f.png)

*\*For math-savvy readers, it involves an infinite-dimensional coupled hierarchy of nonlinear integro-differential equations. The main challenge here is the fact that it these equations form an infinite-dimensional hierarchy. How we approach this in practice is that we solve the hierarchy only up to a certain level, and throw away everything beyond that. If we throw away everything beyond just the first equation, we recover standard Mode Coupling Theory from the 80s. If we take into account two equations, we call it 2nd order GMCT, and so on. Currently, using modern computing techniques, we have been able to solve GMCT explicitly up to the 5th order, which takes a few days on a high performance computing cluster. Each order beyond that increases the computational time needed to solve the equations roughly by a factor of 50, which gets out of hand very quickly.*
