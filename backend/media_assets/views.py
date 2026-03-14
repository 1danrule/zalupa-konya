from rest_framework import viewsets

from .models import AudioAsset
from .serializers import AudioAssetSerializer


class AudioAssetViewSet(viewsets.ModelViewSet):
    """
    CRUD for audio asset metadata.

    TODO:
    - Secure this endpoint (auth + permissions).
    - Attach audio assets to the current user instead of anonymous.
    """

    queryset = AudioAsset.objects.all()
    serializer_class = AudioAssetSerializer

    def perform_create(self, serializer):
        user = getattr(self.request, "user", None)
        serializer.save(owner=user if user and user.is_authenticated else None)