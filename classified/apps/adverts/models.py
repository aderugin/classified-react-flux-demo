from django.db import models
from helpers.models import SlugTitleMixin, ImageMixin


class Advert(SlugTitleMixin, ImageMixin, models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.TextField()
    price = models.PositiveIntegerField()

    class Meta:
        ordering = ['-created_at']
