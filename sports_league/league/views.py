import csv
import logging
from django.db import transaction
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Team, Game, CSVUpload
from .serializers import TeamSerializer, GameSerializer, CSVUploadSerializer

logger = logging.getLogger(__name__)

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all().order_by('-points', 'name')
    serializer_class = TeamSerializer

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            team1_data = request.data.get('team1')
            team2_data = request.data.get('team2')
            team1_score = int(request.data.get('team1_score'))
            team2_score = int(request.data.get('team2_score'))

            team1_name = team1_data['name']
            team2_name = team2_data['name']

            if team1_name == team2_name:
                raise ValueError('Team 1 and Team 2 cannot be the same')

            if team1_score < 0 or team2_score < 0:
                raise ValueError('Scores cannot be negative')

            team1 = Team.objects.get(name=team1_name)
            team2 = Team.objects.get(name=team2_name)


            game = Game.objects.create(
                team1=team1,
                team2=team2,
                team1_score=team1_score,
                team2_score=team2_score
            )

            self.update_team_points()

            return Response(GameSerializer(game).data, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f'Error creating game: {str(e)}')
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        try:
            logger.info('Updating game')
            logger.info(request.data)
            team1_data = request.data.get('team1')
            team2_data = request.data.get('team2')
            game_id = request.data.get('id')
            team1_score = int(team1_data['points'])
            team2_score = int(team2_data['points'])

            game = Game.objects.get(id=game_id)
            game.team1_score = team1_score
            game.team2_score = team2_score
            game.team1 = Team.objects.get(name=team1_data['name'])
            game.team2 = Team.objects.get(name=team2_data['name'])
            game.save()

            self.update_team_points()

            return Response(GameSerializer(game).data, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f'Error updating game: {str(e)}')
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def destroy(self, request, *args, **kwargs):
        try:
            response = super().destroy(request, *args, **kwargs)
            self.update_team_points()
            logger.info(response)
            return response

        except Exception as e:
            logger.error(f'Error deleting game: {str(e)}')
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    @transaction.atomic
    def update_team_points():
        games = Game.objects.all()
        Team.objects.update(points=0)
        for game in games:
            game.team1.points += 3 * (game.team1_score > game.team2_score) + \
                                (game.team1_score == game.team2_score)
                                
            game.team2.points += 3 * (game.team2_score > game.team1_score) + \
                                (game.team1_score == game.team2_score)
            game.team1.save()
            game.team2.save()
       

class CSVUploadViewSet(viewsets.ModelViewSet):
    queryset = CSVUpload.objects.all()
    serializer_class = CSVUploadSerializer

    def create(self, request):
        try:
            file = request.FILES.get('file')
            logger.info(f'Uploading file: {file.name}')
            
            if not file.name.endswith('.csv'):
                raise ValueError('Invalid file format')

            logger.info('Processing CSV file')
            file_data = file.read().decode('utf-8').splitlines()
            csv_reader = csv.reader(file_data)

            with transaction.atomic():
                # Remove all previous games & teams
                Game.objects.all().delete()
                Team.objects.all().delete()
                
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

                GameViewSet.update_team_points()

            return Response({'status': 'File uploaded successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f'Error uploading CSV: {str(e)}')
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
