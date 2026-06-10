---
layout: post
title: "What is in the eScience toolbox: Stef on his favourite meshing library"
date: 2022-01-05
author: Stef Smeets
published: true
source: medium
source_url: https://blog.esciencecenter.nl/what-is-in-the-escience-toolbox-stef-on-his-favourite-meshing-library-ecccdeaff8eb
tags:
  - 3D
  - API
  - Git
  - NumPy
  - Python
  - Workflows
---

# **What is in the eScience toolbox: Stef on his favourite meshing library**

Subscribe*Remember me for faster sign in

Stef: Alright, let me break it down for you.

First, we import `matplotlib`, `numpy` and `triangle`.

Second, we generate the vertices representing a square with edges of length l and store them in a dictionary.

Next, we call triangulate. The options `opts=qa0.05` tell triangle to perform a quality mesh (`q`), and that no triangles have an area larger than 0.05 (`a0.05`). A quality mesh is a mesh with all angles over 30 degrees.

Finally, triangle has a useful function to compare the input and the output.

Try playing around with the area to see what happens to the result!

Question: That’s great! For finite element analysis, wouldn’t it be useful to specify different regions?*

Stef: Yes, that is one of the strengths of `triangle`. It makes multi-region meshing easy. This means that it can label triangles according to the region it belongs to.

Let me give you an example:

vertices = np.array([[0,0], [1,0], [1,1], [0,1]])segments = np.array([[0,1], [1,2], [2,3], [3,0], [1,3]])regions = np.array([
    [0.25, 0.25, 0, 0], 
    [0.75, 0.75, 1, 0],
])inp = {
    'vertices': vertices, 
    'segments': segments, 
    'regions': regions,
}out = tr.triangulate(inp, opts='pqa0.05')tr.compare(plt, inp, out)plt.show()
![What is in the eScience toolbox: Stef on his favourite meshing library](/assets/what-is-in-the-escience-toolbox-stef-on--39e8c9af.png)
Same input, now divided in two regions.*Question: Can you explain how it works?*

Stef: The difference here is that we specify the different segments. The segments describe the boundaries of a region inside the square. Triangles will be generated for each region independently. Each region thus contains its own set of triangles, and are labeled accordingly.

The format for defining `regions` can seem a bit tricky at first. For each row, e.g. `[0.75, 0.75, 1, 0]`, the first two numbers describe the coordinate, and the third number is the label of the region. The final number can be used to set the maximum area in that region. We don’t use that here, so we set it to `0`. As before, use the compare function to check the result. And that’s it!

*Question: Wow, I want to start using this now! Where can I learn more?*

Stef: I’m really happy to hear that! If you want to know more, the documentation and examples for triangle are available [here](https://rufat.be/triangle/API.html).

We use `triangle` as the triangle mesh generator in one of our [projects](https://www.esciencecenter.nl/projects/computation-of-the-optical-properties-of-nano-structures/). The code we using it in, `[nanomesh](https://github.com/hpgem/nanomesh)`, is a Python workflow tool to prepare meshes for finite element analysis from 2D (and 3D!) microscopy image data.
