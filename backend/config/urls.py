from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from rest_framework import routers

from study.views import FlashcardViewSet, StudySetViewSet
from media_assets.views import AudioAssetViewSet

router = routers.DefaultRouter()
router.register(r"sets", StudySetViewSet, basename="studyset")
router.register(r"flashcards", FlashcardViewSet, basename="flashcard")
router.register(r"audio-assets", AudioAssetViewSet, basename="audioasset")


def health_view(request):
    """
    Very simple health endpoint for uptime checks.
    Later add DB checks, version info, etc.
    """
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include(router.urls)),
    path("health/", health_view, name="health"),
]