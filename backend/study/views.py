from django.db.models import Count
from rest_framework import viewsets

from .models import Flashcard, StudySet
from .serializers import FlashcardSerializer, StudySetSerializer


class StudySetViewSet(viewsets.ModelViewSet):
    """
    Simple CRUD for study sets.

    TODO:
    - Add authentication and filter sets by the current user (owner).
    """

    serializer_class = StudySetSerializer

    def get_queryset(self):
        qs = StudySet.objects.all().annotate(Count("flashcards"))
        # TODO: when auth is enabled, filter by request.user:
        # user = self.request.user
        # if user.is_authenticated:
        #     qs = qs.filter(owner=user)
        return qs

    def perform_create(self, serializer):
        # For now we just set owner to None or the first user.
        # In the real app we will use request.user from Keycloak.
        user = getattr(self.request, "user", None)
        serializer.save(owner=user if user and user.is_authenticated else None)


class FlashcardViewSet(viewsets.ModelViewSet):
    """
    CRUD for flashcards.

    TODO:
    - Add auth and ensure users can only manage their own sets' flashcards.
    """

    serializer_class = FlashcardSerializer

    def get_queryset(self):
        qs = Flashcard.objects.all()
        study_set_id = self.request.query_params.get("study_set")
        if study_set_id:
            try:
                qs = qs.filter(study_set_id=int(study_set_id))
            except ValueError:
                pass
        return qs