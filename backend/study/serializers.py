from rest_framework import serializers

from .models import Flashcard, StudySet


class StudySetSerializer(serializers.ModelSerializer):
    owner_id = serializers.IntegerField(read_only=True)
    flashcards_count = serializers.IntegerField(
        read_only=True, source="flashcards.count"
    )

    class Meta:
        model = StudySet
        fields = [
            "id",
            "owner_id",
            "title",
            "description",
            "language",
            "created_at",
            "updated_at",
            "flashcards_count",
        ]
        read_only_fields = ["id", "owner_id", "created_at", "updated_at", "flashcards_count"]


class FlashcardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Flashcard
        fields = [
            "id",
            "study_set",
            "front_text",
            "back_text",
            "transliteration",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]