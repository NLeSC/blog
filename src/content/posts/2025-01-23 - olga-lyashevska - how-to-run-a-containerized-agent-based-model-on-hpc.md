---
layout: post
title: "How to run a containerized Agent-Based Model on HPC"
date: 2025-01-23
author: Olga Lyashevska
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-to-run-a-containerized-agent-based-model-on-hpc-319f2b0f485c
tags:
  - uncategorized

---

*This blog was written by *[*Faruk Diblen*](https://medium.com/@fdiblen)* and *[*Olga Lyashevska*](https://www.esciencecenter.nl/team/olga-lyashevska/)*.*

Imagine you are preparing [Torta Caprese](https://en.wikipedia.org/wiki/Torta_caprese) for your friend’s birthday. You have a recipe that consistently delights everyone, but you want to ensure it turns out perfectly every time, regardless of the oven you are baking in or ambient temperature. To achieve this, you always use a cake tin for the batter, which gives its form. In the realm of software development, a similar concept exists — the container. Much like its culinary counterpart, a software container offers a lightweight, consistent and isolated environment for your application, just like the cake tin. The beauty of using a software container is that all the necessary ingredients and instructions are neatly packaged together, including code, dependencies, and runtime environment. This ensures that the application runs consistently and reliably across different computing environments and operating systems.

![How to run a containerized Agent-Based Model on HPC](/assets/how-to-run-a-containerized-agent-based-m-642d9679.png)
Illustration: generated with [Midjourney](http://www.midjourney.com)Introduction**

In this blog, we provide a step-by-step guide on running a containerized [Agent Based Model](https://en.wikipedia.org/wiki/Agent-based_model) (ABM) on High-Performance Computing (HPC) systems. We will explain how to package code and all dependencies in a container and execute on HPC in an easy way. As an example of ABM, we picked [NetLogo](https://ccl.northwestern.edu/netlogo/), a widely popular software among users who may not be technically inclined.

> 

NetLogo is a multi-agent programmable modeling environment. It is used by tens of thousands of students, teachers and researchers worldwide.

The steps outlined below are not limited to NetLogo or ABMs; you can follow this guide to run any application in a containerized format on HPC systems. So why might we want to run NetLogo on HPC? Let's go back to our baker analogy.

**HPC and its significance in handling complex computational tasks**

Let’s imagine that your Torta Caprese has gained immense popularity, and now you are asked to bake it for a friend's wedding. However, this time, you are not using your humble home oven (desktop computer); instead, you have access to a state-of-the-art industrial oven capable of efficiency and speed. This industrial oven represents HPC systems. HPC systems are known for their ability to process large volumes of data and complex computations at high speed. Do you want to risk any variation in the baking process? No. You are equally meticulous about the execution of your application on the HPC infrastructure. This is where the concept of containerization comes into the picture. By utilizing containers on HPC systems, you ensure that your application runs efficiently and consistently, regardless of the computing environment it is deployed.

Back to NetLogo. Imagine you have a NetLogo model that has grown too complex and too slow to be run efficiently on your desktop and you decide to run it on HPC system. You have access to the HPC system via secure shell (SSH), but you do not have the necessary permissions to install NetLogo on the system or you do not know how to do it. Perhaps, you may even want to run the model without GUI (Graphical User Interface) because it avoids overhead and makes your model run faster.

The purpose of this blog is to demonstrate how to run a single Netlogo model on HPC using [Apptainer](https://apptainer.org/) container. We use the [Netlogo](https://ccl.northwestern.edu/netlogo/6.3.0/NetLogo-6.3.0-64.tgz) distribution as a base for the container. Apptainer allows us to package the model and its dependencies (i.e. Netlogo) in a single image that can be run uniformly across different systems. Apptainer is particularly suitable for HPC, as it is designed to bring containers and reproducibility to the scientific community and does not require admin access to run. The container is then used to run the Netlogo model in headless mode. Headless mode is a mode in which the model is run without the GUI and the output is saved in a csv file.

Let’s follow the next steps together. But first, you need to make sure that you have the following installed:

* [Apptainer](https://apptainer.org/) 1.2.5 or newer
* a Linux OS with sudo rights, any system will do
* shell, any shell will do
* access to an HPC system via SSH

Now we are going to follow these steps to run your model within a container on HPC:

*Step 1. Create a definition file*

First, we create a `netlogo-headless.def` file with the following content:

*Step 2. Build a container*

We are going to build an apptainer container on your local machine from a definition file that we have just created in Step 1. For this, a Linux system with sudo rights is needed.

This command will create an apptainer image `netlogo-headless.sif` which we will use to run the model in headless mode on HPC.

*Step 3. Prepare `job.sh` file*

We need to create a shell script that contains the command to run the model in headless mode. First, we look at how to run the model in headless mode without a container.

./netlogo-headless.sh — model “PATH_TO_MODEL” — experiment “EXPERIMENT_NAME” — table OUTPUT.CSVThe line of code above will execute a `netlogo-headless.sh` command, where

- ` — model` is an argument that specifies the NetLogo model to be run;

- ` — experiment` argument is optional and can be used to specify the name of the experiment;

- ` — table` argument is optional and can be used to specify the name of the output file.

apptainer exec netlogo-headless.sif netlogo-headless.sh — model “PATH_TO_MODEL” — experiment “EXPERIMENT_NAME” — table OUTPUT.CSVFor example, to run a model `Wolf Sheep Simple 5.nlogo` with an experiment `Wolf Sheep Simple model analysis` and save the output in `wolf_sheep_output.csv`, use the following command.

We save the code above as `job.sh` and change permissions to make it executable with

chmod +x job.shStep 3. Create an archive to be copied to HPC*

To run our model on HPC, we need to copy all files to the remote machine. First, we create an archive on a local machine that contains the model, the container, and the shell script. For this, we create a directory and copy `model`, `netlogo-headless.sif`, and `job.sh` into it and call this directory `jobHPC`. Then we create a gzip tarball of a directory.

tar -czvf jobHPC.tar.gz jobHPC*Step 4. Copy to HPC*

To copy `jobHPC.tar.gz` file from your local machine to HPC cluster, we can use the `scp` command. This command will copy `jobHPC.tar.gz` file to the remote machine using SSH (Secure Shell) protocol for data transfer.

scp jobHPC.tar.gz username@remote:/path/to/remote/directoryReplace `username@remote` with your username and the address of the HPC cluster. Replace `/path/to/remote/directory` with the path to the directory on the HPC cluster where you want to copy the file. This command will prompt you for your password on the HPC cluster before copying the file.

*Step 5. Unpack the archive on HPC*

Once the file is copied to the HPC cluster, log into the remote machine and unpack the archive using the following command:

tar -xzvf jobHPC.tar.gz*Step 6. Run model on HPC*

Submit a job to a ([SLURM](https://slurm.schedmd.com/)) scheduler on HPC using the following command:

Here, we set a limit of 2 hours for the job to run. You can change the time limit as per your requirements.

Now you can pull up information about the jobs in the queue:

squeue --user=your-usernameWe use here the `--user`flag because we only want to see our job.

You can stop your job with

scancel your_job-id*Step 7. Retrieve results*

Once finished you can retrieve your results. For this, you need to identify the files you need to retrieve. To copy the files to your local machine run:

scp username@remote:/path/to/remote/file /path/to/local/destinationReplace `/path/to/remote/file` with the path to the file on the HPC system, and `/path/to/local/destination` with the path where you want to save the file on your local machine.

For example, to copy `job_output.txt` from the HPC system to your desktop:

scp user@hpc.example.com:/home/user/job_output.txt ~/Desktop/Finally, if you want to copy multiple files, you need to add flag `--r` which will allow you to copy all files in the directory `job_output`.

scp -r user@hpc.example.com:/home/user/job_output/ ~/Desktop/
![How to run a containerized Agent-Based Model on HPC](/assets/how-to-run-a-containerized-agent-based-m-0680d40a.jpg)
Photo by [Lightsaber Collection](https://unsplash.com/@lightsabercollection?utm_source=medium&amp;utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&amp;utm_medium=referral)Conclusion**

To wrap up our containerization journey, we have covered some solid ground in getting your NetLogo models up and running on HPC systems. Containerization, much like the cake tin, provides a reliable and consistent environment for your applications, ensuring they perform as expected regardless of the computing setup. From creating our container image using Apptainer to running the job scripts to transfer files to the HPC cluster and running job, we have laid out all the steps. Whether you are diving into ABM or tackling real-world problems, containerization on HPC enables you to handle complex computational tasks.

Now, go ahead and make a Torta Caprese for yourself to celebrate that you learned something new! Here is a [recipe](https://food52.com/recipes/64554-torta-caprese-chocolate-and-almond-flourless-cake).

![How to run a containerized Agent-Based Model on HPC](/assets/how-to-run-a-containerized-agent-based-m-cd889241.jpeg)
Image: [https://unsplash.com](https://unsplash.com/)
