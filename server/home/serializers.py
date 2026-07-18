from rest_framework import serializers
from django.conf import settings
import cloudinary
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


def get_cloudinary_image_url(image_field):
    """Helper function to build absolute Cloudinary URL"""
    if image_field:
        cloud_name = cloudinary.config().cloud_name
        public_id = str(image_field.public_id)
        return f"https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.jpg"
    return None


class GreetingSerializer(serializers.ModelSerializer):
    bishop_image = serializers.SerializerMethodField()

    class Meta:
        model = Greeting
        fields = [
            'id',
            'welcome_title',
            'welcome_text',
            'bishop_name',
            'bishop_title',
            'bishop_image',
            'signature',
            'is_active',
            'created_at',
            'updated_at',
        ]

    def get_bishop_image(self, obj):
        return get_cloudinary_image_url(obj.bishop_image)


class ReadingSerializer(serializers.Serializer):
    """Serializer for nested reading objects"""
    reference = serializers.CharField()
    text = serializers.CharField()


class DailyReadingSerializer(serializers.ModelSerializer):
    first_reading = serializers.SerializerMethodField()
    second_reading = serializers.SerializerMethodField()
    responsorial_psalm = serializers.SerializerMethodField()
    gospel = serializers.SerializerMethodField()

    class Meta:
        model = DailyReading
        fields = [
            'id',
            'title',
            'date',
            'first_reading',
            'second_reading',
            'responsorial_psalm',
            'gospel',
            'reflection',
            'created_at',
            'updated_at',
        ]

    def get_first_reading(self, obj):
        if obj.first_reading_reference and obj.first_reading_text:
            return {
                'reference': obj.first_reading_reference,
                'text': obj.first_reading_text,
            }
        return None

    def get_second_reading(self, obj):
        if obj.second_reading_reference and obj.second_reading_text:
            return {
                'reference': obj.second_reading_reference,
                'text': obj.second_reading_text,
            }
        return None

    def get_responsorial_psalm(self, obj):
        return {
            'reference': obj.responsorial_psalm_reference,
            'text': obj.responsorial_psalm_text,
        }

    def get_gospel(self, obj):
        return {
            'reference': obj.gospel_reference,
            'text': obj.gospel_text,
        }


class HeroSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Hero
        fields = [
            'id',
            'title',
            'subtitle',
            'description',
            'image',
            'is_active',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        """Build absolute Cloudinary URL for image"""
        if obj.image:
            cloud_name = cloudinary.config().cloud_name
            public_id = str(obj.image.public_id)
            return f"https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}"
        return None


class DiscoverMessageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = DiscoverMessage
        fields = [
            'id',
            'title',
            'excerpt',
            'full_message',
            'image',
            'date',
            'category',
            'is_active',
            'featured',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class RecentNewsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = RecentNews
        fields = [
            'id',
            'title',
            'excerpt',
            'image',
            'date',
            'category',
            'link',
            'is_featured',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class RecentSermonSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = RecentSermon
        fields = [
            'id',
            'title',
            'preacher',
            'date',
            'excerpt',
            'image',
            'link',
            'full_message',
            'video_url',
            'series',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class UpcomingEventSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = UpcomingEvent
        fields = [
            'id',
            'title',
            'location',
            'date',
            'time',
            'description',
            'image',
            'registration_link',
            'is_featured',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class GalleryImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = GalleryImage
        fields = [
            'id',
            'title',
            'description',
            'image',
            'category',
            'display_order',
            'is_featured',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class ParishSerializer(serializers.ModelSerializer):
    """Serializer for individual parishes"""
    deanery_name = serializers.CharField(source='deanery.name', read_only=True)
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Parish
        fields = [
            'id',
            'name',
            'deanery',
            'deanery_name',
            'address',
            'city',
            'phone',
            'email',
            'image',
            'priest_in_charge',
            'mass_schedule',
            'established_year',
            'status',
            'status_label',
            'parishioners_count',
            'is_cathedral',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class DeanerySerializer(serializers.ModelSerializer):
    """Serializer for deaneries with parishes"""
    parishes = ParishSerializer(many=True, read_only=True)
    parish_count = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Deanery
        fields = [
            'id',
            'name',
            'description',
            'deanery_code',
            'dean_name',
            'dean_phone',
            'dean_email',
            'headquarters_address',
            'image',
            'is_active',
            'display_order',
            'parish_count',
            'parishes',
            'created_at',
            'updated_at',
        ]

    def get_parish_count(self, obj):
        return obj.parishes.count()

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class DeanerySimpleSerializer(serializers.ModelSerializer):
    """Simple deanery serializer without nested parishes"""
    parish_count = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = Deanery
        fields = [
            'id',
            'name',
            'description',
            'deanery_code',
            'dean_name',
            'headquarters_address',
            'image',
            'is_active',
            'display_order',
            'parish_count',
            'created_at',
            'updated_at',
        ]

    def get_parish_count(self, obj):
        return obj.parishes.count()

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)

