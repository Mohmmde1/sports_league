from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    points = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Game(models.Model):
    team1 = models.ForeignKey(Team, related_name='team1_games', on_delete=models.CASCADE)
    team2 = models.ForeignKey(Team, related_name='team2_games', on_delete=models.CASCADE)
    team1_score = models.IntegerField()
    team2_score = models.IntegerField()

    def __str__(self):
        return f"{self.team1} vs {self.team2}"

class CSVUpload(models.Model):
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.file.name
