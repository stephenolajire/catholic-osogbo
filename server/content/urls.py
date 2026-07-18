from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import LayLeaderViewSet, LayAssociationViewSet, ProjectViewSet

router = SimpleRouter()
router.register(r'lay-leaders', LayLeaderViewSet, basename='lay-leader')
router.register(r'associations', LayAssociationViewSet, basename='lay-association')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('', include(router.urls)),
]
