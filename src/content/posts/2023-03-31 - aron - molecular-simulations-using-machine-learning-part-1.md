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

![](/assets/1_YCtoB6VF8ntOvbyl4Oy5OQ-c1205a48.gif)

Simulation of water molecules from Wikipedia.

Are you curious about how scientists study the properties of materials, proteins, and drugs? It all starts with molecular simulation. By creating virtual models and running simulations at the molecular level, researchers can unlock the secrets of these substances and design new ones. The gif above shows a short such simulation, in this case simply of water.

In this three-part blog series, we’ll explore the exciting world of molecular simulation and how machine learning is revolutionizing the field. This first part is purely about the physics. If you have a somewhat technical background and an interest in the topic, it might be interesting to you. If it becomes too technical, the next two parts about machine learning will be relatively stand-alone, and should be interesting also to scientists thinking about applying machine learning to their own fields.

Here we’ll look at the fundamental theory of quantum mechanics, which underpins molecular simulation. But simulating molecules using this theory directly is too difficult computationally. So, we’ll explore how physicists and chemists have simplified the theory to make it workable for simulation.

While simplifying the theory makes it more efficient, it also creates some gaps that need to be filled. That’s where the machine learning will come in, allowing us to learn these from data.

## Quantum Mechanics and the Schrödinger Equation

We will start with quantum mechanics in a simplified setting where the system we study is in equilibrium. This is described by the time-independent Schrödinger equation:

![](/assets/1_7i7tcw7VNt8GURTaOs1P6g-3a40b70c.png)

The Schrödinger equation in its simplest form.

Here m is the mass, p the momentum, V the potential energy, and E the total energy of the system.

What we want to solve this equation for is ψ, which is called the wave function. It encodes the density of the particles we are studying, at every point in space.

While superficially this may look quite short and simple, it hides a lot of complexity, both conceptual and computational. In this blog I will focus on the computational complexity.

One thing I have swept under the rug in the equation above is that our system has not just one but many particles. Each of them has their own momentum and their own mass (although electrons all have the same mass, and for simplicity we can think of the nuclei all being the same, so having the same mass as well). So actually there should be a sum over all particles in the left most term.

The momentum p is actually a derivative with respect to the position in quantum mechanics. More precisely, p = — i ℏ ∂, where ℏ is a very small number called Planck’s constant. Its smallness is the reason we can get through everyday life without thinking about quantum mechanics.

This leads to something more problematic that I have also swept under the rug. Since the momentum is a derivative with respect to the position, acting on the wave function, and each particle has its own momentum, the wave function is not just a function of the position, it is a function of *the positions of every single particle*. A block of material the size of your smartphone has about 10²⁵ electrons and nuclei, that’s a lot of arguments!

The potential by the way is the Coulomb potential that charged particles exert on each other, so that also depends on all of the coordinates.

To understand the computational complexity better it is insightful to look at how we would solve this numerically. Basically, the way most numerical methods go about solving a differential equation is to evaluate the equation itself on a certain number of points. This allows translating the differential equation into linear algebra, a matrix equation essentially of the form A x = b, where A is a matrix and b a vector that we both obtain from this procedure, and if we solve this for the vector x we get an approximation of the solution we’re after on this same set of points.

How many points we need depends heavily on the details, but let’s say for simplicity the system is constrained to be on a single line, in other words space is only 1-dimensional. Let’s also restrict it to the interval between 0 and 1, and say we use K points, located at the positions x\_i = i /K on the interval.

Maybe K=20 could be sufficient in some very simple situation, so that doesn’t seem too bad. Remember though that every single particle has a position, and the wave function depends on all of them. So we need all *combinations* of positions. So for a system with 10²⁵ particles that amounts to 20 *to the power* 10²⁵ points.

Another way to think about this is that if we add only a single electron to our system, we’d now need to solve the original system once for every possible location of the added electron. So in our example this would make the problem a 20 times larger, this is known as exponential complexity.

These ridiculous numbers come from the combination of the exponential complexity of the problem with the already huge number of particles involved.

This means that using this equation directly is only feasible for the smallest of systems, which really means practically only the hydrogen atom: a single nucleus with a single electron.

## Approximations

Clearly then we need to do some approximations to this equation. I will illustrate conceptually a series of explanations that is very standard.

The first and simplest step follows from the observation that the proton is much heavier than the electron, by a factor of about 1000. So even for hydrogen, whose nucleus is just a single proton, this is a significant factor, and for bigger cores the ratio is even larger, for example carbon contains 12 protons and neutrons (which have similar mass to protons), so their mass is about 10⁴ times that of an electron.

Now heavy things tend to move more slowly than light things, this is the essence of what is called the *clamped nuclei approximation*.

From the point of view of an electron, on the typical timescale at which it itself moves, the nuclei are basically standing still. So assuming we know the positions of all the nuclei, we can treat those as fixed, and we can compute the force they exert on the electrons, and solve for the electrons separately.

Conversely, from the point of view of a nucleus, by the time it itself moves, all the electrons will have had enough time to settle down to their equilibrium positions, into what is called their ground state.

So this allows us to in a sense decouple the electrons from the nuclei. By itself this doesn’t give a significant improvement yet, so we need to simplify each part separately.

### The electrons: Density Functional Theory (DFT)

First we’ll look at the electrons. The difficulty of the problem lies in the interactions between them. If they were all independent it would be a much simpler problem, but clearly that is too crude of an approximation: they exert a Coulomb force on each other, so they are not independent. There are additional quantum mechanical effects that make them even less independent.

What we *can* do is to simplify all interactions to just interactions between each individual particle and some kind of averaged out particle, this is known as the mean field approximation. That is, we imagine that all of the electrons contribute to an average electron density. This density creates some potential energy that is felt by every electron. If that sounds recursive, that’s because it is. That is the price we pay for this approximation: we get a simpler problem, but we have to solve it many times until it is self consistent.

![](/assets/1_nYX_YbciZm8swnTDX1AJ5g-0177e0e1.png)

Adapted in simplified form from Materials Modelling using Density Functional Theory, Feliciano Giustino.

The process is illustrated in the figure above. Assume we know where the nuclei are, that gives a potential coming from the nuclei which is the input to the problem. Then we make a guess for this electron density, and use that to compute another potential, caused by the electrons themselves. Now we know the equation for every electron separately, which we can then solve independently from each other. But the total density should be the sum over the individual electron densities, so we compute that. Likely we won’t get the same as the density we started with, and we have to repeat this whole procedure until we do.

This approach is called Density Functional Theory (DFT).

What I’ve glossed over is what this potential is that each electron feels due to the total density. This is what gives this theory its name: the density functional. A functional is just what mathematicians call a function whose argument is itself a function. In this case the potential is a function of the electron density, which itself is a function of the position (a single position this time!).

The interesting situation is that this whole “approximation” is known to be *exact*. So at this point it is not an approximation at all, we do not lose any accuracy by doing this. There is a catch however. The theory only tells us that an appropriate density functional *exists*, that makes it exact in any situation, but it does not tell us *what* *it is*.

So the actual approximation comes in the form of a guess of the density functional. Coming up with density functionals that perform well in certain situations is a whole field of research, and there is a whole zoo of density functionals out there.

In terms of the computational complexity, the bottleneck lies in solving for the individual electrons, combined with the fact that we have to keep doing this until convergence. ==The time taken scales roughly with the third power of the number of electrons==. This is not great, but still much better than the exponential scaling we started with!

Concretely, in the example where we used 10 grid points, going from 100 to 101 particles made using the Schrödinger equation directly 10 times slower, whereas DFT only becomes it 3% slower. You see how important these scalings of computational complexities are.

In practice, whereas the Schrödinger equation could almost only be applied to the simplest of atoms, DFT can be used not just for single atoms, but for molecules and even multiple molecules together. It is still very expensive computationally though, not something you can run on your laptop, rather on a cluster and potentially having to wait a few weeks depending on the problem. From where we started though, this is already a big step up.

### The nuclei: Molecular Dynamics (MD)

Now we turn back to the nuclei. Here the most important source of approximation is their mass. We already used this to decouple them from the electrons, as their mass is much larger. We can now use this in another way.

Quantum mechanics only becomes necessary to describe a system if it is very small and light. For the movement of billiard balls on a pool table, we can fortunately just use classical mechanics. Formally this is a limit of quantum mechanics, prosaically known as the classical limit. Remember that in the Schrödinger equation I said that the momentum is actually a derivative with respect to the position, and the wave function encodes the probability of finding a particle somewhere. In the classical limit, the momentum goes back to being just a number, and the probability goes away, so that a particle is just described by its position and its momentum.

Perhaps surprisingly, even for something as small as a nucleus, this is a good approximation. That is true for all but the smallest nuclei, such as hydrogen.

This leads to a very simple system, where we have a potential coming from the electrons in addition to the Coulomb potential between the nuclei themselves. We obtain the forces just by taking the derivative of the potential, and with these forces we can evolve the nuclei in time.

This approach is called *Molecular Dynamics (MD)*, and is illustrated in the flowchart below.

![](/assets/1_0xhgXYMhL1XVf6LXSjUsMg-4bf2a6ea.png)

Adapted in simplified form from Materials Modelling using Density Functional Theory, Feliciano Giustino.

Here again we had to introduce an unknown potential, in this case called the *interatomic potential*. This captures the effect of the electrons on the nuclei. And again this is a priori unknown, so we have to guess it.

In this case, there is a very natural candidate. We have just discussed a way to compute the electron density for any configuration of nuclei, namely DFT. So we could do that, and then simply use the Coulomb potential coming from this electron density. This is known as *ab-initio Molecular Dynamics (aiMD)*, because we didn’t need to make another guess on a potential.

The good thing about aiMD is that it is usually very accurate. However it requires a full DFT computation for every step of MD, making it very expensive computationally.

The alternative is to come up with a simple form of the interatomic potential that is very fast to evaluate, and may be accurate for certain systems. Many such guesses exist.

So here the computational complexity is very strongly dependent on the interatomic potential used, the other steps are usually negligible in comparison. Less expensive potentials can be used to simulate millions of atoms, for example in large proteins or crystal structures.

## Summary

The diagram below summarizes what we have discussed.  
Through a series of physically motivated, and for many situations very accurate, approximations we have reduced the elegant but computationally intractable formulation of the Schrödinger equation into two parts: density functional theory (DFT) for the electrons and molecular dynamics (MD) for the nuclei.

![](/assets/1_zwvn0X4z6_mG4zyQ4acULw-036d0626.png)

Simplified illustration of the approximations done to go from quantum mechanics to Density Functional Theory (DFT) describing the electrons and Molecular Dynamics (MD) describing the nuclei. The clouds contain the ingredients that need to be specified to complete each theory.

For both parts, this required the introduction of a priori unknown potentials: the density functional for DFT and the interatomic potential for MD. For both of these, a whole zoo of guesses exist, each of varying accuracy depending on the system at hand.

This is where machine learning comes into the picture: rather than guessing these potentials ourselves, we can let a machine learning model learn them from data. We will discuss this in part 2 of this series.
