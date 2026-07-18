from django.db import models
from django.utils import timezone
from cloudinary.models import CloudinaryField


class BaseModel(models.Model):
    """Abstract base model with common fields"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class LayLeader(BaseModel):
    """Leadership members in lay associations"""
    ROLE_CHOICES = [
        ('chaplain', 'Chaplain'),
        ('president', 'President'),
        ('vice_president', 'Vice President'),
        ('secretary', 'Secretary'),
        ('treasurer', 'Treasurer'),
        ('pro', 'PRO (Public Relations Officer)'),
        ('coordinator', 'Coordinator'),
        ('other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    parish = models.CharField(max_length=255, blank=True)
    deanery = models.CharField(max_length=255, blank=True)
    image = CloudinaryField('image', folder='lay-leaders/', blank=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    tenure = models.CharField(
        max_length=255,
        blank=True,
        help_text="e.g., '2024 - 2026'"
    )
    bio = models.TextField(blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Lay Leader"
        verbose_name_plural = "Lay Leaders"
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_role_display()})"


class LayAssociation(BaseModel):
    """Lay associations and societies in the diocese"""
    CATEGORY_CHOICES = [
        ('youth', 'Youth'),
        ('men', 'Men'),
        ('women', 'Women'),
        ('apostolate', 'Apostolate'),
        ('devotional', 'Devotional'),
    ]

    name = models.CharField(max_length=255)
    acronym = models.CharField(max_length=50, blank=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.TextField()
    patron_saint = models.CharField(max_length=255, blank=True)
    meeting_schedule = models.TextField(blank=True, help_text="e.g., 'First Sunday of the month at 3 PM'")
    image = CloudinaryField('image', folder='associations/', blank=True)
    
    chaplain = models.ForeignKey(
        LayLeader,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='chaplain_for_associations'
    )
    officers = models.ManyToManyField(
        LayLeader,
        related_name='officer_in_associations',
        blank=True
    )
    
    meeting_venue = models.CharField(max_length=255, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    contact_email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    
    membership_count = models.PositiveIntegerField(blank=True, null=True)
    founded_year = models.IntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Lay Association"
        verbose_name_plural = "Lay Associations"
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Project(BaseModel):
    """Diocesan projects and initiatives"""
    CATEGORY_CHOICES = [
        ('infrastructure', 'Infrastructure'),
        ('education', 'Education'),
        ('healthcare', 'Healthcare'),
        ('evangelization', 'Evangelization'),
        ('social_welfare', 'Social Welfare'),
        ('youth', 'Youth'),
    ]

    STATUS_CHOICES = [
        ('planned', 'Planned'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('on_hold', 'On Hold'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    
    parish = models.CharField(max_length=255, blank=True)
    deanery = models.CharField(max_length=255, blank=True)
    location = models.TextField(blank=True)
    
    image = CloudinaryField('image', folder='projects/', blank=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    
    budget = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    progress = models.IntegerField(default=0, help_text="0-100 percentage")
    
    project_lead = models.CharField(max_length=255, blank=True)
    contact_phone = models.CharField(max_length=20, blank=True)
    contact_email = models.EmailField(blank=True)
    
    objectives = models.TextField(blank=True)
    achievements = models.TextField(blank=True)
    
    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Project"
        verbose_name_plural = "Projects"
        ordering = ['-start_date', 'display_order']

    def __str__(self):
        return f"{self.title} ({self.get_status_display()})"

