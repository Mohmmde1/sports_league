from sports_league_auth.serializers import UserSerializer
from rest_framework import serializers

from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    avatar_url = serializers.SerializerMethodField()


    class Meta:
        model = Profile
        fields = ['id', 'user', 'avatar', 'slug', 'avatar_url'] 

    def get_avatar_url(self, obj):
        """
        Method to get the full URL of the avatar image.
        """
        if obj.avatar:
            return obj.avatar.url
        return None
    

    
