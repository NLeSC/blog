---
layout: post
title: "Sharing MATLAB models with everyone"
date: 2025-03-12
author: Bart Schilperoort
published: true
source: medium
source_url: https://blog.esciencecenter.nl/sharing-matlab-models-with-everyone-499eaf0a2e9e
tags:
  - Containers
  - Docker
  - Git
  - HDF5
  - Julia
  - Linux
---

MATLAB is still commonly used in many scientific fields, despite its closed-source nature. While many (technical) universities used to teach coding using MATLAB, more and more are moving away from it, preferring open-source and free alternatives such as Python or Julia. O[ne of the main reasons Julia was developed](https://julialang.org/blog/2012/02/why-we-created-julia/) was because of MATLAB’s proprietary and closed software.

![Sharing MATLAB models with everyone](/assets/sharing-matlab-models-with-everyone-e5b6ed0c.jpg)

Photo by [Iván Díaz](https://unsplash.com/@ivvndiaz?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)However, for those with a vested interest in the language, such as a large legacy code base, [it is still important to be able to share your models](https://medium.com/escience-center/how-to-ensure-that-others-can-run-your-code-4c7672524a69). Just sharing MATLAB code is not that useful as it requires the users to have a MATLAB license. For [a project](https://research-software-directory.org/projects/ecoextreml) with the University of Twente, we work on [a MATLAB land-surface model](https://github.com/Eco

ExtreML/STEMMUS_SCOPE/). We wanted to make the model open-source and available for anyone to run, as well as allow interaction with the model through a [Basic Model Interface](https://bmi.readthedocs.io), a standardized interface for numerical models.

One option would be to try GNU Octave, a language that is mostly compatible with MATLAB. The key word being *mostly**. For us, the difference in execution time was too large. The second option is to make use of MATLAB Runtime.

## MATLAB Runtime

With [MATLAB Runtime](https://nl.mathworks.com/products/compiler/matlab-runtime.html) anyone can run MATLAB applications or components without installing MATLAB. You generate an executable file on a system *with* a MATLAB license, which you can then run on a system *without* a license. This does require that the target system has the same operating system and architecture as the system that generated the executable file.

## Docker

This is where Docker comes into play. Docker allows you to package your application together with a minimal operating system and any dependencies, such that it can run as a standalone application. Note that you can also use Apptainer, an open-source alternative.

Lucky for us, [someone already did the work of containerizing MATLAB Runtime](https://github.com/demartis/MATLAB_runtime_docker). Thanks Riccardo De Martis! A quick example is in the following Dockerfile:

# We start from the already-existing MATLAB Runtime container:
FROM demartis/matlab-runtime:R2023a

# Put the executable in the container, for example from GitHub:
RUN wget https://github.com/MyOrganization/MyRepo/raw/main/exe/MATLAB_MODEL - no-check-certificate

# Make sure the file is executable
RUN chmod +x ./MATLAB_MODEL

# Allow MCR to have a cache directory which all users can access
# this allows for executing the model as a different user.
RUN mkdir /temp/
RUN chmod 777 /temp/
ENV MCR_CACHE_ROOT /temp/

# Run the model:
CMD ./MATLAB_MODELNotice that the MATLAB Runtime container is based on Debian, so you need to generate your executable file on a Linux system as well. On the flip side, once the container is built, it will be easy to run it on different systems, as well as in parallel (such as scaling up your analysis on HPC, where more computational power and data is available).

## Interacting with the containerized model

For many users, this will be good enough: you simply run the model once, passing a config file as an argument, and you’re done. If the model needs access to data, you can attach those directories to the container. The model’s output will be written to a file.

A more advanced use case is when you want to interact with the model while* it is running, such as with the Basic Model Interface mentioned earlier. For this, you will need to communicate with the running MATLAB code.

Communicating with the model inside the directory *can* be done using the terminal, but more ideal would be a proper interface. If you set up [a MATLAB HTTP server](https://www.mathworks.com/matlabcentral/fileexchange/29027-web-server), you can expose the server’s port inside the container. This then allows you to start the HTTP server and execute the MATLAB code from outside the container.

### Data exchange

While telling the model to run certain routines is straightforward using an HTTP server, data exchange is a bit more complex. A simpler way is to write the model’s state or parameters of interest to file.

MATLAB’s default file format is HDF5 nowadays, which is supported by most other languages (for example, Julia with HDF5.jl, or Python with h5py). Scripts or programs written in these other languages can then interact with this file, which can be loaded again in MATLAB if two-way communication is required.

![Sharing MATLAB models with everyone](/assets/sharing-matlab-models-with-everyone-3dd8c2ff.png)
Communicating with a containerized MATLAB model through Python

## Example: STEMMUS_SCOPE Basic Model Interface

A working example of a containerized MATLAB model is [STEMMUS_SCOPE](https://github.com/EcoExtreML/STEMMUS_SCOPE), a land surface model. We wanted to write a [Basic Model Interface](https://csdms.colorado.edu/wiki/BMI) (BMI), to allow for coupling the model to other models such as the groundwater model MODFLOW.

However, coupling a MATLAB model to models written in a different language is challenging, so we [connected a Python BMI to the containerized model](https://github.com/EcoExtreML/STEMMUS_SCOPE_Processing/tree/v0.4.0/PyStemmusScope/bmi), as Python excels at being a “glue” language. This allows us to couple the STEMMUS_SCOPE model with other models implementing a BMI.

One detail here is that we did not have access to a full MATLAB IDE, so it was too challenging to actually go the proper route and implement an HTTP server for STEMMUS_SCOPE. Instead, we communicate to the MATLAB processing using stdin/stdout.

## Sharing is caring

While it’s certainly more difficult than with many other programming languages, sharing easily (re-)usable MATLAB code with others is still possible. Not only that, but it can also make your own life easier by being able to run your code on other platforms and allowing you to run it in a single command.

If you enjoyed this story, have a look at the blogpost “[How to ensure that others can run your code](https://medium.com/escience-center/how-to-ensure-that-others-can-run-your-code-4c7672524a69)” by Julian Gonggrijp, which touches on many reasons why* *you would want to make sure others can run your code (and how).

![Sharing MATLAB models with everyone](/assets/sharing-matlab-models-with-everyone-c9e37c82.jpg)

Photo by [Josh Campbell](https://unsplash.com/@j0shuadcampbell?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)*** Octave does not support all MATLAB functions, so the code will have to be modified to support both MATLAB and Octave. Octave can also be an order of magnitude slower than MATLAB, which can be problematic.
