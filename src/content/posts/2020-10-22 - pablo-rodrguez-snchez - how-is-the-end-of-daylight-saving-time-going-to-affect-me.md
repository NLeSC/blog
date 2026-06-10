---
layout: post
title: "How is the end of daylight saving time going to affect me?"
date: 2020-10-22
author: Pablo Rodríguez-Sánchez
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-is-the-end-of-daylight-saving-time-going-to-affect-me-2e6e51f96952
tags:
  - 3D
  - Git
---

**SubscribeRemember me for faster sign in

By playing with these diagrams we can learn some lessons about the reasons for using two clocks, and we can also simulate possible new scenarios. For instance, we can compare the daylight charts of Barcelona with clock shift and with permanent summer clock:

![How is the end of daylight saving time going to affect me?](/assets/how-is-the-end-of-daylight-saving-time-g-dc5a53e8.png)
Daylight charts of Barcelona with clock shift (left) and permanent summer clock (right). Note how the clock shift keeps the sunrise centered around 7:30. With permanent summer time, the sunrise in winter will happen after 9:00. Source: [https://github.com/PabRod/daylight-charts](https://github.com/PabRod/daylight-charts)The three possible scenarios can be visualized in a more compact way using a single chart with different colors:

![How is the end of daylight saving time going to affect me?](/assets/how-is-the-end-of-daylight-saving-time-g-949a6555.png)
In yellow, sunlight hours with clock shift (current situation). In blue, sunrise and sunset times using winter clock. In red, the same with summer clock. Source: [https://github.com/PabRod/daylight-charts](https://github.com/PabRod/daylight-charts)Just for fun, we can explore the effect of latitude (the position in the South-North line) by, for instance, comparing two of the southernmost and northernmost big towns in the EU:

![How is the end of daylight saving time going to affect me?](/assets/how-is-the-end-of-daylight-saving-time-g-0b6d8980.png)
Comparison of daylight charts in Santa Cruz de Tenerife, Canary Islands (28º N) and Stockholm, Sweden (59ºN). We notice that the further from the equator, the more irregular the sunlight is throughout the year. Source: [https://github.com/PabRod/daylight-charts](https://github.com/PabRod/daylight-charts)Longitude, that is, the position in the direction West-East, also plays a role. This is the direction of the Earth’s rotation and, thus, we can imagine the sunrise “traveling” through it. Indeed, this the reason we have different timezones.

Timezones are decided not only due to astronomical considerations but also due to commercial and political ones. Lots of them are actually wider than the distance the sun covers in one hour, and this causes interesting effects.

Take a look at the map below. It shows the night advancing over Europe the day of the September equinox, together with the European timezones. Do you see something strange?

![How is the end of daylight saving time going to affect me?](/assets/how-is-the-end-of-daylight-saving-time-g-b1fc00a5.png)
Line of sunset advancing over Europe on a day in mid-September. The different colors represent different timezones. Note that, particularly, the Central European Timezone (in dark green) is much wider than the distance the sunset covers in one hour. Source: [https://naukas.com/2013/10/15/espana-esta-que-se-sale-el-meridiano-y-la-hora-oficial/](https://naukas.com/2013/10/15/espana-esta-que-se-sale-el-meridiano-y-la-hora-oficial/)The Central European Timezone, for instance, is huge. The sun takes more than two hours to cover it. And remember, for all the people who live there, the clock shows the same time.

Let's imagine two Europeans, Mateusz and Breixo. Mateusz lives in Lublin, in the East of Poland, and Breixo lives in Tuy, in Northwestern Spain. They both leave the office where they work, simultaneously, when the clock reads 18:00, but their experience is very different. For Mateusz, 18:00 is almost night, while for Breixo it will still be clear daylight for two more hours. Something similar will happen with the sunrise: it will happen roughly two hours earlier for Mateusz than for Breixo. And all of this happens although their clocks are synchronized (actually, it happens because** their clocks are synchronized).

Interestingly enough, Vânia, who lives in the Portuguese town of Valença do Minho, only one kilometer away from Breixo, is in a different timezone. So her clock will read one hour less than that of her neighbor Breixo when the night arrives, simultaneously, at both towns. Pretty confusing, right?

We can see also these effects on our diagrams. In the one below we see an example with two of the most occidental/oriental cities in the CET timezone:

![How is the end of daylight saving time going to affect me?](/assets/how-is-the-end-of-daylight-saving-time-g-9b53daba.png)
Daylight chart for A Coruña, Spain, and Split, Croatia. Both cities lie at the same approximate latitude (43ºN), but are separated by 2000 km in the West-East direction. As a consequence, all astronomical events, including sunrise, happen in Split roughly 2 hours earlier than in A Coruña, although they lay in the same timezone (CET). Source: [https://github.com/PabRod/daylight-charts](https://github.com/PabRod/daylight-charts)A well-informed decision is a good decision. The socioeconomic aspects of this problem are pretty difficult to predict, but the astronomical ones, on the contrary, are almost as predictable as the movement of a clock. Whenever we can, let’s base our decisions on data.

## Acknowledgments

The final version of this short essay was greatly improved by the suggestions and comments of Zeger van der Sterre, [Lourens Veen](https://medium.com/@lourensveen), [Stefan Verhoeven](https://www.esciencecenter.nl/team/stefan-verhoeven-bsc/), [Patrick Bos](https://medium.com/@egpbos), [Sonja Georgievska](https://medium.com/@s.georgievska) and [Maarten van Meersbergen](https://medium.com/@maartenvm).
