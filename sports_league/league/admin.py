from django.contrib import admin
from .models import Game, Team, CSVUpload


admin.site.register(Game)
admin.site.register(Team)
admin.site.register(CSVUpload)
