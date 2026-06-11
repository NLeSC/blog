---
layout: post
title: "Molecular Simulations using Machine Learning, Part 2"
date: 2023-04-13
author: Aron
published: true
source: medium
source_url: https://blog.esciencecenter.nl/molecular-simulations-using-machine-learning-part-2-1d647acd242c
tags:
  - Machine Learning
  - Neural Networks
  - Parallel Computing
  - Training
---

*In this post, I will walk through the process of designing a model used in molecular simulations, from essential to state of the art. This is the second part of a series on using machine learning for molecular simulations. It is relatively self-contained if you haven’t read* [*the first part*](https://blog.esciencecenter.nl/molecular-simulations-using-machine-learning-part-1-e8624a82f680?sk=8c9902b39588261826ab77e3e24f8766)*.*

![](/assets/0_GVOnfCp1wScCos1_-b1c8ae9b.webp)

Photo by BoliviaInteligente on Unsplash

We will design a model that approximates a potential used in molecular simulations. We will start from the simplest possible model, and reason our way step by step towards the essentials of the current state of the art models. This at the same time roughly follows the historical development of these models, although we will not attempt to be precise in this regard.

The principles we use to arrive at a good model are quite general. Although they will lead to different models in different applications, I hope this can be helpful for scientists in different fields thinking about applying machine learning to their own field.

### Quick recap

The figure below summarizes part 1 in a bit more detail. We saw how quantum mechanics was simplified into Density Functional Theory describing electrons, and Molecular Dynamics describing the atomic nuclei. The clouds in the figure indicate a-priori unknown ingredients that arose from these approximations: the density functional and the interatomic potential.

![](/assets/1_zwvn0X4z6_mG4zyQ4acULw-036d0626.png)

We will focus on the interatomic potential: a single function depending on the positions of all the nuclei. The same principles that we use to derive a model for this also apply to the density functional, but the details will be different, because its inputs are different.

## Simplest machine learning model

When designing a machine learning model, it is useful to start from the very basic question: what should go into it, and what should come out.

Well, we want the model to compute a potential, which is a single number, depending on the coordinates of all nuclei. So if we have N nuclei in 3-dimensional space, the model should take 3N numbers and turn them into a single number.

![](/assets/1_jCcxDmDEo7BTHXhrdDLR_g-832dfe19.png)

The simplest machine learning model: a linear model.

The simplest possible machine learning model that meets this requirement would be multiplication by a 1 by 3N matrix W: M(x) = W x. This would multiply every one of the 3N inputs with a weight, and sum them all up. These weights are the trainable parameters. These are initially set to random values, and updated during training by correcting the errors the model makes. That part will remain the same throughout.

This model has many undesirable properties, the most problematic one being that it is way too simple. A more precise way of saying this is that it is linear. This means that if we multiply all of the inputs by 2, the output will be multiplied by 2 as well. Or if we add 3 to say input x₁, the output will be the original output plus 3 w₁, where w₁ is the corresponding weight. In reality of course the effect of this change of one coordinate on the potential depends in a complicated way on its relationships to the coordinates of other particles. This model will never be able to capture that, no matter how much data you throw at it.

## Deep learning

Removing this restriction takes us from machine learning to deep learning. The simplest neural network is basically a sequence of the simpler models from above, intermingled with nonlinear functions called activation functions. (Without these, the end result would still be linear!)

![](/assets/1_MNG8au1e0VGNe723I3Fv1A-338974de.png)

The simplest deep learning model: a fully connected neural network.

The simplest example of this class of models has one hidden layer: it takes the 3N inputs to say 100 numbers by a matrix multiplication, and applicaties an activation function to each one separately. Then through a second matrix multiplication it takes those to the one number we need as an output.

There are many different activation functions, conceptually the only important thing is that they are nonlinear. A simple often used example is the ReLU, which is 0 if its input is negative, and otherwise just passes on the input unchanged.

The effect of adding just one of these hidden layers is profound. In a sense, this immediately fixes the problem with the previous model. That is, this model can approximate anything now, given enough parameters. This statement is known as the *universal approximation theorem*. However, that is quite a theoretical result. It doesn’t say how large the hidden layer should be, how much data is necessary, or even if it’s possible to find the right parameters through training at all, only that they exist.

To address all of these other concerns, we need to specialise the model further to our particular application. In other words, we want our model to not only take into account just the *size* of the in- and outputs, but also its *structure*. As a first example, although the model above has the correct number of 3N inputs, it is not aware at all that actually these have the structure of N triplets of coordinates.

To elaborate on this and make it more precise, we’ll look at the concept of equivariance. For a book and lectures on exploiting the structure of our data that is much more detailed, but also quite technical, see [https://geometricdeeplearning.com/](https://geometricdeeplearning.com/), and [this paper](https://www.nature.com/articles/s42256-021-00418-8) for applications specifically to molecules.

### Equivariance

Equivariance means that if we *first* transform the input and *then* apply the model to it, we get the same result as when we *first* apply the model, and *then* apply a similar transformation to the output. It is a property that a model can have for some transformations but not for others. For example if this is true for a model M when the transformations are rotations, we say that M is rotation equivariant or equivariant with respect to rotations, illustrated in the figure below.

![](/assets/1_Ez5PyIJRW8XGHQdlBjxxkQ-a83a4fc2.png)

Example of equivariance of a hypothetical model M that just detects edges. No matter if we first apply the model and then rotate the result, or first rotate the input and then apply the model, we end up with the same result.

Note that the definition refers to a *similar* transformation on the output, not necessarily exactly the same as we applied to the input. In fact, usually the output of the model will be of a different shape than the input, so we cannot even do the exact same transformation. The important part is that we know a-priori what the transformation on the output is, and it depends only on what transformation we did on the input.

A special case of equivariance is *invariance*, which is when this similar transformation is actually the identity. In other words, if we transform the input, the output will remain unchanged. For a simple example of this, if the hypothetical model in the image above were just a classifier saying whether the image is a cat or a dog, we’d expect it to be invariant: for both inputs on the left of the image, the outputs on the right should be “cat”.

Requiring the model to be equivariant with respect to some transformation imposes some constraints on it, it decreases the freedom in the model, or the number of parameters. So as long as the equivariances we impose are also satisfied by the true solution we are trying to approximate with the model, it makes it more data efficient and easier to train. If we didn’t impose equivariance, the model could potentially have learned it from the data, but that would require more data, more time and more parameters. If we know this property beforehand, clearly it pays off to enforce it, preventing the model from the get go to make mistakes of this kind.

There are many different transformations that the true interatomic potential must be equivariant to. We will discuss these one by one and use them to refine our model.

### Permutations

In turning the positions of all nuclei into a 3N-dimensional input vector, we had to implicitly decide an order: which particle is the first particle, which is the second, etc. Clearly this is just a choice of labelling; if we pick a different order for the exact same configuration of particles, the potential shouldn’t change. So we want our model to be *invariant* with respect to permutations.

Currently it is not, it has no idea that the output should be the same, and so it would have to learn that by seeing lots of examples of identical configurations that are labelled differently, but with the same training label. Clearly this is a huge waste of time, and we want to avoid this.

There are several common functions that do not depend on the order of their arguments, i.e. that are permutation invariant, such as the sum, or the mean, or the maximum. We will just take the sum, as it preserves more information than the maximum. So the very simplest permutation-invariant model would just take all of the nuclei’s positions and sum them. (Actually this would still leave us with 3 coordinates, so we’d need a 1 by 3 matrix at the end to turn it into a single number.)

This is of course again much too simple, in fact even more so than what we started with. We can improve the situation while still taking permutations into account by having only the *last* layer be invariant, and adding *equivariant* layers in between.

Any function that does exactly the same to every nucleus will be equivariant with respect to permutations: if we reorder the inputs, the outputs will be the same as the original, except that they are also reordered in exactly the same way. For this function we can use what we ended up with in the previous section: a fully connected neural network. So that takes a nucleus’s 3 coordinates, and does several matrix multiplications and activation functions on it to end up with a different amount of numbers for each atom, that we can choose.

Note that if the intermediate layers were *not* equivariant, there would be no way to guarantee invariance at the final layer. Furthermore, it also already makes the model more data efficient, as one training sample automatically teaches it about all the different orderings of that same sample.

Another important consequence of this is that, unlike the fully connected level, we now have a model that works regardless of how many nuclei there are. This is great, because it will allow us to train the model on a small system, and then use it on a larger system.

### Locality, graph neural networks

The above modification does impose permutation invariance, but it was still too restrictive. It treats all the nuclei independently, finally just summing “individual potentials” to obtain the total potential. This is not realistic, we expect the potential to depend also on the distance *between* nuclei, something that this model cannot learn.

We can relax this restriction and at the same time incorporate another physical prior by adding more structure to the input.

The physical principle is locality: what happens at some point x only depends on things close to x. More concretely in this case, the Coulomb potential between two particles at a distance r decreases as 1/r. This means that the interaction between two nuclei that are very far from each other doesn’t have any significant contribution to the potential.

So for nuclei closer to each other than some cutoff distance r\_c, we want to take their interaction into account, and we can connect them by an edge. Those that are further away are not connected by an edge. This way we turn the original point cloud input into a graph.

We then extend the operation that previously did the same to all nuclei, to allow it to depend on an atom’s neighbours as well. However, the number of neighbours will be different for different nuclei, and if we allow this to make the output shapes of each atom different things will quickly grow out of hand. So we need a way to combine the neighbours in such a way as to keep the shape independent of the number of neighbours. Furthermore we again have the issue of permutation invariance, now at a smaller local scale. The solution to both problems is the same: we sum over the features of the neighbours.

![](/assets/1_6pHDwX0OUPtuHWqbD0vUJw-f0843c46.png)

Illustration of message passing in a graph neural network. An atom c receives “messages” from its neighbours n and updates its state using those. The neighbours at the same time do the same. Multiple steps of this allow the message to propagate further.

This is another permutation equivariant operation, now on graph inputs. It is called message passing, because it can be thought of as all of an atom’s neighbours passing messages to the central atom, who adds them all up. Doing this multiple times for all nuclei increases the region to which an atom is sensitive, because in the second step it can indirectly receive messages from its neighbours’ neighbours.

At the end we have to sum over all nuclei again to obtain something invariant to permutations. These types of models are called Graph Neural Networks (GNNs).

### Spatial invariances

While permutation invariance was more about the way we describe the system, how we label the nuclei, the remaining ones are actual spatial transformations: translations, rotations and reflections.

If we move (“translate”) all nuclei in the same direction by the same amount, the interatomic potential doesn’t change. That is, whether we perform an experiment in Amsterdam, or we perform the exact same experiment in New York, the outcome should be the same. And the same holds for rotations and reflections. (If there were any external influence like gravity this would be different, but that is insignificant at the atomic scale.)

As the model is now, it doesn’t know any of this. Building this in to the model makes it a lot more data efficient. From just one training simulation it would learn automatically about all its translations, rotations and reflections.

The simplest way to enforce this is to only give the model inputs that are themselves invariant to these transformations. Clearly, if the inputs are not affected, the output is also not affected.

That means we cannot have an atom’s position as an input by itself, as clearly that is not invariant under any of the transformations. But since we now have a graph, we can focus on *pairs* of nuclei, and take the difference of their positions as an input. That is already invariant with respect to translations: if we add the same vector to both positions, it will cancel out in the difference. It is not yet invariant with respect to rotations or reflections, but if we reduce it further to just the absolute value of the difference, it is.

That does the job, but it is again quite restrictive. Note the parallel here with the permutations we discussed previously: the simplest is to make everything invariant from the start, but it will turn out to be unnecessarily restrictive.

For an example of something that is missed in this approach, consider a central atom with two two of its neighbours. The vectors pointing from the central atom to those two neighbours make up a certain angle to each other. If you think about it, this angle is also invariant with respect to all of the transformations. And it might well be a useful feature that has an effect on the potential that we want the model to represent. But there is no way to reconstruct this angle just from the absolute value of the differences in positions. Had we not thrown away that much information so early on, we *would* be able to recover this angle: it’s related to the inner product between the two vectors.

![](/assets/1_a_4d0GaMmdDN6ZJ8s81Rqg-6d8dab71.png)

The angle φ is invariant to translations, rotations and reflections.

We could of course add these angles to the input “by hand” and stick to imposing invariance from the start, and there are models that do this. But there are many more features that we are throwing away. A more systematic approach would again be to only impose invariance in the final layer, and keep the others equivariant.

### Higher representations/orbitals

It gets a bit more complicated though. The complication is that there are many ways that things can transform under rotations. Chemists know these as orbitals, physicists and mathematicians as different representations of the rotation group.

I’ll give an idea that, while not mathematically rigorous, captures the intuition of what’s important for us here. Imagine we start with two vectors representing the positions of two nuclei, which are in what is called the L=1 representation or the p orbital; here, the vector remains unchanged when rotated along its own axis but changes its position when rotated in any other way.

We can combine these two vectors by taking the length of their difference. As mentioned before, this is invariant, it is called the L=0 representation or the s orbital. It is a single number that doesn’t change under any rotation. We can also simply add them, then it remains a vector.

The two vectors together define a plane, a two dimensional surface that they both lie in (assuming that they are not parallel). Or more concretely imagine one vector pointing out of the cockpit of an actual plane and one along one wing. The plane they define together would be the floor of the inside of the actual plane.

Loosely speaking this is how the two vectors can be combined to a higher representation, this would be the L=2 representation or the d orbital. Note that this plane depends on both vectors: if we rotate along the wing of the plane, that vector doesn’t change, but the one pointing out the cockpit certainly does, and so does the floor of the plane.

This pattern continues: every time we add a new vector into the mix, we can either lower the representation by one, keep it the same, or increase it by one. For example if we start with a plane and a vector, you can imagine projecting the vector into the plane, that gives us a new vector, lowering the representation by one.

So, crucially, the more complex combinations can be reduced down to something that is invariant, as we require for the output of the model.

If we are very precise in how a layer is allowed to combine its inputs to form its outputs (how it combines the orbitals/representations), we can have intermediate layers that are equivariant, and a final equivariant output. This will then not only automatically capture the angles we mentioned before, but also more complex structures.

This again makes the model more data-efficient, without paying the price of oversimplifying the input and throwing away a lot of information.

This is implemented in the [e3nn](https://github.com/e3nn/e3nn) library, and used for example in the molecular dynamics models [nequip](https://github.com/mir-group/nequip) and [allegro](https://github.com/mir-group/allegro).

### Conclusion

By looking carefully at the structure of the problem, in particular how the true interatomic potential must transform under several transformations of its input, we have constructed a model that is very data efficient. The arguments to get here were very generic, and apply to any model that approximates an invariant function of particle positions.

First we saw that we needed more than one layer in order to learn more than just linear functions. We used permutation invariance combined with locality to arrive at a graph neural network. On top of this we required invariance with respect to the spatial transformations of translations, rotations and reflections. This gives us what is called an E(3)-equivariant GNN (E(3) is the name for these transformations in 3-dimensional space).

In the final part we will look at considerations that go into training this model.
