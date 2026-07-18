from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from .models import News, Podcast, Video, GalleryEvent, GalleryImage, GallerySetting
from .serializers import (
    NewsSerializer, PodcastSerializer, VideoSerializer,
    GalleryEventSerializer, GalleryEventListSerializer, GalleryImageSerializer,
    GallerySettingSerializer
)


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for news and events"""
    serializer_class = NewsSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return News.objects.filter(is_active=True).order_by('-date', '-display_order')

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured news"""
        news = self.get_queryset().filter(featured=True)[:5]
        serializer = self.get_serializer(news, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest news"""
        news = self.get_queryset().first()
        if news:
            serializer = self.get_serializer(news)
            return Response(serializer.data)
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get news by category"""
        category = request.query_params.get('category')
        if not category:
            return Response(
                {'error': 'category parameter required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        news = self.get_queryset().filter(category=category)
        serializer = self.get_serializer(news, many=True)
        return Response(serializer.data)


class PodcastViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for podcasts"""
    serializer_class = PodcastSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Podcast.objects.filter(is_active=True).order_by('-display_order', '-created_at')

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured podcasts"""
        podcasts = self.get_queryset().filter(featured=True)[:5]
        serializer = self.get_serializer(podcasts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest podcast"""
        podcast = self.get_queryset().first()
        if podcast:
            serializer = self.get_serializer(podcast)
            return Response(serializer.data)
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class VideoViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for videos"""
    serializer_class = VideoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return Video.objects.filter(is_active=True).order_by('-display_order', '-created_at')

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured videos"""
        videos = self.get_queryset().filter(featured=True)[:5]
        serializer = self.get_serializer(videos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest video"""
        video = self.get_queryset().first()
        if video:
            serializer = self.get_serializer(video)
            return Response(serializer.data)
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


class GalleryEventViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for gallery events"""
    serializer_class = GalleryEventListSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return GalleryEvent.objects.filter(is_active=True).order_by('-date', '-display_order')

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return GalleryEventSerializer
        return GalleryEventListSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured gallery events"""
        events = self.get_queryset().filter(featured=True)[:10]
        serializer = GalleryEventListSerializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest gallery event"""
        event = self.get_queryset().first()
        if event:
            serializer = GalleryEventSerializer(event)
            return Response(serializer.data)
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def images(self, request, pk=None):
        """Get all images for a gallery event"""
        gallery_event = self.get_object()
        images = gallery_event.images.filter(is_active=True).order_by('display_order')
        serializer = GalleryImageSerializer(images, many=True)
        return Response(serializer.data)


class GallerySettingViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for gallery settings"""
    serializer_class = GallerySettingSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return GallerySetting.objects.all()

    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get current gallery settings"""
        settings = GallerySetting.get_settings()
        serializer = self.get_serializer(settings)
        return Response(serializer.data)
