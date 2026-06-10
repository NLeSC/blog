---
layout: post
title: "Ditching Docker Hub: serve research software with GHCR + Zenodo"
date: 2023-04-06
author: Patrick Bos
published: true
source: medium
source_url: https://blog.esciencecenter.nl/ditching-docker-hub-serve-research-software-with-ghcr-zenodo-2e47b8c93d88
tags:
  - uncategorized

---

## Or pay the price… that Docker Hub may charge you

Subscribe*Remember me for faster sign in

To archive your software on Zenodo, simply [create a new record and upload your Docker image as a file](https://zenodo.org/deposit/new). To create such a file from an image called `hello-world:latest` you can create a zipped tarball like so:

docker image save hello-world:latest* | gzip &gt; *hello-world:latest*.tar.gzYou can also include additional metadata, such as a description of your software and the research project it’s associated with. Once your record is published, it will be available for anyone to access and download. One project we came across that has been doing this already is [Spex](https://spex-xray.github.io/spex-help/getstarted/docker.html#step-2-download-the-spex-docker-image-from-zenodo), a popular X-ray astronomy package. Following their lead, after someone downloads the `hello-world:latest.tar.gz` file, firing your container back up with Docker is as easy as:

docker load -i hello-world:latest.tar.gz

## One repo to rule them all?

Why not use Zenodo for all images, you may wonder? For us, the reason is that GHCR is meant to be used together with GitHub Actions as well. It’s the fastest option for continuous integration and also for running tests locally. It is also a one-command option, as opposed to the Zenodo option where you have a manual download step to do before using the image.

Why not use GHCR for all images, then? Zenodo is a dedicated research “artifact” storage repository. Like Docker Hub, GitHub, a commercial company, may change its policies at any time and start charging to preserve your containers. This would in fact be totally reasonable for them to do. We trust Zenodo to be a reliable long-term archiving solution for research.

Of course, Docker Hub can still be an option for you, if you are willing to pay them. It is, after all, still the simplest way to use Docker. This requires long-term institutional funding, though, which unfortunately is rare in academia, especially for supporting research software. [An issue which is being worked on, by the way…](https://dspace.library.uu.nl/handle/1874/424547)

In conclusion, if you’re a researcher writing software that needs to be shared with others, we recommend using GitHub Container Registry for development and Zenodo for archiving. GHCR is a powerful and free tool that integrates seamlessly with GitHub, while Zenodo provides a long-term archiving solution that’s designed specifically for research outputs. By using these tools together, you can ensure that your software is both accessible and discoverable for the long term.

## Credits / meta-sub-blogpost

*This article was written based on a discussion in the eScience Center’s Software Sustainability special interest group (SIG).*

Actually, “written” is not fully accurate. I fed the SIG meeting notes into ChatGPT and asked it to process that into a blogpost; the above is mostly the result of that, with some minor edits from my side.

![Ditching Docker Hub: serve research software with GHCR + Zenodo](/assets/ditching-docker-hub-serve-research-softw-207acc09.png)
I didn’t really like the titles it proposed though:

![Ditching Docker Hub: serve research software with GHCR + Zenodo](/assets/ditching-docker-hub-serve-research-softw-3347acb5.png)
Close enough, though!

*Thanks to Tom Bakker, Stefan Verhoeven, Luisa Orozco and Carlos Martinez for improving on ChatGPT’s draft!*

![Ditching Docker Hub: serve research software with GHCR + Zenodo](/assets/ditching-docker-hub-serve-research-softw-d2087d71.jpeg)
Same as above, but now in the style of Looney Tunes… You AIs, you!
