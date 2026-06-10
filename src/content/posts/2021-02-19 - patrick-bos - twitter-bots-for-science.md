---
layout: post
title: "Twitter Bots, for Science!"
date: 2021-02-19
author: Patrick Bos
published: true
source: medium
source_url: https://blog.esciencecenter.nl/twitter-bots-for-science-1cf3f19dcda8
tags:
  - uncategorized

---

## How to build a bot to show Covid-19 vaccination progress

](https://egpbos.medium.com/?source=post_page---byline--1cf3f19dcda8---------------------------------------)[Patrick Bos](https://egpbos.medium.com/?source=post_page---byline--1cf3f19dcda8---------------------------------------)·Feb 19, 2021

Given some `percentage` from the dataset, we can make a bar-string for posting to Twitter with something like:

bar = tqdm(initial=percentage**, total=100., **bar_format**='|{bar:15}| {percentage:3.1f}%', ascii=False)**bar_string = str(bar)
tweet_string = bar_string[:-5].replace(' ', '\u3000**') + bar_string[-5:]A few tricks beyond the `tqdm` basics to highlight are:

* I used a custom format string to remove some superfluous stuff. We need to use as little characters as possible, but, also, it is important to not make the string too wide, otherwise it doesn’t display nicely on all devices (read: phones).
* Usually, `tqdm` is used to display an “animated” progress bar. To emulate animation on the command line, it does all sorts of magic with carriage return (`\r`) and new line (`\n`) characters. I first tried using the `tqdm` option of specifying an output stream using an `io.StringIO` stream object, to act as a virtual terminal so to speak. I then tried to extract the bar string from that. This turned out to be quite a nightmarish experience (may have had to do with it getting quite late). Probably, `tqdm` tries to do very smart things when outputting to this stream, and clearly I wasn’t smart enough to undo those smart things. Luckily, after a good night’s rest, I found that directly extracting the bar string from `bar.__str__()` does not do weird animation stuff and just gives a neat, clean progress bar. Phew.
* Twitter is not a terminal. The relevance of this obvious statement is that Twitter does not use a fixed width font. Madness, I know. But luckily, the unicode committee (I’m sure there is one, perhaps several, in fact) blessed us with more kinds of space characters than we could ever have hoped for. `\u3000`, the “ideographic space”, is the one that turns out to have the same width on Twitter as (most) unicode characters used for the bar itself. So I replace spaces in the bar (barring (heehee) those around the bar) with this ideographic one.

## Tweet with Tweepy

The actual tweeting is the easiest part in all this. The [above mentioned article](https://realpython.com/twitter-bot-python-tweepy/#creating-twitter-api-authentication-credentials) explains most of it using the [Tweepy](https://www.tweepy.org/) package. You need the keys you obtained earlier to authenticate and create an `api` object (see the snippet in the article).

Then, tweeting is as simple as:

api.update_status("Ceci n'est pas une tweet*")
Simple. J’approuve.If all goes well, this command will return a giant blob of JSON, wrapped in some Tweepy class. Not to worry, do not disturb it, it means you no harm. If for some reason the Tweepy call failed, you’ll get an error message, so you’ll know when you actually have to start paying attention.

## Automate on GitHub Actions

Obviously, the last part of the show is about getting rid of any future manual action and getting back to watching YouTube. We are programmers, after all. Moreover, we are scientists and we don’t have time for manual labor. That is what PhD stu…

**[anxious whispering]**

What?

**[angry, impatient whispering]**

Not supposed to…

**[university PR department whispers]**

Ok, but…

**[whispered definitive executive order]**

Automation, then!

**[financial whispers]**

For free! Yes, we can, with GitHub Actions.

**[mumbled approval]**

After putting all my code in a git repository (on GitHub), I created a workflow file `.github/workflows/tweet_progress.yml`. The file looks something like this:

name: Tweet latest progresson:**  schedule:
    - cron:  '0 10 * * *'  # *10:00 UTC, see ***[https://crontab.guru/](https://crontab.guru/)***
  # allows you to run this workflow manually from the Actions tab:*****  workflow_dispatch:jobs:
  tweet:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
      - name: install dependencies
        run: pip install -r requirements.txt
      - name: run script
        env:
          BOT_API: ${{ secrets.BOT_API }}
          BOT_API_SECRET: ${{ secrets.BOT_API_SECRET }}
          BOT_ACCESS: ${{ secrets.BOT_ACCESS }}
          BOT_ACCESS_SECRET: ${{ secrets.BOT_ACCESS_SECRET }}****        run: python run.pyUnder the `on` section, we make our Tweepy script run on a regular `schedule`: every day at 10 a.m., UTC (check out [https://crontab.guru/](https://crontab.guru/) if you don’t want to bother remembering the arcane cron syntax, thanks to [Stefan Verhoeven] for the tip). The data is updated daily in the morning, so this should use the freshest data most days. We can also trigger the job manually by adding `workflow_dispatch`. The part below `jobs` is what will actually run on a GitHub machine and should be mostly self-explanatory. This will also be different for your specific application (unless you copy mine). The important thing to notice, though, is the bold part where I pass in all the keys.

Two things to make this possible:

* The awesome [ConfigArgParse](https://pypi.org/project/ConfigArgParse/) module allows for specifying program parameters in three ways: via command line arguments (like the Python standard library `[argparse](https://docs.python.org/3/library/argparse.html)`), via a config file or via environment variables, all through one convenient, almost-drop-in-replacement-of-`argparse` call. On my laptop (for testing and such) I added a config file with the keys in it (and put the name of that file in `.gitignore`, after my earlier key committing booboo), but on GitHub Actions I can now pass them in through environment variables via the `env` section.
* The second part is those `${{ secrets.THING }}` things. You have to [store the Twitter keys in GitHub secrets (instructions here)](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).

Commit the yml file, push it to GitHub, and just like that you’ve got yourself an automatically updating Twitter bot!

The top two tweets were automatically produced. It’s alive! ALIVE!!!I hope I convinced you that if you have a cool idea for a bot and know of a data source, you should immediately go for it! Just [fork my repo](https://github.com/egpbos/covid_vaccine_progress_bot/) if you want to get a quick start, modify it to your liking and put it out there.

Congratulations**, you just made the world a better, more well-informed place!

I’d love to hear what you think, let me know in the comments. Also, if you want some help setting up your bot, don’t hesitate to ask.
