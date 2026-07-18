from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import Priest, CoatOfArm, LocalOrdinary, BishopMessage
from .serializers import (
    PriestSerializer,
    CoatOfArmSerializer,
    LocalOrdinarySerializer,
    BishopMessageSerializer
)


class PriestViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for clergy members"""
    serializer_class = PriestSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Priest.objects.filter(is_active=True).order_by('display_order', 'name')

    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active priests"""
        priests = self.get_queryset()
        serializer = self.get_serializer(priests, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_role(self, request):
        """Get priests by role"""
        role = request.query_params.get('role')
        if not role:
            return Response(
                {'error': 'role parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        priests = self.get_queryset().filter(role=role)
        serializer = self.get_serializer(priests, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_deanery(self, request):
        """Get priests by deanery"""
        deanery = request.query_params.get('deanery')
        if not deanery:
            return Response(
                {'error': 'deanery parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        priests = self.get_queryset().filter(deanery__icontains=deanery)
        serializer = self.get_serializer(priests, many=True)
        return Response(serializer.data)


class CoatOfArmViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for coat of arms"""
    serializer_class = CoatOfArmSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return CoatOfArm.objects.filter(is_active=True).order_by('display_order')

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest coat of arms"""
        coat = self.get_queryset().first()
        if coat:
            serializer = self.get_serializer(coat)
            return Response(serializer.data)
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class LocalOrdinaryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for local ordinary"""
    serializer_class = LocalOrdinarySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return LocalOrdinary.objects.filter(is_active=True).order_by('-created_at')

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest local ordinary information"""
        ordinary = self.get_queryset().first()
        if ordinary:
            serializer = self.get_serializer(ordinary)
            return Response(serializer.data)
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class BishopMessageViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for bishop messages"""
    serializer_class = BishopMessageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return BishopMessage.objects.filter(is_active=True).order_by('-date', '-display_order')

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured bishop messages"""
        messages = self.get_queryset().filter(featured=True)
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest bishop message"""
        message = self.get_queryset().first()
        if message:
            serializer = self.get_serializer(message)
            return Response(serializer.data)
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def by_parish(self, request):
        """Get priests assigned to a parish"""
        parish = request.query_params.get('parish')
        if not parish:
            return Response(
                {'error': 'parish parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        priests = self.get_queryset().filter(parish__icontains=parish)
        serializer = self.get_serializer(priests, many=True)
        return Response(serializer.data)

