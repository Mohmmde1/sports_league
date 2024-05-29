from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from .models import Team, Game, CSVUpload
from .serializers import TeamSerializer, GameSerializer, CSVUploadSerializer

class SerializerTests(TestCase):
    
    def setUp(self):
        self.team_data = {'name': 'Team A', 'points': 10}
        self.game_data = {'team1': {'name': 'Team A', 'points': 10}, 'team2': {'name': 'Team B', 'points': 8}, 'team1_score': 2, 'team2_score': 1}
        self.csv_upload_data = {'file_name': 'example.csv', 'file_content': 'example content'}
    
    def test_team_serializer(self):
        serializer = TeamSerializer(data=self.team_data)
        self.assertTrue(serializer.is_valid())
        
        team = serializer.save()
        self.assertEqual(team.name, self.team_data['name'])
        self.assertEqual(team.points, self.team_data['points'])
    
    def test_game_serializer(self):
        serializer = GameSerializer(data=self.game_data)
        self.assertTrue(serializer.is_valid())
        
        self.assertEqual(serializer.data['team1']['name'], self.game_data['team1']['name'])
        self.assertEqual(serializer.data['team2']['name'], self.game_data['team2']['name'])
        self.assertEqual(serializer.data['team1_score'], self.game_data['team1_score'])
        self.assertEqual(serializer.data['team2_score'], self.game_data['team2_score'])
    
    def test_csv_upload_serializer(self):
        # Create test data (a CSV file)
        csv_content = b"Team A,2,Team B,1\nTeam C,0,Team D,0\n"
        csv_file = SimpleUploadedFile("test.csv", csv_content, content_type="text/csv")

        # Prepare data to pass to the serializer
        data = {'file': csv_file}

        # Create serializer instance
        serializer = CSVUploadSerializer(data=data)

        # Check if the data is valid
        self.assertTrue(serializer.is_valid())

        # Save the serializer data
        serializer.save()

        # Ensure that a CSVUpload object is created in the database
        self.assertEqual(CSVUpload.objects.count(), 1)

        # Ensure the uploaded file content is correct
        uploaded_csv = CSVUpload.objects.first()
        with uploaded_csv.file.open(mode='rb') as f:
            uploaded_content = f.read()
        self.assertEqual(uploaded_content, csv_content)

        # Clean up - delete the CSVUpload object
        uploaded_csv.delete()
