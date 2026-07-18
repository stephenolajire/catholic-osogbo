from django.contrib import admin
from .models import News, Podcast, Video, GalleryEvent, GalleryImage, GallerySetting


@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    """Admin interface for News"""
    list_display = ('title', 'category', 'date', 'is_active', 'featured', 'display_order')
    list_filter = ('category', 'is_active', 'featured', 'date')
    search_fields = ('title', 'excerpt', 'full_content')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Content', {
            'fields': ('title', 'excerpt', 'full_content', 'image', 'category')
        }),
        ('Publishing', {
            'fields': ('date', 'is_active', 'featured', 'display_order')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    list_editable = ('is_active', 'featured', 'display_order')


@admin.register(Podcast)
class PodcastAdmin(admin.ModelAdmin):
    """Admin interface for Podcasts"""
    list_display = ('title', 'duration_seconds', 'is_active', 'featured', 'display_order')
    list_filter = ('is_active', 'featured')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Content', {
            'fields': ('title', 'description', 'image', 'spotify_link')
        }),
        ('Details', {
            'fields': ('duration_seconds',)
        }),
        ('Publishing', {
            'fields': ('is_active', 'featured', 'display_order')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    list_editable = ('is_active', 'featured', 'display_order')


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    """Admin interface for Videos"""
    list_display = ('title', 'duration_seconds', 'is_active', 'featured', 'display_order')
    list_filter = ('is_active', 'featured')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Content', {
            'fields': ('title', 'description', 'image', 'video_link')
        }),
        ('Details', {
            'fields': ('duration_seconds',)
        }),
        ('Publishing', {
            'fields': ('is_active', 'featured', 'display_order')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    list_editable = ('is_active', 'featured', 'display_order')


class GalleryImageInline(admin.TabularInline):
    """Inline admin for gallery images"""
    model = GalleryImage
    fields = ('title', 'image', 'display_order', 'is_active')
    extra = 0


@admin.register(GalleryEvent)
class GalleryEventAdmin(admin.ModelAdmin):
    """Admin interface for Gallery Events"""
    list_display = ('title', 'category', 'date', 'image_count', 'is_active', 'featured', 'display_order')
    list_filter = ('category', 'is_active', 'featured', 'date')
    search_fields = ('title', 'description')
    readonly_fields = ('date', 'created_at', 'updated_at')
    inlines = [GalleryImageInline]
    fieldsets = (
        ('Content', {
            'fields': ('title', 'description', 'hero_image', 'cover_image', 'category')
        }),
        ('Publishing', {
            'fields': ('date', 'is_active', 'featured', 'display_order')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    list_editable = ('is_active', 'featured', 'display_order')


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    """Admin interface for Gallery Images"""
    list_display = ('title', 'gallery_event', 'display_order', 'is_active')
    list_filter = ('gallery_event', 'is_active')
    search_fields = ('title', 'description')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        ('Content', {
            'fields': ('gallery_event', 'title', 'description', 'image')
        }),
        ('Publishing', {
            'fields': ('display_order', 'is_active')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    list_editable = ('is_active', 'display_order')


@admin.register(GallerySetting)
class GallerySettingAdmin(admin.ModelAdmin):
    """Admin interface for Gallery Settings"""
    fieldsets = (
        ('Gallery Hero Image', {
            'fields': ('hero_image',),
            'description': 'Upload a hero image for the gallery page header'
        }),
    )
    
    def has_delete_permission(self, request, obj=None):
        """Prevent deletion of gallery settings"""
        return False
    
    def has_add_permission(self, request):
        """Prevent adding new gallery settings (singleton)"""
        return not GallerySetting.objects.exists()
