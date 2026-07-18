from django.urls import path, include
from rest_framework.routers import SimpleRouter
from .views import (
    InstitutionCategoryViewSet,
    InstitutionSubcategoryViewSet,
    InstitutionViewSet,
)

app_name = 'institution'

router = SimpleRouter()
router.register(r'categories', InstitutionCategoryViewSet, basename='category')
router.register(r'subcategories', InstitutionSubcategoryViewSet, basename='subcategory')
router.register(r'institutions', InstitutionViewSet, basename='institution')

urlpatterns = [
    path('', include(router.urls)),
]
