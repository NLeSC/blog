---
layout: post
title: "Molecular Simulations using Machine Learning, Part 2"
date: 2023-04-13
author: Aron
published: true
source: medium
source_url: https://blog.esciencecenter.nl/molecular-simulations-using-machine-learning-part-2-1d647acd242c
tags:
  - uncategorized

---

][Aron]·Apr 13, 2023

Subscribe*Remember me for faster sign in

Note that if the intermediate layers were not* equivariant, there would be no way to guarantee invariance at the final layer. Furthermore, it also already makes the model more data efficient, as one training sample automatically teaches it about all the different orderings of that same sample.

Another important consequence of this is that, unlike the fully connected level, we now have a model that works regardless of how many nuclei there are. This is great, because it will allow us to train the model on a small system, and then use it on a larger system.

### Locality, graph neural networks

The above modification does impose permutation invariance, but it was still too restrictive. It treats all the nuclei independently, finally just summing “individual potentials” to obtain the total potential. This is not realistic, we expect the potential to depend also on the distance *between* nuclei, something that this model cannot learn.

We can relax this restriction and at the same time incorporate another physical prior by adding more structure to the input.

The physical principle is locality: what happens at some point x only depends on things close to x. More concretely in this case, the Coulomb potential between two particles at a distance r decreases as 1/r. This means that the interaction between two nuclei that are very far from each other doesn’t have any significant contribution to the potential.

So for nuclei closer to each other than some cutoff distance r_c, we want to take their interaction into account, and we can connect them by an edge. Those that are further away are not connected by an edge. This way we turn the original point cloud input into a graph.

We then extend the operation that previously did the same to all nuclei, to allow it to depend on an atom’s neighbours as well. However, the number of neighbours will be different for different nuclei, and if we allow this to make the output shapes of each atom different things will quickly grow out of hand. So we need a way to combine the neighbours in such a way as to keep the shape independent of the number of neighbours. Furthermore we again have the issue of permutation invariance, now at a smaller local scale. The solution to both problems is the same: we sum over the features of the neighbours.

Illustration of message passing in a graph neural network. An atom c receives “messages” from its neighbours n and updates its state using those. The neighbours at the same time do the same. Multiple steps of this allow the message to propagate further.This is another permutation equivariant operation, now on graph inputs. It is called message passing, because it can be thought of as all of an atom’s neighbours passing messages to the central atom, who adds them all up. Doing this multiple times for all nuclei increases the region to which an atom is sensitive, because in the second step it can indirectly receive messages from its neighbours’ neighbours.

At the end we have to sum over all nuclei again to obtain something invariant to permutations. These types of models are called Graph Neural Networks (GNNs).

### Spatial invariances

While permutation invariance was more about the way we describe the system, how we label the nuclei, the remaining ones are actual spatial transformations: translations, rotations and reflections.

If we move (“translate”) all nuclei in the same direction by the same amount, the interatomic potential doesn’t change. That is, whether we perform an experiment in Amsterdam, or we perform the exact same experiment in New York, the outcome should be the same. And the same holds for rotations and reflections. (If there were any external influence like gravity this would be different, but that is insignificant at the atomic scale.)

As the model is now, it doesn’t know any of this. Building this in to the model makes it a lot more data efficient. From just one training simulation it would learn automatically about all its translations, rotations and reflections.

The simplest way to enforce this is to only give the model inputs that are themselves invariant to these transformations. Clearly, if the inputs are not affected, the output is also not affected.

That means we cannot have an atom’s position as an input by itself, as clearly that is not invariant under any of the transformations. But since we now have a graph, we can focus on *pairs* of nuclei, and take the difference of their positions as an input. That is already invariant with respect to translations: if we add the same vector to both positions, it will cancel out in the difference. It is not yet invariant with respect to rotations or reflections, but if we reduce it further to just the absolute value of the difference, it is.

That does the job, but it is again quite restrictive. Note the parallel here with the permutations we discussed previously: the simplest is to make everything invariant from the start, but it will turn out to be unnecessarily restrictive.

For an example of something that is missed in this approach, consider a central atom with two two of its neighbours. The vectors pointing from the central atom to those two neighbours make up a certain angle to each other. If you think about it, this angle is also invariant with respect to all of the transformations. And it might well be a useful feature that has an effect on the potential that we want the model to represent. But there is no way to reconstruct this angle just from the absolute value of the differences in positions. Had we not thrown away that much information so early on, we *would* be able to recover this angle: it’s related to the inner product between the two vectors.

The angle φ is invariant to translations, rotations and reflections.We could of course add these angles to the input “by hand” and stick to imposing invariance from the start, and there are models that do this. But there are many more features that we are throwing away. A more systematic approach would again be to only impose invariance in the final layer, and keep the others equivariant.

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
