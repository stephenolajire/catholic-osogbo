from django.contrib import admin
from .models import LayLeader, LayAssociation, Project


@admin.register(LayLeader)
class LayLeaderAdmin(admin.ModelAdmin):
    """Admin interface for LayLeader model"""
    list_display = (
        'name',
        'role',
        'parish',
        'deanery',
        'tenure',
        'display_order',
        'created_at',
    )
    list_filter = (
        'role',
        'deanery',
        'tenure',
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
            'fields': ('name', 'role', 'image', 'bio', 'email', 'phone')
        }),
        ('Assignment', {
            'fields': ('parish', 'deanery', 'tenure')
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
    ordering = ('display_order', 'name')


class LayAssociationOfficersInline(admin.TabularInline):
    """Inline admin for lay association officers"""
    model = LayAssociation.officers.through
    extra = 1
    verbose_name = "Officer"
    verbose_name_plural = "Officers"


@admin.register(LayAssociation)
class LayAssociationAdmin(admin.ModelAdmin):
    """Admin interface for LayAssociation model"""
    list_display = (
        'name',
        'acronym',
        'category',
        'membership_count',
        'is_featured',
        'is_active',
        'created_at',
    )
    list_filter = (
        'category',
        'is_active',
        'is_featured',
        'founded_year',
    )
    search_fields = (
        'name',
        'acronym',
        'description',
        'patron_saint',
        'contact_email',
    )
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'acronym', 'category', 'description')
        }),
        ('Association Details', {
            'fields': ('patron_saint', 'founded_year', 'chaplain', 'membership_count')
        }),
        ('Meeting Information', {
            'fields': ('meeting_venue', 'meeting_schedule')
        }),
        ('Contact Information', {
            'fields': ('contact_phone', 'contact_email', 'website')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Status', {
            'fields': ('is_active', 'is_featured', 'display_order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    inlines = [LayAssociationOfficersInline]
    list_editable = ('is_featured', 'is_active')
    ordering = ('display_order', 'name')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin interface for Project model"""
    list_display = (
        'title',
        'category',
        'status',
        'progress',
        'parish',
        'deanery',
        'is_featured',
        'start_date',
    )
    list_filter = (
        'category',
        'status',
        'deanery',
        'start_date',
        'is_featured',
    )
    search_fields = (
        'title',
        'description',
        'objectives',
        'parish',
        'deanery',
        'project_lead',
    )
    fieldsets = (
        ('Project Information', {
            'fields': ('title', 'description', 'category', 'status')
        }),
        ('Location', {
            'fields': ('location', 'parish', 'deanery')
        }),
        ('Timeline', {
            'fields': ('start_date', 'end_date')
        }),
        ('Details', {
            'fields': ('objectives', 'achievements', 'budget', 'progress', 'project_lead')
        }),
        ('Contact Information', {
            'fields': ('contact_phone', 'contact_email')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Status', {
            'fields': ('is_featured', 'display_order')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    readonly_fields = ('created_at', 'updated_at')
    list_editable = ('is_featured', 'progress')
    date_hierarchy = 'start_date'
    ordering = ('-start_date', 'display_order')

