from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import LayLeader, LayAssociation, Project
from .serializers import (
    LayLeaderSerializer,
    LayAssociationSerializer,
    LayAssociationSimpleSerializer,
    ProjectSerializer,
)


class LayLeaderViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for lay association leaders"""
    serializer_class = LayLeaderSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return LayLeader.objects.all().order_by('display_order', 'name')

    @action(detail=False, methods=['get'])
    def by_role(self, request):
        """Get leaders by role"""
        role = request.query_params.get('role')
        if not role:
            return Response(
                {'error': 'role parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        leaders = self.get_queryset().filter(role=role)
        serializer = self.get_serializer(leaders, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_deanery(self, request):
        """Get leaders by deanery"""
        deanery = request.query_params.get('deanery')
        if not deanery:
            return Response(
                {'error': 'deanery parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        leaders = self.get_queryset().filter(deanery__icontains=deanery)
        serializer = self.get_serializer(leaders, many=True)
        return Response(serializer.data)


class LayAssociationViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for lay associations"""
    permission_classes = [AllowAny]

    def get_queryset(self):
        return LayAssociation.objects.filter(is_active=True).prefetch_related(
            'chaplain', 'officers'
        ).order_by('display_order', 'name')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return LayAssociationSerializer
        return LayAssociationSimpleSerializer

    @action(detail=False, methods=['get'])
    def all(self, request):
        """Get all lay associations"""
        associations = self.get_queryset()
        serializer = self.get_serializer(associations, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get associations by category"""
        category = request.query_params.get('category')
        if not category:
            return Response(
                {'error': 'category parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        associations = self.get_queryset().filter(category=category)
        serializer = self.get_serializer(associations, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured lay associations"""
        associations = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(associations, many=True)
        return Response(serializer.data)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for diocesan projects"""
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Project.objects.all().order_by('-start_date', 'display_order')

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured projects"""
        projects = self.get_queryset().filter(is_featured=True)[:10]
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get projects by category"""
        category = request.query_params.get('category')
        if not category:
            return Response(
                {'error': 'category parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        projects = self.get_queryset().filter(category=category)
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_status(self, request):
        """Get projects by status"""
        status_param = request.query_params.get('status')
        if not status_param:
            return Response(
                {'error': 'status parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        projects = self.get_queryset().filter(status=status_param)
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_deanery(self, request):
        """Get projects by deanery"""
        deanery = request.query_params.get('deanery')
        if not deanery:
            return Response(
                {'error': 'deanery parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        projects = self.get_queryset().filter(deanery__icontains=deanery)
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def ongoing(self, request):
        """Get ongoing projects"""
        projects = self.get_queryset().filter(status='ongoing')
        serializer = self.get_serializer(projects, many=True)
        return Response(serializer.data)

