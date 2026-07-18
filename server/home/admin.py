from django.contrib import admin
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


@admin.register(Greeting)
class GreetingAdmin(admin.ModelAdmin):
    list_display = ['bishop_name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['bishop_name', 'welcome_title']
    fields = [
        'welcome_title',
        'welcome_text',
        'bishop_name',
        'bishop_title',
        'bishop_image',
        'signature',
        'is_active',
    ]


@admin.register(DailyReading)
class DailyReadingAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'created_at']
    list_filter = ['date', 'created_at']
    search_fields = ['title', 'gospel_reference']
    date_hierarchy = 'date'
    fieldsets = (
        ('General', {
            'fields': ['title', 'date', 'reflection']
        }),
        ('First Reading', {
            'fields': ['first_reading_reference', 'first_reading_text']
        }),
        ('Second Reading', {
            'fields': ['second_reading_reference', 'second_reading_text']
        }),
        ('Responsorial Psalm', {
            'fields': ['responsorial_psalm_reference', 'responsorial_psalm_text']
        }),
        ('Gospel', {
            'fields': ['gospel_reference', 'gospel_text']
        }),
    )


@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_active', 'display_order', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['title', 'subtitle']
    list_editable = ['display_order', 'is_active']
    fields = [
        'title',
        'subtitle',
        'description',
        'image',
        'is_active',
        'display_order',
    ]


@admin.register(DiscoverMessage)
class DiscoverMessageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'featured', 'date']
    list_filter = ['category', 'featured', 'date', 'is_active']
    search_fields = ['title', 'excerpt', 'category']
    list_editable = ['featured']
    fieldsets = (
        ('Content', {
            'fields': ['title', 'excerpt', 'full_message', 'category']
        }),
        ('Media', {
            'fields': ['image']
        }),
        ('Status', {
            'fields': ['is_active', 'featured', 'date']
        }),
    )


@admin.register(RecentNews)
class RecentNewsAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_featured', 'date']
    list_filter = ['category', 'is_featured', 'date']
    search_fields = ['title', 'excerpt', 'category']
    list_editable = ['is_featured']
    fieldsets = (
        ('Content', {
            'fields': ['title', 'excerpt', 'full_content', 'category']
        }),
        ('Media', {
            'fields': ['image']
        }),
        ('Links', {
            'fields': ['link']
        }),
        ('Status', {
            'fields': ['is_featured', 'date']
        }),
    )


@admin.register(RecentSermon)
class RecentSermonAdmin(admin.ModelAdmin):
    list_display = ['title', 'preacher', 'series', 'date']
    list_filter = ['series', 'date', 'preacher']
    search_fields = ['title', 'preacher', 'series']
    fieldsets = (
        ('Basic Info', {
            'fields': ['title', 'preacher', 'series', 'date']
        }),
        ('Content', {
            'fields': ['excerpt', 'full_message']
        }),
        ('Media', {
            'fields': ['image', 'video_url', 'link']
        }),
    )


@admin.register(UpcomingEvent)
class UpcomingEventAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'location', 'is_featured']
    list_filter = ['is_featured', 'date']
    search_fields = ['title', 'location', 'description']
    date_hierarchy = 'date'
    list_editable = ['is_featured']
    fieldsets = (
        ('Basic Info', {
            'fields': ['title', 'date', 'time']
        }),
        ('Details', {
            'fields': ['location', 'description']
        }),
        ('Media', {
            'fields': ['image']
        }),
        ('Links', {
            'fields': ['registration_link']
        }),
        ('Status', {
            'fields': ['is_featured']
        }),
    )


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'is_featured', 'display_order']
    list_filter = ['category', 'is_featured']
    search_fields = ['title', 'description', 'category']
    list_editable = ['display_order', 'is_featured']
    fieldsets = (
        ('Basic Info', {
            'fields': ['title', 'description', 'category']
        }),
        ('Media', {
            'fields': ['image']
        }),
        ('Display', {
            'fields': ['display_order', 'is_featured']
        }),
    )


class ParishInline(admin.TabularInline):
    """Inline admin for parishes in a deanery"""
    model = Parish
    extra = 1
    fields = ('name', 'status', 'is_cathedral', 'display_order')


@admin.register(Deanery)
class DeaneryAdmin(admin.ModelAdmin):
    """Admin interface for Deanery model"""
    list_display = ('name', 'dean_name', 'is_active', 'parish_count', 'display_order')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name', 'dean_name', 'description')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'description', 'deanery_code', 'headquarters_address')
        }),
        ('Dean Information', {
            'fields': ('dean_name', 'dean_email', 'dean_phone')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Status', {
            'fields': ('is_active', 'display_order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    inlines = [ParishInline]
    list_editable = ('is_active',)
    ordering = ('display_order', 'name')

    def parish_count(self, obj):
        return obj.parishes.count()
    parish_count.short_description = 'Parishes'


@admin.register(Parish)
class ParishAdmin(admin.ModelAdmin):
    """Admin interface for Parish model"""
    list_display = ('name', 'deanery', 'status', 'is_cathedral', 'created_at')
    list_filter = ('is_cathedral', 'status', 'deanery', 'created_at')
    search_fields = ('name', 'address', 'city', 'deanery__name')
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'deanery', 'address', 'city')
        }),
        ('Contact Information', {
            'fields': ('phone', 'email')
        }),
        ('Details', {
            'fields': (
                'priest_in_charge',
                'mass_schedule',
                'is_cathedral',
                'status',
                'established_year',
                'parishioners_count'
            )
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Display', {
            'fields': ('display_order',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('status',)
    ordering = ('deanery', 'display_order', 'name')

