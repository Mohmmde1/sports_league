import os
import tempfile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth import get_user_model

from settings.models import Profile
from .models import Team, Game, CSVUpload

User = get_user_model()

class GameViewSetTests(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email="testuser@gmail.com", password='password')
        self.profile = Profile.objects.create(user=self.user)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.team1 = Team.objects.create(name='Team A', points=0)
        self.team2 = Team.objects.create(name='Team B', points=0)
    
    def test_create_game_valid(self):
        url = reverse('game-list')
        data = {
            'team1': {'name': self.team1.name},
            'team2': {'name': self.team2.name},
            'team1_score': 2,
            'team2_score': 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Game.objects.count(), 1)
        self.assertEqual(Team.objects.get(name='Team A').points, 3)
    
    def test_create_game_same_teams(self):
        url = reverse('game-list')
        data = {
            'team1': {'name': self.team1.name},
            'team2': {'name': self.team1.name},
            'team1_score': 2,
            'team2_score': 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_create_game_negative_scores(self):
        url = reverse('game-list')
        data = {
            'team1': {'name': self.team1.name},
            'team2': {'name': self.team2.name},
            'team1_score': -1,
            'team2_score': 1
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_update_game_valid(self):
        game = Game.objects.create(team1=self.team1, team2=self.team2, team1_score=1, team2_score=1)
        url = reverse('game-detail', args=[game.id])
        data = {
            'team1': {'name': self.team1.name, 'points': 2},
            'team2': {'name': self.team2.name, 'points': 1},
            'id': game.id
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Game.objects.get(id=game.id).team1_score, 2)
    
    def test_update_game_invalid_id(self):
        url = reverse('game-detail', args=[999])
        data = {
            'team1': {'name': self.team1.name, 'points': 2},
            'team2': {'name': self.team2.name, 'points': 1},
            'id': 999
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_delete_game(self):
        game = Game.objects.create(team1=self.team1, team2=self.team2, team1_score=1, team2_score=1)
        url = reverse('game-detail', args=[game.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Game.objects.count(), 0)

class CSVUploadViewSetTests(APITestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', email="testuser@gmail.com", password='password')
        self.profile = Profile.objects.create(user=self.user)
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        self.upload_url = reverse('csvupload-list')
        self.valid_csv = (
            "Team A,2,Team B,1\n"
            "Team C,0,Team D,0\n"
        )
        self.invalid_csv_format = "invalid file content"
        self.malformed_csv = (
            "Team A,2,Team B\n"
            "Team C,0,Team D,0,1\n"
        )
        self.file_header = {'HTTP_CONTENT_DISPOSITION': 'attachment; filename="games.csv"'}
    
    def test_upload_csv_valid(self):
        
        # Create a temporary file with CSV content
        with tempfile.NamedTemporaryFile(suffix='.csv', delete=False) as temp_file:
            temp_file.write(self.valid_csv.encode('utf-8'))
        
        # Upload the temporary file
        with open(temp_file.name, 'rb') as file:
            response = self.client.post(self.upload_url, {'file': file}, format='multipart', **self.file_header)
        
        # Clean up temporary file
        os.unlink(temp_file.name)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_upload_csv_invalid_format(self):
        response = self.client.post(self.upload_url, {'file': self.invalid_csv_format}, format='multipart', **self.file_header)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_upload_csv_malformed_data(self):
        response = self.client.post(self.upload_url, {'file': self.malformed_csv}, format='multipart', **self.file_header)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
