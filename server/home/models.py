from django.db import models
from django.core.validators import URLValidator
from django.utils import timezone
from cloudinary.models import CloudinaryField


class BaseModel(models.Model):
    """Abstract base model with common fields"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Greeting(BaseModel):
    """Bishop or leader greeting on home page"""
    welcome_title = models.CharField(max_length=255)
    welcome_text = models.TextField()
    bishop_name = models.CharField(max_length=255)
    bishop_title = models.CharField(max_length=255, default="Bishop")
    bishop_image = CloudinaryField('bishop_image', folder='bishops/', blank=True)
    signature = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Greeting"
        verbose_name_plural = "Greetings"
        ordering = ['-created_at']

    def __str__(self):
        return f"Greeting from {self.bishop_name}"


class Reading(models.Model):
    """Represents a scripture reading with reference and text"""
    reference = models.CharField(max_length=255)
    text = models.TextField()

    class Meta:
        abstract = True


class DailyReading(BaseModel):
    """Daily liturgical readings and reflections"""
    title = models.CharField(max_length=255)
    date = models.DateField(default=timezone.now)
    
    first_reading_reference = models.CharField(max_length=255, blank=True)
    first_reading_text = models.TextField(blank=True)
    
    second_reading_reference = models.CharField(max_length=255, blank=True)
    second_reading_text = models.TextField(blank=True)
    
    responsorial_psalm_reference = models.CharField(max_length=255)
    responsorial_psalm_text = models.TextField()
    
    gospel_reference = models.CharField(max_length=255)
    gospel_text = models.TextField()
    
    reflection = models.TextField()

    class Meta:
        verbose_name = "Daily Reading"
        verbose_name_plural = "Daily Readings"
        ordering = ['-date']
        unique_together = ('date',)

    def __str__(self):
        return f"Reading for {self.date}"


class Hero(BaseModel):
    """Hero section content and images"""
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True)
    description = models.TextField()
    image = CloudinaryField('image', folder='heroes/', blank=False, null=False)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Hero"
        verbose_name_plural = "Heroes"
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return self.title


class DiscoverMessage(BaseModel):
    """Discover/Inspire message cards"""
    title = models.CharField(max_length=255)
    excerpt = models.CharField(max_length=500)
    full_message = models.TextField()
    image = CloudinaryField('image', folder='discover/', blank=True)
    date = models.DateTimeField(default=timezone.now)
    category = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Discover Message"
        verbose_name_plural = "Discover Messages"
        ordering = ['-date']

    def __str__(self):
        return self.title


class RecentNews(BaseModel):
    """News items for home page"""
    title = models.CharField(max_length=255)
    excerpt = models.CharField(max_length=500)
    image = CloudinaryField('image', folder='news/', blank=True)
    date = models.DateTimeField(default=timezone.now)
    category = models.CharField(max_length=100)
    link = models.URLField(blank=True)
    full_content = models.TextField(blank=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Recent News"
        verbose_name_plural = "Recent News"
        ordering = ['-date']

    def __str__(self):
        return self.title


class RecentSermon(BaseModel):
    """Sermon/message content"""
    title = models.CharField(max_length=255)
    preacher = models.CharField(max_length=255)
    date = models.DateTimeField(default=timezone.now)
    excerpt = models.CharField(max_length=500)
    image = CloudinaryField('image', folder='sermons/', blank=True)
    link = models.URLField(blank=True)
    full_message = models.TextField(blank=True)
    video_url = models.URLField(blank=True)
    series = models.CharField(max_length=255, blank=True)

    class Meta:
        verbose_name = "Recent Sermon"
        verbose_name_plural = "Recent Sermons"
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} by {self.preacher}"


class UpcomingEvent(BaseModel):
    """Upcoming events and activities"""
    title = models.CharField(max_length=255)
    location = models.CharField(max_length=500)
    date = models.DateTimeField()
    time = models.TimeField(blank=True, null=True)
    description = models.TextField()
    image = CloudinaryField('image', folder='events/', blank=True)
    registration_link = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Upcoming Event"
        verbose_name_plural = "Upcoming Events"
        ordering = ['date']

    def __str__(self):
        return f"{self.title} - {self.date.strftime('%Y-%m-%d')}"


class GalleryImage(BaseModel):
    """Gallery images for home page"""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = CloudinaryField('image', folder='gallery/', blank=True)
    category = models.CharField(max_length=100, blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Gallery Image"
        verbose_name_plural = "Gallery Images"
        ordering = ['display_order', '-created_at']

    def __str__(self):
        return self.title


# Diocesan Structure Models

class Deanery(BaseModel):
    """Deanery - administrative division of diocese"""
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    deanery_code = models.CharField(max_length=50, unique=True, blank=True)
    dean_name = models.CharField(max_length=255, blank=True)
    dean_phone = models.CharField(max_length=20, blank=True)
    dean_email = models.EmailField(blank=True)
    headquarters_address = models.TextField(blank=True)
    image = CloudinaryField('image', folder='deaneries/', blank=True)
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Deanery"
        verbose_name_plural = "Deaneries"
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name


class Parish(BaseModel):
    """Parish - local faith community"""
    PARISH_STATUS_CHOICES = [
        ('active', 'Active'),
        ('mission', 'Mission'),
        ('merged', 'Merged'),
        ('closed', 'Closed'),
    ]

    deanery = models.ForeignKey(
        Deanery,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='parishes'
    )
    name = models.CharField(max_length=255)
    address = models.TextField()
    city = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    image = CloudinaryField('image', folder='parishes/', blank=True)
    
    priest_in_charge = models.CharField(max_length=255, blank=True)
    mass_schedule = models.TextField(blank=True, help_text="e.g., 'Sunday: 8 AM, 10 AM, 6 PM'")
    
    established_year = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=PARISH_STATUS_CHOICES, default='active')
    parishioners_count = models.PositiveIntegerField(blank=True, null=True)
    is_cathedral = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Parish"
        verbose_name_plural = "Parishes"
        ordering = ['deanery', 'display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_status_display()})"

