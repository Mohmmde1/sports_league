from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserManagerTestCase(TestCase):

    def test_create_user(self):
        # Test creating a regular user
        user = User.objects.create_user(email='test@example.com', username='testuser', password='password')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.username, 'testuser')
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        # Test creating a superuser
        superuser = User.objects.create_superuser(email='admin@example.com', username='admin', password='adminpassword')
        self.assertEqual(superuser.email, 'admin@example.com')
        self.assertEqual(superuser.username, 'admin')
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

    def test_create_user_missing_email_username(self):
        # Test creating a user with missing email or username
        with self.assertRaises(ValueError):
            User.objects.create_user(email='', username='testuser', password='password')
        with self.assertRaises(ValueError):
            User.objects.create_user(email='test@example.com', username='', password='password')

    def test_create_superuser_missing_flags(self):
        # Test creating a superuser with missing is_staff or is_superuser flags
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email='admin@example.com', username='admin', password='adminpassword', is_staff=False)
        with self.assertRaises(ValueError):
            User.objects.create_superuser(email='admin@example.com', username='admin', password='adminpassword', is_superuser=False)
