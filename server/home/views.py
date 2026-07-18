from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.utils import timezone
from datetime import timedelta

from .models import (
    Greeting,
    DailyReading,
    Hero,
    DiscoverMessage,
    RecentNews,
    RecentSermon,
    UpcomingEvent,
    GalleryImage,
    Deanery,
    Parish,
)
from .serializers import (
    GreetingSerializer,
    DailyReadingSerializer,
    HeroSerializer,
    DiscoverMessageSerializer,
    RecentNewsSerializer,
    RecentSermonSerializer,
    UpcomingEventSerializer,
    GalleryImageSerializer,
    DeanerySerializer,
    DeanerySimpleSerializer,
    ParishSerializer,
)


class GreetingViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Greeting objects"""
    queryset = Greeting.objects.filter(is_active=True)
    serializer_class = GreetingSerializer
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get the active greeting"""
        greeting = self.queryset.first()
        if greeting:
            serializer = self.get_serializer(greeting)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class DailyReadingViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Daily Reading objects"""
    serializer_class = DailyReadingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return DailyReading.objects.all().order_by('-date')

    @action(detail=False, methods=['get'])
    def today(self, request):
        """Get today's reading"""
        today = timezone.now().date()
        reading = DailyReading.objects.filter(date=today).first()
        if reading:
            serializer = self.get_serializer(reading)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def by_date(self, request):
        """Get reading by specific date"""
        date_str = request.query_params.get('date')
        if not date_str:
            return Response(
                {'error': 'Date parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            reading = DailyReading.objects.get(date=date_str)
            serializer = self.get_serializer(reading)
            return Response(serializer.data)
        except DailyReading.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class HeroViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Hero sections"""
    serializer_class = HeroSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Hero.objects.filter(is_active=True).order_by('display_order')

    @action(detail=False, methods=['get'])
    def active(self, request):
        """Get all active heroes"""
        heroes = self.get_queryset()
        serializer = self.get_serializer(heroes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured/first active hero"""
        hero = self.get_queryset().first()
        if hero:
            serializer = self.get_serializer(hero)
            return Response(serializer.data)
        return Response(status=status.HTTP_404_NOT_FOUND)


class DiscoverMessageViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Discover Messages"""
    serializer_class = DiscoverMessageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return DiscoverMessage.objects.filter(is_active=True).order_by('-date')

    @action(detail=False, methods=['get'])
    def messages(self, request):
        """Get all active discover messages"""
        messages = self.get_queryset()
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured discover messages"""
        messages = self.get_queryset().filter(featured=True)[:3]
        serializer = self.get_serializer(messages, many=True)
        return Response(serializer.data)


class RecentNewsViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Recent News"""
    serializer_class = RecentNewsSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return RecentNews.objects.all().order_by('-date')

    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent news items (last 6)"""
        news = self.get_queryset()[:6]
        serializer = self.get_serializer(news, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured news items"""
        news = self.get_queryset().filter(is_featured=True)[:3]
        serializer = self.get_serializer(news, many=True)
        return Response(serializer.data)


class RecentSermonViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Recent Sermons"""
    serializer_class = RecentSermonSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return RecentSermon.objects.all().order_by('-date')

    @action(detail=False, methods=['get'])
    def recent(self, request):
        """Get recent sermons (last 6)"""
        sermons = self.get_queryset()[:6]
        serializer = self.get_serializer(sermons, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_preacher(self, request):
        """Get sermons by specific preacher"""
        preacher = request.query_params.get('preacher')
        if not preacher:
            return Response(
                {'error': 'Preacher parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        sermons = self.get_queryset().filter(preacher__icontains=preacher)
        serializer = self.get_serializer(sermons, many=True)
        return Response(serializer.data)


class UpcomingEventViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Upcoming Events"""
    serializer_class = UpcomingEventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        now = timezone.now()
        return UpcomingEvent.objects.filter(date__gte=now).order_by('date')

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get upcoming events"""
        events = self.get_queryset()[:10]
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured upcoming events"""
        events = self.get_queryset().filter(is_featured=True)[:3]
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)


class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Gallery Images"""
    serializer_class = GalleryImageSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return GalleryImage.objects.all().order_by('display_order')

    @action(detail=False, methods=['get'])
    def gallery(self, request):
        """Get all gallery images"""
        images = self.get_queryset()
        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured gallery images"""
        images = self.get_queryset().filter(is_featured=True)
        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get gallery images by category"""
        category = request.query_params.get('category')
        if not category:
            return Response(
                {'error': 'Category parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        images = self.get_queryset().filter(category=category)
        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data)


class DeaneryViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Deaneries"""
    serializer_class = DeanerySimpleSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Deanery.objects.filter(is_active=True).prefetch_related('parishes').order_by('display_order')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return DeanerySerializer
        return DeanerySimpleSerializer

    @action(detail=False, methods=['get'])
    def all(self, request):
        """Get all deaneries"""
        deaneries = self.get_queryset()
        serializer = self.get_serializer(deaneries, many=True)
        return Response(serializer.data)


class ParishViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Parishes"""
    serializer_class = ParishSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Parish.objects.select_related('deanery').order_by('deanery', 'display_order')

    @action(detail=False, methods=['get'])
    def by_deanery(self, request):
        """Get parishes by deanery"""
        deanery_id = request.query_params.get('deanery_id')
        if not deanery_id:
            return Response(
                {'error': 'deanery_id parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        parishes = self.get_queryset().filter(deanery_id=deanery_id)
        serializer = self.get_serializer(parishes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def cathedrals(self, request):
        """Get cathedral parishes"""
        parishes = self.get_queryset().filter(is_cathedral=True)
        serializer = self.get_serializer(parishes, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_status(self, request):
        """Get parishes by status"""
        status_param = request.query_params.get('status')
        if not status_param:
            return Response(
                {'error': 'status parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        parishes = self.get_queryset().filter(status=status_param)
        serializer = self.get_serializer(parishes, many=True)
        return Response(serializer.data)

