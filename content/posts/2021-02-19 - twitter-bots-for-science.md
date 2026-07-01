---
layout: post
title: "Twitter Bots, for Science!"
author: Patrick Bos
published: true
source: medium
source_url: https://blog.esciencecenter.nl/twitter-bots-for-science-1cf3f19dcda8
tags:
  - API
  - Git
  - Python
  - Workflows
---

## How to build a bot to show Covid-19 vaccination progress

Twitter bots have a really bad rep. Troll armies, spam, fake news… You name it, a bot’s done it.

But what if we could harness their powers for good? Use bots to inform people in a fun way? That would be **science outreach**! It’s all in a name.

![](/assets/1_YL2rNx2g8oxkMG149unWgQ-2fde1464.png)

The knights who say “SCI!” ( Python et al., 1975 ). Photo: CC BY 2.0, Brickset

Of course, Covid-19 is on everybody’s mind, but the tide of horribility (it’s a word) is slowly turning into one of hope and recovery. We’re not out of the woods yet, but we are jabbing our way out, one vaccine at a time.

To spread a bit of this hope (and have some fun), I created a [**progress bar** (who doesn’t love progress bars?!) on Twitter](https://twitter.com/CoVacProgress) that shows **how many people have been vaccinated** worldwide and per continent. The bars are updated daily.

![](/assets/1_zMpiXECwyVswfe-fU4EWcg-78e58517.png)

The [code is open source](https://github.com/egpbos/covid_vaccine_progress_bot) and the open data comes from [Our World in Data](https://ourworldindata.org/covid-vaccinations). If you feel inspired by this little project to share some of **your** scientific data, feel free to build on it! I had my first version up in about an hour: it’s really surprisingly easy, so ***don’t let technical barriers hold you back from communicating cool science results automatically***!

The requirements for reading this howto are a working knowledge of Python, Pandas, Git, GitHub and Twitter and a high tolerance for painfully horrible jokes. For the working knowledge part: check out our [Guide](https://guide.esciencecenter.nl/#/). For the jokes, well… maybe reading this article will actually build up your tolerance.

I’ll cover the five steps I took to build this bot:

1. Create a “bot account” on Twitter
2. Get and mangle the data from Our World in Data with the Python Pandas package
3. Use tqdm to make progress bars suitable for Twitter
4. Send tweets using the Python Tweepy package
5. Automate this using GitHub Actions

## Create a “bot” account

The first thing you need is a developer account on Twitter. This allows you to get key strings which you can use later on to log in and do stuff on Twitter from a Python script.

[This post](https://realpython.com/twitter-bot-python-tweepy/#creating-twitter-api-authentication-credentials) (among many others) clearly explains the steps you need to take for this.

It is possible to use your personal account for your bot (and for activating the developer account on), but for this project I decided to create a separate account. You’ll need a unique email address to do so, but you can use the same telephone number as your existing account for confirmation. A separate account allows for easy **testing** of your bot before you start promoting it widely. Just delete the test tweets when everything is done.

So, with your bot account ready, jot down the keys somewhere — but **don’t put them in your git repo** ([like I obviously did 😁](https://github.com/egpbos/covid_vaccine_progress_bot/blob/dfbd3101aa192be8fd6448aa051b0ae14cc1520a/test_tweepy.py#L10)) — so we can use them in Tweepy later on.

## Get the data with Pandas

One of **the** authoritative sources on Covid-19 data is [Our World in Data](https://ourworldindata.org/). You can find their graphs all over the place. The data they gather is conveniently open (under a Creative Commons license) and [available on GitHub](https://github.com/owid/covid-19-data/tree/master/public/data/vaccinations).

![](/assets/1_dThJeI5ENXybCcen6GsAow-34e7bbdf.png)

Grizzlies would be a better name… Image: CC BY-NC-ND 2.0 iregretjumping.

Pandas, the *ironically named omnivore of data science*, can chew this right up, straight from the raw URL. This saves you the step of manually downloading. Convenient! Look for the little “raw” button when viewing a file on GitHub and give that URL to your favorite ursid:

```hs
import pandas as pd
df = pd.read_csv("https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.csv", parse_dates=["date"])
```

This gives us a nice dataframe containing which countries had what number of people vaccinated at which dates. They even keep track of whether people had only one or two (where applicable) shots. Not every country has good data, so Our World in Data only includes those numbers which pass their quality checks.

For the time being, I’m using the column `people_vaccinated_per_hundred` for the bot, because those numbers are a bit less depressing at the moment, but may switch to `people_fully_vaccinated_per_hundred` later on. Since not all countries have data in these columns, this leaves us with a little over 50 countries [after filtering](https://github.com/egpbos/covid_vaccine_progress_bot/blob/e9d4eced48f315567c224f19068ab6bd8206020c/run.py#L55).

### Calculate continent totals with pycountry\_convert

Now, the table has numbers for the whole world pre-calculated, so I grabbed those for my first tests. But I thought it would be fun to also add some more detailed data.

Twitter’s character limit prevents me from posting bars for all 56 countries, but we can certainly do continents. I think that’s still interesting, as well as poignant given the inequality in the world it so very clearly highlights. If the stark contrast makes policy makers think about fairer distribution for a second, that would be a huge win.

Of course, finding the continents for 56 countries **by hand** goes against everything I stand for as a lazy programmer. Obviously, I went about spending way more time on finding and figuring out a nice library that can do this work for me automatically. And, lo and behold, it exists, is called [pycountry\_convert](https://pypi.org/project/pycountry-convert/) and [works like a charm](https://github.com/egpbos/covid_vaccine_progress_bot/blob/e9d4eced48f315567c224f19068ab6bd8206020c/run.py#L49)!

Combine it with the [total population table that Our World in Data also maintains](https://raw.githubusercontent.com/owid/covid-19-data/master/scripts/input/un/population_2020.csv) and you’ve got all the ingredients you need to compute percentages per continent.

Note that the continent numbers are not completely correct like this. Some countries span multiple continents (notably Russia). I treat such countries to just be part of one continent (so Russia is part of Europe, because pycountry\_convert tells me it is).

## Make Tweetable progress bars with tqdm

Now that we have percentages, we can convert them to progress bars.

My go-to package for progress bars is `tqdm`. It is especially good in interactive environments. There’s nothing like a progress bar to spice up a slow `for` -loop. What’s more, `tqdm` ’s bars look really good both in Jupyter notebooks and on the command line due to *using fancy unicode characters*. The latter is exactly what I want to use here as well: Twitter is primarily a textual medium, and although I could just post images of progress bars (wait… why didn’t I? d’oh!), posting text-based bars should be an easy first option.

Also, [year\_progress](https://twitter.com/year_progress) does text-bars as well and that bot inspired this one, so there you go.

Given some `percentage` from the dataset, we can make a bar-string for posting to Twitter with something like:

```hs
bar = tqdm(initial=percentage, total=100., bar_format='|{bar:15}| {percentage:3.1f}%', ascii=False)
bar_string = str(bar)
tweet_string = bar_string[:-5].replace(' ', '\u3000') + bar_string[-5:]
```

A few tricks beyond the `tqdm` basics to highlight are:

- I used a custom format string to remove some superfluous stuff. We need to use as little characters as possible, but, also, it is important to not make the string too wide, otherwise it doesn’t display nicely on all devices (read: phones).
- Usually, `tqdm` is used to display an “animated” progress bar. To emulate animation on the command line, it does all sorts of magic with carriage return (`\r`) and new line (`\n`) characters. I first tried using the `tqdm` option of specifying an output stream using an `io.StringIO` stream object, to act as a virtual terminal so to speak. I then tried to extract the bar string from that. This turned out to be quite a nightmarish experience (may have had to do with it getting quite late). Probably, `tqdm` tries to do very smart things when outputting to this stream, and clearly I wasn’t smart enough to undo those smart things. Luckily, after a good night’s rest, I found that directly extracting the bar string from `bar.__str__()` does not do weird animation stuff and just gives a neat, clean progress bar. Phew.
- Twitter is not a terminal. The relevance of this obvious statement is that Twitter does not use a fixed width font. Madness, I know. But luckily, the unicode committee (I’m sure there is one, perhaps several, in fact) blessed us with more kinds of space characters than we could ever have hoped for. `\u3000`, the “ideographic space”, is the one that turns out to have the same width on Twitter as (most) unicode characters used for the bar itself. So I replace spaces in the bar (barring (heehee) those around the bar) with this ideographic one.

## Tweet with Tweepy

The actual tweeting is the easiest part in all this. The [above mentioned article](https://realpython.com/twitter-bot-python-tweepy/#creating-twitter-api-authentication-credentials) explains most of it using the [Tweepy](https://www.tweepy.org/) package. You need the keys you obtained earlier to authenticate and create an `api` object (see the snippet in the article).

Then, tweeting is as simple as:

```hs
api.update_status("Ceci n'est pas une tweet")
```
![](/assets/0_ZdxO48qSyJmHrXsL-1f57d952.webp)

Simple. J’approuve.

If all goes well, this command will return a giant blob of JSON, wrapped in some Tweepy class. Not to worry, do not disturb it, it means you no harm. If for some reason the Tweepy call failed, you’ll get an error message, so you’ll know when you actually have to start paying attention.

## Automate on GitHub Actions

Obviously, the last part of the show is about getting rid of any future manual action and getting back to watching YouTube. We are programmers, after all. Moreover, we are scientists and we don’t have time for manual labor. That is what PhD stu…

**\[anxious whispering\]**

What?

**\[angry, impatient whispering\]**

Not supposed to…

**\[university PR department whispers\]**

Ok, but…

**\[whispered definitive executive order\]**

Automation, then!

**\[financial whispers\]**

For free! Yes, we can, with GitHub Actions.

**\[mumbled approval\]**

After putting all my code in a git repository (on GitHub), I created a workflow file `.github/workflows/tweet_progress.yml`. The file looks something like this:

```hs
name: Tweet latest progresson:
  schedule:
    - cron:  '0 10 * * *'  # 10:00 UTC, see https://crontab.guru/
  # allows you to run this workflow manually from the Actions tab:
  workflow_dispatch:jobs:
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
          BOT_ACCESS_SECRET: ${{ secrets.BOT_ACCESS_SECRET }}
        run: python run.py
```

Under the `on` section, we make our Tweepy script run on a regular `schedule`: every day at 10 a.m., UTC (check out [https://crontab.guru/](https://crontab.guru/) if you don’t want to bother remembering the arcane cron syntax, thanks to

[Stefan Verhoeven](https://medium.com/u/fca35bfb3190?source=post_page---user_mention--1cf3f19dcda8---------------------------------------)

for the tip). The data is updated daily in the morning, so this should use the freshest data most days. We can also trigger the job manually by adding `workflow_dispatch`. The part below `jobs` is what will actually run on a GitHub machine and should be mostly self-explanatory. This will also be different for your specific application (unless you copy mine). The important thing to notice, though, is the bold part where I pass in all the keys.

Two things to make this possible:

- The awesome [ConfigArgParse](https://pypi.org/project/ConfigArgParse/) module allows for specifying program parameters in three ways: via command line arguments (like the Python standard library `argparse`), via a config file or via environment variables, all through one convenient, almost-drop-in-replacement-of- `argparse` call. On my laptop (for testing and such) I added a config file with the keys in it (and put the name of that file in `.gitignore`, after my earlier key committing booboo), but on GitHub Actions I can now pass them in through environment variables via the `env` section.
- The second part is those `${{ secrets.THING }}` things. You have to [store the Twitter keys in GitHub secrets (instructions here)](https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository).

Commit the yml file, push it to GitHub, and just like that you’ve got yourself an automatically updating Twitter bot!

![](/assets/1_l1__Q8DxN_LnAe_VU4L3CQ-2dc29b71.png)

The top two tweets were automatically produced. It’s alive! ALIVE!!!

I hope I convinced you that if you have a cool idea for a bot and know of a data source, you should immediately go for it! Just [fork my repo](https://github.com/egpbos/covid_vaccine_progress_bot/) if you want to get a quick start, modify it to your liking and put it out there.

**Congratulations**, you just made the world a better, more well-informed place!

I’d love to hear what you think, let me know in the comments. Also, if you want some help setting up your bot, don’t hesitate to ask.
