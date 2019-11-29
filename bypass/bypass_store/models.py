from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """
    User model

    Abstract user fields:
    username
    first_name
    last_name
    email
    is_staff
    is_active
    date_joined
    """

    # stub (one-to-many with preset)
    presets = models.CharField(max_length=500, blank=True)


class Product(models.Model):
    title = models.CharField(max_length=30, blank=False, null=False)
    price = models.IntegerField(blank=False, null=False)
    image = models.ImageField(blank=False, null=False)

    PRODUCT_TYPE_CHOICES = (("Foot controller", "FK"), ("Guitar pedal", "GP"))
    product_type = models.CharField(max_length=15, choices=PRODUCT_TYPE_CHOICES, default=2)

    brand = models.CharField(max_length=30, blank=False, null=False)
    WORKING_PRINCIPLE_CHOICES = (("Analog", "A"), ("Digital", "D"), ("Tube", "T"))
    working_principle = models.CharField(max_length=15, choices=WORKING_PRINCIPLE_CHOICES, default=1)

    weight = models.FloatField(default=0.5, blank=False, null=False)
