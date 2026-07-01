---
layout: post
title: "Making LLMs Work for Science: How AI-Powered Storytelling Helps Researchers Communicate Their Software"
date: 2026-02-26
author: Jesse Gonzalez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/making-llms-work-for-science-how-ai-powered-storytelling-helps-researchers-communicate-their-639cc6664dc2
tags:
  - 3D
  - API
  - Citation
  - Community
  - Environment
  - Git
---

Large language models get a lot of attention in research for what they might replace. We wanted to explore what they can enable: better, faster scientific communication that actually reaches the right audiences.

![](/assets/1_d1EFyNcb4difLC1_5QkMvg-a2755dce.png)

Welcome page on the storytelling application.

*Authors:* [*Jesse González*](https://www.esciencecenter.nl/team/jesse-gonzalez/)*,* [*Pablo Rodríguez*](https://www.esciencecenter.nl/team/pablo-rodriguez-sanchez/)*,* [*Kody Moodley*](https://www.esciencecenter.nl/team/kody-moodley/)*  
Application:* [https://nlesc.github.io/data-storytelling](https://nlesc.github.io/data-storytelling/)

There’s an ongoing conversation in the research community about large language models. Most of it focuses on risks: hallucinations, bias, the worry that generated text might replace genuine scholarly work. Those concerns are valid and worth taking seriously.

But there’s another side to this conversation that doesn’t get enough attention. LLMs can be genuinely useful tools when they’re pointed at the right problems, with the right constraints and the right human oversight. Scientific communication is one of those problems.

At the [Netherlands eScience Center](https://www.esciencecenter.nl/), we build research software across four scientific domains: **Environment & Sustainability**, **Life Sciences**, **Natural Sciences** & **Engineering** and **Social Sciences & Humanities**. This means hundreds of projects, each of them representing months or years of collaborative work with research teams across the country and internationally, all catalogued in the [Research Software Directory](https://research-software-directory.org/). The software is solid, sometimes groundbreaking. But communicating that work to different audiences (the public, academic peers, funders, workshop participants) takes time that most research teams simply don’t have. There’s a persistent gap between the research software we produce and the stories we tell about it.

We built a tool to close that gap. And in doing so, we learned some things about what it actually looks like when LLMs serve science instead of the other way around.

## An interactive journey through four research domains

The first thing you see when you open the [Data Storytelling app](https://github.com/NLeSC/data-storytelling) is a 3D particle system. Not a dashboard. Not a table. A cloud of two thousand glowing dots that shift and pulse as you scroll down the page.

The idea was simple: before you read a single word about a piece of software, you should already have a sense of the research domain it belongs to. Visuals create that context faster than text ever could.

![](/assets/1_jHWTVqw8VvdPdCDGuCnAZA-1ec471a4.gif)

Floating projects retrieved via the Research Software Directory

The entire application is one long scroll. As you move down, you pass through the domains, each with its own custom 3D scene built in *Three.js*. Each 3D scene is peppered with floating cards. Actual projects from the Research Software Directory, fetched live from the API. You hover over one, it glows and scales up. You click it and boom, a modal with the full project details. Description, DOI, metadata, links.

And tucked inside that modal? A tab labelled “ **Generate Story.**” That’s where the real magic happens.

## The communication bottleneck in research software

Anyone in research communications will recognise this situation.

You’ve got a brilliant piece of software. It does something novel with satellite imagery or protein folding or natural language processing for historical Dutch manuscripts. You need to write about it. But write about it for **whom**?

The version for the general public needs to be warm, accessible, maybe open with a compelling question like *“What if we could predict floods before they happen?”* The version for an academic journal needs an abstract, proper methodology discussion, and citations formatted just so. The internal review for your board needs FTE estimates, risk assessments, and honest talk about technical debt. And your programme director just wants a one-pager they can scan in three minutes between meetings.

Same project. Four different pieces of writing. And you need to do this for a hundred projects.

> This is where good research software becomes invisible. Not because the work isn’t worth communicating, but because the communication itself is a bottleneck.

The software ships, the README gets written, maybe a tweet goes out, and that’s it. Months of collaborative work, reduced to a paragraph.

This is also precisely the kind of problem where LLMs can be a real asset to researchers. Not as a replacement for human judgment, but as a drafting tool that handles the structural heavy lifting: tone calibration, audience adaptation, first-pass content generation. The key is being intentional about how you use them. Not *“throw a description at a chatbot and hope for the best”*, but structured, context-rich prompts designed for specific communication goals.

## Generating stories feeding the model with extra information

The generator pulls related software from the same research domain via the RSD API, without any extra effort from the user. So if you’re generating a story about a climate modelling tool, **it already knows about the other environmental software in the ecosystem and can reference them**.

![](/assets/1_w9zVYbuhgtBu_JsNujBL3g-231cdb75.png)

Project & Software Information

You can also upload documents. PDFs, text files, markdown. Research proposals work great for this. The app extracts the text (up to 10,000 characters worth), folds it into the prompt, and the output goes from generic to grounded in specifics.

For custom projects (things not in the RSD) there’s an “Own Project” button in the top navigation. Pop in a title, description, some reference URLs, upload whatever context you’ve got, pick your audience, and off you go. Same six templates, same quality, no RSD dependency.

## Six audiences, six different stories

The story generator ships with six prompt templates. I want to be specific about what these are, because “prompt template” sounds trivial and these are anything but.

![](/assets/1_CE8C0Vl-iE0Xjfy3E71HVw-084e4c64.gif)

Generating the story given the selected audience.

Each one is 500-plus words of careful instructions, closer to a creative brief than a prompt. They specify structure, tone, section order, word count targets, what to emphasise, what to skip. Here’s what each does:

**Communications** (roughly 800 to 1,200 words). Tells the model to write like a science journalist.

**Academic** (1,500 to 2,000 words). Formal. Structured. Abstract up front, methodology section, validation results, related work comparison, citation placeholders in \`\[Author, Year\]\` format.

**Internal Review** (1,000 to 1,500 words). This is the honest one. The prompt tells the model to be “candid about challenges and risks” and to include resource analysis with FTE estimates.

**One Pager** (under 300 words). Concise to the point of ruthlessness. What it does, who it’s for, key benefits, quick stats, how to get started.

**Course Material** (2,000 to 3,000 words). We added this one not long ago and I’m kind of excited about it. It generates educational content you could hand to someone: learning objectives, a technology deep dive, step-by-step tutorials, three tiers of exercises (beginner, intermediate, advanced), and self-assessment questions. Give it to a workshop organiser and they’ve got a starting point for a full training session.

**Blog Post** (800 to 1,200 words). This one was modelled directly on the eScience Center’s own Medium blog. We analysed dozens of our published posts to capture the voice: community-focused, accessible, story-driven with a problem-solution structure. The idea is that a researcher or RSE could generate a first draft and hand it to communications with minimal rework.

The difference between a good and a mediocre generated story almost never comes down to the model. **It comes down to the prompt.** Two thousand five hundred words of structured instructions. That’s the actual product. The Gemini API call is almost the easy part.

## What this taught us about LLMs as tools for science

Building and using this tool surfaced a few insights about how LLMs can genuinely serve researchers, rather than just generate noise.

> Nobody needs another text generator.

Researchers need a tool that adapts to the audience and understands the difference between writing for a review committee and writing for the general public. The real value is in the gap between generate some text about this software and generate an internal review with risk assessment and FTE estimates in the right tone, because once you add that kind of specificity to prompts, LLMs stop being gimmicks and start being useful.

Another big win is generating multiple perspectives on the same project. If you create a communications piece, an academic paper, a review document, a one-pager, a course module, and a blog post from the same source, each lens reveals something different, like overlooked methodological contributions, the true core value in twenty words, what is actually teachable, and how the work connects to the wider research community, so the LLM becomes a thinking tool, not just a writing tool.

And honestly, context matters more than model sophistication. Running the same prompt on Gemini Flash versus Gemini Pro changes little, but enriching the input with a research proposal, team info, and related software packages changes everything, which suggests institutions will get more value by investing in structured metadata and rich context than by chasing the newest model.

## LLMs as collaborators, not replacements

Let me be clear about what this tool does and doesn’t do.

It doesn’t replace the science communicator who knows that a particular project has a funny origin story, or that the lead developer gave a brilliant conference talk last month, or that “ *digital bridges* ” works better for this audience than *“computational pipelines.”* Those things require human judgment, institutional memory, and taste. No model provides that.

That’s the pattern we think works for LLMs in science more broadly. Not autonomous generation. Not replacing experts. Instead: structured tools that handle well-defined tasks with rich context and human oversight. Tools that make researchers more effective at the parts of their job that aren’t their core expertise but still matter, like communicating their work to the people who need to hear about it.

The conversation about LLMs in research is often framed as a threat. We think it’s more productive to ask: **where can these tools genuinely help, and what does it take to use them responsibly?** For me, scientific communication turned out to be a great answer.

> A hundred projects, six audience types, one tool. The stories were always there. We just needed a better way to start telling them.

## Under the bonnet tech stack (for the curious ones)

A few technical choices that I think are interesting, even if they’re invisible to most users:

**No backend.** The Gemini API gets called straight from the browser. No server, no proxy, no infrastructure to babysit. You deploy it as a static site and walk away. The tradeoff? Users bring their own API key, stored in localStorage, never sent anywhere except to Google. For a research-oriented audience that already juggles API keys for half a dozen services, this felt like a reasonable ask.

**Svelte 5 runes everywhere**. The whole app runs on Svelte 5’s new reactivity system: *\`$state\`, \`$derived\`, \`$effect\`*. When AI-generated text streams in, only the story display component re-renders. Not the 3D scene. Not the navigation. Not the settings panel. For something that’s running WebGL animations, parsing SSE streams, and managing modal state all at once, that granularity needs to be optional.

**Scroll velocity drives the 3D**. This is the detail I’m most proud of. The scroll store doesn’t just track how far down the page you are. It measures how **fast** you’re scrolling and in which direction. That velocity feeds into the *Three.js* scenes. Scroll fast and the camera pulls back, particles scatter wider, everything feels like it’s accelerating with you. Scroll slow and things settle into a gentle rotation. It’s the kind of thing you won’t notice unless you’re looking for it, which is the point. The best interactions are the ones you feel rather than see.

**Prompt engineering treated as product design.** I keep coming back to this because I think it’s the least obvious and most important decision we made. The prompt templates weren’t written by a developer in ten minutes. They were iterated on, tested against real projects, revised, tested again. The “Internal Review” template went through five or six drafts before it produced output a programme manager would find useful on a consistent basis. Treating prompts with the same rigour you’d give a product spec? That’s where the real value lives.

— -

- The Data Storytelling application is open source at [https://github.com/NLeSC/data-storytelling](https://github.com/NLeSC/data-storytelling). Built at the Netherlands eScience Center, and the Google Gemini API. We’d love to hear how other research organisations approach this challenge. Contributions and conversations welcome.
