from rest_framework import serializers
from feeds.models import Post, Like, PostComment
from django.contrib.auth.models import User


class PostSerializer(serializers.ModelSerializer):
    image = serializers.ReadOnlyField(source='user.userprofile.image.url')
    username = serializers.ReadOnlyField(source='user.username')
    created = serializers.DateTimeField(format='%d.%m.%Y at %H:%M',required=False, read_only=True)
    comments_count = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = ('user','username','id','header','text','created','image',
                    'comments_count')

    def get_comments_count(self,obj):
        comments = obj.comments.all()
        count = comments.count()
        return count



class LikeSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    id = serializers.ReadOnlyField(source='user.id')
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


class PostCommentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    image = serializers.ReadOnlyField(source='user.userprofile.image.url')
    class Meta:
        model = PostComment
        fields = ('id','post','user','username','image','text','created')
