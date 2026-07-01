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

![Building a Web Service to Manage Scientific Simulation Data Using GraphQL](/assets/building-a-web-service-to-manage-scienti-33d7f19d.jpg)

Photo by [frank mckenna](https://unsplash.com/@frankiefoto?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)[Docker containers](https://www.docker.com/) are the perfect way to ship our web service. We just need to write a [Dockerfile](https://github.com/nlesc-nano/insilico-server/blob/master/

Dockerfile) with the recipe to install and start the service together with the [mongo container](https://hub.docker.com/_/mongo).

If you want to deploy the Ceiba web service to a remote server you need to follow these steps:

* Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) in your computer.
* Clone the [Ceiba](https://github.com/nlesc-nano/ceiba) repo and go to the [provisioning](https://github.com/nlesc-nano/insilico-server/tree/master/provisioning) folder.
* Edit the [inventory](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html) file with the address of the server(s) where you want to install the runner.
* Edit the [playbook](https://docs.ansible.com/ansible/latest/user_guide/playbooks.html) file with the `remote_user` name for the remote servers.
* Make sure that you can ssh to your server(s).
* Install the runner with the following command:

ansible-playbook -i inventory playbook.ymlThe Ceiba server should be up and running!

## The pesky details

You certainly do not want to keep your web service open, so people can remove your data. You want that users are authenticated before using your service, but you also do not want to manage all the security on your own. Getting authentication right using something like [OAuth2](https://en.wikipedia.org/wiki/OAuth) is tricky and it needs at least an entire post on its own.

Also, you need to host your web service somewhere and **hosting costs money**. It is simply not viable that you host your service in your computer, it is not safe and it takes too much time to maintain. Fortunately for researchers, there are institutions like [SURF](https://www.surf.nl/en) that can help you to host a web service for research purposes.

## Acknowledgement

Creating the Ceiba web service would not be possible without [Stefan Verhoeven](https://www.esciencecenter.nl/team/stefan-verhoeven-bsc/) advice and the computational resources provided by [SURF](https://www.surf.nl/en).

I will also to thank [Jens Wehner](https://www.esciencecenter.nl/team/dr-jens-wehner/), [Nicolas Renaud,](https://www.esciencecenter.nl/team/dr-nicolas-renaud-2/) [Johan Hidding](https://www.esciencecenter.nl/team/johan-hidding-msc/), [Pablo Lopez-Tarifa](https://www.esciencecenter.nl/team/dr-pablo-lopez-tarifa/) and [Victor Azizi](https://www.esciencecenter.nl/team/victor-azizi-msc/) for their feedback and support.

Specially thanks to [Patrick Bos,] [Tom Bakker](https://github.com/nlesc-nano/insilico-server/tree/master/provisioning) for their feedback.
