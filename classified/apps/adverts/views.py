from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import AdvertSerializer
from .models import Advert


class AdvertListView(ListAPIView):
    serializer_class = AdvertSerializer
    queryset = Advert.objects.all()


class AdvertDetailView(RetrieveAPIView):
    serializer_class = AdvertSerializer
    queryset = Advert.objects.all()
    lookup_field = 'slug'
