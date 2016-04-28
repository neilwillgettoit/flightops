#!/usr/bin/python 

import os
import sys
import json
import thread
from random import randint
from time import sleep
from pubnub import Pubnub

pubnub = Pubnub(publish_key='', subscribe_key='', ssl_on='true') #set your subscribe key

modules_enabled = 'reddit,phishtank,virustotal' # add or remove enabled modules here. Each module gets a channel for comms.

def sockpuppet(channel, url, vote):
    phantom_cmd = "phantomjs " + channel + ".js '" + url + "' " + vote + " "
    #print phantom_cmd #uncomment for debugging 

    sleep(randint(60,7200)) # tell the bot to randomly wait for 1m to 2h as a naive spam filter bypass
    os.system(phantom_cmd) # lazy way to do this

def callback(message, channel):
    print('[' + channel + ']: Incoming task ' + str(message))
    url = (message['url'])
    vote = (message['vote'])
    thread.start_new_thread(sockpuppet,(channel, url, vote))

def error(message):
    print("ERROR : " + str(message))

def connect(message):
    print("CONNECTED")

def reconnect(message):
    print("RECONNECTED")

def disconnect(message):
    print("DISCONNECTED")

pubnub.subscribe(channels=modules_enabled, callback=callback, error=callback,
    connect=connect, reconnect=reconnect, disconnect=disconnect)

print 'Gathering incoming requests'
