---
layout: post
title: Building a Redox
categories: [keyboards, 3dprinting]
---

First step was 3d printing a case.  I tried a few but ended up going with [this](https://www.thingiverse.com/thing:2886662), the most popular design on Thingiverse.  I really wanted [this one](https://www.thingiverse.com/thing:3825752) to work, but the 3d printed top plate flexed a little too much for my liking.

![](/images/redox-case.jpg)

Soldered the diodes onto the PCB.  Not too bad of a process and not too bad of a job overall, I think. Getting the pyramid of solder is kinda an art.  I also socketed the two Pro Micros following these [instructions](https://docs.cannonkeys.com/sockets/).  It worked but was pretty ugly (forgot to take pictures).

![](/images/redox-soldering.jpg)

I'm using Gateron yellow switches here.  It was my first time using a linear switches.  Ordered from [kbdfans.com](https://kbdfans.com) for super cheap, only $14 for 70.  Shipping kills the deal, though.  Lubed with a 60/40 mix of Superlube grease and oil.  Used a 3d printed switch opener (I found this [one](https://www.thingiverse.com/thing:2775085) works the best) and a 3d printed a lubing station.  The corner of that print lifted off the build plate a little but that didn't affect anything.

![](/images/redox-lubing.jpg)

Switches all soldered in and tested for continuity with a multimeter.

![](/images/redox-switches.jpg)

Here it is, in it's final form:

![](/images/redox-final.jpg)

As far as software goes, similar to the [BDN9](/building-the-bdn9) this is also powered by QMK firmware. You need to flash both sides and becauase of that, you can actually use each side independently. Here is my the [code](https://github.com/ThomasChung/qmk_firmware/tree/master/keyboards/redox/keymaps/thomas).
