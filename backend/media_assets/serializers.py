from rest_framework import serializers

from .models import AudioAsset


class AudioAssetSerializer(serializers.ModelSerializer):
    owner_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = AudioAsset
        fields = [
            "id",
            "owner_id",
            "file_key",
            "public_url",
            "mime_type",
            "size_bytes",
            "duration_seconds",
            "created_at",
        ]
        read_only_fields = ["id", "owner_id", "created_at"]