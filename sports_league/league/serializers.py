from rest_framework import serializers
from .models import Team, Game, CSVUpload

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class GameSerializer(serializers.ModelSerializer):
    team1 = TeamSerializer()
    team2 = TeamSerializer()

    class Meta:
        model = Game
        fields = ['id', 'team1', 'team2', 'team1_score', 'team2_score']
    

class CSVUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSVUpload
        fields = '__all__'
