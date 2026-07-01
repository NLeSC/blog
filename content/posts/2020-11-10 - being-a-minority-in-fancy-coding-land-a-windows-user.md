---
layout: post
title: "Being a minority in fancy coding land: a Windows user."
author: Florian Huber
published: true
source: medium
source_url: https://blog.esciencecenter.nl/being-a-minority-in-fancy-coding-land-a-windows-user-d853d80a6ef9
tags:
  - Containers
  - Git
  - Linux
  - R
  - Workflows
---

## How I slowly went from my imposter-syndrome hiding to accepting what I am. A Windows user, at least most of the time. (Don’t worry, this is NOT one of those Linux vs. Windows posts!)

I work at the [Netherlands eScience Center](http://esciencecenter.nl/), a wonderful organization with very nice colleagues. Hopefully nice enough to stay my colleagues after the following confession: I am a Windows user.

What’s so special about this? Most people use Windows, right?  
Well, not in my small *coding bubble*.  
In the world I work in (use all your cliché imagination on nerds, hackers, computer scientists … but then remove those pictures of people wearing sun glasses indoors and desks full of pizza and caffeine-rich soft-drinks) coding from a Windows environment is often considered something between a no-go and a handicap. Breathing quickly, my fingers start to tremble as I write this, risking my career as a data scientist and machine learning practitioner. Or isn’t it all that bad?

![](/assets/1_omI5G0XyVglCsQpBFmgf9A-744fa126.png)

### How did I end up using Windows?

*(I see your shaking heads… why the hell did he end up there?)*  
Let’s just say I have grown into it. All the way from [MS DOS](https://en.wikipedia.org/wiki/MS-DOS) through many painfully bad Windows versions and then I got so used to it that **my skills to deal with it always felt better than my skills in handling the alternatives**.

In addition, I am not a software developer or computer scientist by training. For a long time I was a physicist, a scientist, an academic. And in the scientific fields where I was working, using Windows was — believe it or not —the norm.

Sure, I had already installed VirtualBox on my computer to run Ubuntu. I had even done some stuff with Ubuntu, including training some machine learning models (for implementations for which the packages didn’t support Windows…). I knew the 10 most common shell commands and everything else I would simply look up when needed. No wonder working with Linux still feels like writing a long letter with my left hand (I am right handed): I am terribly slow and in the end it looks horrible.

### But … why?

Ah, I see. That all sounds like lame excuses to you.  
Well, it is not that I didn’t see all those golden merits of using Linux over Windows. Of course that’s the better system for many tasks, say setting up a server or handling access rights. And yes, it is much less wasteful in using hardware resources, it is considered less vulnerable, … and so on …, plus it is freely available without commercial interests. Still, I never wanted to pay the price of not having access to some of the high-end software that you would get on mac-OS or Windows (such as some MS office stuff or Adobe products). By the way: I am not trying to convince anybody that Windows is the best option. I am already happy if we can agree that it is ***an*** option.

Time for another uncomfortable revelation: sometimes, being lazy simply pays off. For instance if you need to sort out a huge pile of stuff with some emotional value to you. Just put it in a box and hide it, take it out 10 years later and easily decide to dump nearly all of it. That’s a bit what I did with Linux. I survived with minimal use of VirtualBx and alike. Until recently, *finally!*, Linux became part of Windows. And that works pretty well for me. [See how simple it now is to run Linux from Windows 10.](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/) And enjoy how easily you now can have the best of both worlds (not for nothing are more and more people arguing [that the good old “dual boot” is dead](https://towardsdatascience.com/dual-boot-is-dead-windows-and-linux-are-now-one-27555902a128) for exactly this reason).

![](/assets/1_Ct2nr1TdVL8Qnmn5S2StDA-d5cb5a59.png)

Using Windows and Ubuntu side by side… in front of wonderful ugly-ish Windows blue… what a peaceful view, isn’t it?

Enough all-united-hippie-talk. Let me share a few impressions of the actual life of an aspiring data scientist/research software engineer that happens to use Windows:

### Starting a new job.

I did a lot of programming as a researcher, but clearly I had never learned the proper software development basics such as testing, versioning etc. (in many academic fields those terms are often still unheard of!). No wonder I suffered a lot from imposter syndrome in the very beginning.

> *I hope they won’t find out I can’t write proper code!*

Naturally, that means that you might not immediately ask your colleagues for help, because that would reveal your amateur level, right?  
But even worse, imagining you ask that colleague about how to get that Python package working and it turns out you are using Windows?

> Can you help me setting up that environment? … By the way … I use Windows for that.

The looks you get are suggesting that you have just asked how to import a 5GB.csv file into your Excel table (*\*you don’t\**). So little surprise I did spend a fair amount of time in Forum-Land during my first months…

### Being that Windows user in the room

You sit in that hands-on workshop on some fancy programming techniques, and the instructors asks:

> Is there anybody using Windows? (chuckles)

Or, actually worse, nobody asks. Of course the instructions are only given for Linux and mac-OS. Well, at least I can hide my Windows handicap for a little longer then… but **NO**!, when the instructor walks around to inspect the progress of the participants she/he will of course shout out:

> Wow … you are really using Windows for that!?

Great. Now officially being tagged as **the Windows user** in the room. Better keep quiet and not ask any silly questions then…

### Get used to rolled eyes —then secretly roll your eyes, too.

As I grew more confident of what I was doing, the imposter syndrome started to disappear. It still occasionally comes back to say hello (for instance if people speak shell over coffee), but that’s OK.

In the end it’s luckily the results that matters most. I learned that you can write as good or bad code on Windows as on Linux. You can build great software on Windows that is then used by Linux people, and the other way around. Sure, for some things you better go the Linux way. But it turns out that in my projects this is less than 1% of my working time, which makes it OK to be a bit clumsy using it. And secretly (*don’t point at them, that’s mean!*), I can also enjoy those moments when another colloquium presentation doesn’t run properly because Ubuntu did not work well with the projector, or the microphone, or both.

### Do better than pointing at each other

Windows is more convenient for running some very common software (e.g. MS office), Linux is more stable… so go some cliches. But instead of fighting about what’s better (or hiding what feels inferior) it makes more sense to me to accept what’s there and simply go along with it. If somebody lives in a very geeky bubble it works fine to safely assume everyone runs their code on a certain operating systems and knows the in and outs of object oriented programming and containerization. But many of the more exciting projects involve people outside this bubble: researchers, users, future contributors, students. And they might as well — lo and behold — be using Windows (and by the way: containers are still primarily **big steel boxes** to most people).

So, even though in some IT-bubbles it can occasionally feel as if we are talking about a small unfortunate minority … in reality that’s really not true. Check out [the 2020 Stack Overflow Developer Survey](https://www.freecodecamp.org/news/stack-overflow-developer-survey-2020-programming-language-framework-salary-data/) to see that **most developers actually use Windows**.

### What can you do to get more Windows users to adopt your package?

Think of Windows what you want. I don’t work for Microsoft, and honestly, I don’t really care. But I assume that many coders out there working on great new software, methods, tools, tutorials, etc. actually want that people become happy users (paid by eternal gratitude). And that is a good enough reason to think about those Windows users as well.

- Consider setting up your next continuous integration for your software package, so that it runs on all systems and will be used by more people.  
	For instance with [continuous integration using GitHub](https://docs.github.com/en/free-pro-team@latest/actions/guides/about-continuous-integration) actions it can be as simple as adding a `‘windows-latest’` to your matrix:  
	`os: [‘ubuntu-latest’, ‘macos-latest’, ‘windows-latest’]   ` (small warning: adding different operating systems to such a continuous integration workflow is comparably easy, the later debugging sometimes is not. One option can be to work with [Windows virtual machine](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines/)).
- What about providing installation instructions for Windows users as well? Or did you just write a new tutorial? Great! But will it work for your fellow Windows users? You would be surprised how many packages and tutorials come with instructions that clearly won’t work for a Windows user.  
	Don’t know how to do that? No Problem! Just ask a Windows user to help you. Believe me, they will be very glad to assist.

### Final symmetry

Most of my arguments will hold when we just swap the named OS. So, obviously if you are (like me) primarily a Windows user: Think of all those Linux and mac-OS people out there. Either way, it will require learning a bit about the differences. But it will help to avoid a lot of frustration on all ends due to failing notebooks or hard to install packages.

### Get in touch

If you have comments or questions please get in touch! You can also find me on twitter: [**me\_datapoint**](https://twitter.com/me_datapoint)
