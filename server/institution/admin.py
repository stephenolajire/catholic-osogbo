from django.contrib import admin
from .models import (
    InstitutionCategory,
    InstitutionSubcategory,
    Institution,
)


@admin.register(InstitutionCategory)
class InstitutionCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category_key', 'is_active', 'display_order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'category_key', 'description']
    list_editable = ['display_order', 'is_active']
    prepopulated_fields = {'category_key': ('name',)}
    fieldsets = (
        ('Basic Info', {
            'fields': ['name', 'category_key', 'description']
        }),
        ('Media', {
            'fields': ['image']
        }),
        ('Display', {
            'fields': ['display_order', 'is_active']
        }),
    )


class InstitutionInline(admin.TabularInline):
    """Inline display of institutions within subcategory"""
    model = Institution
    extra = 1
    fields = ['name', 'principal_name', 'phone_number', 'email', 'display_order', 'is_featured']
    list_editable = ['display_order', 'is_featured']


@admin.register(InstitutionSubcategory)
class InstitutionSubcategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'display_order', 'institution_count', 'created_at']
    list_filter = ['category', 'created_at']
    search_fields = ['name', 'description']
    list_editable = ['display_order']
    inlines = [InstitutionInline]
    fieldsets = (
        ('Category', {
            'fields': ['category']
        }),
        ('Basic Info', {
            'fields': ['name', 'description']
        }),
        ('Media', {
            'fields': ['hero_image']
        }),
        ('Display', {
            'fields': ['display_order']
        }),
    )

    def institution_count(self, obj):
        return obj.institutions.count()
    institution_count.short_description = 'Institutions'


@admin.register(Institution)
class InstitutionAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'subcategory',
        'principal_name',
        'city',
        'is_featured',
        'display_order',
        'created_at'
    ]
    list_filter = ['is_featured', 'subcategory__category', 'subcategory', 'created_at']
    search_fields = ['name', 'principal_name', 'address', 'email', 'phone_number']
    list_editable = ['is_featured', 'display_order']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Category', {
            'fields': ['subcategory']
        }),
        ('Basic Info', {
            'fields': ['name', 'description', 'mission_statement']
        }),
        ('Location & Contact', {
            'fields': ['address', 'phone_number', 'email', 'website', 'contact_person']
        }),
        ('Leadership', {
            'fields': ['principal_name', 'principal_title']
        }),
        ('Details', {
            'fields': [
                'established_year',
                'staff_count',
                'student_count',
                'operating_hours',
                'facilities'
            ]
        }),
        ('Media', {
            'fields': ['image']
        }),
        ('Display', {
            'fields': ['is_featured', 'display_order']
        }),
    )

    def city(self, obj):
        """Extract city from address"""
        if obj.address:
            parts = obj.address.split(',')
            return parts[-1].strip() if len(parts) > 1 else 'N/A'
        return 'N/A'
    city.short_description = 'City'

