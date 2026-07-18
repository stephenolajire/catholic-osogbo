from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import (
    GreetingViewSet,
    DailyReadingViewSet,
    HeroViewSet,
    DiscoverMessageViewSet,
    RecentNewsViewSet,
    RecentSermonViewSet,
    UpcomingEventViewSet,
    GalleryImageViewSet,
    DeaneryViewSet,
    ParishViewSet,
)

app_name = 'home'

router = SimpleRouter()
router.register(r'greeting', GreetingViewSet, basename='greeting')
router.register(r'daily-reading', DailyReadingViewSet, basename='daily-reading')
router.register(r'hero', HeroViewSet, basename='hero')
router.register(r'discover', DiscoverMessageViewSet, basename='discover')
router.register(r'news', RecentNewsViewSet, basename='news')
router.register(r'sermons', RecentSermonViewSet, basename='sermons')
router.register(r'events', UpcomingEventViewSet, basename='events')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')
router.register(r'deaneries', DeaneryViewSet, basename='deanery')
router.register(r'parishes', ParishViewSet, basename='parish')

urlpatterns = [
    path('', include(router.urls)),
]
