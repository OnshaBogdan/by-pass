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
