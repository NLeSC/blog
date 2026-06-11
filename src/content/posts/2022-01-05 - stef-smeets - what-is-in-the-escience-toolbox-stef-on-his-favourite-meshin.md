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

*Question: Hi Stef, for this blog series we are looking to highlight our developer’s favourite libraries.*

Stef: As research software engineers we always get excited by tools that exactly fit the job that we need it for. For this [Python](https://www.python.org/) library I’m developing, I was looking for a 2D triangle [mesh generator](https://en.wikipedia.org/wiki/Mesh_generation).

*Question: Wait.. wait… Meshes?*

Stef: Meshes simplify image data and describe complex geometries. A mesh is essentially a collection of vertices and triangles. They are used for computer graphics and physical simulations, such as finite element analyses and fluid dynamics.

*Question: Like in computer games?*

Stef: Exactly!

*Question: I have heard* [*CGAL*](https://www.cgal.org/) *is the go-to library for Meshing.*

Stef: CGAL is an excellent choice. It’s written in C++, and provides easy access to efficient and reliable geometric algorithms. Unfortunately, for my purpose, CGAL is a bit heavy-weight, difficult to install on Windows, and lacks an intuitive Python interface.

*Question: So what did you end up using?*

Stef: After having tried a few more meshing libraries, I came across [Triangle](https://www.cs.cmu.edu/~quake/triangle.html). Triangle is an open-source two-dimensional quality mesh generator that supports multiple domains. It’s written in C++ and supports all three major operating systems. It’s lightweight and there is a well-documented [Python API available](https://rufat.be/triangle/API.html).

*Question: Cool, so how do you install it?*

Stef: It’s available on [pypi](https://pypi.org/project/triangle/). If you are already using Python, just do the following:

`pip install triangle`

*Question: That’s great! That will make it easy to integrate it into my existing project. How do you use it?*

Stef: Let me give you an example. Here is the code to generate a simple square and triangulate it:

```hs
import matplotlib.pyplot as pltimport numpy as npimport triangle as tr
vertices = np.array([[0, 0], [1, 0], [1, 1], [0, 1]])inp = {'vertices': vertices}out = tr.triangulate(inp, opts='qa0.05')tr.compare(plt, inp, out)plt.show()
```
![](/assets/1_KwRJMoxH9912dHdBlhYa5Q-edc53a20.png)

Triangle makes it easy to display the results.

*Question: So I see Triangle filling the box with little triangles. How does that work?*

Stef: Alright, let me break it down for you.

First, we import `matplotlib`, `numpy` and `triangle`.

Second, we generate the vertices representing a square with edges of length l and store them in a dictionary.

Next, we call triangulate. The options `opts=qa0.05` tell triangle to perform a quality mesh (`q`), and that no triangles have an area larger than 0.05 (`a0.05`). A quality mesh is a mesh with all angles over 30 degrees.

Finally, triangle has a useful function to compare the input and the output.

Try playing around with the area to see what happens to the result!

*Question: That’s great! For finite element analysis, wouldn’t it be useful to specify different regions?*

Stef: Yes, that is one of the strengths of `triangle`. It makes multi-region meshing easy. This means that it can label triangles according to the region it belongs to.

Let me give you an example:

```hs
vertices = np.array([[0,0], [1,0], [1,1], [0,1]])segments = np.array([[0,1], [1,2], [2,3], [3,0], [1,3]])regions = np.array([
    [0.25, 0.25, 0, 0], 
    [0.75, 0.75, 1, 0],
])inp = {
    'vertices': vertices, 
    'segments': segments, 
    'regions': regions,
}out = tr.triangulate(inp, opts='pqa0.05')tr.compare(plt, inp, out)plt.show()
```
![](/assets/1_j7JqSTDcmkZDdA-1u2QEoA-0bb45cd8.png)

Same input, now divided in two regions.

*Question: Can you explain how it works?*

Stef: The difference here is that we specify the different segments. The segments describe the boundaries of a region inside the square. Triangles will be generated for each region independently. Each region thus contains its own set of triangles, and are labeled accordingly.

The format for defining `regions` can seem a bit tricky at first. For each row, e.g. `[0.75, 0.75, 1, 0]`, the first two numbers describe the coordinate, and the third number is the label of the region. The final number can be used to set the maximum area in that region. We don’t use that here, so we set it to `0`. As before, use the compare function to check the result. And that’s it!

*Question: Wow, I want to start using this now! Where can I learn more?*

Stef: I’m really happy to hear that! If you want to know more, the documentation and examples for triangle are available [here](https://rufat.be/triangle/API.html).

We use `triangle` as the triangle mesh generator in one of our [projects](https://www.esciencecenter.nl/projects/computation-of-the-optical-properties-of-nano-structures/). The code we using it in, `nanomesh`, is a Python workflow tool to prepare meshes for finite element analysis from 2D (and 3D!) microscopy image data.
