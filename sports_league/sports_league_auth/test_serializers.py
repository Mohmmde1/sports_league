from django.test import TestCase
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory
from .serializers import CustomRegisterSerializer, UserDetailSerializer
from settings.models import Profile

User = get_user_model()


class UserDetailSerializerTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email='test@example.com', password='testpassword')
        self.profile = Profile.objects.create(user=self.user)

    def test_get_profile_info(self):
        serializer = UserDetailSerializer(instance=self.user)
        profile_info = serializer.data.get('profile_info')
        self.assertEqual(profile_info['profile_id'], self.profile.id)
