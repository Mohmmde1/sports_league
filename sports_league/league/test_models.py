from django.test import TestCase
from .models import Team, Game, CSVUpload

class TeamModelTests(TestCase):

    def test_create_team(self):
        team = Team.objects.create(name='Team A', points=10)
        self.assertEqual(team.name, 'Team A')
        self.assertEqual(team.points, 10)

    def test_unique_name(self):
        Team.objects.create(name='Team A', points=10)
        # Attempt to create another team with the same name, should fail
        with self.assertRaises(Exception):
            Team.objects.create(name='Team A', points=5)

    def test_team_str(self):
        team = Team.objects.create(name='Team A', points=10)
        self.assertEqual(str(team), 'Team A')

class GameModelTests(TestCase):

    def setUp(self):
        self.team1 = Team.objects.create(name='Team A', points=10)
        self.team2 = Team.objects.create(name='Team B', points=8)

    def test_create_game(self):
        game = Game.objects.create(team1=self.team1, team2=self.team2, team1_score=2, team2_score=1)
        self.assertEqual(game.team1, self.team1)
        self.assertEqual(game.team2, self.team2)
        self.assertEqual(game.team1_score, 2)
        self.assertEqual(game.team2_score, 1)

    def test_game_str(self):
        game = Game.objects.create(team1=self.team1, team2=self.team2, team1_score=2, team2_score=1)
        self.assertEqual(str(game), 'Team A vs Team B')

class CSVUploadModelTests(TestCase):

    def test_create_csv_upload(self):
        csv_upload = CSVUpload.objects.create(file='example.csv')
        self.assertEqual(csv_upload.file, 'example.csv')

    def test_csv_upload_str(self):
        csv_upload = CSVUpload.objects.create(file='example.csv')
        self.assertEqual(str(csv_upload), 'example.csv')
