---
layout: post
title: "Forget about Jupyter Notebooks — showcase your research using Dashboards"
date: 2022-05-04
author: Stef Smeets
published: true
source: medium
source_url: https://blog.esciencecenter.nl/forget-about-jupyter-notebooks-showcase-your-research-using-dashboards-5d13451ba374
tags:
  - 3D
  - API
  - Git
  - Optimization
  - Performance
  - Python
---

SubscribeRemember me for faster sign in

The snippet below generates some data (a normal distribution), fits it, and creates a [matplotlib](https://matplotlib.org/) plot out of it. It takes three parameters, `mu_in`, `std_in`, and `size`.

My cool python script 😎

![Forget about Jupyter Notebooks — showcase your research using Dashboards](/assets/forget-about-jupyter-notebooks-showcase--a0b23d8a.png)
A normal plot

## …to a fancy dashboard

Let’s turn this into an interactive dashboard in four simple steps:

* `import streamlist as st` 😅
* Add a title using `[st.title](https://docs.streamlit.io/library/api-reference/text)`
* Turn the input parameters into interactive sliders using `[st.slider](https://docs.streamlit.io/library/api-reference/widgets)`
* Tell streamlit about our plot using `[st.pyplot](https://docs.streamlit.io/library/api-reference/charts)`

Note that we do not have to change any of the data generation, fitting, or plotting code!

Now as a dashboard 🐱‍💻

Then run the dashboard using:

streamlit run my_dashboard.pyThis will start a server, and the dashboard can be accessed through the browser (much like a Jupyter Notebook).

![Forget about Jupyter Notebooks — showcase your research using Dashboards](/assets/forget-about-jupyter-notebooks-showcase--909c1674.png)
A fancy dashboard

## How does this work?

The way Streamlit works is quite interesting. Everytime a slider is moved, a box is checked, or a button is pressed, Streamlit triggers a re-run of the script. The input values are updated. The javascript back-end keeps track of the values.

This means that the code itself executes linearly. In my view, this simplicity is what sets it apart. There is no need for any callbacks or complex flow controls. Your python scripts runs from top-to-bottom. This makes it easy to reason about the code. And with minimal modifications to the python code, any script can be turned into a dashboard.

Are there any downsides? Yes. Because streamlit re-runs the entire script on every update, it can feel a bit slow. Especially when updating a large number of plots. It can also get stuck on long-running functions. For performance optimizations, streamlit has some options to [cache the result](https://docs.streamlit.io/library/api-reference/performance).

## Plotting libraries

The example above uses [matplotlib](https://matplotlib.org/) for the plots. Matplotlib has been the go-to plotting library for Python for many for a long time. It has been around for nearly two decades, and it is tighly integrated in the scientific python stack.

If you are familiar with matplotlib, you will know that it is great for making making publication quality plots. You will also know that making interactive plots can be a hassle.

Streamlit supports these libraries:

* [matplotlib](https://matplotlib.org/)
* [altair](https://altair-viz.github.io/)
* [bokeh](https://bokeh.org/)
* [plotly](https://plotly.com/python/)
* [seaborn](https://seaborn.pydata.org/)
* [PyDeck](https://deckgl.readthedocs.io/en/latest/layer.html)
* [GraphViz](https://github.com/xflr6/graphviz)

Modern plotting libraries like [plotly](https://plotly.com/python/), [bokeh](https://bokeh.org/), and [altair](https://altair-viz.github.io/) render directly to javascript. This means they are built for the web, and interactivity is built-in. This makes them better suited for web-apps. If you are going to make a dashboard, I recommend checking out one of these alternatives.

## Sharing your dashboard

Alright, so now that we have made a fancy looking dashboard, so that anyone can play with the data. How do we make it available?

Streamlit uses a host/server model, which means you can run it on your own server.

Easier is to use the [streamlit cloud](https://streamlit.io/cloud) to host your dashboard (it’s free for students and open-source projects). I found this also quite straightforward to set up. All I had to do was to create a [repository on github](https://github.com/stefsmeets/dashboard_blog) with the code and a requirements file.

Then I logged into [streamlit cloud](https://share.streamlit.io/) using the Github SSO, and started a new app pointing at my repo and code.

[Click here](https://share.streamlit.io/stefsmeets/dashboard_blog/main) for the result! 🥳

## Final remarks

In this blog post, I introduced streamlit and showed how it can be used to turn a python script into a dashboard, and host it online. An excellent way to showcase your research to a non-technical audience, if you ask me. The linear execution model makes it straightforward to adapt existing scripts. The code does not get in the way, and the result looks awesome.

So next time you want to present some data in a notebook, consider using a dashboard instead.

All the code in this blog post is available from [Github](https://github.com/stefsmeets/dashboard_blog).
