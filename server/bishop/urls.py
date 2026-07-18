from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import PriestViewSet, CoatOfArmViewSet, LocalOrdinaryViewSet, BishopMessageViewSet

router = SimpleRouter()
router.register(r'priests', PriestViewSet, basename='priest')
router.register(r'coat-of-arm', CoatOfArmViewSet, basename='coat-of-arm')
router.register(r'local-ordinary', LocalOrdinaryViewSet, basename='local-ordinary')
router.register(r'messages', BishopMessageViewSet, basename='bishop-message')

urlpatterns = [
    path('', include(router.urls)),
]
