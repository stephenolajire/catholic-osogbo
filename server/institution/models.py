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


class InstitutionCategory(BaseModel):
    """Top-level institution category (Education, Healthcare, Formation, etc.)"""
    name = models.CharField(max_length=255)
    category_key = models.SlugField(unique=True, help_text="URL-friendly key (e.g., 'education')")
    description = models.TextField()
    image = CloudinaryField('image', folder='institutions/categories/', blank=True)
    display_order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "Institution Category"
        verbose_name_plural = "Institution Categories"
        ordering = ['display_order', 'name']

    def __str__(self):
        return self.name


class InstitutionSubcategory(BaseModel):
    """Mid-level subcategory (e.g., Primary, Secondary, Tertiary under Education)"""
    category = models.ForeignKey(
        InstitutionCategory,
        on_delete=models.CASCADE,
        related_name='subcategories'
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    hero_image = CloudinaryField('hero_image', folder='institutions/subcategories/', blank=True)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Institution Subcategory"
        verbose_name_plural = "Institution Subcategories"
        ordering = ['display_order', 'name']
        unique_together = ('category', 'name')

    def __str__(self):
        return f"{self.category.name} - {self.name}"


class Institution(BaseModel):
    """Individual institution (school, hospital, etc.)"""
    subcategory = models.ForeignKey(
        InstitutionSubcategory,
        on_delete=models.CASCADE,
        related_name='institutions'
    )
    name = models.CharField(max_length=255)
    description = models.TextField()
    address = models.TextField()
    phone_number = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    
    # Leadership
    principal_name = models.CharField(max_length=255, blank=True, help_text="Principal/Director name")
    principal_title = models.CharField(max_length=100, blank=True, default="Principal")
    
    # Details
    image = CloudinaryField('image', folder='institutions/', blank=True)
    established_year = models.IntegerField(blank=True, null=True)
    staff_count = models.PositiveIntegerField(blank=True, null=True)
    student_count = models.PositiveIntegerField(blank=True, null=True)
    operating_hours = models.CharField(max_length=255, blank=True, help_text="e.g., '8:00 AM - 4:00 PM'")
    
    # Additional
    mission_statement = models.TextField(blank=True)
    facilities = models.TextField(blank=True, help_text="Comma-separated list of facilities")
    contact_person = models.CharField(max_length=255, blank=True)
    is_featured = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Institution"
        verbose_name_plural = "Institutions"
        ordering = ['display_order', 'name']

    def __str__(self):
        return f"{self.name} ({self.subcategory.category.name})"

