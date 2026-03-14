from django.conf import settings
from django.db import models


class StudySet(models.Model):
    """
    A collection of flashcards owned by a user.
    """

    owner = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    null=True,
    blank=True,
    related_name="study_sets",
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    language = models.CharField(
        max_length=50,
        help_text="Language code or name (e.g. 'en', 'ru', 'English').",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.title


class Flashcard(models.Model):
    """
    A single flashcard that belongs to a study set.
    """

    study_set = models.ForeignKey(
        StudySet,
        on_delete=models.CASCADE,
        related_name="flashcards",
    )
    front_text = models.TextField()
    back_text = models.TextField()
    transliteration = models.CharField(
        max_length=255,
        blank=True,
        help_text="Optional transliteration of the front/back text.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.front_text[:50]} -> {self.back_text[:50]}"