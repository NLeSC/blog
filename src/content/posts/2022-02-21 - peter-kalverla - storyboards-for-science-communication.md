---
layout: post
title: "Storyboards for science communication"
date: 2022-02-21
author: Peter Kalverla
published: true
source: medium
source_url: https://blog.esciencecenter.nl/storyboards-for-science-communication-85e399e5c1b5
tags:
  - API
  - Databases
  - Git
  - Python
  - RSE
  - Science Communication
---

![Storyboards for science communication](/assets/storyboards-for-science-communication-9276e748.png)

# Storyboards for science communication

## A modern publication format for the hybrid metaverse

][Peter Kalverla]·Feb 21, 2022**Subscribe*Remember me for faster sign in

We stumbled upon the storyboard layout for [R’s flexdashboard](https://pkgs.rstudio.com/flexdashboard/articles/using.html#storyboards) and a great [dashboard example](https://medium.com/@olivier.borderies/dashboarding-with-nuxt-vue-5b3bb0fc048e) created in [Nuxt](https://nuxtjs.org/). R’s ability to write code blocks, the output of which is shown on the storyboards is really cool! But we wanted something that was not limited to R (or Python, for that matter) and for which we didn’t need to run a server. Perhaps the Nuxt example was closer to our objective after all. As its author explained, this approach is more involved than typical Python (or R, …) dashboarding libraries, but this makes it much more flexible in the long run. We agree, and decided to give it a try.

### The Jamstack in a nutshell

Web design is hot, but perhaps not quite as hot in academia as outside it. Therefore, I think it might help to briefly introduce the [Jamstack](https://jamstack.org/). JAM is short for J**avascript, **A**PIs and **M**arkup. Jamstack sites consist of static web pages that offer a dynamic experience by fetching content from (external) APIs, either during a build step or in the user’s browser during execution.

Source: [https://www.sanity.io/jamstack-cms](https://www.sanity.io/jamstack-cms)Perhaps more than its architecture the Jamstack stands for a modern web development [philosophy](https://jamstack.org/what-is-jamstack/). One of the central ideas is that specialized services are operated by specialists. So instead of setting up your own weather server, fetch your data from [OpenWeather](https://openweathermap.org/api). Want to create a music library? Connect to the [Spotify API](https://developer.spotify.com/documentation/web-api/). Instead of hosting your own maps, why not get them from [OpenStreetMap](https://openweathermap.org/api). And if you’re bored you can simply [lookup a joke](https://sv443.net/jokeapi/v2/). All you really have to do is build a nice user interface (or front-end) that can talk to these APIs. This makes the Jamstack extremely flexible.

### Nuxt

The popularity of the Jamstack goes hand in hand with the proliferation of Javascript frameworks and static [site generators](https://jamstack.org/generators/). We chose to use [NuxtJS](https://nuxtjs.org/). Nuxt helps you to set up a project with a good choice of default settings, a folder structure following best practices, and all other things you need. Your write your application in custom `.vue`-files (as Nuxt is a based on [Vue,](https://vuejs.org/) itself one of these Javascript framework). Nuxt then bundles and compiles your source code into standard HTML, CSS and Javascript that is understood by the browser. There are several other frameworks like Nuxt ([Next](https://nextjs.org/), [Jekyll](https://jekyllrb.com/), …), but we won’t explain all of them in detail. We find Nuxt to be relatively user-friendly to unexperienced users.

When starting a Nuxt project, you are presented with a number of choices. In addition to the name of the application and so on, you can choose to set up your project with a number of popular libraries. We chose to use [nuxt/content](https://content.nuxtjs.org/) for authoring stories and [tailwindcss](https://tailwindcss.com/) for styling the site.

### Separating content and front-end

We wanted to make it as easy as possible to write stories. Story authors should not have to worry about Nuxt or Vue or Javascript or CSS or even HTML. One way to achieve this is to store the stories in a database or [headless CMS](https://jamstack.org/headless-cms/). But to many a scientist, the idea of setting up servers or databases is daunting. And while there are platforms that offer easy content management solutions, you quickly run into paid plans when you want to add more than a few editors.

An alternative is to store the content on GitHub, together with the source code of the web application. We found this acceptable, as long as there is a very clear separation between the stories (content) and the rest of the source code. This is where we use `nuxt/content`.

Nuxt/content enables you to write markdown files which are then inserted into your site. This library is geared towards blogging and it is indeed great for that purpose. In line with the Jamstack philosophy it makes the content folder act as a dedicated API that you can fetch stories from.

One thing that we struggled with was that nuxt/content [doesn’t easily allow](https://github.com/nuxt/content/issues/651) you to store images that belong to your posts in the same folder. Eventually we made this work by changing the content [directory ](https://content.nuxtjs.org/configuration#dir)setting to `/static/stories/`, and we compromised by storing the images (and other content) in a subdirectory like `/_example-story`.

The other challenge with nuxt/content was that we wanted to split our story into chapters. There is no default markdown syntax for ‘sectionizing’ your content. However, you can [use plugins](https://content.nuxtjs.org/configuration#markdownremarkplugins) to extend the way the markdown is parsed and converted into HTML. We decided to use the [remark-directive](https://github.com/remarkjs/remark-directive) plugin*. This is the closest we could find to a standard for adding custom elements to markdown. This is where the `:::Chapter{}` syntax originates.

*NB. We had to use an older version of this plugin for compatibility with the other nuxt/content modules.*

### **Core elements of the front-end**

Our storyboards app consists of only 2 pages. The index page with the overview of all stories, and the storyboard page that allows you to browse through the chapters of a story. In both cases, the stories are fetched using nuxt/content and saved into a variable called `story`* *or `stories`. Subsequently each chapter (or story) is added to the page — something like this:

`&lt;div v-for="chapter in story"&gt;...&lt;/div&gt;`

One characteristic feature of Javascript frameworks is the use of [components](https://developer.mozilla.org/en-US/docs/Web/Web_Components). An example where we use this is in the overview of all stories. Every story presented there is shown as a card, and for that we use a component called StoryCard. It is defined in `/components/StoryCard.vue`. On our index page, we add one StoryCard for each story, passing the relevant story data into the component: the title, author, thumbnail and URL.

`&lt;StoryCard v-for="story in stories :title="story.title" ... /&gt;`

Four StoryCards displayed on our storyboard collectionOne more thing to note is that our story page is called `_story.vue`*. *The leading underscore tells nuxt/content to create one of these pages for each of the stories found in the content folder (`/static/stories` in our case). Additionally, the URL for each story follows the name of the markdown file, so `/static/stories/example-story.md` will (in our case) be published at https://eucp-project.github.io/storyboards/example-story.

### Styling with tailwind

As mentioned before, we chose to use tailwindcss to style our page. It defines a (large) number of classes that make it easier to style your webpage. If you want to try and edit the layout of the storyboards, don’t forget to check out the tailwind docs.

Apart from tailwind itself, we also use [tailwind typography](https://tailwindcss.com/docs/typography-plugin). This plugin provides a class called *prose* which automatically applies a number of defaults that make a lot of sense for content like blogposts. Be sure to recognize it when you come across it.

### Hosting on GitHub pages

The final step for making the site work is setting it up with GitHub pages. Nuxt has a [great documentation page](https://nuxtjs.org/deployments/github-pages/) about this, so we’ll just highlight a few points.

We use a GitHub Actions workflow to build the site whenever we push to the *main* branch. This action automatically pushes the generated site (the `dist` folder) to the github-pages branch of the repository. Note that our version of `.github/workflows/cd.yml` deviates slightly from the example, as we only rebuild on pushes to main, as opposed to every push or pull-request. We have also set up [branch protection rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule) to make sure there is always an approving review before anything gets merged into the main branch.

Since we are hosting our page from the GitHub repository (as opposed a GitHub organization or person), we had to set the `router base` to `/storyboards/`. This is one of the settings you may need to change if you build your own version of the storyboards.

A final thing to note is that we have added a routing middleware and a custom 404 page following the workaround [suggested here](https://medium.com/geekculture/github-pages-with-dynamic-routes-40f512900efa) to make GitHub pages recognize the URLs to the different pages of our site.

### Conclusion

Researchers produce many awesome results, but sometimes lack the means to disseminate them to a wide audience. Modern frameworks make it relatively straightforward to set up a web application tailored to scientific content. If you are, like me, procrastinating on a Friday afternoon — why don’t you give it a try?
