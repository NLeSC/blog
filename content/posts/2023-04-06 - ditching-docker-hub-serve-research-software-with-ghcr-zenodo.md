---
layout: post
title: "Ditching Docker Hub: serve research software with GHCR + Zenodo"
author: Patrick Bos
published: true
source: medium
source_url: https://blog.esciencecenter.nl/ditching-docker-hub-serve-research-software-with-ghcr-zenodo-2e47b8c93d88
tags:
  - Astronomy
  - Containers
  - Docker
  - Git
  - RSE
  - Research Software
---

## Or pay the price… that Docker Hub may charge you

![](/assets/1_uLU5uRex4V9KagumXjzzpw-85a5ef6c.jpeg)

Scrooge McDuck who throws a Docker container in the trash in the style of Disney… according to Stable Diffusion.

As a researcher, and especially as a research software engineer, you may find yourself writing software that needs to be shared with others in a **reproducible** way. So, you containerize it. In the past, you might then have used Docker Hub to store your containerized software.

However, recent attempts to change Docker Hub’s pricing model have made it less attractive as a long-term repository. Frankly, it has made us uncertain about Docker Hub’s reliability as a long-term archive. [Docker’s recent trial balloon about deleting Docker images in “Free Team” accounts](https://devclass.com/2023/03/15/docker-to-users-of-free-team-orgs-one-month-to-pay-up-or-we-freeze-account-and-images-go/) (which they apologized for the next day, and was completely reverted after 10 days, but still…) does not foster trust, to say the least.

To minimize the risk of having to pay for Docker Hub use at any unexpected time, we now recommend using GitHub Container Registry (GHCR) for use during development and Zenodo for archiving.

## During development: GitHub Container Registry

GitHub Container Registry (GHCR) is a relatively new addition to the GitHub ecosystem, but it’s already proving to be a powerful tool for developers. As the name suggests, GHCR allows you to store and distribute Docker images directly from your GitHub repositories. This means that you can keep all of your code and its associated container images in one place, which makes it easier to manage and collaborate on.

One of the biggest advantages of GHCR is that it integrates seamlessly with other GitHub tools, such as Actions and Packages, which can be used to automate workflows and improve collaboration. Also, it’s free (for public images; for private ones you have to pay, which should not pose an issue in this day and age of Open Science). GHCR is included as part of your GitHub account. This means that you can store as many Docker images as you like without worrying about the costs.

At the eScience Center, we have been using GHCR for a while already, for instance for the [Research Software Directory](https://github.com/research-software-directory/RSD-as-a-service). You can see in the right-hand panel the packages menu which lists a couple of the available images:

![](/assets/1_jixBfMoQwy4kUZB2OurKkg-6dc258e7.png)

Packages widget listing the Docker images stored in GHCR for the Research Software Directory.

Clicking for instance on **rsd-saas/database** brings you to the page where you get clear instructions on how to get the image on your machine using:

```rb
docker pull ghcr.io/research-software-directory/rsd-saas/database:v1.18.0
```

Couldn’t get much easier!

## Long term archiving: Zenodo

However, GHCR is not a long-term archiving solution. While it’s great for development and sharing with collaborators, you’ll still need to find a way to archive your software for the long term. This is where Zenodo comes in.

Zenodo is a free, open-access repository that’s designed specifically for research outputs. This includes software, data, and other digital objects. By archiving your software on Zenodo, you’ll be ensuring that it’s accessible and discoverable for the long term. Zenodo also provides persistent identifiers (DOIs) for your software, which can be used to cite it in publications.

To archive your software on Zenodo, simply [create a new record and upload your Docker image as a file](https://zenodo.org/deposit/new). To create such a file from an image called `hello-world:latest` you can create a zipped tarball like so:

```rb
docker image save hello-world:latest | gzip > hello-world:latest.tar.gz
```

You can also include additional metadata, such as a description of your software and the research project it’s associated with. Once your record is published, it will be available for anyone to access and download. One project we came across that has been doing this already is [Spex](https://spex-xray.github.io/spex-help/getstarted/docker.html#step-2-download-the-spex-docker-image-from-zenodo), a popular X-ray astronomy package. Following their lead, after someone downloads the `hello-world:latest.tar.gz` file, firing your container back up with Docker is as easy as:

```rb
docker load -i hello-world:latest.tar.gz
```

## One repo to rule them all?

Why not use Zenodo for all images, you may wonder? For us, the reason is that GHCR is meant to be used together with GitHub Actions as well. It’s the fastest option for continuous integration and also for running tests locally. It is also a one-command option, as opposed to the Zenodo option where you have a manual download step to do before using the image.

Why not use GHCR for all images, then? Zenodo is a dedicated research “artifact” storage repository. Like Docker Hub, GitHub, a commercial company, may change its policies at any time and start charging to preserve your containers. This would in fact be totally reasonable for them to do. We trust Zenodo to be a reliable long-term archiving solution for research.

Of course, Docker Hub can still be an option for you, if you are willing to pay them. It is, after all, still the simplest way to use Docker. This requires long-term institutional funding, though, which unfortunately is rare in academia, especially for supporting research software. [An issue which is being worked on, by the way…](https://dspace.library.uu.nl/handle/1874/424547)

In conclusion, if you’re a researcher writing software that needs to be shared with others, we recommend using GitHub Container Registry for development and Zenodo for archiving. GHCR is a powerful and free tool that integrates seamlessly with GitHub, while Zenodo provides a long-term archiving solution that’s designed specifically for research outputs. By using these tools together, you can ensure that your software is both accessible and discoverable for the long term.

## Credits / meta-sub-blogpost

*This article was written based on a discussion in the eScience Center’s Software Sustainability special interest group (SIG).*

Actually, “written” is not fully accurate. I fed the SIG meeting notes into ChatGPT and asked it to process that into a blogpost; the above is mostly the result of that, with some minor edits from my side.

![](/assets/1_40yq4tQyLhtUsNsmhZzH7Q-f0aaae37.png)

I didn’t really like the titles it proposed though:

![](/assets/1_RdBrqE58a6a00BnrXEw7hA-a0fc042c.png)

Close enough, though!

*Thanks to Tom Bakker, Stefan Verhoeven, Luisa Orozco and Carlos Martinez for improving on ChatGPT’s draft!*

![](/assets/1_1z7VDm5f7eSfYql5M4lZAw-dd23f63e.jpeg)

Same as above, but now in the style of Looney Tunes… You AIs, you!
