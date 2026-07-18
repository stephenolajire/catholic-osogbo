from django.db import models
from cloudinary.models import CloudinaryField


class BaseModel(models.Model):
    """Abstract base model with common fields"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class News(BaseModel):
    """News and events articles"""
    title = models.CharField(max_length=500)
    excerpt = models.TextField(max_length=500)
    full_content = models.TextField()
    image = CloudinaryField('news_image', folder='news/', blank=True)
    date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(
        max_length=50,
        choices=[
            ('news', 'News'),
            ('event', 'Event'),
            ('announcement', 'Announcement'),
        ],
        default='news'
    )
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-date', '-display_order']
        verbose_name = "News"
        verbose_name_plural = "News"

    def __str__(self):
        return self.title


class Podcast(BaseModel):
    """Podcast episodes"""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = CloudinaryField('podcast_image', folder='podcasts/', blank=True)
    spotify_link = models.URLField()
    duration_seconds = models.IntegerField(default=0, help_text="Duration in seconds")
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-display_order', '-created_at']
        verbose_name = "Podcast"
        verbose_name_plural = "Podcasts"

    def __str__(self):
        return self.title


class Video(BaseModel):
    """Video content"""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    image = CloudinaryField('video_image', folder='videos/', blank=True)
    video_link = models.URLField()
    duration_seconds = models.IntegerField(default=0, help_text="Duration in seconds")
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-display_order', '-created_at']
        verbose_name = "Video"
        verbose_name_plural = "Videos"

    def __str__(self):
        return self.title


class GalleryEvent(BaseModel):
    """Gallery event or album"""
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    cover_image = CloudinaryField('gallery_cover', folder='gallery/', blank=True)
    date = models.DateTimeField(auto_now_add=True)
    category = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['-date', '-display_order']
        verbose_name = "Gallery Event"
        verbose_name_plural = "Gallery Events"

    def __str__(self):
        return self.title

    @property
    def image_count(self):
        """Get count of images in this gallery event"""
        return self.images.filter(is_active=True).count()


class GallerySetting(models.Model):
    """Global settings for the gallery section"""
    hero_image = CloudinaryField('gallery_hero', folder='gallery/', blank=True, help_text="Hero image for gallery page header")
    
    class Meta:
        verbose_name = "Gallery Setting"
        verbose_name_plural = "Gallery Settings"

    def __str__(self):
        return "Gallery Settings"

    def save(self, *args, **kwargs):
        """Ensure only one instance exists"""
        self.id = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        """Prevent deletion"""
        pass

    @classmethod
    def get_settings(cls):
        """Get or create the singleton instance"""
        settings, _ = cls.objects.get_or_create(id=1)
        return settings


class GalleryImage(BaseModel):
    """Image in a gallery event"""
    gallery_event = models.ForeignKey(
        GalleryEvent,
        on_delete=models.CASCADE,
        related_name='images'
    )
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    image = CloudinaryField('gallery_image', folder='gallery/images/')
    display_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['display_order', 'id']
        verbose_name = "Gallery Image"
        verbose_name_plural = "Gallery Images"

    def __str__(self):
        return f"{self.gallery_event.title} - {self.title or 'Image'}"
