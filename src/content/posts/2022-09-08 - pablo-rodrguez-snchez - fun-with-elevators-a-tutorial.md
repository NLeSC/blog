---
layout: post
title: "Fun with elevators: a tutorial"
date: 2022-09-08
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/fun-with-elevators-a-tutorial-dff473d69d32
tags:
  - Git
  - Physics
---

Subscribe*Remember me for faster sign in

We can explore this data a bit further. We can, for instance, use the acceleration time series to compute speed and position. How? Maybe you remember from high school physics that position (x), velocity (v), and acceleration (a) are related through derivatives. More specifically.

![Fun with elevators: a tutorial](/assets/fun-with-elevators-a-tutorial-88616b5c.png)
With the previous recipe, we can compute speed using the position, and then use speed to compute acceleration. One after the other, like in a production chain. Nevertheless, in our case, we want to do the opposite process. Luckily, we can use integrals to “revert” our derivatives, and thus our whole “production chain” looks now:

![Fun with elevators: a tutorial](/assets/fun-with-elevators-a-tutorial-b22fe136.png)
So, by integrating the acceleration (to obtain the speed), and then integrating the speed (to obtain the position) we find results like this:

![Fun with elevators: a tutorial](/assets/fun-with-elevators-a-tutorial-2de4c1e6.png)
Acceleration, speed, and position against time.So, using only a device that most of us carry everywhere and some elementary physical concepts we know that:

* Our elevator runs up at 4 m/s.
* My office was 74 meters above the ground.

If someone is interested in exploring a bit deeper into the details (for instance: how to filter out the effects of gravity, how to integrate a time series, …) or even experimenting with their own elevator, [here is a link](https://github.com/PabRod/elevator-tool) to the code I’ve used.

This text appeared first in *[*Naukas*](http://fuga.naukas.com/2018/02/06/un-empollon-en-mi-ascensor/)*, where it was originally written in Spanish.*
