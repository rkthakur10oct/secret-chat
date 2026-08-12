from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model for Secret Chat.

    Extending AbstractUser gives us Django's built-in
    authentication functionality while allowing us to
    add project-specific fields.
    """

    avatar = models.URLField(
        blank=True,
        null=True,
        help_text="URL of the user's profile avatar.",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.username