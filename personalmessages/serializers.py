from rest_framework import serializers
from personalmessages.models import PersonalMessage, Conversation
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
    class Meta:
        model = User
        fields=('id','username','image')
