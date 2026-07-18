from rest_framework import serializers
import cloudinary
from .models import (
    InstitutionCategory,
    InstitutionSubcategory,
    Institution,
)


def get_cloudinary_image_url(image_field):
    """Helper function to build absolute Cloudinary URL"""
    if image_field:
        cloud_name = cloudinary.config().cloud_name
        public_id = str(image_field.public_id)
        return f"https://res.cloudinary.com/{cloud_name}/image/upload/{public_id}.jpg"
    return None


class InstitutionSerializer(serializers.ModelSerializer):
    """Serializer for individual institutions"""
    subcategory_name = serializers.CharField(source='subcategory.name', read_only=True)
    category_name = serializers.CharField(source='subcategory.category.name', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Institution
        fields = [
            'id',
            'name',
            'subcategory',
            'subcategory_name',
            'category_name',
            'description',
            'address',
            'phone_number',
            'email',
            'website',
            'principal_name',
            'principal_title',
            'image',
            'established_year',
            'staff_count',
            'student_count',
            'operating_hours',
            'mission_statement',
            'facilities',
            'contact_person',
            'is_featured',
            'display_order',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class InstitutionSubcategorySerializer(serializers.ModelSerializer):
    """Serializer for institution subcategories with nested institutions"""
    institutions = InstitutionSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    hero_image = serializers.SerializerMethodField()

    class Meta:
        model = InstitutionSubcategory
        fields = [
            'id',
            'name',
            'category',
            'category_name',
            'description',
            'hero_image',
            'display_order',
            'institutions',
            'created_at',
            'updated_at',
        ]

    def get_hero_image(self, obj):
        return get_cloudinary_image_url(obj.hero_image)


class InstitutionSubcategorySimpleSerializer(serializers.ModelSerializer):
    """Simple subcategory serializer without nested institutions"""
    category_name = serializers.CharField(source='category.name', read_only=True)
    institution_count = serializers.SerializerMethodField()
    hero_image = serializers.SerializerMethodField()

    class Meta:
        model = InstitutionSubcategory
        fields = [
            'id',
            'name',
            'category',
            'category_name',
            'description',
            'hero_image',
            'display_order',
            'institution_count',
            'created_at',
            'updated_at',
        ]

    def get_institution_count(self, obj):
        return obj.institutions.count()

    def get_hero_image(self, obj):
        return get_cloudinary_image_url(obj.hero_image)


class InstitutionCategorySerializer(serializers.ModelSerializer):
    """Serializer for institution categories with nested subcategories and institutions"""
    subcategories = InstitutionSubcategorySerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = InstitutionCategory
        fields = [
            'id',
            'name',
            'category_key',
            'description',
            'image',
            'display_order',
            'is_active',
            'subcategories',
            'created_at',
            'updated_at',
        ]

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)


class InstitutionCategorySimpleSerializer(serializers.ModelSerializer):
    """Simple category serializer without nested subcategories"""
    subcategory_count = serializers.SerializerMethodField()
    institution_count = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = InstitutionCategory
        fields = [
            'id',
            'name',
            'category_key',
            'description',
            'image',
            'display_order',
            'is_active',
            'subcategory_count',
            'institution_count',
            'created_at',
            'updated_at',
        ]

    def get_subcategory_count(self, obj):
        return obj.subcategories.count()

    def get_institution_count(self, obj):
        return sum(sub.institutions.count() for sub in obj.subcategories.all())

    def get_image(self, obj):
        return get_cloudinary_image_url(obj.image)
