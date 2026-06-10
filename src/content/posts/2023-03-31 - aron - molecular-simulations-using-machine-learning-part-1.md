---
layout: post
title: "Molecular Simulations using Machine Learning, Part 1"
date: 2023-03-31
author: Aron
published: true
source: medium
source_url: https://blog.esciencecenter.nl/molecular-simulations-using-machine-learning-part-1-e8624a82f680
tags:
  - Machine Learning
---

Top highlight

# Molecular Simulations using Machine Learning, Part 1

][Aron]·Mar 31, 2023

Subscribe*Remember me for faster sign in

So this allows us to in a sense decouple the electrons from the nuclei. By itself this doesn’t give a significant improvement yet, so we need to simplify each part separately.

### The electrons: Density Functional Theory (DFT)

First we’ll look at the electrons. The difficulty of the problem lies in the interactions between them. If they were all independent it would be a much simpler problem, but clearly that is too crude of an approximation: they exert a Coulomb force on each other, so they are not independent. There are additional quantum mechanical effects that make them even less independent.

What we can* do is to simplify all interactions to just interactions between each individual particle and some kind of averaged out particle, this is known as the mean field approximation. That is, we imagine that all of the electrons contribute to an average electron density. This density creates some potential energy that is felt by every electron. If that sounds recursive, that’s because it is. That is the price we pay for this approximation: we get a simpler problem, but we have to solve it many times until it is self consistent.

Adapted in simplified form from Materials Modelling using Density Functional Theory, Feliciano Giustino.The process is illustrated in the figure above. Assume we know where the nuclei are, that gives a potential coming from the nuclei which is the input to the problem. Then we make a guess for this electron density, and use that to compute another potential, caused by the electrons themselves. Now we know the equation for every electron separately, which we can then solve independently from each other. But the total density should be the sum over the individual electron densities, so we compute that. Likely we won’t get the same as the density we started with, and we have to repeat this whole procedure until we do.

This approach is called Density Functional Theory (DFT).

What I’ve glossed over is what this potential is that each electron feels due to the total density. This is what gives this theory its name: the density functional. A functional is just what mathematicians call a function whose argument is itself a function. In this case the potential is a function of the electron density, which itself is a function of the position (a single position this time!).

The interesting situation is that this whole “approximation” is known to be *exact*. So at this point it is not an approximation at all, we do not lose any accuracy by doing this. There is a catch however. The theory only tells us that an appropriate density functional *exists*, that makes it exact in any situation, but it does not tell us *what* *it is*.

So the actual approximation comes in the form of a guess of the density functional. Coming up with density functionals that perform well in certain situations is a whole field of research, and there is a whole zoo of density functionals out there.

In terms of the computational complexity, the bottleneck lies in solving for the individual electrons, combined with the fact that we have to keep doing this until convergence. The time taken scales roughly with the third power of the number of electrons. This is not great, but still much better than the exponential scaling we started with!

Concretely, in the example where we used 10 grid points, going from 100 to 101 particles made using the Schrödinger equation directly 10 times slower, whereas DFT only becomes it 3% slower. You see how important these scalings of computational complexities are.

In practice, whereas the Schrödinger equation could almost only be applied to the simplest of atoms, DFT can be used not just for single atoms, but for molecules and even multiple molecules together. It is still very expensive computationally though, not something you can run on your laptop, rather on a cluster and potentially having to wait a few weeks depending on the problem. From where we started though, this is already a big step up.

### The nuclei: Molecular Dynamics (MD)

Now we turn back to the nuclei. Here the most important source of approximation is their mass. We already used this to decouple them from the electrons, as their mass is much larger. We can now use this in another way.

Quantum mechanics only becomes necessary to describe a system if it is very small and light. For the movement of billiard balls on a pool table, we can fortunately just use classical mechanics. Formally this is a limit of quantum mechanics, prosaically known as the classical limit. Remember that in the Schrödinger equation I said that the momentum is actually a derivative with respect to the position, and the wave function encodes the probability of finding a particle somewhere. In the classical limit, the momentum goes back to being just a number, and the probability goes away, so that a particle is just described by its position and its momentum.

Perhaps surprisingly, even for something as small as a nucleus, this is a good approximation. That is true for all but the smallest nuclei, such as hydrogen.

This leads to a very simple system, where we have a potential coming from the electrons in addition to the Coulomb potential between the nuclei themselves. We obtain the forces just by taking the derivative of the potential, and with these forces we can evolve the nuclei in time.

This approach is called *Molecular Dynamics (MD)*, and is illustrated in the flowchart below.

Adapted in simplified form from Materials Modelling using Density Functional Theory, Feliciano Giustino.Here again we had to introduce an unknown potential, in this case called the *interatomic potential*. This captures the effect of the electrons on the nuclei. And again this is a priori unknown, so we have to guess it.

In this case, there is a very natural candidate. We have just discussed a way to compute the electron density for any configuration of nuclei, namely DFT. So we could do that, and then simply use the Coulomb potential coming from this electron density. This is known as *ab-initio Molecular Dynamics (aiMD)*, because we didn’t need to make another guess on a potential.

The good thing about aiMD is that it is usually very accurate. However it requires a full DFT computation for every step of MD, making it very expensive computationally.

The alternative is to come up with a simple form of the interatomic potential that is very fast to evaluate, and may be accurate for certain systems. Many such guesses exist.

So here the computational complexity is very strongly dependent on the interatomic potential used, the other steps are usually negligible in comparison. Less expensive potentials can be used to simulate millions of atoms, for example in large proteins or crystal structures.

## Summary

The diagram below summarizes what we have discussed. 
Through a series of physically motivated, and for many situations very accurate, approximations we have reduced the elegant but computationally intractable formulation of the Schrödinger equation into two parts: density functional theory (DFT) for the electrons and molecular dynamics (MD) for the nuclei.

Simplified illustration of the approximations done to go from quantum mechanics to Density Functional Theory (DFT) describing the electrons and Molecular Dynamics (MD) describing the nuclei. The clouds contain the ingredients that need to be specified to complete each theory.For both parts, this required the introduction of a priori unknown potentials: the density functional for DFT and the interatomic potential for MD. For both of these, a whole zoo of guesses exist, each of varying accuracy depending on the system at hand.

This is where machine learning comes into the picture: rather than guessing these potentials ourselves, we can let a machine learning model learn them from data. We will discuss this in part 2 of this series.
