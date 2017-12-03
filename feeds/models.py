import os
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.conf import settings
from personalmessages.models import Conversation, PersonalMessage

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    phone = models.IntegerField(default=0,blank=True)
    description = models.CharField(default='', max_length=100)
    country = models.CharField(max_length=20,default='',blank=True)
    image = models.ImageField(upload_to='profile_image',blank=True,
                              default='profile_image/1.png')

    def __str__(self):
        return str(self.user)

    

    


def create_profile(sender, **kwargs):
    if kwargs['created']:
        user_profile = UserProfile.objects.create(user = kwargs['instance'])
        
        example_chat = Conversation.objects.create(name="Example Chat")
        example_group_chat = Conversation.objects.create(name="Example Group Chat")
        example_user1 = User.objects.get(username="example_user_1")
        example_chat.participants.add(example_user1,kwargs['instance'])
        example_group_chat.participants.add(kwargs['instance'])
        for i in range(5):
            
            PersonalMessage.objects.create(conversation=example_chat,
                                            sender=example_user1,
                                             text=('Lorem ipsum dolor sit amet,'
                                            'consectetur adipiscing elit.'
                                            'Aenean aliquet, dui ac suscipit commodo,'
                                            'tortor libero euismod nulla, gravida'
                                            'posuere arcu felis id lacus. Aenean congue'
                                           'velit non ligula porta mollis.'))
            example_user = User.objects.get(username="example_user_"+str(i))
            example_group_chat.participants.add(example_user)
            PersonalMessage.objects.create(conversation=example_group_chat,
                                            sender=example_user,
                                             text=('Lorem ipsum dolor sit amet,'
                                            'consectetur adipiscing elit.'
                                            'Aenean aliquet, dui ac suscipit commodo,'
                                            'tortor libero euismod nulla, gravida'
                                            'posuere arcu felis id lacus. Aenean congue'
                                            'velit non ligula porta mollis.'))
    
    
post_save.connect(create_profile, sender=User)


class Post(models.Model):
    user = models.ForeignKey(User)
    header = models.CharField(max_length=35,default='')
    text = models.CharField(max_length=300,default='')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


    
    def __str__(self):
        return str(self.header)

    def get_likes(self):
        return self.like_set.all()

    

class Like(models.Model):
    user = models.ForeignKey(User)
    post = models.ForeignKey(Post)
