
from django.db import models
from django.utils.text import slugify
from sports_league_auth.models import User


class Profile(models.Model):
    """
    This model represents user profiles and establishes a one-to-one
    relationship with the User model provided by the sports_league_auth app.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    slug = models.SlugField(max_length=255, unique=True)


    def save(self, *args, **kwargs):
        """
        Override the save method to generate and update the slug field.
        """
        if not self.slug:
            # Generate slug based on user's email or any other field
            self.slug = slugify(self.user.username)
        super().save(*args, **kwargs)

   

    @property
    def get_avatar_url(self):
        """
        Property method to get the full URL of the avatar image.
        """
        if self.avatar:
            return self.avatar.url
        return None

    def __str__(self):
        return f"Profile for {self.user.username}"
