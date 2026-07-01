---
layout: post
title: "Help! My C++ web app is not responding"
date: 2020-10-09
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/help-my-c-web-app-is-not-responding-b930ca3034ad
tags:
  - C++
  - Git
  - Parallel Computing
  - Visualization
---

*By* [*Stefan Verhoeven*](https://orcid.org/0000-0002-5821-2060)*,* [*Christiaan Meijer*](https://orcid.org/0000-0002-5529-5761)*,* [*Faruk Diblen*](https://orcid.org/0000-0002-0989-929X)*,* [*Jurriaan H. Spaaks*](https://orcid.org/0000-0002-7064-4069)*, and* [*Adam Belloum*](https://orcid.org/0000-0001-6306-6937)*.*

In an [earlier blogpost](https://medium.com/@eScienceCenter/using-c-in-a-web-app-with-webassembly-efd78c08469) we discussed how to run C++ code on the web using JavaScript. We created a web app that executed some C++ code and then showed the result in the browser. While the page was running the C++ code, the page was blocked and unresponsive. This was not noticeable, because the computation done in the code was very quick. An unresponsive User Interface (UI) becomes a problem when we are performing tasks that take a bit longer to run.

*How to prevent blocking when running long running tasks in C++?*

In this blog post, we will use web workers to solve this problem by offloading tasks to another thread.

## Long-running tasks with web worker

Let’s have a look at the code we ended up with in the [first blog](https://medium.com/@eScienceCenter/using-c-in-a-web-app-with-webassembly-efd78c08469) of the series. When loading the page, the WebAssembly code is executed, after which the page can finish rendering. Because the WebAssembly code was very quick, this was fine. For the current blog, we assume we have a longer running task. We create such a task artificially, by adding a few seconds of `sleep` in the [C++ code](https://github.com/NLESC-JCER/run-cpp-on-web/blob/master/web-worker/newtonraphson.cpp). Like in the first post of the series, we compile the C++ code to create WebAssembly code. The example page with our slow task can be found [here](https://nlesc-jcer.github.io/run-cpp-on-web/web-worker/example-blocking.html).

Notice that we also added a slider to the page. This slider simply serves to illustrate UI unresponsiveness — it has no attached function. Notice that while the WebAssembly code is still running, the slider is completely blocked. If this was an actual web app and not just a demo, the blocked UI would surely annoy users and possibly make working with the app cumbersome and impractical. We can easily solve this, and keep the UI responsive at all times, using web workers.

![](/assets/1_GFkQlI6sOZUxjhbEE8U5UQ-0fc27ea2.gif)

Blocked UI while code is running.

## Web workers

A [web worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is an object that handles execution of a piece of code in another thread.

The way the page communicates with the worker object is through sending messages. The page will send a message to the worker to start doing work, and the message will include all data that the worker needs. The worker then starts executing the task, using only the data that was in the message. When finished, the worker needs to communicate the results back to the web app. It will do this by sending a message, so the web app knows when to update.

## The resulting page

The code snippet below shows the web page that uses a web worker. Notice the creation of the `Worker` object, posting of the message, as well as the instructions for handling of any returned messages containing results.

The web worker code only contains handling of the incoming message. The web worker unpacks the message, does the root finding calculation, and packs the results in a new message that it will send back.

The code for the worker in `worker.js` is:

The figure below illustrates what is happening in parallel in the two threads.

![](/assets/1__Knkh9aTq85_WNvyZjRPlQ-ad4c9f5c.png)

We can see the code in action [here](https://nlesc-jcer.github.io/run-cpp-on-web/web-worker/example-web-worker.html). The calculation still takes the same time to perform, but as you will notice, the slider remains responsive.

![](/assets/1_efp-XCZJWs0yNveDPrq38w-bdc1dd9c.gif)

Responsive UI thanks to offloading the root finding procedure to the web worker.

## Recap and what next?

In this blog post, we learned how to keep a web app from freezing while executing computationally intensive C++ code. We learned how to create a web worker and how to use the web worker in a simple web app.

Now you can take this web app a step further by reading some of the other blogs in this series, for example [how to interact with your app using forms](https://medium.com/@eScienceCenter/interact-with-your-c-web-app-using-react-forms-543e676a7634) and [how to spice up your app up with visualizations](https://medium.com/@eScienceCenter/spice-up-your-c-web-app-with-visualizations-bcc1e888ec25). A final blog shows you [how to combine all of the above in a single web app](https://medium.com/@eScienceCenter/c-web-app-with-webassembly-vega-web-worker-and-react-1e5b750c88df).

Looking for the first blog and introduction to this series? [This blog post](https://blog.esciencecenter.nl/efd78c08469-using-c-in-a-web-app-with-webassembly) will show you how to get started running your C++ on the web using WebAssembly.

## Get in touch with us

This blog was written by the Generalization Team of the Netherlands eScience Center. The team consists of Stefan Verhoeven, Faruk Diblen, Jurriaan H. Spaaks, Adam Belloum and Christiaan Meijer. Feel free to get in touch with the generalization team at [generalization@esciencecenter.nl](mailto:generalization@esciencecenter.nl).

*These blogs were written as part of the “Passing XSAMS” project. To learn more about the project, check out its* [*project page*](https://www.esciencecenter.nl/projects/passing-xsams/)*.*

*Thank you to our proof reader* [*Carlos Martinez-Ortiz*](https://orcid.org/0000-0001-5565-7577)
