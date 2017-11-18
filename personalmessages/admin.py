from django.contrib import admin
from personalmessages.models import PersonalMessage, Conversation

admin.site.register(PersonalMessage)
admin.site.register(Conversation)
