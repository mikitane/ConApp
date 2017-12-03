from django.conf.urls import url
from feeds import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.detail import DetailView
from feeds.models import UserProfile


urlpatterns = [
    url(r'^$', views.index, name='home'),
    url(r'^register/$',views.register,name='register'),
    url(r'^logout/$', views.log_out,name='logout'),
    url(r'^profile/change/$',views.profile_change,name="profile_change"),
    url(r'^post/likes/api/$',views.PostLikeView.as_view()),
    url(r'^posts/api/$',views.PostView.as_view()),
    url(r'^post/(?P<pk>\d+)/likes/api/$',views.SinglePostLikeView.as_view()),
    url(r'^.*/$', views.index),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
