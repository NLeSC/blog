---
layout: post
title: "Building a Web Service to Manage Scientific Simulation Data Using GraphQL"
author: Felipe
published: true
source: medium
source_url: https://blog.esciencecenter.nl/building-a-web-service-to-manage-scientific-simulation-data-using-graphql-a0bbf1c3f6e9
tags:
  - 3D
  - API
  - Databases
  - Docker
  - Git
  - Open Source
---

Scientific simulations generate large volume of data that needs to be stored and processed by multidisciplinary teams across different geographical locations. Distributing computational expensive simulations among the available resources, avoiding duplication and keeping the data safe are challenges that scientists face every day.

In this post we present our web service [Ceiba](https://github.com/nlesc-nano/ceiba) and its command line interface [Ceiba-cli](https://github.com/nlesc-nano/ceiba-cli). Ceiba solves the problem of *computing*, *storing* and *securely sharing* computationally *expensive* simulation results. Researchers can save significant time and resources by easily computing new data and reusing existing simulation data to answer their questions.

![Rows of solar panels beneath a blue sky.](/assets/0_bI9DbwobcmYvOYyk-f23819bf.webp)

Photo by American Public Power Association on Unsplash

## Scientific simulations and data

> At the [Netherlands eScience Center](https://www.esciencecenter.nl/) we empower academic researchers by building together simulation tools, data pipelines, etc. A common goal among several tools that we develop for projects in different scientific fields, is to reduce the calculation time of computationally expensive physical simulations (e.g. molecular processes) by applying statistical methods to previously simulated data.

The aforementioned methodology can potentially save us significant human and computational resources by easily generating high value data using previous computations. But before we are ready to apply any statistical method we of course need the data and for doing so, we need to ask ourselves questions like:

> What input is required?
>
> Who is going to perform the simulation?
>
> What facilities are going to be used?
>
> Where is the resulting data going to be stored?
>
> How to access the available data?

Physical simulations usually require intricate input that takes into consideration several aspects and parameters used by different models to approximate the phenomena under consideration. Also, scientific simulations are computationally demanding tasks, so they are usually run in (inter)national supercomputers or very specialized facilities. We also want to maximize the impact of the data in the scientific community, therefore we want other scientists to be able to access the data and even add their own, but we need some security layers to protect such valuable data.

There is no silver bullet to address all the previous questions, but there are amazing initiatives like the [folding at home project](https://foldingathome.org/) that distributes some computational tasks among volunteers around the world who give away some time in their computers to simulate protein dynamics.

It seems that if we want to collaborate on the distribution of computational tasks and the assemblage of the resulting data, we need a central “entity” that (1) allows users to request new tasks, (2) receives the task’s results to be stored and (3) returns some available data when requested. It sounds like we need a web service!

> Writing a web service is a nontrivial task, you need to be aware of different technologies, libraries, etc. while making sure that your data is going to be safe and of course you need some infrastructure to host your service. This post goal is to give you some hints about building a web service for scientific applications and it is by no means a complete guide to writing web applications.

## A pull/push model

![People gathered around a laptop, pointing at its screen and keyboard.](/assets/0_HnAn4y-BQGmvGjGZ-63120e1e.webp)

Photo by John Schnobrich on Unsplash

Before entering into the web service technical details, let’s explore what its behavior should be.

So, once it has been decided what are the best approximations and models to perform the simulations, we can compile all the simulation metadata into different jobs. For instance, a job can be a single molecular simulation under some specific conditions. We would like to make all these jobs available to the users, in such a way that they can run one or more jobs at a time but avoiding that the same job is run by more than one user.

It would be great that when the simulation is done a user can send the results to the web service or ask for already available results. We also want to be able to call the web service from our local computer, specialized infrastructure or wherever we want to perform the computation, without worrying about where the service is running.

It seems, that we want a [Git](https://en.wikipedia.org/wiki/Git) -like behavior where we can pull jobs (or available data) and push results.

With these requirements in mind, I have developed an open source web service called [Ceiba](https://github.com/nlesc-nano/ceiba). Let’s see how it works!

## The client

![A bicycle symbol and a forward-pointing arrow painted on a road.](/assets/0_P4hHvh84YZQLPGgi-abb9bbfa.webp)

Photo by Andrew Gook on Unsplash

The web service consists of two parts: a small command line interface (CLI) that communicates with the service and the [Ceiba web service](https://github.com/nlesc-nano/ceiba) that handles all the data.

Our CLI is called [Ceiba-cli](https://github.com/nlesc-nano/ceiba-cli) and it offers several actions to interact with the service, like logging in, computing, querying, etc. as shown in the following snippet:

```text
>>> ceiba --help
usage: ceiba [-h] [--version] {login,compute,report,query,add,manage} ...

positional arguments:
  {login,compute,report,query,add,manage}
                        Interact with the properties web service
    login               Log in to the Ceibaweb service
    compute             Compute available jobs
    report              Report the results back to the server
    query               Query some properties from the database
    add                 Add new jobs to the database
    manage              Change jobs status

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
```

Using [Ceiba-cli](https://github.com/nlesc-nano/ceiba-cli) we can compute some jobs using a command like:

```sh
ceiba compute -c collection_name -j number_of_jobs_to_compute
```

The previous command handles the communication with the web service, fetches the requested jobs from a given collection (or dataset) and runs them directly or invokes a [job scheduler](https://en.wikipedia.org/wiki/Job_scheduler) like [Slurm](https://slurm.schedmd.com/documentation.html). To communicate with the service, [Ceiba-cli](https://github.com/nlesc-nano/ceiba-cli) invokes the [Python Requests library](https://requests.readthedocs.io/en/master/) that handles the communication.

Once the jobs are done we can report the computed data like:

```sh
moka report
```

You may be wondering how does the client know what data it needs to send/receive. Well, that is the subject of the next section!

## The Ceiba web service

![Multiple floors of bookshelves and staircases surrounding an open library atrium.](/assets/0_o_Zzwgbaexr6Fz8y-f2228738.webp)

Photo by Tobias Fischer on Unsplash

The main goal of the web service is to minimize the interaction between the users and the data. If the client requests some read-only action you just return the data (if available) and if the client wants to change something, you need to ensure that (1) the client has permissions to mutate the data (2) only the mutations specified by the client are carried out but nothing more. I will skip authentication in this post.

Therefore, the [Ceiba](https://github.com/nlesc-nano/ceiba) web service needs to handle two kinds of requests by the client: read-only queries and mutations on the datasets. These “queries” and “mutations” can be easily describe with [GraphQL](https://graphql.org/).

In a nutshell, [GraphQL](https://graphql.org/) defines a contract (known as a schema) between the actions that a client can perform with the web service and the possible outcomes of those actions. More formally, [GraphQL](https://graphql.org/) is a query language that allows you to specify an application Programming interface (API) using different programming languages. If you have previous experience with [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) have a look at a comparison between [GraphQL and REST](https://www.howtographql.com/basics/1-graphql-is-the-better-rest/).

But how does GraphQL work? First, you need to define a schema using the [GraphQL](https://graphql.org/) schema language. The following code snippet defines a schema to query a job using its status,

Schema definition for job query

The Query** schema specifies that in order to request some **jobs*** you need to provide a *Status* argument, where *Status* can be one of four possibilities: *AVAILABLE, DONE, FAILED* and *RUNNING. *The exclamation mark (!) indicates that the argument cannot be *Null* (a.k.a *None* in Python).

The following **Mutation** schema defines the required arguments to update a given job status.

Schema definitation for Job status mutation

The ***updateJob*** action specifies that you must provide an *id* and a *new_status* in order to be able to update a job. You will receive a *Reply* specifying whether the update action has succeeded.

Have a look at the Ceiba [queries](https://github.com/nlesc-nano/insilico-server/blob/master/insilicoserver/sdl/Query.graphql) and [mutations](https://github.com/nlesc-nano/insilico-server/blob/master/insilicoserver/sdl/Mutation.graphql) schemas. They are slightly more complex than the aforementioned schemas but follow the same rationale as the previous examples. You can also have a look at the official [introduction to GraphQL](https://graphql.org/learn/).

We have just defined the schemas that specify the actions that we want to perform. We still need to implement the actions and for doing so, we need a GraphQL engine: a library that takes the schemas together with the code that implements the actions and generates an API.

We have chosen the [Tartiflette GraphQL engine](https://tartiflette.io/) to implement our web service mostly because it is easy to use and open source. The following snippet shows a possible implementation for querying jobs based on their status using [Tartiflette](https://tartiflette.io/).

the ***Resolver*** decorator indicates that the ***resolver_query_jobs*** function corresponds to the implementation of the ***query jobs*** schema. The function takes 4 arguments of which I only use ***args*** and ***ctx***(You can refer to [Tartiflette](https://tartiflette.io/) for further details). ***args ***contains the arguments given by the client code, while ***ctx ***contains the context for running the current function, for example the handler to access the database that is called ***mongodb*** in this code snippet.

Notice that the definition of the aforementioned function starts with the *async* keyword. [Asyncio](https://docs.python.org/3/library/asyncio.html) is a popular built-in Python library to write concurrent code. It is extensively used to write high performance web services.

In the Ceiba web service implementation of the [**queries**](https://github.com/nlesc-nano/insilico-server/tree/master/provisioning) and [**mutations**](https://github.com/nlesc-nano/insilico-server/blob/master/insilicoserver/mutation_resolvers.py), there are definitions for all the Python functions that perform the actions specified in the GraphQL schemas. For each query and mutation, there is a corresponding function.

## The database

We need a database not only for storing the interesting data but also to store the jobs metadata, like what jobs are available. For the Ceiba web service we use [MongoDB](https://www.mongodb.com/).

My personal opinion is that a [NoSQL database](https://en.wikipedia.org/wiki/NoSQL) like [MongoDB](https://www.mongodb.com/) gives a significant advantage over traditional SQL databases on research projects where up-front design of the schemas to store data is unfeasible. The research priorities can change as the project evolves and having dynamic schemas to store the data makes the researchers’ lives easier.

## Putting all together

![Building a Web Service to Manage Scientific Simulation Data Using GraphQL](./building-a-web-service-to-manage-scienti-33d7f19d.jpg)

Photo by [frank mckenna](https://unsplash.com/@frankiefoto?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)[Docker containers](https://www.docker.com/) are the perfect way to ship our web service. We just need to write a [Dockerfile](https://github.com/nlesc-nano/insilico-server/blob/master/

Dockerfile) with the recipe to install and start the service together with the [mongo container](https://hub.docker.com/_/mongo).

If you want to deploy the Ceiba web service to a remote server you need to follow these steps:

* Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) in your computer.
* Clone the [Ceiba](https://github.com/nlesc-nano/ceiba) repo and go to the [provisioning](https://github.com/nlesc-nano/insilico-server/tree/master/provisioning) folder.
* Edit the [inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html) file with the address of the server(s) where you want to install the runner.
* Edit the [playbook](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html) file with the `remote_user` name for the remote servers.
* Make sure that you can ssh to your server(s).
* Install the runner with the following command:

```sh
ansible-playbook -i inventory playbook.yml
```

The Ceiba server should be up and running!

## The pesky details

You certainly do not want to keep your web service open, so people can remove your data. You want that users are authenticated before using your service, but you also do not want to manage all the security on your own. Getting authentication right using something like [OAuth2](https://en.wikipedia.org/wiki/OAuth) is tricky and it needs at least an entire post on its own.

Also, you need to host your web service somewhere and **hosting costs money**. It is simply not viable that you host your service in your computer, it is not safe and it takes too much time to maintain. Fortunately for researchers, there are institutions like [SURF](https://www.surf.nl/en) that can help you to host a web service for research purposes.

## Acknowledgement

Creating the Ceiba web service would not be possible without [Stefan Verhoeven](https://www.esciencecenter.nl/team/stefan-verhoeven-bsc/) advice and the computational resources provided by [SURF](https://www.surf.nl/en).

I will also to thank [Jens Wehner](https://www.esciencecenter.nl/team/dr-jens-wehner/), [Nicolas Renaud,](https://www.esciencecenter.nl/team/dr-nicolas-renaud-2/) [Johan Hidding](https://www.esciencecenter.nl/team/johan-hidding-msc/), [Pablo Lopez-Tarifa](https://www.esciencecenter.nl/team/dr-pablo-lopez-tarifa/) and [Victor Azizi](https://www.esciencecenter.nl/team/victor-azizi-msc/) for their feedback and support.

Specially thanks to [Patrick Bos,] [Tom Bakker](https://github.com/nlesc-nano/insilico-server/tree/master/provisioning) for their feedback.
