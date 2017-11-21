import os
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.conf import settings

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    phone = models.IntegerField(default=0,blank=True)
    description = models.CharField(default='', max_length=100)
    country = models.CharField(max_length=20,default='',blank=True)
    image = models.ImageField(upload_to='profile_image',blank=True,
                              default='feeds/profile_image/1.png')

    def __str__(self):
        return str(self.user)

    

    


def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user = kwargs['instance'])
    
    
post_save.connect(create_profile, sender=User)


class Post(models.Model):
    user = models.ForeignKey(User)
    header = models.CharField(max_length=30,default='')
    text = models.CharField(max_length=150,default='')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


    
    def __str__(self):
        return str(self.header)

    def get_likes(self):
        return self.like_set.all()

    

class Like(models.Model):
    user = models.ForeignKey(User)
    post = models.ForeignKey(Post)
