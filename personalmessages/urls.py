from django.conf.urls import url


from django.conf import settings
from django.conf.urls.static import static
from personalmessages import views



urlpatterns = [
    url(r'^api/$',views.ConversationView.as_view() ),
    url(r'^(?P<pk>\d+)/api/$',views.PersonalMessageView.as_view() ),
    url(r'^users/api/$',views.UsersView.as_view() ),
    url(r'^user/(?P<pk>\d+)/api/$',views.UserView.as_view() ),
    url(r'^ownprofile/api/$',views.OwnProfileView.as_view() ),
   ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
