from django.conf.urls import url
from .views import AdvertListView, AdvertDetailView

urlpatterns = [
    url(r'^$', AdvertListView.as_view()),
    url(r'^(?P<slug>\w+)/$', AdvertDetailView.as_view())
]
