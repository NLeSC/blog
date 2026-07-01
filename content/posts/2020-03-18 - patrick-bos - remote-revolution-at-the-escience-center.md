---
layout: post
title: "Remote revolution at the eScience Center"
date: 2020-03-18
author: Patrick Bos
published: true
source: medium
source_url: https://blog.esciencecenter.nl/remote-revolution-at-the-escience-center-28db59f86766
tags:
  - Community
  - Git
  - RSE
  - Research Software
---

## Tools and practices for collaborating from home

![](/assets/1_ZUCKx3r5NhRcr-sFwMhTBQ-75fd2b47.jpeg)

One of the core values of the Netherlands eScience Center is collaboration. We work with teams and even whole communities of scientists. Communication is key.

The COVID-19 pandemic has forced us into social isolation. But we simply cannot do our jobs in complete isolation. Luckily, we don’t have to, as many people that have suddenly been sent to work from home are finding out.

In this post, I’ll briefly list some of the tools and practices we’ve adopted the past few days to keep collaboration going.

Disclaimer: we pay Microsoft for the Office 365 stack, so we’re a bit biased towards / locked-in by those tools, but I’m sure alternatives work fine as well. The important thing is to realize that you can do a lot remotely.

## Work from home

Of course, many people do not have the luxury of being able to work from home. But we do, and so our organization has gone into full home mode.

Usually, we divide our time between being at the office and working “on location”. At the office, we exchange knowledge, work together on projects and, of course, socialize. We also work at the location of the project partners, i.e. at the universities or institutes of the domain scientists. There we… basically do the same:) Sometimes we go on conferences, but let’s forget about that for a moment (although… see below).

Working on projects usually means trying to understand the problem, finding solutions using digital technologies and then implementing them. The first part means: talking to project partners. The second means: thinking, talking to colleagues and, again, talking to project partners. Implementing solutions means: programming; sometimes alone, sometimes together. All of this is often done iteratively, so you cycle through steps 1, 2 and 3 over and over again.

So, completely working from home is only possible when you have communication channels with low latency and where you can interact with high bandwidth: written words alone often don’t cut it. Video is already a lot better. Of course, there are many solutions available for this and many people were already using these tools a lot, even before we started to fully work from home: Skype, [Zoom](https://zoom.us/) ([see here for a nice guide](https://docs.google.com/document/d/1xdENyIV1505FDXBj7n5PaaHinGGUWc1R0ib1t7DRSCw/edit)), [Whereby](https://whereby.com/), [Vidyo](https://www.vidyo.com/), [GoToMeeting](https://www.gotomeeting.com/nl-nl), [Teams](https://teams.microsoft.com/) and even our neighbors at SURF have their own tool for the Dutch academic community called [Videobellen](https://videobelpilot.surf.nl/) which seems to work well and is free for those working at Dutch academic institutions.

Another thing to keep in mind is of course to prevent repetitive strain injury by making sure you have a well adjusted desk setup or whatever else works for you.

## Pair programming

I would say that maybe 40–60% of the job is actually programming. A lot of coding can be done alone, but often you do need input and Google and Stack Overflow don’t cut it. At such a time, getting quick feedback can make all the difference. Often this can be done over chat or a video call.

But pair programming is a different game. Sitting in pairs, working on one computer can really help getting through tough problems. Usually one person types and the other is real-time reviewing everything and reflecting on all choices. This way you avoid many errors, design flaws and other sloppiness, which in the long run can make your programming hours much more efficient.

So what if you can’t sit together in front of one screen? Sharing your screen could be an option, but there are better ones. Visual Studio Code has a [Live Share extension](https://marketplace.visualstudio.com/items?itemName=MS-vsliveshare.vsliveshare-pack) that allows you to work together on each other’s code in each other’s editor. My colleagues have tried this and were very happy with it. It turns out even [Vim has a plugin for collaborative editing](https://github.com/FredKSchott/CoVim)! It seems a unmaintained, though, but may still be worth a try.

Of course, other tools for writing together are already more widespread, like Google Docs and Microsoft Office Online for regular documents, or Overleaf for LaTeX documents.

## Talks & colloquia

Last week I was already in self imposed isolation, but my colloquium talk was planned. Luckily, our A/V team was already looking into remote colloquia. The solution we ended up with was:

1. Set up Microsoft Stream to live stream talks from the office (which by now has become temporarily obsolete, as the office is closed… but still nice to have for later). These are then also automatically stored on Stream after the talk, so really convenient.
2. Set up Teams to give talks remotely. Also, these can be recorded and saved to Stream automatically.

It turns out this works fine! I got some feedback after the talk, just as I usually get when I give a colloquium, so content-wise, everything is still the same as it was.

One thing that did feel a bit weird was that the other side was muted, which meant I got no direct feedback at all. So I had no idea whether my brilliant jokes were properly appreciated, for instance. But more importantly: no idea whether people are still following me at all, which is a bit easier to gauge when you can look at them every now and then (not too often, of course, like most people, I much prefer staring at my slides).

I think unmuting the room (if you are still connected to a “room”) may be a bit nicer, but your mileage may vary. In any case, since we are now in full home mode, everyone will be on Teams for the next colloquium. In that case, muting non-speakers is quite essential. On the other hand, it will probably be easier to interject for individuals with a question. We’ll have to see how it goes, but based on some other talks we already did this way, I expect it will go very well.

## Standups

Every Monday, we do a full-team (70-ish people) standup. Everybody gets max 30 seconds to update colleagues on whatever they think is relevant. This is a really nice central moment that really brings out the collaborative nature of the center. People ask for help on tricky issues, announce useful new tools they created or found and share their proud moments or sad ones. For me, it’s one of the best ideas we’ve had and I advise everyone to do this.

This Monday, we had our first fully remote standup and it worked really nicely via Microsoft Teams! You get the bonus of easy recording and automatic uploading to MS Stream (which we already happened to use, because we always manually recorded our colloquia and other plenary talks). Usually, we did not record these meetings and sometimes important announcements are made there first (and probably later via mail, but there might be some delay). Now, everyone can easily stay up to date by checking at their earliest convenience the standup recording. Nice!

One slight practicality: when you stand in one physical room, doing the round is easy; you just go round the circle. Online, using Teams, it’s not that much harder. You just go down the participants list. The meeting is a bit quieter. Usually, people in the circle tend to respond a bit more. Now, also all the other mics are muted, so, again, you have no idea whether your horrible puns have hit home. But, I must say that the other way around, i.e. on the listening side, it was totally fine and worked just as well as the regular in-person standup.

Also, in our smaller project oriented teams (5–8 people) we have started using Teams. Morning stand-ups, review meetings, etc.; so far everything has worked perfectly well!

## Psychological well being & coffee time!

If you feel you’re getting lonely, just open up a group chat for the heck of it and have a coffee together.

I’ve seen this idea floating around on Reddit as well. Some people even keep a call open all day long. It gives people the feeling that they’re still a bit at the office with their colleagues. Also, if you find it hard to work in complete isolation and silence and crave some background noise, like the kind you may also find in coffee shops, this can actually be a great solution.

Some other tips to keep your sanity after days of confinement:

- Try to not work in the same place you sleep, eat or relax
- Keep a schedule, with a focus on not working overtime
- (This may be silly) Don’t work in your pyjamas

## Chat

Chat works well for socializing and quick questions which are not mission critical, but that you are having trouble figuring out on your own and would like some help on.

One important condition imho: you need to make sure to not make chat channels essential. There are many stories doing the rounds warning against “always on” culture. Don’t fall into the trap. If you really need to immediately contact someone, call them. If not, use asynchronous communication (mail, issue trackers) and get on with another task.

Also, many people do not want the distraction of chat at all. So make sure you separate general coffee corner style banter from official, plenary discussions (if you have those at all… which I wouldn’t recommend, except to support the live video calls).

At the Center, we’ve been using Slack for a few years now, and it has served us well. Since we’re now starting to use Teams for many other things, we’ve also set up chat there. The word is not yet out on which tool works best for us.

## Remote conferences: NL-RSE meetup

Technically this is not an eScience Center activity, but as part of the bigger NL-RSE movement, some of my colleagues are involved in organizing NL-RSE meetups in Utrecht for the Dutch community of research software engineers (RSEs). Some speakers are invited and lots of opportunity to mingle and network is provided.

Unfortunately, [this time — Friday the 13th](https://nl-rse.org/events/2020-03-13-meetup.html) — my colleagues didn’t want to tempt fate and [made the wise decision to cancel the in-person event… only to replace it with a fully remote event](https://twitter.com/matkuzak/status/1237735075669848064)!

[Mateusz Kuzak](https://medium.com/u/c2754835142?source=post_page---user_mention--28db59f86766---------------------------------------)

arranged for the meeting to be held via Zoom. This went very well! [Minutes can be found here](https://tinyurl.com/2020-03-13-nl-rse) for those interested. 20+ people attended and had very constructive and interesting sessions, both with three speakers and with a collaborative session that will result in an article on the [KB Lab (Royal Dutch Library) blog](https://lab.kb.nl/about-us/blog) here very soon.

### Digital office hours

One additional detail that I really liked was that [Mateusz](https://twitter.com/matkuzak) held a digital office hour via Zoom one day in advance of the meetup to help everybody get properly set up.

This may also be useful in other situations, like when your students want to ask you questions, but you don’t want to be interrupted at every minute of the day. With digital office hours, you can help your students and still have guilt-free deep focused hours of work in the other hours of the day.

### Networking

One downside of doing online conferences so far is that networking becomes a lot harder when you can’t mingle easily over coffee. One of my colleagues

[Fakhereh (Sarah) Alidoost](https://medium.com/u/ee774bf64a6b?source=post_page---user_mention--28db59f86766---------------------------------------)

experienced this at the [EUCP](https://www.eucp-project.eu/) general assembly, which she attended remotely. The rest of the conference was really high quality, though. The meeting layout, sound and video quality using Zoom were very good. Also, Zoom has a “Raise Hand” option, which is very useful.

## More inspiration

Many people and companies have already long been experimenting with remote working. For instance, GitLab published the [Remote Manifesto](https://about.gitlab.com/blog/2015/04/08/the-remote-manifesto/) with some great general guidelines for making remote working work.

A few days ago I came across this [really, really insightful article about someone working (remotely) at GitHub and the non-obvious challenges she faced transitioning from co-located to remote working](https://www.thegreatcodeadventure.com/my-long-distance-relationship-with-github/). Turns out it’s about more than just doing video calls. Asynchronous is the keyword. Using issue trackers and other online tools for communication are vital. Indeed, we have long been using these as well, but maybe we still have things to learn about using them even more effectively.

Further useful resources compiled by

[Mateusz Kuzak](https://medium.com/u/c2754835142?source=post_page---user_mention--28db59f86766---------------------------------------)

are the following:

- [A Lesson to Demonstrate a Few Techniques for Online Meetings](https://hackmd.io/cFL-4VosSfq3RpvCfVpxEQ)
- [Tips for Teaching and Learning Online by The Carpentries Community](https://docs.google.com/document/d/1MdmrNn5g2oa2AA6EGYZhyDx-O_YOoH_HqNGsmP6LKIo/edit?usp=sharing)
- [Abby’s online meeting tips](https://twitter.com/abbycabs/status/1237001927734542341?s=21)
- [Mozilla online meeting tips](https://foundation.mozilla.org/en/blog/online-meeting-tips/)
- [Gitlab Guide to all remote](https://about.gitlab.com/company/culture/all-remote/)
- [How To Run A Free Online Academic Conference: A Workbook](https://docs.google.com/document/d/1EABkSzEdJk5cmMLETpSbXaeDXmFwcTz7SUXP_C3dN9k/edit?usp=drivesdk)

If you have any further tips or resources, please let me know in the comments or on [Twitter](https://twitter.com/eScienceCenter/status/1240253016122458113)! Of course, many tips are out there already. There’s even [a subreddit dedicated to remote working](https://www.reddit.com/r/remotework/) that’s surely going to blow up the coming weeks.
