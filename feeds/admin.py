from django.contrib import admin
from feeds.models import UserProfile, Post, Like

admin.site.register(UserProfile)
admin.site.register(Post)
admin.site.register(Like)
