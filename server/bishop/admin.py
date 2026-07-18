from django.contrib import admin
from .models import Priest, CoatOfArm, CoatOfArmItem, LocalOrdinary, BishopMessage


@admin.register(Priest)
class PriestAdmin(admin.ModelAdmin):
    """Admin interface for Priest model"""
    list_display = (
        'name',
        'role',
        'parish',
        'deanery',
        'ordained_year',
        'is_active',
        'created_at',
    )
    list_filter = (
        'is_active',
        'role',
        'ordained_year',
        'deanery',
    )
    search_fields = (
        'name',
        'parish',
        'deanery',
        'email',
        'phone',
    )
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'role', 'image', 'bio')
        }),
        ('Assignment', {
            'fields': ('parish', 'deanery')
        }),
        ('Contact Information', {
            'fields': ('email', 'phone')
        }),
        ('Ordination Details', {
            'fields': ('ordained_year',)
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
    list_editable = ('is_active',)
    ordering = ('-created_at',)


@admin.register(CoatOfArm)
class CoatOfArmAdmin(admin.ModelAdmin):
    """Admin interface for Coat of Arms"""
    list_display = (
        'title',
        'is_active',
        'display_order',
        'created_at',
    )
    list_filter = (
        'is_active',
        'created_at',
    )
    search_fields = ('title', 'description')
    fieldsets = (
        ('Information', {
            'fields': ('title', 'description')
        }),
        ('Images', {
            'fields': ('hero_image', 'coat_of_arm_image')
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
    list_editable = ('is_active',)
    ordering = ('-created_at',)


@admin.register(CoatOfArmItem)
class CoatOfArmItemAdmin(admin.ModelAdmin):
    """Admin interface for Coat of Arm Items"""
    list_display = (
        'item_name',
        'coat_of_arm',
        'display_order',
        'created_at',
    )
    list_filter = (
        'coat_of_arm',
        'created_at',
    )
    search_fields = ('item_name', 'explanation')
    fieldsets = (
        ('Item Information', {
            'fields': ('coat_of_arm', 'item_name', 'explanation')
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
    ordering = ('coat_of_arm', 'display_order')


@admin.register(LocalOrdinary)
class LocalOrdinaryAdmin(admin.ModelAdmin):
    """Admin interface for Local Ordinary"""
    list_display = (
        'title',
        'is_active',
        'created_at',
    )
    list_filter = (
        'is_active',
        'created_at',
    )
    search_fields = ('title', 'text')
    fieldsets = (
        ('Information', {
            'fields': ('title', 'text')
        }),
        ('Images', {
            'fields': ('hero_image', 'bishop_image')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('is_active',)
    ordering = ('-created_at',)


@admin.register(BishopMessage)
class BishopMessageAdmin(admin.ModelAdmin):
    """Admin interface for Bishop Messages"""
    list_display = (
        'title',
        'category',
        'date',
        'featured',
        'is_active',
        'created_at',
    )
    list_filter = (
        'is_active',
        'featured',
        'category',
        'date',
    )
    search_fields = ('title', 'excerpt', 'full_message')
    fieldsets = (
        ('Message Content', {
            'fields': ('title', 'excerpt', 'full_message', 'category')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Publishing', {
            'fields': ('date', 'featured', 'is_active', 'display_order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('is_active', 'featured')
    ordering = ('-date', '-display_order')

