from django.conf import settings
from django.db import models

from study.models import Flashcard


class AudioAsset(models.Model):
    """
    Metadata about an audio file stored in Cloudflare R2 (or another storage).

    The actual file will be stored externally; here we only keep identifiers
    and public URL.
    """

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="audio_assets",
    )
    file_key = models.CharField(
        max_length=255,
        help_text="Key or path of the file in the storage bucket.",
    )
    public_url = models.URLField(
        help_text="Public URL to access the audio file.",
    )
    mime_type = models.CharField(max_length=100)
    size_bytes = models.PositiveIntegerField()
    duration_seconds = models.FloatField(
        help_text="Duration in seconds, if known.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.file_key


class FlashcardAudio(models.Model):
    """
    Link a flashcard to an audio asset for a specific side (front/back).
    """

    SIDE_FRONT = "front"
    SIDE_BACK = "back"
    SIDE_CHOICES = [
        (SIDE_FRONT, "Front"),
        (SIDE_BACK, "Back"),
    ]

    flashcard = models.ForeignKey(
        Flashcard,
        on_delete=models.CASCADE,
        related_name="audio_links",
    )
    audio_asset = models.ForeignKey(
        AudioAsset,
        on_delete=models.CASCADE,
        related_name="flashcard_links",
    )
    side = models.CharField(max_length=10, choices=SIDE_CHOICES)

    class Meta:
        unique_together = ("flashcard", "audio_asset", "side")

    def __str__(self) -> str:
        return f"Audio for {self.flashcard_id} ({self.side})"