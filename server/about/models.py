from django.db import models
from cloudinary_storage.storage import MediaCloudinaryStorage

storage = MediaCloudinaryStorage()


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class CoatOfArms(BaseModel):
    hero_image = models.ImageField(
        upload_to="about/coat_of_arms_heroes/",
        storage=storage,
        blank=True,
        null=True,
    )
    coat_of_arm_image = models.ImageField(
        upload_to="about/coat_of_arms/",
        storage=storage,
        blank=True,
        null=True,
    )
    title = models.CharField(max_length=255, default="Coat of Arms")
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Coat of Arms"
        verbose_name_plural = "Coats of Arms"
        ordering = ["-created_at"]


class CoatOfArmsItem(BaseModel):
    coat_of_arms = models.ForeignKey(
        CoatOfArms, on_delete=models.CASCADE, related_name="items"
    )
    item_name = models.CharField(max_length=255)
    item_image = models.ImageField(
        upload_to="about/coat_of_arms_items/",
        storage=storage,
        blank=True,
        null=True,
    )
    explanation = models.TextField()
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.coat_of_arms.title} - {self.item_name}"

    class Meta:
        ordering = ["order"]
        verbose_name = "Coat of Arms Item"
        verbose_name_plural = "Coat of Arms Items"


class LocalOrdinary(BaseModel):
    hero_image = models.ImageField(
        upload_to="about/local_ordinary_heroes/",
        storage=storage,
        blank=True,
        null=True,
    )
    bishop_image = models.ImageField(
        upload_to="about/local_ordinary_bishops/",
        storage=storage,
        blank=True,
        null=True,
    )
    title = models.CharField(max_length=255, default="Local Ordinary")
    full_text = models.TextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Local Ordinary"
        verbose_name_plural = "Local Ordinaries"
        ordering = ["-created_at"]
