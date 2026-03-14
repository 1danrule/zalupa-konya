from rest_framework import serializers

from .models import AppUser


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ["id", "email", "display_name", "created_at"]
        read_only_fields = ["id", "created_at"]