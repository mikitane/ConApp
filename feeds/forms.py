from django import forms
from feeds.models import UserProfile, Post

class ProfileForm(forms.ModelForm):

    class Meta:
        model = UserProfile
        fields = ('phone','country','image')

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ('header','text')
        widgets = {
            'text': forms.Textarea(attrs={ 'rows': 4,'class':'form-control',
                                           'placeholder':'Write your post here!','style':' resize: none;width:100%;overflow-x: hidden;'}),
            'header': forms.TextInput(attrs={'class':'form-control',
                                             'placeholder':'Header'})
        }
