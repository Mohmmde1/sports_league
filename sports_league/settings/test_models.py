from django.test import TestCase
from django.contrib.auth import get_user_model
from settings.models import Profile

User = get_user_model()

class ProfileModelTests(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(email="testuser@example.com", username='testuser', password='password')
        self.profile = Profile.objects.create(user=self.user)

    def test_slug_generation(self):
        self.assertEqual(self.profile.slug, 'testuser')

    def test_avatar_url(self):
        self.assertIsNone(self.profile.get_avatar_url)
        self.profile.avatar = '/avatars/test_avatar.png'
        self.profile.save()
        self.assertEqual(self.profile.get_avatar_url, '/media/avatars/test_avatar.png')
