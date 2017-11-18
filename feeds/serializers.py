from rest_framework import serializers
from feeds.models import Post, Like
from django.contrib.auth.models import User




class LikeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    id = serializers.ReadOnlyField(source='user.userprofile.id')
    image = serializers.ReadOnlyField(source='user.userprofile.image.url')
    class Meta:
        model = Like
        fields = ('user','id','image')

    
    


class PostLikeSerializer(serializers.ModelSerializer):
    like_set = LikeSerializer(many = True,read_only=True)
    user_in_likes = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id','like_set','user_in_likes')

    def get_user_in_likes(self,obj):
        likes = obj.get_likes()
        for like in likes:
            if self.context['request'].user == like.user:
                return True
        return False



    


    
        
        