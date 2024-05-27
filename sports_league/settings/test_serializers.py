from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from settings.models import Profile
from settings.serializers import ProfileSerializer

User = get_user_model()

class ProfileSerializerTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            first_name='Test',
            last_name='User',
            password='password'
        )
        self.profile = Profile.objects.create(user=self.user)

    def test_profile_serialization(self):
        serializer = ProfileSerializer(self.profile)
        user_serializer = serializer.fields['user']
        expected_data = {
            'id': self.profile.id,
            'user': user_serializer.to_representation(self.user),
            'avatar': None,
            'slug': self.profile.slug,
            'avatar_url': None
        }
        self.assertEqual(serializer.data, expected_data)
