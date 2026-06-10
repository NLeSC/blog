---
layout: post
title: "Spice up your C++ web app with visualizations"
date: 2020-10-09
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/spice-up-your-c-web-app-with-visualizations-bcc1e888ec25
tags:
  - C++
  - Git
  - Python
  - Visualization
---

Subscribe*Remember me for faster sign in

The generic structure of our Vega-Lite specification looks like this:

To render a specification we need to use the `vegaEmbed(element, spec)` method which accepts an HTML element and a Vega-Lite specification.

Combining the three snippets above (get iteration data, Vega specification and vegaEmbed) and filling in their respective details yields an HTML document with the complete web app:

File: scatter.html*

We’ll need a web server to display the HTML page in a web browser. For this, we’ll use the `http.server` module from Python 3 again to host all files on port 8000, like so:

python3 -m http.server 8000When we visit the web page at [http://localhost:8000/scatter.html](http://localhost:8000/scatter.html), we will be greeted by the following plot. We can zoom with the mouse wheel and pan by dragging. Hovering over a point shows a tooltip with relevant data at that point.


](https://nlesc-jcer.github.io/run-cpp-on-web/vega/scatter.html)(Click on image to get interactive version)

## Advanced plot

In the first blog of this series we plotted the equation and root as

It would be nice to write a specification of this plot together with the iterations that the root finding algorithm went through. Vega-Lite can superimpose one chart on top of another with the keyword. Let’s construct each layer separately and then superimpose them at the end.

The 2x³ — 4x² + 6 equation is plotted by using a [sequence generator](https://vega.github.io/vega-lite/docs/data.html#sequence) to generate a range of `x` values and a [formula transform](https://vega.github.io/vega-lite/docs/calculate.html) is used to calculate the `y` values.

To show where the root is, we draw a dotted vertical line using a [rule marker](https://vega.github.io/vega-lite/docs/rule.html) at `x = -1` and label it `root` with a [text marker](https://vega.github.io/vega-lite/docs/text.html).

When we plot the `x` and `y` of each iteration we can no longer see the order of iterations, so we will use a text marker above each circle to indicate which iteration it belongs to.

Superimpose the equation line, root ruler, and iteration scatter into a single visualization with:

The HTML page with all JavaScript put together to make a composite plot is available [here](https://github.com/NLESC-JCER/run-cpp-on-web/blob/master/vega/app.html).

Visiting the page should give us a plot like


](https://nlesc-jcer.github.io/run-cpp-on-web/vega/app.html)(Click on image to get interactive version)

## Wrap up

In this blog we have learned how to get complex data types from a WebAssembly module using Emscripten bindings and how to write a Vega-Lite specifications to get interactive visualizations.

Other blogs of the series that might be of interest

* [Help! My C++ web app is not responding](https://medium.com/@eScienceCenter/help-my-c-web-app-is-not-responding-b930ca3034ad)
* [Interact with your C++ web app using React forms](https://medium.com/@eScienceCenter/interact-with-your-c-web-app-using-react-forms-543e676a7634)

We’ll wrap up the series in a [final blog](https://medium.com/@eScienceCenter/c-web-app-with-webassembly-vega-web-worker-and-react-1e5b750c88df) that combines the topics of the whole series in a full-featured web application.

This blog was written by the Generalization Team of the Netherlands eScience Center. The team consists of Stefan Verhoeven, Faruk Diblen, Jurriaan H. Spaaks, Adam Belloum and Christiaan Meijer. Feel free to get in touch with the generalization team at [generalization@esciencecenter.nl](mailto:generalization@esciencecenter.nl).

If you enjoyed this article, leave a comment and give us a clap!

*These blogs were written as part of the “Passing XSAMS” project. To learn more about the project, check out its *[*project page*](https://www.esciencecenter.nl/projects/passing-xsams/)*.*
