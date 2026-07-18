from rest_framework import serializers
import cloudinary
from .models import Priest, CoatOfArm, CoatOfArmItem, LocalOrdinary, BishopMessage


def get_cloudinary_image_url(image_field):
    """Helper function to build absolute Cloudinary URL"""
    if image_field:
        cloud_name = cloudinary.config().cloud_name
        public_id = str(image_field.public_id)
        return f"https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.jpg"
    return None


class PriestSerializer(serializers.ModelSerializer):
    """Serializer for clergy members"""
    role_label = serializers.CharField(source='get_role_display', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Priest
        fields = [
            'id',
            'name',
            'role',
            'role_label',
            'parish',
            'deanery',
            'image',
            'bio',
            'ordained_year',
            'is_active',
            'phone',
            'email',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class CoatOfArmItemSerializer(serializers.ModelSerializer):
    """Serializer for coat of arm items"""
    class Meta:
        model = CoatOfArmItem
        fields = [
            'id',
            'item_name',
            'explanation',
            'display_order',
            'created_at',
            'updated_at',
        ]


class CoatOfArmSerializer(serializers.ModelSerializer):
    """Serializer for the coat of arms"""
    hero_image = serializers.SerializerMethodField()
    coat_of_arm_image = serializers.SerializerMethodField()
    items = CoatOfArmItemSerializer(many=True, read_only=True)

    class Meta:
        model = CoatOfArm
        fields = [
            'id',
            'title',
            'hero_image',
            'coat_of_arm_image',
            'description',
            'items',
            'is_active',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_hero_image(self, obj):
        return get_cloudinary_image_url(obj.hero_image)

    def get_coat_of_arm_image(self, obj):
        return get_cloudinary_image_url(obj.coat_of_arm_image)


class LocalOrdinarySerializer(serializers.ModelSerializer):
    """Serializer for local ordinary information"""
    hero_image = serializers.SerializerMethodField()
    bishop_image = serializers.SerializerMethodField()

    class Meta:
        model = LocalOrdinary
        fields = [
            'id',
            'title',
            'hero_image',
            'bishop_image',
            'text',
            'is_active',
            'created_at',
            'updated_at',
        ]

    def get_hero_image(self, obj):
        return get_cloudinary_image_url(obj.hero_image)

    def get_bishop_image(self, obj):
        return get_cloudinary_image_url(obj.bishop_image)


class BishopMessageSerializer(serializers.ModelSerializer):
    """Serializer for bishop messages"""
    image = serializers.SerializerMethodField()

    class Meta:
        model = BishopMessage
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
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)
