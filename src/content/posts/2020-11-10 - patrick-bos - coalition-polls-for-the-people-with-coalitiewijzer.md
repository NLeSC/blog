---
layout: post
title: "Coalition polls for the people with Coalitiewijzer"
date: 2020-11-10
author: Patrick Bos
published: true
source: medium
source_url: https://blog.esciencecenter.nl/coalition-polls-for-the-people-with-coalitiewijzer-68bca83b95e7
tags:
  - Git
  - Python
  - Visualization
---

## Build interactive web apps with polling data, Voilà &amp; Heroku

My first attempt at actual visualization was to make another grid, but this time consisting of 150 HTML widgets, one for each seat. Then we can adjust `on_toggle` to modify the `value` attribute of each HTML widget, which is the character it displays. This gives us a poor man’s ASCII based seats visualization (see the [explore_things notebook on GitHub](https://github.com/egpbos/coalitiewijzer/blob/main/explore_things.ipynb) for the code). I was already pretty happy at this point…

![Coalition polls for the people with Coalitiewijzer](/assets/coalition-polls-for-the-people-with-coal-beb03350.png)

### Fancy Vuetify widgets

However, to make sure I wasn’t reinventing the wheel in the form of a square block of granite, I asked [Maarten Breddels], who is strongly involved in ipywidgets development, whether he knew of any existing options in the landscape of available widgets.

He helped me set up a really fancy seats widget using [ipyvuetify](https://ipyvuetify.readthedocs.io/), an alternative widget library built by [Mario Buikhuizen] on top of ipywidgets using the [Vuetify](https://vuetifyjs.com/en/) Javascript UI library, a Vue library.

I won’t go into Vue here, because I don’t know much about it myself, except that it is a web framework like React. Apparently, though, it is not that hard to write Vue template based widgets. Vue templates have their own programming syntax with for-loops, conditionals and other useful stuff. What Maarten then came up with was something like this:

from ipyvuetify import VuetifyTemplate
import traitletsclass PartyWidget(VuetifyTemplate):
    rows** = traitlets.Int(10).tag(sync=True)**    cols** = traitlets.Int(15).tag(sync=True)**    low** = traitlets.Int(0).tag(sync=True)**    exp** = traitlets.Int(0).tag(sync=True)**    high** = traitlets.Int(0).tag(sync=True)**    template = traitlets.Unicode('''
&lt;template&gt;
  &lt;div&gt;
  &lt;table&gt;&lt;tr v-for="i in rows"**&gt;**&lt;td v-for="j in cols"**&gt;**    &lt;div&gt;&lt;v-icon v-if="(j + i * cols) &lt; low"**&gt;mdi-seat*&lt;/v-icon&gt;**&lt;v-icon v-else-if="(j + i * cols) &lt; exp"
              style="color: orange"&gt;***mdi-seat*&lt;/v-icon&gt;**&lt;v-icon v-else-if="(j + i * cols) == exp" style="color: green"&gt;*mdi-seat*&lt;/v-icon&gt;&lt;v-icon v-else-if="(j + i * cols) &lt; high" style="color: red"&gt;*mdi-seat*&lt;/v-icon&gt;&lt;v-icon v-else** style="color: pink"&gt;*mdi-seat*&lt;/v-icon&gt;**    &lt;/div&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
  &lt;/div&gt;
&lt;/template&gt;
''').tag(sync=True)

pw = PartyWidget()**Let’s break that down, looking at the bold-face parts especially. The first, Pythonic part of the class defines five `traitlets` properties which we’re going to use to interactively change things. We use 10 rows and 15 columns here, giving a total of 150 seats. We can use the three other numbers `low`, `exp` and `high` for showing the expected number of seats estimates and the lower and higher uncertainty region boundaries.

Then comes the Vue magic in some kind of generative dialect of HTML. We’re going to generate a table with rows and columns using the `v-for` attribute which automatically generates a bunch of them.

Then, inside the table cells, we use a bunch of fancy seat icons, `*mdi-seat*`, with if/else conditionals with the `v-if` and `v-else-if` attributes. The point here is that we want to create different looking seats to indicate the expected number of seats and the lower and upper boundaries. We can simply use CSS style attributes for this.

Finally, we create an instance of the class. With that in hand, we can now put our `on_toggle` function to better use by modifying the PartyWidget `pw`’s values on each trigger:

def on_toggle(**toggles):**    pw.low  = int(numbers[list(toggles.values())].ZetelsLaag.sum())
    pw.exp  = int(numbers[list(toggles.values())].Zetels.sum())
    pw.high = int(numbers[list(toggles.values())].ZetelsHoog.sum())And that’s it! Now when we `display(pw)` our fancy new widget and the button grid with `interact_out` as before, we get something like this:

![Coalition polls for the people with Coalitiewijzer](/assets/coalition-polls-for-the-people-with-coal-f8399c3a.png)
Fancy McSchmancyton!

And what is even more amazing (as you can experience [in the actual live app](https://coalitiewijzer.herokuapp.com/)): the changing of CSS properties is animated! The colors smoothly change from one to the next when you click a button. The same goes for other properties like opacity and even rotation. All this comes for free with ipyvuetify (I guess with Vuetify itself as well).

## Voilà

So, now we have a fancy interactive addition visualizer. However, it is in a notebook, which I do not want to share with my non-data scientist friends.

Enter Voilà.

[Voilà](https://github.com/voila-dashboards/voila/) is essentially a Jupyter Notebook server, with one big difference: it *only displays the output*** of running all the cells. Converting from a notebook to an actual app is just a matter of one command:

voila your_notebook.ipynbJust like with Jupyter notebook, this starts up a server and opens a webpage in your browser showing the output of cells, including the widgets you created (if you put `display` commands in).

An active Python kernel is still running secretly in the background, though. This means you can still use the interactive functionality you setup between the widgets. You just cannot touch the code anymore. And this is exactly what we want when deploying our widgets as a user-facing interactive app.

Since this Python kernel does all the magic of updating and connecting the widgets behind the scenes, unfortunately we cannot do without. I’m hoping one day there will be a static page output option, but I guess that basically requires a Python to Javascript or webassembly transpiler… [Could be lots of fun](/using-c-in-a-web-app-with-webassembly-efd78c08469), but we’re not there yet, I’m afraid.

## Deploying on Heroku

So, if we want to put this app on the web, we need a place to host the Voilà server. If you happen to run your own server, that’s great ([here’s the guide on how to setup Voilà to run from there](https://voila.readthedocs.io/en/stable/deploy.html#running-voila-on-a-private-server)). If you don’t, read on (or, again, read the Voilà guide itself, which is what I did).

Deploying on Heroku is a really easy way to get online apps going quickly and free of charge (with limits, of course), which makes it ideal for testing. There’s even an official [guide on how to deploy a Voilà server on Heroku](https://voila.readthedocs.io/en/stable/deploy.html#deployment-on-heroku). There’s just a few catches to be aware of.

First, it’s good to notice this [really weird piece of Heroku documentation](https://devcenter.heroku.com/articles/python-pip#scientific-python-users):

![Coalition polls for the people with Coalitiewijzer](/assets/coalition-polls-for-the-people-with-coal-6b0211fc.png)
“obscure” :DOkay, fine, I can pickle the necessary Peilingwijzer data and only use Python standard library functionality, instead of Pandas, numpy, matplotlib and some other weird and arcane packages that I’m sure nobody except me uses. I put this [conversion process in this script](https://github.com/egpbos/coalitiewijzer/blob/main/update_numbers.py).

Second, I ran into [a weird error](https://stackoverflow.com/questions/62618948/heroku-voila-app-error-process-exited-with-status-1), which was already documented earlier by someone on Stack Overflow. The Heroku app, despite the straightforward setup procedure, would not immediately run. Luckily the [solution was found in another repo](https://github.com/voila-dashboards/voila-heroku).

So with those things in mind, after rewriting things to make use of as little scientific Python packages as possible putting the app on Heroku was a matter of following the steps in the [Voilà Heroku deployment guide](https://github.com/egpbos/coalitiewijzer/blob/main/update_numbers.py):

* [Login using the Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-python#set-up) on your machine
* Add a `runtime.txt` file to your project/repo directory containing only a line with the Python runtime, which I set to `python-3.9.0`.
* Add a `Procfile` file to the directory containing the following line: `web: voila --port=$PORT --no-browser --enable_nbextensions=True your_notebook.ipynb`.
* Commit these files, a requirements.txt file with Python dependencies and the notebook to a git repo, if you haven’t done so yet.
* Create a Heroku app and push your code to it:

heroku create [appname]
git push heroku master[And then, just like that, you are live](https://coalitiewijzer.herokuapp.com/)! You can open the app in your browser using `heroku open`, or just click the link. If you omit the app name in the `heroku create` command, Heroku will randomly generate a name for you. The name can be important, since it determines your URL, which will be [appname].herokuapp.com. You can change it later on, though.

Note that when you want to use a different clone of your repo to update your existing app (e.g. when coding on different machines), you have to reconnect Heroku to your app. If you would just run `heroku create` again, it would create a new app. To connect the repo to the existing app, run

heroku git:remote -a [appname]The `[appname]` is the part of the app’s URL in front of herokuapp.com. You can also find it by running `heroku apps` on your command line, which gives you a list of all your apps.

So, if you hadn’t done so already, check out the resulting Coalitiewijzer app at [https://coalitiewijzer.herokuapp.com/](https://coalitiewijzer.herokuapp.com/) and let me know what you think!

For those that don’t like discussing on Medium: [Reddit thread here](https://www.reddit.com/r/Python/comments/jrjegk/built_a_voila_webapp_from_jupyter_with_a_fancy/) and [Twitter here](https://twitter.com/eScienceCenter/status/1325755219142201350).

This was my first time putting ipywidgets, Voilà and Heroku to use and I was really pleasantly surprised with how smooth all of them work. If you’re used to working in Jupyter notebooks, it’s an actual breeze to break out your exploration or visualization or other fun nugget of knowledge into something non-developers can also make good use of.

It just so happens that this time I needed it to scratch a politics itch, but I can see this workflow being very useful for science communication as well. I’ll definitely be using it again. Let me know what you built with it!
