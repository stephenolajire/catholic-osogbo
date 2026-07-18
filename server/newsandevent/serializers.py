from rest_framework import serializers
from .models import News, Podcast, Video, GalleryEvent, GalleryImage, GallerySetting


def get_cloudinary_image_url(image_field):
    """
    Get absolute Cloudinary URL with .jpg extension
    Converts relative Cloudinary path to full URL
    """
    if not image_field:
        return None
    
    # Handle both regular file fields and CloudinaryResource objects
    if hasattr(image_field, 'name'):
        public_id = image_field.name
    else:
        # For CloudinaryResource objects, convert to string
        public_id = str(image_field)
    
    if not public_id:
        return None
    
    # If it's already a full URL, return it as-is
    if public_id.startswith('https://'):
        return public_id
    
    # Build full Cloudinary URL with .jpg extension
    return f"https://res.cloudinary.com/lyz4bdgw/image/upload/{public_id}.jpg"


class NewsSerializer(serializers.ModelSerializer):
    """Serialize News objects with absolute image URLs"""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = News
        fields = [
            'id', 'title', 'excerpt', 'full_content', 'image_url',
            'date', 'category', 'is_active', 'featured', 'display_order',
            'created_at', 'updated_at'
        ]
    
    def get_image_url(self, obj):
        return get_cloudinary_image_url(obj.image)


class PodcastSerializer(serializers.ModelSerializer):
    """Serialize Podcast objects with absolute image URLs"""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Podcast
        fields = [
            'id', 'title', 'description', 'image_url', 'spotify_link',
            'duration_seconds', 'is_active', 'featured', 'display_order',
            'created_at', 'updated_at'
        ]
    
    def get_image_url(self, obj):
        return get_cloudinary_image_url(obj.image)


class VideoSerializer(serializers.ModelSerializer):
    """Serialize Video objects with absolute image URLs"""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Video
        fields = [
            'id', 'title', 'description', 'image_url', 'video_link',
            'duration_seconds', 'is_active', 'featured', 'display_order',
            'created_at', 'updated_at'
        ]
    
    def get_image_url(self, obj):
        return get_cloudinary_image_url(obj.image)


class GalleryImageSerializer(serializers.ModelSerializer):
    """Serialize Gallery Image with absolute URL"""
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = GalleryImage
        fields = [
            'id', 'title', 'description', 'image_url',
            'display_order', 'is_active', 'created_at', 'updated_at'
        ]
    
    def get_image_url(self, obj):
        return get_cloudinary_image_url(obj.image)


class GalleryEventSerializer(serializers.ModelSerializer):
    """Serialize Gallery Event with nested images and absolute URLs"""
    cover_image_url = serializers.SerializerMethodField()
    images = GalleryImageSerializer(many=True, read_only=True)
    image_count = serializers.SerializerMethodField()
    
    class Meta:
        model = GalleryEvent
        fields = [
            'id', 'title', 'description', 'cover_image_url', 'date',
            'category', 'is_active', 'featured', 'display_order',
            'image_count', 'images', 'created_at', 'updated_at'
        ]
    
    def get_cover_image_url(self, obj):
        return get_cloudinary_image_url(obj.cover_image)
    
    def get_image_count(self, obj):
        return obj.image_count


class GalleryEventListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for gallery event lists"""
    cover_image_url = serializers.SerializerMethodField()
    image_count = serializers.SerializerMethodField()
    
    class Meta:
        model = GalleryEvent
        fields = [
            'id', 'title', 'description', 'cover_image_url', 'date',
            'category', 'featured', 'display_order',
            'image_count', 'created_at', 'updated_at'
        ]
    
    def get_cover_image_url(self, obj):
        return get_cloudinary_image_url(obj.cover_image)
    
    def get_image_count(self, obj):
        return obj.image_count


class GallerySettingSerializer(serializers.ModelSerializer):
    """Serialize Gallery Settings with absolute image URL"""
    hero_image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = GallerySetting
        fields = ['id', 'hero_image_url']
    
    def get_hero_image_url(self, obj):
        return get_cloudinary_image_url(obj.hero_image)
