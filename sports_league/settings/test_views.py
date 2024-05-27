import os
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model
from settings.models import Profile
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class ProfileViewSetTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email="testuser@gmail.com", password='password')
        self.profile = Profile.objects.create(user=self.user)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
    
    def test_retrieve_profile(self):
        url = reverse('profile-detail', kwargs={'pk': self.profile.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['slug'], self.profile.slug)
    
    def test_invalid_profile_id_reterive(self):
        url = reverse('profile-detail', kwargs={'pk': 100})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        
    def test_update_profile(self):
        url = reverse('profile-detail', kwargs={'pk': self.profile.id})
        data = {'slug': 'slug-1'}
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['slug'], 'slug-1')
        
    def test_upload_image(self):
        image_path = os.path.join('media', 'test' ,'profile.png')
        url = reverse('profile-upload-image', kwargs={'pk': self.profile.id})
        with open(image_path, 'rb') as image:
            response = self.client.post(url, {'avatar': image}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('avatar', response.data)
    
    def test_upload_image_invalid(self):
        url = reverse('profile-upload-image', kwargs={'pk': self.profile.id})
        response = self.client.post(url, {'avatar': 'invalid'}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_upload_image_invalid_profile_id(self):
        image_path = os.path.join('media', 'test' ,'profile.png')
        url = reverse('profile-upload-image', kwargs={'pk': 100})
        with open(image_path, 'rb') as image:
            response = self.client.post(url, {'avatar': image}, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_get_profile_by_user(self):
        url = reverse('profile-get-profile-by-user', kwargs={'user_id': self.user.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['slug'], self.profile.slug)

    def test_get_profile_by_user_invalid_user_id(self):
        url = reverse('profile-get-profile-by-user', kwargs={'user_id': 100})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)