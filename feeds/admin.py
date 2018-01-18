from django.contrib import admin
from feeds.models import UserProfile, Post, Like,PostComment

admin.site.register(UserProfile)
admin.site.register(Post)
admin.site.register(Like)
admin.site.register(PostComment)
