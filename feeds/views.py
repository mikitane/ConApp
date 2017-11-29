from django.shortcuts import render, redirect, HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.views import login, logout
from feeds.models import UserProfile, Post, Like
from feeds.forms import ProfileForm, PostForm
from django.contrib.auth.models import User

from django.views.generic import TemplateView
from django.views.generic.detail import DetailView

from rest_framework.response import Response
from rest_framework.views import APIView
from feeds.serializers import PostLikeSerializer,PostSerializer


class FeedsView(TemplateView):
    template_name = 'feeds/index.html'
    
    # Gets every post from db and sends them to the template.
    def get(self, request):
        if request.user.is_authenticated():
            queryset = Post.objects.all()
            form = PostForm()
            args = {'user':request.user,'form':form,'postlist':queryset}
            return render(request,self.template_name,args)
        else:
            return redirect('home')
        
    # Creates a new post and refreshes the site.
    def post(self, request):
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.save()
            return redirect('feeds')


class PostView(APIView):
    # Sends data of all posts to user.
    def get(self,request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts,many=True)

        return Response(serializer.data)
    
    # Creates a new post.
    def post(self,request):
        print(request.data)
        _data = request.data.copy()
        print(_data)
        _data['user'] = request.user.id
        
        serializer = PostSerializer(data=_data)
        if serializer.is_valid():
            serializer.save()
            
            posts = Post.objects.all()
            serializer = PostSerializer(posts,many=True)
            return Response(serializer.data)
        else:
            return HttpResponse('Failed')


class PostLikeView(APIView):
    # Sends likes of all posts.
    def get(self,request):
        posts = Post.objects.all()
        serializer = PostLikeSerializer(posts,context={'request': request},many=True)

        return Response(serializer.data)                                            


class SinglePostLikeView(APIView):
    # Sends likes of a single post.
    def get(self,request,*args,**kwargs):
        post = Post.objects.get(pk=kwargs['pk'])
        serializer = PostLikeSerializer(post,context={'request': request})

        return Response(serializer.data)

    # Creates a new like.
    def put(self,request,*args,**kwargs):
        
        current_post = Post.objects.get(pk=kwargs['pk'])
        likes = current_post.get_likes()
        for like in likes:
            if like.user == request.user:
                like.delete()
                serializer = PostLikeSerializer(current_post,context={'request':request})
                return Response(serializer.data)
        Like.objects.create(user=request.user,post=current_post)
        serializer = PostLikeSerializer(current_post,context={'request':request})
        return Response(serializer.data)



def profile(request,pk=None):
    if request.user.is_authenticated():
        profile = User.objects.get(id=pk).userprofile
        args = {'userprofile':profile}
        if profile == request.user.userprofile:
            return redirect('own_profile')
        else:
            return render(request,'feeds/profile.html',args)
    else:
        return redirect('/')
        
            
def home_or_login(request):
    if request.user.is_authenticated():
        return redirect('feeds')

    else:
        return login(request,template_name='feeds/login.html')

    

def log_out(request):
    logout(request)
    return redirect('home')
    


def register(request):
    if request.method =='POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/')
        else:
            return redirect('register')
    else:
        form = UserCreationForm()

        args = {'form':form}
        return render(request,'feeds/reg_form.html',args)


def own_profile(request):
    if request.user.is_authenticated():
        
        args = {'user':request.user}
        return render(request,'feeds/ownprofile.html',args)
    else:
        return redirect('/')

def profile_change(request):
    if request.user.is_authenticated():
        profile = UserProfile.objects.get(user=request.user)

        if  request.method =='POST':
            form = ProfileForm(request.POST,request.FILES,instance=profile)
            if form.is_valid():
                form.save()
                
                return redirect('own_profile')
                
        else:
            
            form = ProfileForm(instance=profile)
            return render(request,'feeds/profile_change.html',{'form':form})
    else:
        return redirect('/')
    


