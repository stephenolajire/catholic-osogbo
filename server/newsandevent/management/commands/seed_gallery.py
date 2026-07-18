from django.core.management.base import BaseCommand
from newsandevent.models import GalleryEvent, GalleryImage


class Command(BaseCommand):
    help = "Seed the database with gallery events and images"

    def handle(self, *args, **options):
        if GalleryEvent.objects.exists():
            self.stdout.write(
                self.style.WARNING("Gallery events already exist. Skipping seed.")
            )
            return

        gallery_events_data = [
            {
                "title": "Pentecost Celebration 2024",
                "description": "A joyous celebration of Pentecost with the entire diocesan community in attendance.",
                "category": "Celebration",
                "featured": True,
                "display_order": 1,
                "image_count": 24,
            },
            {
                "title": "Youth Rally & Formation",
                "description": "Inspiring youth rally bringing together young Catholics for spiritual formation and fellowship.",
                "category": "Formation",
                "featured": True,
                "display_order": 2,
                "image_count": 18,
            },
            {
                "title": "Easter Sunday Mass",
                "description": "The most important celebration of the Christian calendar with solemn and joyous Mass.",
                "category": "Liturgy",
                "featured": False,
                "display_order": 3,
                "image_count": 32,
            },
            {
                "title": "Diocesan Pilgrimage",
                "description": "Spiritual journey and pilgrimage to holy sites bringing the faithful closer to God.",
                "category": "Pilgrimage",
                "featured": False,
                "display_order": 4,
                "image_count": 40,
            },
            {
                "title": "Christmas Nativity Play",
                "description": "Children and adults performed a beautiful retelling of the birth of Jesus Christ.",
                "category": "Community",
                "featured": False,
                "display_order": 5,
                "image_count": 28,
            },
            {
                "title": "Women's Retreat",
                "description": "Spiritual renewal and sisterhood gathering for women in the diocese.",
                "category": "Retreat",
                "featured": False,
                "display_order": 6,
                "image_count": 22,
            },
        ]

        for event_data in gallery_events_data:
            image_count = event_data.pop("image_count")
            
            gallery_event = GalleryEvent.objects.create(**event_data)
            self.stdout.write(
                self.style.SUCCESS(f"✓ Created gallery event: {gallery_event.title}")
            )

            # Create placeholder images for each event
            for i in range(image_count):
                GalleryImage.objects.create(
                    gallery_event=gallery_event,
                    title=f"{gallery_event.title} - Image {i+1}",
                    description=f"Photo {i+1} from {gallery_event.title}",
                    display_order=i,
                    is_active=True,
                )

            self.stdout.write(
                self.style.SUCCESS(f"  ✓ Added {image_count} images to event")
            )

        self.stdout.write(
            self.style.SUCCESS(
                "\n✅ Successfully seeded gallery events with images"
            )
        )
        self.stdout.write(
            self.style.WARNING(
                "\n📝 Note: Add cover and gallery images via Django admin at /admin/newsandevent/galleryevent/"
            )
        )
