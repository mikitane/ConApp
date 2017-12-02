from rest_framework import serializers
from personalmessages.models import PersonalMessage, Conversation
from feeds.models import UserProfile
from django.contrib.auth.models import User







class PersonalMessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    created = serializers.DateTimeField(format='%d.%m.%Y-%H:%M',required=False, read_only=True)
    
    class Meta:
        model = PersonalMessage
        fields = ('sender','sender_username','text','created','conversation')
    

class ConversationSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField()
    
    class Meta:
        model = Conversation
        fields = ('name','id','participants','updated')

    def get_participants(self,obj):
        participants = []
        for participant in obj.participants.all():
            
           participants.append({'user':participant.username,'id':participant.id,
                                'image':participant.userprofile.image.url})
        
        return participants

        
class UserSerializer(serializers.ModelSerializer):
    image = serializers.ReadOnlyField(source='userprofile.image.url')
    phone = serializers.ReadOnlyField(source='userprofile.phone')
    country = serializers.ReadOnlyField(source='userprofile.country')

    class Meta:
        model = User
        fields=('id','username','image','phone','country')

class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')
    

    class Meta:
        model = UserProfile
        fields=('id','username','image','phone','country')

    def update(self,instance,validated_data):
        print('serializer test1')
        instance.phone = validated_data.get('phone',instance.phone)
        instance.country = validated_data.get('country',instance.country)
        instance.image = validated_data.get('image',instance.image)
        instance.save()
        print('serializer test2')
        return instance
        
