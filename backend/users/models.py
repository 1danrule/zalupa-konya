from django.contrib.auth.models import AbstractUser
from django.db import models


class AppUser(AbstractUser):
    """
    Custom user model.

    For simplicity we extend AbstractUser and add extra fields.
    The built-in 'username' field still exists, but the Flutter client
    can mainly use 'email' and 'display_name'.
    """

    email = models.EmailField(unique=True)
    display_name = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Make email the main identifier used for login in the future.
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]  # still required when creating superusers

    def __str__(self) -> str:
        return self.display_name or self.email