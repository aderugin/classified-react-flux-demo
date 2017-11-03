from rest_framework import serializers
from .models import Advert


class AdvertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advert
        fields = ('id', 'title', 'slug', 'image', 'created_at', 'description', 'price')
