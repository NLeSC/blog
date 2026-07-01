---
title: "Easier Docker in Python"
date: 2017-02-03
author: Johan Hidding
published: true
source: medium
tags:
  - uncategorized
---

![](/assets/1_68X2g8ziJ_aHdtiHqajr3Q-d11b7e7e.jpeg)

[Docker](https://www.docker.com/) is a tool that creates a stack of virtual environments on top of a running Linux kernel. This allows you to run tools (and web services) in an encapsulated environment. I use Docker to call binary codes from Python in the context of a broader scientific/computational workflow. Using docker containers for this makes it infinitely easier to share the results of such a workflow. There is a [Python module](https://docker-py.readthedocs.io/en/stable/) for the API, but this is not the easiest to use, certainly not as easy as the docker command-line.

![](/assets/1_ChkdKbYyM7mIITvaUkHaDw-d1d6674b.jpeg)

Exterminate!

So, my goal is to make an easy interface to Docker that allows me to:

1. create a container
2. upload some input files
3. run one or more commands
4. retrieve results
5. ==exterminate==!

A Docker container can be thought of as a virtual machine, sharing resources with other containers that run on the same image. When we have a container running, we can communicate with it by sending it commands, talking to services and we can read or write to the file system. This last action is performed through tar archives.

All of this makes a Python program that uses Docker directly through the `docker` [module](https://docker-py.readthedocs.io/en/stable/) rather unreadable. Here, I show an example of how to fix this situation using only small amounts of additional Python code. If you like to play with this example, [get the code in this post from github](http://github.com/jhidding/easy-docker.py).

In the spirit of [wishful programming](https://blog.thesoftwarecraft.com/2013/11/wishful-programming.html), I show how we can express a simple Docker session after all this is complete. Usually a docker container contains one or more binary packages that provide some service; to keep this example minimal, we use the BusyBox container which has a very small footprint (the download is less than 1MB!). This example decrypts a secret message using Sed. Sed stands for Stream Editor; it is present on any decent Unix system, and used primarily to extract data from text files. The script used here was taken from the great [Rosetta Code](https://rosettacode.org/wiki/Rot-13#AWK) website.

I introduced two classes to make this example work: `Archive` and `DockerContainer`. The `Archive` class handles the construction of a tar-ball, while the `DockerContainer` class manages the communication with the Docker daemon. By implementing this last class as a [context-manager](https://jeffknupp.com/blog/2016/03/07/python-with-context-managers/), the Docker container is removed immediately after we are done with it, hence no need for Daleks on that account.

Note that the `Archive.add_text_file` methods returns `self`. This is good behaviour for methods that only modify an existing object, since it allows chaining these methods and assigning the end result of this chain of method calls in one statement.

This example code is concise and only focuses on *what* we intend to do, not *how* we make Docker understand. You could open a shell, copy the above sed-script and message into individual files and run the script using the same commands that you already see.

Let’s start with a nicer interface to create a tar-ball. Docker uses tar-files to communicate data, so that multiple files can be transmitted in a single stream. Python has a built-in module for creating tar-files, however we are not interested in actually storing the file anywhere. We just need the data in a buffer so that we can send it to Docker with no further ado. This is why the `tarfile.open` function is passed an instance of `io.BytesIO`. This last class acts like a normal file, however it just stores in memory, not on disk.

Next, the Docker container. Most of this code is just an object-oriented wrapper around the Python Docker SDK. The interface in the SDK is spartan by choice. Every user has different needs; rather than cater to every one of those, the Docker team chose to offer a very thin layer around the HTTP API. This is a *good thing*. It just means we have to try a bit harder to write good code with it.

The `DockerContainer` class presented here has the nice feature that it optionally stores a working directory in `self.working_dir`, which reflects the given `working_dir` when the container was started. If the user tries to add files with a relative target path (in stead of an absolute one, that start with `/`), the `working_dir` is automatically joined with the given path.

The `DockerContainer.run` method is made to reflect the native Python `subprocess.run` superficially. This makes its use much easier to remember!

Right at the end, the `__enter__` and `__exit__` methods implement the so called context-manager, allowing the use of `with DockerContainer(...) as c:` etc. If you’ve never seen that before, do read [this post](https://jeffknupp.com/blog/2016/03/07/python-with-context-managers/) by Jeff Knupp, or the [Idiomatic Python](https://www.jeffknupp.com/writing-idiomatic-python-ebook/) book by the same author!

I hope to have convinced you that with just a little bit of effort, its possible to write much nicer (top-level) code. In this case its about talking to Docker, but the same message holds for many interfaces. First think on how you would express a problem (or rather a solution) in an ideal world, then build interfaces that make it a reality.

If you’d like to use this code to talk to Docker, just [fork the github repo](https://github.com/jhidding/easy-docker.py) and add your own functionality; it’s licensed under Apache v2.
