---
layout: post
title: "FOSDEM 2026: Observations and key takeaways"
author: eScience Editorial Team
published: true
source: medium
source_url: https://blog.esciencecenter.nl/fosdem-2026-observations-and-key-takeaways-6afbfb50dc58
tags:
  - API
  - Databases
  - Git
  - Machine Learning
  - Open Source
  - Performance
---

![FOSDEM 2026: Observations and key takeaways](/assets/fosdem-2026-observations-and-key-takeawa-55dcce06.jpg)
*If you missed FOSDEM 2026 — the largest conference dedicated to open-source software — you can still absorb some of the experience as shared by NLeSC RSEs **Flavio Hafner****, ****Ole Mussmann**** and ****Faruk Diblen****.*

## Flavio Hafner on FOSDEM 2026: Security, LLMs, and Software Performance

*This is a version of the *[*original post by Flavio*](https://f-hafner.github.io/fosdem-2026/)* adapted for Medium.*

My highlights from this year’s FOSDEM are in the areas of LLM/security/open source, in machine learning/software performance, and in databases/search.

## Upcoming features in git

Patrick Steinhardt from GitLab, and git contributor, [presented](https://fosdem.org/2026/schedule/event/HTJK33-evolving_git_for_the_next_decade/) about some upcoming changes, planned for the major 3.0 release towards mid-2026.

***Under the hood, git changes the hashing algorithm from SHA-1 to SHA-256***

* This is because SHA-1 is not secure — a paper from around 2017 showed that it does not create unique hashes.
* While git itself does not rely on uniqueness of hashes, the ecosystem implicitly does — for instance, by pinning software dependencies to git hashes.
* At the same time, large parts of the ecosystem (GitHub for instance) currently do not support SHA-256 hashes.
* By moving the default in git, the contributors want to solve the chicken-and-egg problem of “no-one wanting to use the feature because no-one supports it” and vice versa.

***New command: git history for easier rewriting of history***

* In git, rewriting history through an interactive rebase is cumbersome and takes several steps.
* Another limitation is that it leads to orphaned branches because other branches depending on the changed commits are not updated. For instance, this makes is tedious to use workflows with stacked branches.
* The new `git history` command, inspired by other version control systems such as Jujutsu and Mercurial, provides some functionality that makes such workflows easier. For instance, `git history reword &lt;commit&gt;` allows to amend the commit message of a specific commit; `git history split &lt;commit&gt;` allows to split a specific commit.
* The new commands *also* rebase other branches that depend on respective commits.

### Open Source, LLMs, and security

This was a major topic in this year’s conference and featured in two keynotes: Michael Leenaars [(talk)](https://fosdem.org/2026/schedule/event/FE7ULY-foss-in-times-of-war-scarcity-and-ai/) from NLnet, and Daniel Stenberg, founder and lead developer of cURL [(talk)](https://fosdem.org/2026/schedule/event/B7YKQ7-oss-in-spite-of-ai/).

* Both speakers highlighted that LLMs can help malicious actors find and exploit vulnerabilities in open-source code, and thus open-source will become more vulnerable to supply-chain attacks.
* Stenberg further detailed how LLMs bring out the worst and best at the same time. On one hand, the cURL project is bombarded by AI-generated security reports. This has led cURL to stop their bug bounty program. On the other hand, they use LLMs selectively to find security issues and review code.

Several talks in the security devroom addressed the same problem.

***Updated governance model for open-weight LLMs***

* A [talk](https://fosdem.org/2026/schedule/event/VGMUYA-the-open-weight-dilemma/) about LLMs and cyber risks argued for an updated governance model for open-source (and maybe open-weight) LLMs.
* While closed LLMs are easily controllable, safeguards in open models can easily be fine-tuned away.
* Therefore, open LLMs cannot be regulated like an API, and closed LLMs may even have an advantage because they are easier to regulate — a “mitigation gap”.
* The proposed solution is to define fine-tuned models as “substantial modification”, and shift the liability burden from the issuer of the original model to the fine-tuner.

***Auditing and securing supply chains***

* The Open Source Technology Improvement Fund (OSTIF) presented their work on providing security audits to open-source software [(talk)](https://fosdem.org/2026/schedule/event/Z7D3MW-security_audits_and_security/).
* [AboutCode](https://aboutcode.org/) presented their tool for detecting LLM-generated code [(talk)](https://fosdem.org/2026/schedule/event/XGLP7J-ai-generated-code/). If I understood correctly, the tool finds parts of a codebase that have been regurgitated from another source, and can pinpoint to the source. One challenge was that LLMs often create similar control flow, but different variable names from the original. In their `scancode.io` [tool](https://github.com/aboutcode-org/scancode.io/), they solve this problem with code stemming, a method also used by `treesitter`.

### Data, Search and LLMs

***Vector search***

* In a RAG pipeline, the hard part is data engineering: one has to understand the data and the context [(talk)](https://fosdem.org/2026/schedule/event/DHTAXQ-prevent-ai-garbage/). For instance, the chunking strategy is crucial for the retrieved the results.
* Weaviate [presented and demonstrated](https://fosdem.org/2026/schedule/event/3AWMQZ-multi-vector-embeddings-revolution-or-evolution/) multi-vector retrieval. This is particularly useful for search on PDFs that include images. Their [tool](https://github.com/weaviate/weaviate) implements the MUVERA algorithm [(paper)](https://arxiv.org/abs/2405.19504).

**Speeding up LLM inference**

* The vLLM project [explained](https://fosdem.org/2026/schedule/speaker/eldar_kurtic/) how they speed up LLM inference with quantization and speculative decoding.
* Quantization compresses the network weights into buckets. This leads to a smaller footprint in memory and to faster transfer of the weights from the GPU’s high-bandwidth memory to the SRAM and Tensor cores that do the matrix multiplications.
* Their benchmarks show that the ideal strategy (4-bit integer quantization vs. 8-bit integer quantization vs. no quantization) depends on the number of queries per second.
* For speculative decoding, one trains a light-weight “speculator” model that generates tokens at inference time, and the main model approves or rejects the generated tokens.

### Machine learning, performance, and observability

***Performance engineering***

* Two talks discussed best practices for performance engineering: to reliably capture performance regressions, benchmarks should be repeatable and representative, and setting them up for this requires some thought. Challenges include isolating the benchmark environments and avoiding too many false positives.
* The first talk [outlined](https://fosdem.org/2026/schedule/event/8AS3XD-how-to-reliably-measure-software-performance/) a statistical testing approach based on increasing the signal-to-noise ratio and deciding when to reject the null hypothesis of no performance regression. Further, running benchmarks in the cloud poses challenges, and they recommend avoiding virtualized environments. The slides of the talk are [here](https://github.com/igoragoli/fosdem-2026-software-performance).
* The second talk [focused](https://fosdem.org/2026/schedule/event/YNB7KR-continuous-perf-engineering/) on change point detection. I also liked the idea of using canaries to track the performance of the benchmark infrastructure itself — you want to know when the problem is with the infrastructure and when it is with your software.
* Both talks argued for continuous performance monitoring and presented some tools for this.`nyrkio`provides CI runners for change point detection; the runners are not free but according to the provider, they are of better quality than other runners (such as `github-action-benchmark`). [hyperfine](https://github.com/sharkdp/hyperfine) is a command-line benchmarking tool.

***Performance monitoring of deep learning workloads on HPC***

Two talks addressed performance monitoring for deep learning workloads on HPC systems.

* The first talk [highlighted](https://fosdem.org/2026/schedule/event/BBYZLU-gpu-performance-monitoring/) the shortcomings of `nvidia-smi` compared to `dcgmi`. In short, the former only tells us *whether* the GPUs are busy, but not *how efficiently* they are being used (tensor cores, streaming multiprocessors, DRAM). One example was that using 32-bit and 16-bit precision on a H100 shows the same utilization on `nvidia-smi`, even though FP32 is less efficient because H100s do not support tensor core computations with this precision.
* The same talk also suggested that running `dcgmi` incurs no overhead because it is reading data that is already being tracked. I found useful docs from SURF [here](https://servicedesk.surf.nl/wiki/spaces/WIKI/pages/92668151/dcgmi+dmon), and they are more cautious, mentioning that `dcgmi` may slightly slow down your code. I guess one has to test and see it for themselves. The NVIDIA docs for `dcgmi` are [here](https://docs.nvidia.com/datacenter/dcgm/latest/user-guide/feature-overview.html#profiling-metrics).
* The second talk [presented](https://fosdem.org/2026/schedule/event/FYLDFE-observability_for_ai_workloads_on_hpc_beyond_gpu_utilization_metrics/) an open-source observability dashboard for deep learning on HPC. It covers hardware, workload, and model health (such as gradient tracking). The [tool](https://github.com/erythix4/HPCOBS) was just released during the conference. I’m curious to see how it evolves and how it compares to other tools.

## Ole Mussmann on FOSDEM 2026: Nix, International OSS, Accessibility and Collaboration

### Opening

A quote that hit hard:

> *If we lose our democracies, Open Source is irrelevant and goes away.*

Nothing to add here.

### Nix and NixOS

`nix` ***for Determinism***

[Bruce Gain](https://fosdem.org/2026/schedule/speaker/bruce_gain/) discussed using `nix` for "deterministic distributed-system benchmarking". Without special care, library versions and kernel versions will drift over time. The low-hanging fruit `docker` is not helping here. It solves packaging, not reproducibility, for two reasons:

* `docker` uses the host's kernel, and
* it is *really* hard to make a container deterministic. `apt-get update` is not reproducible, any unpinned library will drift over time. You could distribute the *images* instead of `Dockerfile`s, but those are huge and not meant to be changed (only appended).

`nix` solves those issues by treating hashing and pinning every input of a project. Infrastructure is treated as a pure function. For identical inputs, the output *must* be identical as well.

***Software Bill of Materials (SBOM) Tools for `nix`***

What’s inside your software package? Which dependencies do you use, and what’s *their* dependencies? This surprisingly hard question is relevant for license compliance (did you obey the licenses of all libraries that you used?) as well as cybersecurity. If there’s a vulnerable package somewhere in the stack, you’d like to know, right? There’s a few tools that can help you out:

* [https://github.com/nikstur/bombon](https://github.com/nikstur/bombon)
* [https://github.com/tiiuae/sbomnix](https://github.com/tiiuae/sbomnix)
* [https://github.com/anchore/syft](https://github.com/anchore/syft)

[Determinate Systems](https://github.com/determinatesystems) seem to have their own tool as well, but it does not seem to be public (yet?).

Thanks for the heads up from [Tristan “TheComputerGuy” Ross](https://fosdem.org/2026/schedule/speaker/thecomputerguy).

`Sphinx` ***Documentation for `nix` Code***

`Sphinx` was originally created as a documentation tool for `Python` code, but it has since become a generic tool targeting all sorts of projects. [[1]](#7b6c) With [Rémi "minijackson"](https://github.com/minijackson) project `[sphinxcontrib-nixdomain](https://github.com/minijackson/sphinxcontrib-nixdomain)` (rolls right off the tongue, doesn't it?), one can document `nix` options, modules, functions, package sets...

This is the first time I see a structured approach to documenting a `nix` project. Well done!

### International Open Source

***Open Source in China***

Open Source looks different in China, says [Richard Lin](https://fosdem.org/2026/schedule/speaker/richard_lin/). There are several factors at play:

* FLOSS is seen as a market capture tool in three easy steps:

* Turn standards into de facto rules,
* Rules into monopoly, and
* Monopoly into profits.

2. Going global is not expansion, it’s survival.

* The market in China is dry, so branching out is a necessity.

3. FLOSS is a declaration, not procurement. The goal is to nurture industries that will enlarge future tax revenue, not buying a working product. The process for companies is:

* Self-declare a directional FLOSS project,
* Build it,
* Pass inspection, and
* Receive cash.

4. Software development, even FLOSS, is a cathedral, not a bazaar.

* Development is top-down.
* Pressure from the FLOSS community is slowly changing that.

You might notice a lack of FLOSS culture. Instead of “software wants to be free”, this looks very market-driven. And yet, even through this lens, this flavor of open source looks better to me than closed source. It will be interesting to watch how FLOSS develops in China, and how the different viewpoints will evolve.

### Accessibility

I arrived late to [Mike Gifford](https://fosdem.org/2026/schedule/speaker/mike_gifford/)’s talk “Accessible Sovereignty: Why the Four Freedoms Depend on Inclusion”, so I can’t say much about the actual content. What *did* impress me was that he had a live-transcription of his voice underneath the slides. That is not only terrific for the hard-of-hearing, but also a very comforting addition for everyone else.

Lessons at the eScience Center often use web slides made with `[reveal.js](https://revealjs.com/)`. Modern browsers have a [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API) which can be used for [speech recognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition). Do you see where this is going…? Would it not be great to have a plugin for `reveal.js` presentations that display speech-to-text below the slides? Any volunteers to build this? Anyone?

Ok, fine. I’ll do it myself.

P.S.: Here it is: [https://github.com/OleMussmann/RevealSubtitles](https://github.com/OleMussmann/RevealSubtitles)

### Collaboration

[Thierry de Pauw](https://github.com/tdpauw) makes an argument that pull requests are useful for open-source work, but are more of a hindrance in the corporate world. They were coaching a novice team of developers and, to make things simple, they introduced trunk-based development with Non-Blocking Continuous Code Reviews. This means:

* Everything happens on the `main` branch, there are no other branches.
* Changes are (automatically) tested before deployment.
* Every morning, developers review some commits.
* In the end, every commit will be reviewed, after* being deployed(!).
* Fixes are applied, if needed, though this is rare.

Woah.

I can see this working for a very specific developer situation while having absolutely rock-solid tests. Distributed development? Difficult. Working on features, while keeping the `main` branch stable? Impossible. Troubleshooting bugs, bisecting a commit history? Tough.

This is probably not a good fit for research-software-engineering. But I have to say, kudos for trying something weird *and making it work*. And as a side effect, I realize that I have to be more flexible with my assumptions about how to develop software. That alone is already worthwhile.

* [https://documentation.help/Sphinx/index.html](https://documentation.help/Sphinx/index.html)

## Faruk Diblen on FOSDEM 2026: Sovereignty, Burnout, and the AI Reality Check

I hope that by providing this short summary, I can convince you to participate in the next FOSDEM. It remains the biggest and most awesome open-source conference in Europe — and it is still free. It is so large that it reminds me of certain free open-source software projects: it is full of a specific kind of chaos. This is not due to the organization, but rather the scale of the conference and the range of topics and talks happening simultaneously. I must give kudos to the organizers for doing an amazing job.

### Reflections on AI and the Community

As I do every year, I was expecting amazing talks from people who are very passionate about open source and “geeky” topics. However, this time I also expected to hear more about how AI is supporting software development. Instead, most talks focused on how AI is dangerous and toxic for open source.

I think I partly agree with that sentiment, but it may still be useful for certain tasks as a supporting tool. There were many interesting talks and discussions regarding the cultural, ethical, legal, and technological effects of recent developments in AI.

The infamous [xkcd comic about infrastructure](https://xkcd.com/2347/) was also compulsory for all speakers to show. Perhaps the organizers were checking presentations beforehand, and if you did not have this comic, they were not allowing you to present. Jokes aside, I also agree now that this comic represents the current reality; it is perhaps even too modest.

### Networking and the Research Track

One of the other fun parts of FOSDEM is the chance to meet and have conversations with great minds, contributors, and initiators of very impactful open-source projects. Like previous years, I gathered new ideas and identified new potential collaboration opportunities. I should not skip the “fun stands”; you can talk to the amazing groups of people who made your favorite Linux distribution or who are working on drone development.

As a researcher, I also had a chance to follow some of the [Open Research](https://fosdem.org/2026/schedule/track/open-research/) track. Although the research community was under-represented, it had a great variety of interesting topics, some of which are relevant to my own work. My positive experience has made me think about submitting a proposal for next year. For the other talks I followed or found interesting but could not attend in person, please see the [Highlights**](#72d3) section below.

After leaving the conference, I had three things in my mind: sovereignty now, sovereignty in the near future, and sovereignty in the far future. I also deeply felt the messages of “AI is killing Open Source,” “Even if AI gets better, we, the developers, will be needed,” and “Everything will collapse if we do not support open source.” These messages were sometimes subliminal and sometimes mentioned openly.

### Keynotes

* [**FOSDEM 2026 — FOSS in times of war, scarcity and (adversarial) AI**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fkeynote-foss-in-times-of-war%2F)**:** Given by Michiel Leenaards, our neighbor next door. I was expecting him to talk about how NLnet supports open-source software, but he focused on the threats caused by geopolitics. Given the recent political changes in many countries, I think it was a wisely chosen topic that forces us to think about upcoming challenges.
* [**FOSDEM 2026 — Free as in Burned Out: Who Really Pays for Open Source?**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fkeynote-free-as-in-burned-out%2F)**:** Marga Manterola, a long-time Debian developer, talked about why the “donations and sponsorships” model is failing maintainers. She listed common funding sources including a sort of “Open Source tax.” This talk may help us find solutions for software maintenance and sustainability funds.
* [**Open Source Security in spite of AI**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fkeynote-security-in-spite-of-ai%2F)**:** This was the most fun keynote, given by Daniel Stenberg. He told the story of the cURL project and his fight with issues and pull requests created by LLMs. Eventually, they decided to stop their Bug Bounty program. You can download the talk by using the `curl` command below:** `curl https://ftp.belnet.be/mirror/FOSDEM/video/2026/janson/B7YKQ7-oss-in-spite-of-ai.av1.webm --output curl_keynote.webm`

### Highlights

*(The talks I liked the most)*

* [RRP: Reproducible Research Platform for FAIR Open Research**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Frrp-reproducible-research-platform%2F)**:** Andreas Cuny showcased the RRP: a heavyweight solution combining openBIS (RDMS), Git, Docker, and Kubernetes. It allows users to mount datasets into Jupyter/VS Code environments instantly. It is a bit complex to set up, but powerful for institutions. I had a very pleasant conversation with Andreas regarding potential collaborations, such as adding actual FAIR software checks (via `howfairis`) to their platform.
* [**Who Funds the Egg? Cracking the FOSS Funding Paradox**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fwho-funds-the-egg%2F)**:** Deborah Udoh highlighted the “chicken and egg” problem: you need impact to get funding, but you need funding to create impact. The “Pre-seeds” concept — non-monetary investments like visibility and mentorship — seems like a viable bridge for early-stage projects.
* [**Multimodal support in llama.cpp — Achievements and Future Directions**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fmultimodal-support-in-llamacpp%2F)**:** Huge updates for local AI. `libmtmd` finally standardizes multimodal support. They showed `llama-mtmd-cli` doing low-latency OCR and experimental audio input with Ultravox.
* [**It’s Time to Audit Open Source: Success Stories with OSTIF**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fits-time-to-audit-open-source%2F)**:** OSTIF has now facilitated over 100 security audits for projects like git, cURL, and Kubernetes. The data shows that independent code review works.
* [**Supply chain security meets AI: Detecting AI-generated code**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fsupply-chain-security-meets-ai%2F)**:** Philippe Ombredanne introduced a new tool for “fuzzy matching” code snippets to detect AI-generated content. With bots writing billions of lines of code, exact hashing does not work any more.
* [**The AI Shockwave in Open Source Communities: How AI Is Reshaping the Foundations of Open Source Communities**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fthe-ai-shockwave%2F)**:** A worrying trend where newbie questions are dropping because people ask ChatGPT instead. This breaks the “contributor pipeline.”
* [**Burnout in Open Source: A Structural Problem We Can Fix Together**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fburnout-in-open-source%2F)**:** Miranda Heath identified “hyper-responsibility” and “toxic entitlement” as key burnout drivers. We need structural changes in how we value maintenance work.
* [**Introducing Jupyter Book 2: Next-generation Tools for Creating Computational Narratives**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fintroducing-jupyter-book-2%2F)**:** A complete rewrite based on the MyST (Markedly Structured Text) engine. It produces semantic, machine-readable content that is much easier to cross-reference.
* [**ParticleOS, from Fedora to Feast: Stirring Traditional Distros into Immutable Delights**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fparticleos-from-fedora-to-feast%2F)**:** Luca Boccassi showed how `systemd` and `mkosi` are changing OS building, creating a fully immutable, signed, and verifiable image.
* [**What do we mean when we say Sovereign AI?**](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fwhat-do-we-mean-sovereign-ai%2F)**:** Katharine Jarmul explained that true “Sovereign AI” is not just about where the model is hosted, but having the full training data and code available to inspect.

### Other Notable Tracks and Talks

***Research &amp; Science***

* [Research software engineering: a movement and its instantiation at the University of Illinois Urbana-Champaign](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Frse-movement-uiuc%2F)
* [Research software grant funding models](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fresearch-software-funding-models%2F)
* [Building Open Research Infrastructure: Connecting the Lab Bench to Computational Analysis with RSpace &amp; Galaxy](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fbuilding-open-research-infrastructure%2F)
* [Building Everything with Nothing — Harnessing Nix for Bioinformatics](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fharnessing-nix-for-bioinformatics%2F)
* [From Code to Models-as-Data: GEMS, a High-Level Language for Energy System Modelling](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fgems-high-level-language%2F)
* [Building Open and Reproducible AI Practices for LMICs (and Beyond)](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fopen-reproducible-ai-lmics%2F)
* [Towards unified full-stack performance analysis and automated computer system design at CERN with Adaptyst](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fcern-adaptyst%2F)
* [OQTOPUS: Open Quantum Toolchain for OPerators and USers](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Foqtopus-quantum-toolchain%2F)
* [The Skills of a FLOSS Developer and Why They Are Important in Open Research](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fskills-floss-developer%2F)
* [Trusted by design: set up your research software for community adoption](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Ftrusted-by-design%2F)

***Main Track &amp; Community***

* [An Efficient Git Workflow For High-Stakes Projects](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fefficient-git-workflow%2F)
* [How to keep Open Source open without leaving our communities open to threats](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fkeep-open-source-open%2F)
* [Strategy for Trusting your Employer in Open Source: a Historical Approach](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fstrategy-trusting-employer%2F)
* [Who Pays Your Bills? Sustainability, Community and Business: The Open Source Triangle](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fwho-pays-your-bills%2F)
* [Building the next generation of open source contributors — Lessons from 30 years of Postgres](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fnext-gen-postgres-contributors%2F)
* [Funding Europe’s Open Digital Infrastructure: A Detailed Case for an EU Sovereign Tech Fund](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Ffunding-europe-digital-infra%2F)
* [32 years of Debian: how a do-ocracy keeps evolving](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2F32-years-debian%2F)

***AI &amp; Machine Learning***

* [Drag, Drop, and Deploy: Low-Code AI Agents for Network Ops](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Flow-code-ai-agents%2F)
* [From Infrastructure to Production: A Year of Self-Hosted LLMs](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fself-hosted-llms%2F)
* [AI Security Monitoring: Detecting Threats Against Production ML Systems](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fai-security-monitoring%2F)
* [How to Prevent Your AI from Returning Garbage: It Starts and Ends with Data Engineering](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fprevent-ai-garbage%2F)
* [Deep Learning Demystified — Having Fun with Neural Networks in Snap!](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fdeep-learning-snap%2F)

***Security, Databases &amp; Infrastructure***

* [Demystifying Post-Quantum Cryptography: The Hybrid Approach](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fpost-quantum-cryptography%2F)
* [Look ma, no secrets! — bootstrapping cryptographic trust in my homelab using NixOS, UKIs, TPMs and SPIFFE](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Flook-ma-no-secrets%2F)
* [Real-Time AI Powered by RonDB](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Freal-time-ai-rondb%2F)
* [Exploring time series bike share data with duckdb](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fduckdb-bike-share%2F)
* [OpenSearch v3: A New Era of Search Innovation](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fopensearch-v3%2F)
* [SURF Research Cloud is going OSS](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fsurf-research-cloud-oss%2F)
* [Guix Container Images — and what you can do with them](https://www.google.com/search?q=https%3A%2F%2Ffosdem.org%2F2026%2Fschedule%2Fevent%2Fguix-container-images%2F)

### Booths and Extra Notes

After hearing about sovereignty everywhere, I had lengthy chats with the folks from **GitLab, NextCloud, LibreOffice, Forgejo**, and **Codeberg** to learn about open-source office solutions and infrastructure. I also talked to someone from Germany who explained the government migration to Linux (see: [Yet another European government is ditching Microsoft for Linux](https://www.google.com/search?q=https%3A%2F%2Fwww.zdnet.com%2Farticle%2Fanother-european-government-is-ditching-microsoft-for-linux%2F)).

I visited the **Tor** stand, where you could get fancy stickers if you donated to help them fight censorship. The **Free Software Foundation Europe (FSFE)** is also worth following closely as their goals are related to our own. Finally, I learned about [**funding.json**](https://www.google.com/search?q=https%3A%2F%2Ffundingjs.org%2F), a format to declare financial needs of projects in a machine-readable format.
