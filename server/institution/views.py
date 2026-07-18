from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import (
    InstitutionCategory,
    InstitutionSubcategory,
    Institution,
)
from .serializers import (
    InstitutionCategorySerializer,
    InstitutionCategorySimpleSerializer,
    InstitutionSubcategorySerializer,
    InstitutionSubcategorySimpleSerializer,
    InstitutionSerializer,
)


class InstitutionCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Institution Categories"""
    queryset = InstitutionCategory.objects.filter(is_active=True).prefetch_related(
        'subcategories__institutions'
    )
    permission_classes = [AllowAny]

    def get_serializer_class(self):
        # Use simple serializer for list view, full serializer for detail/nested
        if self.action == 'list':
            return InstitutionCategorySimpleSerializer
        return InstitutionCategorySerializer

    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active categories"""
        categories = self.get_queryset()
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_key(self, request):
        """Get category by category_key"""
        key = request.query_params.get('key')
        if not key:
            return Response(
                {'error': 'key parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            category = InstitutionCategory.objects.prefetch_related(
                'subcategories__institutions'
            ).get(category_key=key, is_active=True)
            serializer = InstitutionCategorySerializer(category)
            return Response(serializer.data)
        except InstitutionCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class InstitutionSubcategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Institution Subcategories"""
    serializer_class = InstitutionSubcategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return InstitutionSubcategory.objects.prefetch_related('institutions')

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get subcategories by category key"""
        category_key = request.query_params.get('category_key')
        if not category_key:
            return Response(
                {'error': 'category_key parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            category = InstitutionCategory.objects.get(
                category_key=category_key,
                is_active=True
            )
            subcategories = category.subcategories.prefetch_related('institutions')
            serializer = InstitutionSubcategorySerializer(subcategories, many=True)
            return Response(serializer.data)
        except InstitutionCategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def by_id(self, request):
        """Get single subcategory with all its institutions"""
        subcategory_id = request.query_params.get('id')
        category_key = request.query_params.get('category_key')
        
        if not subcategory_id or not category_key:
            return Response(
                {'error': 'id and category_key parameters required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            subcategory = InstitutionSubcategory.objects.prefetch_related(
                'institutions'
            ).get(
                id=subcategory_id,
                category__category_key=category_key,
                category__is_active=True
            )
            serializer = InstitutionSubcategorySerializer(subcategory)
            return Response(serializer.data)
        except InstitutionSubcategory.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class InstitutionViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Individual Institutions"""
    serializer_class = InstitutionSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Institution.objects.select_related('subcategory__category')

    @action(detail=False, methods=['get'])
    def by_subcategory(self, request):
        """Get institutions by subcategory"""
        subcategory_id = request.query_params.get('subcategory_id')
        if not subcategory_id:
            return Response(
                {'error': 'subcategory_id parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        institutions = self.get_queryset().filter(subcategory_id=subcategory_id)
        serializer = self.get_serializer(institutions, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get institutions by category key"""
        category_key = request.query_params.get('category_key')
        if not category_key:
            return Response(
                {'error': 'category_key parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        institutions = self.get_queryset().filter(
            subcategory__category__category_key=category_key
        )
        serializer = self.get_serializer(institutions, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured institutions"""
        institutions = self.get_queryset().filter(is_featured=True)[:10]
        serializer = self.get_serializer(institutions, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def search(self, request):
        """Search institutions by name, category, or location"""
        query = request.query_params.get('q', '').strip()
        if not query:
            return Response(
                {'error': 'Search query required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        institutions = self.get_queryset().filter(
            name__icontains=query
        ) | self.get_queryset().filter(
            address__icontains=query
        )
        serializer = self.get_serializer(institutions, many=True)
        return Response(serializer.data)

