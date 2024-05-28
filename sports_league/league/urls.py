from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TeamViewSet, GameViewSet, CSVUploadViewSet

router = DefaultRouter()
router.register(r'teams', TeamViewSet)
router.register(r'games', GameViewSet)
router.register(r'csv_uploads', CSVUploadViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
