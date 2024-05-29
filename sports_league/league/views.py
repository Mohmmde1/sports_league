import csv
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Team, Game, CSVUpload
from .serializers import TeamSerializer, GameSerializer, CSVUploadSerializer
import logging

logger = logging.getLogger(__name__)
class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('-points', 'name')
    serializer_class = TeamSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    def create(self, request, *args, **kwargs):
        team1_data = request.data.get('team1')
        team2_data = request.data.get('team2')
        team1_score = request.data.get('team1_score')
        team2_score = request.data.get('team2_score')

        team1_name = team1_data['name']
        team2_name = team2_data['name']

        if team1_name == team2_name:
            logger.error('Team 1 and Team 2 cannot be the same')
            return Response({'error': 'Team 1 and Team 2 cannot be the same'}, status=status.HTTP_400_BAD_REQUEST)
        
        if int(team1_score) < 0 or int(team2_score) < 0:
            logger.error('Scores cannot be negative')
            return Response({'error': 'Scores cannot be negative'}, status=status.HTTP_400_BAD_REQUEST)

        team1, created1 = Team.objects.get_or_create(name=team1_name, defaults={'points': team1_data['points']})
        team2, created2 = Team.objects.get_or_create(name=team2_name, defaults={'points': team2_data['points']})

        if created1:
            logger.info(f'Team created: {team1_name}')
        if created2:
            logger.info(f'Team created: {team2_name}')

        game = Game.objects.create(
            team1=team1,
            team2=team2,
            team1_score=team1_score,
            team2_score=team2_score
        )

        self.update_team_points()

        return Response(GameSerializer(game).data, status=status.HTTP_201_CREATED)


    def update(self, request, *args, **kwargs):
        logger.info('Updating game')
        logger.info(request.data)
        team1_data = request.data.get('team1')
        team2_data = request.data.get('team2')
        team1_score = request.data.get('team1_score')
        team2_score = request.data.get('team2_score')
        game = Game.objects.get(id=request.data.get('id'))
        game.team1_score = team1_data['points']
        game.team2_score = team2_data['points']
        game.team1 = Team.objects.get(name=team1_data['name'])
        game.team2 = Team.objects.get(name=team2_data['name'])
        game.save()

        self.update_team_points()
        return Response(GameSerializer(game).data, status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        self.update_team_points()
        logger.info(response)
        return response

    def update_team_points(self):
        Team.objects.update(points=0)
        for game in Game.objects.all():
            if game.team1_score > game.team2_score:
                game.team1.points += 3
            elif game.team1_score < game.team2_score:
                game.team2.points += 3
            else:
                game.team1.points += 1
                game.team2.points += 1
            game.team1.save()
            game.team2.save()

class CSVUploadViewSet(viewsets.ModelViewSet):
    queryset = CSVUpload.objects.all()
    serializer_class = CSVUploadSerializer

    def create(self, request):
        file = request.FILES.get('file')
        logger.info(f'Uploading file: {file.name}')
        
        if not file.name.endswith('.csv'):
            logger.error('Invalid file format')
            return Response({'error': 'Invalid file format'}, status=status.HTTP_400_BAD_REQUEST)
        
        logger.info('Processing CSV file')
        file_data = file.read().decode('utf-8').splitlines()
        csv_reader = csv.reader(file_data)

        # Remove all previous games
        Game.objects.all().delete()
        
        for row in csv_reader:
            team1_name, team1_score, team2_name, team2_score = row
            team1, _ = Team.objects.get_or_create(name=team1_name.strip())
            team2, _ = Team.objects.get_or_create(name=team2_name.strip())
            logger.info(f'Processing game: {team1_name} vs {team2_name}')
            Game.objects.create(
                team1=team1,
                team2=team2,
                team1_score=int(team1_score),
                team2_score=int(team2_score)
            )

       
        # Update points after processing CSV
        GameViewSet().update_team_points()

        return Response({'status': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)
