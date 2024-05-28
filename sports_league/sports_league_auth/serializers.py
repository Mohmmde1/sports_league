from django.db import IntegrityError, transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from .models import User
from settings.models import Profile
class CustomRegisterSerializer(RegisterSerializer):
     first_name = serializers.CharField(write_only=True)
     last_name = serializers.CharField(write_only=True)
     def save(self, request):
        try:
            return super().save(request)
        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                raise serializers.ValidationError({
                    'email': 'This email is already in use.'
                })
            else:
                raise e
     def custom_signup(self, request, user):
        first = request.data.get("first_name")
        last = request.data.get("last_name")
        print(first, last)
        try:
            # Wrap user creation and profile creation in a transaction
            with transaction.atomic():
                # Register the user first
                user.first_name = first
                user.last_name = last
                user.save()

                Profile.objects.create(user=user)
        except IntegrityError as e:
            if 'unique constraint' in str(e).lower():
                raise serializers.ValidationError({
                    'email': 'This email is already in use.'
                })
            else:
                raise e
        except Exception as e:
            raise serializers.ValidationError({
                'error': 'An error occurred during registration.'
            })
        
        


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = User

class UserDetailSerializer(serializers.ModelSerializer):
    profile_info = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "profile_info"]

    def get_profile_info(self, obj):
        try:
            profile = Profile.objects.get(user=obj)
            return {
                "profile_id": profile.id,
               
            }
        except Profile.DoesNotExist:
            return {
                "profile_id": None,
            
            }
