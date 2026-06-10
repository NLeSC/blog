---
layout: post
title: "Help! My C++ web app is not responding"
date: 2020-10-09
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/help-my-c-web-app-is-not-responding-b930ca3034ad
tags:
  - uncategorized

---

Subscribe*Remember me for faster sign in

The code for the worker in `worker.js` is:

The figure below illustrates what is happening in parallel in the two threads.

![Help! My C++ web app is not responding](/assets/help-my-c-web-app-is-not-responding-3600ac79.png)
We can see the code in action [here](https://nlesc-jcer.github.io/run-cpp-on-web/web-worker/example-web-worker.html). The calculation still takes the same time to perform, but as you will notice, the slider remains responsive.

![Help! My C++ web app is not responding](/assets/help-my-c-web-app-is-not-responding-b40b7489.gif)
Responsive UI thanks to offloading the root finding procedure to the web worker.*

## Recap and what next?

In this blog post, we learned how to keep a web app from freezing while executing computationally intensive C++ code. We learned how to create a web worker and how to use the web worker in a simple web app.

Now you can take this web app a step further by reading some of the other blogs in this series, for example [how to interact with your app using forms](https://medium.com/@eScienceCenter/interact-with-your-c-web-app-using-react-forms-543e676a7634) and [how to spice up your app up with visualizations](https://medium.com/@eScienceCenter/spice-up-your-c-web-app-with-visualizations-bcc1e888ec25). A final blog shows you [how to combine all of the above in a single web app](https://medium.com/@eScienceCenter/c-web-app-with-webassembly-vega-web-worker-and-react-1e5b750c88df).

Looking for the first blog and introduction to this series? [This blog post ](/efd78c08469-using-c-in-a-web-app-with-webassembly)will show you how to get started running your C++ on the web using WebAssembly.

## Get in touch with us

This blog was written by the Generalization Team of the Netherlands eScience Center. The team consists of Stefan Verhoeven, Faruk Diblen, Jurriaan H. Spaaks, Adam Belloum and Christiaan Meijer. Feel free to get in touch with the generalization team at [generalization@esciencecenter.nl](mailto:generalization@esciencecenter.nl).

*These blogs were written as part of the “Passing XSAMS” project. To learn more about the project, check out its *[*project page*](https://www.esciencecenter.nl/projects/passing-xsams/)*.*

*Thank you to our proof reader *[*Carlos Martinez-Ortiz*](https://orcid.org/0000-0001-5565-7577)
