from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import NewsViewSet, PodcastViewSet, VideoViewSet, GalleryEventViewSet, GallerySettingViewSet

app_name = 'newsandevent'

router = SimpleRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'podcasts', PodcastViewSet, basename='podcast')
router.register(r'videos', VideoViewSet, basename='video')
router.register(r'gallery', GalleryEventViewSet, basename='gallery')
router.register(r'gallery-settings', GallerySettingViewSet, basename='gallery-settings')

urlpatterns = [
    path('', include(router.urls)),
]
