from django.conf.urls import url
from feeds import views
from django.contrib.auth.views import login, logout
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic.detail import DetailView
from feeds.models import UserProfile


urlpatterns = [
    url(r'^$', views.home_or_login,name='home'),
    url(r'^feeds/$', views.FeedsView.as_view(),name='feeds'),
    url(r'^logout/$', views.log_out,name='logout'),
    url(r'^register/$',views.register,name='register'),
    url(r'^profile/$', views.own_profile,name='own_profile'),
    url(r'^profile/change$', views.profile_change,name='profile_change'),
    url(r'^profiles/(?P<pk>\d+)$',views.profile,name='theprofile'),
    url(r'^post/likes/api/$',views.PostLikeView.as_view()),
    url(r'^posts/api/$',views.PostView.as_view()),
    url(r'^post/(?P<pk>\d+)/likes/api/$',views.SinglePostLikeView.as_view()),
    ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
