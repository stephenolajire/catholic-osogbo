from django.db import models
from django.utils import timezone
from cloudinary.models import CloudinaryField


class BaseModel(models.Model):
    """Abstract base model with common fields"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Priest(BaseModel):
    """Clergy members - priests and deacons"""
    PRIEST_ROLE_CHOICES = [
        ('bishop', 'Bishop'),
        ('vicar_general', 'Vicar General'),
        ('parish_priest', 'Parish Priest'),
        ('assistant_priest', 'Assistant Priest'),
        ('chaplain', 'Chaplain'),
        ('deacon', 'Deacon'),
    ]

    name = models.CharField(max_length=255)
    role = models.CharField(max_length=30, choices=PRIEST_ROLE_CHOICES)
    parish = models.CharField(max_length=255, blank=True, help_text="Parish name or assignment")
    deanery = models.CharField(max_length=255, blank=True)
    image = CloudinaryField('image', folder='priests/', blank=True)
    bio = models.TextField(blank=True)
    ordained_year = models.IntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    phone = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Priest"
        verbose_name_plural = "Priests"
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.get_role_display()})"


class CoatOfArm(BaseModel):
    """Diocesan Coat of Arms with items and explanations"""
    title = models.CharField(max_length=255, default="Coat of Arms")
    hero_image = CloudinaryField('hero_image', folder='bishops/coat-of-arm/', blank=True)
    coat_of_arm_image = CloudinaryField('coat_of_arm_image', folder='bishops/coat-of-arm/', blank=False)
    description = models.TextField(blank=True, help_text="General description of the coat of arms")
    is_active = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Coat of Arms"
        verbose_name_plural = "Coat of Arms"
        ordering = ['display_order']

    def __str__(self):
        return self.title


class CoatOfArmItem(BaseModel):
    """Individual items/elements in the coat of arms"""
    coat_of_arm = models.ForeignKey(
        CoatOfArm,
        on_delete=models.CASCADE,
        related_name='items'
    )
    item_name = models.CharField(max_length=255)
    explanation = models.TextField()
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Coat of Arm Item"
        verbose_name_plural = "Coat of Arm Items"
        ordering = ['coat_of_arm', 'display_order']

    def __str__(self):
        return f"{self.coat_of_arm.title} - {self.item_name}"


class LocalOrdinary(BaseModel):
    """Information about the Local Ordinary (Bishop)"""
    title = models.CharField(max_length=255, default="Local Ordinary")
    hero_image = CloudinaryField('hero_image', folder='bishops/local-ordinary/', blank=True)
    bishop_image = CloudinaryField('bishop_image', folder='bishops/local-ordinary/', blank=True)
    text = models.TextField(help_text="Biography and information about the Local Ordinary")
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Local Ordinary"
        verbose_name_plural = "Local Ordinaries"
        ordering = ['-created_at']

    def __str__(self):
        return self.title


class BishopMessage(BaseModel):
    """Bishop messages and communications"""
    title = models.CharField(max_length=255)
    excerpt = models.CharField(max_length=500)
    full_message = models.TextField()
    image = CloudinaryField('image', folder='bishops/messages/', blank=True)
    date = models.DateTimeField(default=timezone.now)
    category = models.CharField(max_length=100, default="Bishop's Message")
    is_active = models.BooleanField(default=True)
    featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Bishop Message"
        verbose_name_plural = "Bishop Messages"
        ordering = ['-date', '-display_order']

    def __str__(self):
        return self.title
