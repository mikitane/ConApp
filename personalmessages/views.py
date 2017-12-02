from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from personalmessages.serializers import PersonalMessageSerializer,ConversationSerializer,UserSerializer,UserProfileSerializer
from personalmessages.models import PersonalMessage, Conversation
from feeds.models import UserProfile
from django.contrib.auth.models import User
from django.core import serializers
from rest_framework.exceptions import PermissionDenied


class ConversationView(APIView):
    # Sends a list of all conversations which current user is included in.
    def get(self,request,*args,**kwargs):
        
        conversations = Conversation.objects.filter(participants=request.user)
        serializer = ConversationSerializer(conversations,many=True)
        
        return Response(serializer.data)
    # Creates a new conversation.
    def post(self,request,*args,**kwargs):
        participants = request.data['participants']
        
        # Creates a private chat.
        if len(participants) == 1:
            
            other_user = User.objects.get(id=participants[0])
            conversations = Conversation.objects.filter(
                            participants__in=[request.user]).filter(
                                participants__in=[other_user])
            # Checks if a private chat already exists.
            for conversation in conversations:
                if len(conversation.participants.all()) == 2:

                    serializer = ConversationSerializer(conversation)
                    return Response(serializer.data)
    
            conversation = Conversation.objects.create(
                            name=str(request.user)+'&'+str(other_user))
            conversation.participants.add(request.user,other_user)
            serializer = ConversationSerializer(conversation)
            return Response(serializer.data)
        # creates a group chat.
        else:
            conversation = Conversation.objects.create(
                        name=request.data['name'])
            for user in participants:
                new_user = User.objects.get(id=user)
                conversation.participants.add(new_user)
            conversation.participants.add(request.user)      
            serializer = ConversationSerializer(conversation)
            return Response(serializer.data)
        
        
class PersonalMessageView(APIView):
    # Sends all conversation messages.
    def get(self,request,*args,**kwargs):
        pk = kwargs['pk']
        conversation = Conversation.objects.get(id=pk)
        if request.user in conversation.participants.all():
            messages = conversation.personalmessage_set.all().order_by(
                                                                'created')
            serializer = PersonalMessageSerializer(messages,many=True)
            return Response(serializer.data)
        else:
            return HttpResponse('Denied')
        
        
    # Receives a new message from user and sends a refreshed messagelist.
    def post(self,request,*args,**kwargs):
        
        request.data._mutable = True
        pk = kwargs['pk']
        conversation = Conversation.objects.get(id=pk)
        if request.user in conversation.participants.all():
            request.data["sender"]=request.user.id
            request.data["conversation"]=int(pk)
            serializer = PersonalMessageSerializer(data=request.data)
            
            if serializer.is_valid():
                if request.data['text'] != '':
                    serializer.save()
                all_messages = conversation.personalmessage_set.all().order_by(
                                                                    'created')
                serializer = PersonalMessageSerializer(all_messages,many=True)
                return Response(serializer.data)

class UserView(APIView):
    
    def get(self,request,*args,**kwargs):
        _user = User.objects.get(id=kwargs['pk'])
        userprofile = UserProfile.objects.get(user=_user)
        serializer = UserProfileSerializer(userprofile)
        return Response(serializer.data)
    
    def post(self,request,*args,**kwargs):
        _user = User.objects.get(id=request.user.id)
        userprofile = UserProfile.objects.get(user=_user)
        serializer = UserProfileSerializer(userprofile,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

# Sends usernames and id of every user
class UsersView(APIView):
    def get(self,request,*args,**kwargs):
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users,many=True)
        return Response(serializer.data)


class OwnProfileView(APIView):
    def get(self,request,*args,**kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)






    
