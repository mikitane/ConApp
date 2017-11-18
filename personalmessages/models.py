import os
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.conf import settings






class Conversation(models.Model):
    participants = models.ManyToManyField(User)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=25,blank=True)

    def __str__(self):
        return str(self.name)


class PersonalMessage(models.Model):
    conversation = models.ForeignKey(Conversation)
    sender = models.ForeignKey(User)
    text = models.CharField(max_length=300,default='')
    created = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return str(self.sender)
