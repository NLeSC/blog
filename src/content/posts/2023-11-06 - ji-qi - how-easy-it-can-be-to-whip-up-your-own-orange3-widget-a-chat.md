---
layout: post
title: "How Easy It Can Be to Whip Up Your Own Orange3 Widget: A Chatbot Adventure with HuggingChat!"
date: 2023-11-06
author: Ji Qi
published: true
source: medium
source_url: https://blog.esciencecenter.nl/how-easy-it-can-be-to-whip-up-your-own-orange3-widget-a-chatbot-adventure-with-huggingchat-ded982ac0ef4
tags:
  - uncategorized

---

4

*Are you ready to dive into the captivating world of Orange3 widgets and unleash your inner chatbot whisperer? 🚀✨ Whether you’re a coding connoisseur or a newbie explorer, developing your own widget doesn’t have to be a Herculean task. In fact, with a little sprinkle of curiosity and a dash of HuggingChat magic, you’ll be crafting your own chatbot widget in no time!*

![How Easy It Can Be to Whip Up Your Own Orange3 Widget: A Chatbot Adventure with HuggingChat!](/assets/how-easy-it-can-be-to-whip-up-your-own-o-63271872.png)
In a future blog [post](/the-orange3-data-mining-platform-as-a-research-tool-2167336a5c0d) by my colleague, Kody Moodley, you will catch a glimpse of what Orange3 is all about, along with its snazzy uniqueness (if not, seriously, what are you waiting for? Go give it a whirl!). But for now, I bet you’re riding the wave of curiosity mixed with a sprinkle of concern — “Will it be a brain drain, and will I get tangled in the web of complexity while treading the path of development?”

What I aim to convey through this post is that creating widgets on Orange3 is as easy as pie! However, writing the post takes me some serious brainpower. I’ve been on an epic quest to unravel the secrets of making the content simple, yet captivating. But you know what they say, inspiration strikes in the most unexpected places. Picture this: I’m casually chatting with a friend on the newly released Android client of ChatGPT, and bam! Just like that, it hit me — why not roll up my sleeves and craft my very own chatbot widget on Orange3?

My initial brainstorm led me straight to a ChatGPT-powered chatbot, but alas, I wear the open-source cape proudly! Thus, I turned my gaze toward the enchanting realm of HuggingChat. 🌟 With a dash of curiosity, I dove into the API docs at lightning speed and spent a solid three hours conjuring up all the magic you’re about to read.

## Before diving into the core

Embarking on a journey is always thrilling, but you might find yourself going, “Where in the world do I begin?” Fret not, for Orange3 has your back with a nifty add-on template. No need to suffer the pains of starting from scratch — just give ’em a friendly clone from [GitHub](https://github.com/biolab/orange3-example-addon) to your computer and sprinkle in the required Python libraries.

#Clone the repo of the example Orange3 add-on
git clone https://github.com/biolab/orange3-example-addon.git
cd orange3-example-addon

#Install Orange3 and other required packages
python -m venv orangedev  
source orangedev/bin/activate 
pip install pyqt6 pyqt6-webengine orange3 hugchatTime for a little detective work! Execute these commands to check if you have everything in the right place.

#Install the example add-on and open the GUI application of Orange
pip install -e .  
python -m Orange.canvas  If everything goes well, you should be able to see the following window popping up, where you can find that your *Example* add-on and *Hello World* widget are already there.

![How Easy It Can Be to Whip Up Your Own Orange3 Widget: A Chatbot Adventure with HuggingChat!](/assets/how-easy-it-can-be-to-whip-up-your-own-o-0731634a.png)
The canvas application with the example add-on installed.

## The serious showdown

Before we wade into the treacherous waters ahead, let’s take a peek at what awaits from these three hours of dedicated effort.

![How Easy It Can Be to Whip Up Your Own Orange3 Widget: A Chatbot Adventure with HuggingChat!](/assets/how-easy-it-can-be-to-whip-up-your-own-o-e0526449.gif)
The chatbot widget.In brief, I have a chatbot that allows me to log in with my own HuggingFace account and password, answer my questions, and record all of the historical conversations. The only thing I did was create a Python file named “HugChat.py*” *and put it in the folder “orange3-example-addon/orangecontrib/example/widgets”. Check the content of my file to get a first impression of how easy the work is.

#Content of the HugChat.py file
from Orange.data import Table
from Orange.widgets import gui
from Orange.widgets.settings import Setting
from Orange.widgets.widget import OWWidget, Output
from Orange.data.pandas_compat import table_from_frame

from hugchat.login import Login
from hugchat import hugchat
import textwrap
import pandas as pd

class HugChat(OWWidget):
    name = "Hugging Chatbot"
    description = "Orange3 widget instance of HuggingChat."
    icon = "icons/mywidget.svg"
    want_main_area = True
   
    email = Setting("")
    passwd = Setting("")
    query = Setting("")
    
    class Outputs:
        data = Output("Data", Table)
    
    def __init__(self):
        super().__init__()
        self.queries = []
        self.replies = []
        self.chatbot = None
        
        # control area: login
        gui.lineEdit(widget=self.controlArea, master=self, 
                     value="email", label="Email")
        gui.lineEdit(widget=self.controlArea, master=self, 
                     value="passwd", label="Password")
        gui.button(widget=self.controlArea, master=self, 
                   label="Login", callback=self.init_chatbot)
        
        # main area: chatbot
        gui.lineEdit(widget=self.mainArea, master=self, 
                     value="query", label="Query", callback=self.chat)
        self.reply = gui.WebviewWidget(parent=None, debug=False)
        self.mainArea.layout().addWidget(self.reply)
        
    def init_chatbot(self):
        sign = Login(self.email, self.passwd) 
        
        # cookies setup
        cookie_path_dir = "./cookies_snapshot"
        sign.saveCookiesToDir(cookie_path_dir)
        cookies = sign.login()
        
        # initialize chatbot
        self.chatbot = hugchat.ChatBot(cookies=cookies.get_dict())
        
        # initialize a new conversation
        id = self.chatbot.new_conversation()
        self.chatbot.change_conversation(id)
    
    def chat(self):
        reply_text = self.chatbot.chat(text=self.query)
        self.reply.setHtml(reply_text)
        
        # update the output table
        self.queries.append(self.query)
        self.replies.append(reply_text)
        df_output = pd.DataFrame({
            "Query": self.queries, 
            "Reply": self.replies
        }) 
        self.Outputs.data.send(table_from_frame(df_output))Now, let’s look at the details. The code above defines a class that contains all the features and functions of our widget. This class is inherited from another class named `OWWidget`, which is the base class of all Orange3 widgets. From there, we can rewrite existing functions and create new functions to satisfy our requirements.

At the top of the class, we have a brief description of the widget, including its name, a short text explaining what it does, and a path string pointing to the location of the widget icon. An additional flag called `want_main_area` is assigned to be true, which means that we want to present the main area of the widget and show things there.

name = "Hugging Chatbot"
description = "Orange3 widget instance of HuggingChat."
icon = "icons/mywidget.svg"
want_main_area = TrueA widget can contain both the control and main area, while the main area is optional. To briefly explain, the control area should contain all of the utilities for preparing the widget, while the main area is for the major functionality.

![How Easy It Can Be to Whip Up Your Own Orange3 Widget: A Chatbot Adventure with HuggingChat!](/assets/how-easy-it-can-be-to-whip-up-your-own-o-92940abc.png)
Sub-interface of our widget that includes both the control and main area.We also have three class attributes defined, which will be used to store the result of interacting with the GUI controls (I will come back to this later). If there are any output tables, they will be defined in an inner class named `Outputs`. In our case, we only have one output table for outputting the chatting history.

email = Setting("")
passwd = Setting("")
query = Setting("")

class Outputs:
        data = Output("Data", Table)Next, we defined the `__init__` method, where we run `__init__` of the parent class, initialize all the instance attributes, and define the GUI of the widget. We got two empty lists, `queries` and `replies`, for storing the chat history, and `chatbot` which is the HuggingChat object. Now, let’s focus on the part of GUI construction.

# control area: login
gui.lineEdit(widget=self.controlArea, master=self, 
             value="email", label="Email")
gui.lineEdit(widget=self.controlArea, master=self, 
             value="passwd", label="Password")
gui.button(widget=self.controlArea, master=self, 
           label="Login", callback=self.init_chatbot)

# main area: chatbot
gui.lineEdit(widget=self.mainArea, master=self, 
             value="query", label="Query", callback=self.chat)
self.reply = gui.WebviewWidget(parent=None, debug=False)
self.mainArea.layout().addWidget(self.reply)The above code adds GUI controls to both the control and main area, where GUI controls will be added and placed in the interface by following the order of their definitions in the code. You should be able to find three types of GUI controls:

* `lineEdit` that allows the user to input some text,
* `button` that will trigger a pre-defined function by clicking, and
* `WebviewWidget` that will render some HTML content.

In this blog, I will not explain everything so that you will have the motivation to check the [documentation](https://orange-widget-base.readthedocs.io/en/latest/gui.html) yourselves. To briefly summarize:

* In the control area, two `lineEdit` controls are defined to accept the login information as input and store them in the pre-defined class attributes `email` and `query`. They are followed by a button to trigger the callback method `self.init_chatbot` for initializing the chatbot instance.
* In the main area, another `lineEdit` control is defined as accepting the user’s query, with the callback `self.chat` to send the query to the chatbot instance and get the reply, triggered by enter-clicking. The callback method is also responded to display the reply message in the `WebviewWidget` below.

Up to this point, we have thoroughly reviewed the process of defining a widget. In simple terms, it includes widget descriptions, input-output definitions, and GUI control definitions. Although the functionalities of different widgets may vary, the design process is largely similar. Orange3 defines a multitude of foundational classes, standardizes data transfer between widgets, and establishes a comprehensive and efficient workflow engine. This enables developers to better focus on the modular design and development of widget functionalities

## The adventure has just begun

So, I bet you're already getting the hang of developing your own widgets on Orange3, and you're practically bursting with creative energy – high five to that! But hold your horses, my friend, because this blog post is just the opening scene of our grand adventure. There's a whole treasure trove of discoveries waiting for you, like defining your very own add-on, crafting widgets that dance with interactive visuals, and even sending your widgets off to the fancy official platform. Don't panic, though – these aren't things you need to wrestle with right now. And guess what? You're not alone on this journey! Craving more Orange3 tales and tech tidbits? Get in touch with us ([Kody](https://www.esciencecenter.nl/team/dr-kody-moodley/) and [me](https://www.esciencecenter.nl/team/dr-ji-qi/))! Or drop a hint for more juicy insights below this blog! Can't wait to bump into you again on this wild Orange3 expedition!

DISCLAIMER: As you probably found out from the start: we also called in some AI support for the creation of this blogpost. We prompted ChatGPT to make the original text ‘more fun to read’. We hope reading it actually sparked some joy for you!*
