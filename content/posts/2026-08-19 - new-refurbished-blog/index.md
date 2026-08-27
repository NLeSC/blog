---
layout: post
title: "New, refurbished blog"
author: eScience Editorial Team
published: true
tags:
  - Announcement
---

Goodbye, Medium! Our blog is now self-hosted!

![Photo by Mantas Hesthaven on Unsplash](./0_euevYqprJJrV2a6t.jpg)

Dear readers,

In the spirit of open science, we decided to leave Medium as our blogging platform. **Since today, our blog is fully owned by us and 100% freely accessible**. No paywalls, no restrictions. The posts' source is now markdown-based plain text. We are hosting it in [this public repository](https://github.com/NLeSC/blog), and rendering it via GitHub actions.

In order to make it future-proof, we are following a decoupled architecture: content and aesthetics are independent; so migrating the content or modifying the aesthetics is painless. We chose [Astro](https://astro.build/), an open-source static website generator, as the software that puts everything together. 

In the near future we'll release a blogpost about our reasons and technical details behind this refurbishment.

### Does it affect me?
Most likely not, unless:

- You subscribed to us via Medium. If that's the case, please be aware you'll stop receiving updates. If you want to keep following us, we recommend that you subscribe to our [RSS feed](https://blog.esciencecenter.nl/rss.xml), or follow our socials ([Bluesky](https://bsky.app/profile/esciencecenter.bsky.social), [Mastodon](https://akademienl.social/@eScienceCenter), [LinkedIn](https://www.linkedin.com/company/netherlands-escience-center/?viewAsMember=true)). 
- You want to author a blogpost. This is actually easier than before. Now you can [submit your draft](https://github.com/NLeSC/blog/pulls) through a pull request.

**For everyone else, the change should be automatic and painless**. The usual URL, [blog.esciencecenter.nl](https://blog.esciencecenter.nl), now points to the new backend. We cloned all the content to the new version. The URLs of the cloned blogposts are preserved, and so is the URL of the RSS feed. To be even safer, the original old posts will remain available at https://medium.com/escience-center/.

To summarize, chances are that without the announcement you are currently reading, you probably wouldn't have even noticed the change!

## A call for help
Of course, we could have missed something. Please let us know if you notice that something is off. You can do so by opening a [pull request](https://github.com/NLeSC/blog/pulls) or contacting editors@esciencecenter.nl.

Happy blogging!
