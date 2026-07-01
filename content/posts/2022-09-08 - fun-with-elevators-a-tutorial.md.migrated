---
layout: post
title: "Fun with elevators: a tutorial"
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/fun-with-elevators-a-tutorial-dff473d69d32
tags:
  - Git
  - Physics
---

*Most modern cell phones contain an accelerometer. And that’s good news if you are curious about all the data around you*

![](/assets/0_4ofm5alj_exWfow5-fe38d09c.webp)

Photo by Waldemar Brandt on Unsplash

Some years ago I did a secondment at the Friedrich Schiller University, in Jena, Germany. To my surprise, my office during those months was located on the 18th floor of a skyscraper, the Jentower:

![](/assets/0_4Afjsusuv4SsR3XK-958db2fb.jpg)

The Jentower

But I’m not writing this to boast about the amazing views of my old office. On the contrary, I’ll destroy any possible idea of glamour related to working in a place like this. And I’ll do it with a confession: I became known as the crazy guy who leaves his cell phone on the ground while he uses the elevator. Let me explain why:

A building almost 150 meters high needs fast elevators. The ones in this building have a very powerful, almost scary acceleration. Then, I remembered that smartphones usually contain an accelerometer, so I tried to measure those accelerations.

There are many apps that allow registering data from all sensors available on the phone (accelerometers, light, magnetic field, …) and exporting them in an easy format (such as.csv) quite easy to analyze on a computer. If you like getting your hands dirty, give it a try!

In the figure below we can see the vertical acceleration profile during my trip to the 18th floor one morning, where we can clearly see the initial “kick” (seconds 9 to 14) and the braking (28 to 33).

![](/assets/1_DBRj0N55eBOLr3_TCJ7teQ-7e24e80f.png)

Vertical acceleration vs Time (gravity has been excluded)

Accelerations of 1 m/s² sustained during 4 seconds! Think that, the usual acceleration your body experiments due to gravity is around 9.8 m/s² so, while the elevator goes up, your weight gets increased by around 10%. You can feel that in your stomach!

We can explore this data a bit further. We can, for instance, use the acceleration time series to compute speed and position. How? Maybe you remember from high school physics that position (x), velocity (v), and acceleration (a) are related through derivatives. More specifically.

![](/assets/0_f6vwlMWN8bQjL9PG-65776d07.png)

With the previous recipe, we can compute speed using the position, and then use speed to compute acceleration. One after the other, like in a production chain. Nevertheless, in our case, we want to do the opposite process. Luckily, we can use integrals to “revert” our derivatives, and thus our whole “production chain” looks now:

![](/assets/0_4qUNhJ4PInVFgVv3-6a15e322.png)

So, by integrating the acceleration (to obtain the speed), and then integrating the speed (to obtain the position) we find results like this:

![](/assets/1_iK8mx2VNGsoUgCzh13hV3Q-f0f16665.png)

Acceleration, speed, and position against time.

So, using only a device that most of us carry everywhere and some elementary physical concepts we know that:

- Our elevator runs up at 4 m/s.
- My office was 74 meters above the ground.

If someone is interested in exploring a bit deeper into the details (for instance: how to filter out the effects of gravity, how to integrate a time series, …) or even experimenting with their own elevator, [here is a link](https://github.com/PabRod/elevator-tool) to the code I’ve used.

*This text appeared first in* [*Naukas*](http://fuga.naukas.com/2018/02/06/un-empollon-en-mi-ascensor/)*, where it was originally written in Spanish.*
