from rest_framework import serializers
import cloudinary
from .models import LayLeader, LayAssociation, Project


def get_cloudinary_image_url(image_field):
    """Helper function to build absolute Cloudinary URL"""
    if image_field:
        cloud_name = cloudinary.config().cloud_name
        public_id = str(image_field.public_id)
        return f"https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.jpg"
    return None


class LayLeaderSerializer(serializers.ModelSerializer):
    """Serializer for lay association leaders"""
    role_label = serializers.CharField(source='get_role_display', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = LayLeader
        fields = [
            'id',
            'name',
            'role',
            'role_label',
            'parish',
            'deanery',
            'image',
            'phone',
            'email',
            'tenure',
            'bio',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class LayAssociationSerializer(serializers.ModelSerializer):
    """Serializer for lay associations with nested leaders"""
    chaplain = LayLeaderSerializer(read_only=True)
    officers = LayLeaderSerializer(many=True, read_only=True)
    category_label = serializers.CharField(source='get_category_display', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = LayAssociation
        fields = [
            'id',
            'name',
            'acronym',
            'category',
            'category_label',
            'description',
            'patron_saint',
            'meeting_schedule',
            'image',
            'chaplain',
            'officers',
            'meeting_venue',
            'contact_phone',
            'contact_email',
            'website',
            'membership_count',
            'founded_year',
            'is_active',
            'is_featured',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class LayAssociationSimpleSerializer(serializers.ModelSerializer):
    """Simple lay association serializer without nested leaders"""
    category_label = serializers.CharField(source='get_category_display', read_only=True)
    officer_count = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = LayAssociation
        fields = [
            'id',
            'name',
            'acronym',
            'category',
            'category_label',
            'description',
            'image',
            'contact_phone',
            'contact_email',
            'membership_count',
            'officer_count',
            'is_featured',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_officer_count(self, obj):
        return obj.officers.count()

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class ProjectSerializer(serializers.ModelSerializer):
    """Serializer for diocesan projects"""
    category_label = serializers.CharField(source='get_category_display', read_only=True)
    status_label = serializers.CharField(source='get_status_display', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'category',
            'category_label',
            'status',
            'status_label',
            'parish',
            'deanery',
            'location',
            'image',
            'start_date',
            'end_date',
            'budget',
            'progress',
            'project_lead',
            'contact_phone',
            'contact_email',
            'objectives',
            'achievements',
            'is_featured',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)
