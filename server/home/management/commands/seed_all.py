from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta, date
from home.models import (
    Greeting, DailyReading, Hero, DiscoverMessage, 
    RecentNews, RecentSermon, UpcomingEvent, GalleryImage,
    Deanery, Parish
)
from bishop.models import Priest
from content.models import LayLeader, LayAssociation, Project


class Command(BaseCommand):
    help = 'Seed database with sample data for all models'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Starting data seeding...'))
        
        # Seed Deaneries
        self.seed_deaneries()
        
        # Seed Parishes
        self.seed_parishes()
        
        # Seed Greeting
        self.seed_greeting()
        
        # Seed Daily Reading
        self.seed_daily_reading()
        
        # Seed Heroes
        self.seed_heroes()
        
        # Seed Discover Messages
        self.seed_discover_messages()
        
        # Seed Recent News
        self.seed_recent_news()
        
        # Seed Recent Sermons
        self.seed_recent_sermons()
        
        # Seed Upcoming Events
        self.seed_upcoming_events()
        
        # Seed Gallery Images
        self.seed_gallery_images()
        
        # Seed Priests
        self.seed_priests()
        
        # Seed Lay Leaders
        self.seed_lay_leaders()
        
        # Seed Lay Associations
        self.seed_lay_associations()
        
        # Seed Projects
        self.seed_projects()
        
        self.stdout.write(self.style.SUCCESS('✓ Data seeding completed successfully!'))

    def seed_deaneries(self):
        """Seed Deanery data"""
        deaneries = [
            {
                'name': 'Osogbo Deanery',
                'deanery_code': 'DEAN-OSO-001',
                'description': 'Central deanery covering Osogbo and surrounding areas',
                'dean_name': 'Fr. Boniface Adekunle',
                'dean_phone': '+234 803 111 2222',
                'dean_email': 'dean.osogbo@osogbodiocese.org',
                'headquarters_address': '45 Cathedral Road, Osogbo'
            },
            {
                'name': 'Ijebu-Ijesa Deanery',
                'deanery_code': 'DEAN-IJE-002',
                'description': 'Deanery covering Ijebu-Ijesa region',
                'dean_name': 'Fr. Seun Adeyemi',
                'dean_phone': '+234 803 222 3333',
                'dean_email': 'dean.ijebu@osogbodiocese.org',
                'headquarters_address': 'St. John\'s Parish Hall, Ijebu-Ijesa'
            },
            {
                'name': 'Ilesha Deanery',
                'deanery_code': 'DEAN-ILE-003',
                'description': 'Deanery covering Ilesha metropolis',
                'dean_name': 'Fr. Philip Ogunwande',
                'dean_phone': '+234 803 333 4444',
                'dean_email': 'dean.ilesha@osogbodiocese.org',
                'headquarters_address': 'Holy Rosary Parish, Ilesha'
            },
        ]
        
        for deanery_data in deaneries:
            obj, created = Deanery.objects.get_or_create(
                deanery_code=deanery_data['deanery_code'],
                defaults=deanery_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Deanery - {obj.name}')

    def seed_parishes(self):
        """Seed Parish data"""
        deaneries = Deanery.objects.all()
        osogbo_deanery = deaneries.filter(name='Osogbo Deanery').first()
        ijebu_deanery = deaneries.filter(name='Ijebu-Ijesa Deanery').first()
        ilesha_deanery = deaneries.filter(name='Ilesha Deanery').first()
        
        parishes = [
            {
                'name': "St. Peter's Parish",
                'address': '123 Cathedral Street',
                'city': 'Osogbo',
                'deanery': osogbo_deanery,
                'priest_in_charge': 'Fr. John Okafor',
                'established_year': 1960,
                'status': 'active'
            },
            {
                'name': "St. Paul's Parish",
                'address': '45 Mission Road',
                'city': 'Ijebu-Ijesa',
                'deanery': ijebu_deanery,
                'priest_in_charge': 'Fr. David Adeyemi',
                'established_year': 1955,
                'status': 'active'
            },
            {
                'name': "St. John's Parish",
                'address': '67 Holy Avenue',
                'city': 'Ilesha',
                'deanery': ilesha_deanery,
                'priest_in_charge': 'Fr. Gabriel Oladele',
                'established_year': 1958,
                'status': 'active'
            },
            {
                'name': 'Holy Cross Parish',
                'address': '89 Church Lane',
                'city': 'Osogbo',
                'deanery': osogbo_deanery,
                'priest_in_charge': 'Fr. Michael Alabi',
                'established_year': 1975,
                'status': 'active'
            },
        ]
        
        for parish_data in parishes:
            obj, created = Parish.objects.get_or_create(
                name=parish_data['name'],
                city=parish_data['city'],
                defaults=parish_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Parish - {obj.name}')

    def seed_greeting(self):
        """Seed Bishop's Greeting"""
        greeting_data = {
            'welcome_title': 'Welcome from Our Bishop',
            'welcome_text': 'Dear Brethren,\n\nIt is with great joy and gratitude to Almighty God that I welcome you to our diocesan website. Our diocese stands as a beacon of faith, hope, and charity in our region.\n\nLet us continue to work together in service of our Lord Jesus Christ, spreading His message of love and redemption to all we encounter.\n\nMay God bless you abundantly.',
            'bishop_name': 'His Excellency, Bishop Samuel Osogbo',
            'bishop_title': 'Bishop of Osogbo Diocese',
            'bishop_image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/bishops/default.jpg',
            'signature': 'Bishop Samuel Osogbo',
            'is_active': True
        }
        
        obj, created = Greeting.objects.get_or_create(
            bishop_name=greeting_data['bishop_name'],
            defaults=greeting_data
        )
        status = 'Created' if created else 'Exists'
        self.stdout.write(f'  {status}: Greeting from {obj.bishop_name}')

    def seed_daily_reading(self):
        """Seed Daily Readings"""
        readings = [
            {
                'title': 'Daily Reading for Monday',
                'date': timezone.now().date(),
                'first_reading_reference': '1 Samuel 1:1-8',
                'first_reading_text': 'There was a certain man of Ramathaim, a Zuphite from the hill country of Ephraim...',
                'second_reading_reference': '1 Corinthians 15:1-8',
                'second_reading_text': 'Now I am reminding you, brothers, of the gospel I preached to you...',
                'responsorial_psalm_reference': 'Psalm 116',
                'responsorial_psalm_text': 'I love the Lord, for he heard my voice; he heard my cry for mercy.',
                'gospel_reference': 'Matthew 25:1-13',
                'gospel_text': 'Jesus said to his disciples: "At that time the kingdom of heaven will be like ten virgins..."',
                'reflection': 'Today we are reminded to always be prepared for the coming of our Lord.'
            }
        ]
        
        for reading_data in readings:
            obj, created = DailyReading.objects.get_or_create(
                date=reading_data['date'],
                defaults=reading_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Daily Reading - {obj.title}')

    def seed_heroes(self):
        """Seed Hero slides"""
        heroes = [
            {
                'title': 'Welcome to Our Diocese',
                'subtitle': 'Faith, Hope & Love',
                'description': 'Join us as we journey together in faith, serving God and our community with devotion and compassion.',
                'is_active': True,
                'display_order': 0
            },
            {
                'title': 'Growing Together in Christ',
                'subtitle': 'One Body, One Spirit',
                'description': 'Our parishes stand as pillars of community—places of worship, fellowship, and spiritual growth for all.',
                'is_active': True,
                'display_order': 1
            },
            {
                'title': 'Serving With Compassion',
                'subtitle': 'Ministry in Action',
                'description': 'From education to healthcare, our institutions exist to serve every soul entrusted to our care.',
                'is_active': True,
                'display_order': 2
            },
            {
                'title': 'Guided by the Shepherd',
                'subtitle': 'Pastoral Care & Spiritual Direction',
                'description': 'Under the leadership of our Bishop, we are committed to nurturing souls, strengthening families, and spreading the Gospel.',
                'is_active': True,
                'display_order': 3
            }
        ]
        
        for hero_data in heroes:
            obj, created = Hero.objects.get_or_create(
                title=hero_data['title'],
                defaults=hero_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Hero - {obj.title}')

    def seed_discover_messages(self):
        """Seed Discover/Inspire Messages"""
        messages = [
            {
                'title': 'The Power of Prayer',
                'excerpt': 'Discover how prayer transforms our spiritual journey.',
                'full_message': 'Prayer is the foundation of our faith. Through constant prayer, we draw closer to God and find strength in our daily challenges. Let us make prayer a central part of our lives.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/discover/prayer.jpg',
                'category': 'Spirituality',
                'is_active': True,
                'featured': True
            },
            {
                'title': 'Community Service',
                'excerpt': 'Learn about our community outreach programs.',
                'full_message': 'Our diocese is committed to serving the poorest and most marginalized in our society. Join us in making a difference in our community through charitable works.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/discover/service.jpg',
                'category': 'Charity',
                'is_active': True,
                'featured': True
            }
        ]
        
        for msg_data in messages:
            obj, created = DiscoverMessage.objects.get_or_create(
                title=msg_data['title'],
                defaults=msg_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Discover Message - {obj.title}')

    def seed_recent_news(self):
        """Seed Recent News"""
        news = [
            {
                'title': 'New Cathedral Building Project Launched',
                'excerpt': 'Diocese announces ambitious cathedral renovation project.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/news/cathedral.jpg',
                'category': 'Infrastructure',
                'link': '/news/cathedral-project',
                'is_featured': True
            },
            {
                'title': 'Diocesan Youth Conference 2026',
                'excerpt': 'Young people gather for spiritual renewal and fellowship.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/news/youth.jpg',
                'category': 'Youth',
                'link': '/news/youth-conference',
                'is_featured': False
            }
        ]
        
        for news_data in news:
            obj, created = RecentNews.objects.get_or_create(
                title=news_data['title'],
                defaults=news_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: News - {obj.title}')

    def seed_recent_sermons(self):
        """Seed Recent Sermons"""
        sermons = [
            {
                'title': 'Faith in Uncertain Times',
                'preacher': 'Bishop Samuel Osogbo',
                'excerpt': 'A powerful message about trusting in God during challenging periods.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/sermons/faith.jpg',
                'link': 'https://youtube.com/watch?v=dQw4w9WgXcQ'
            },
            {
                'title': 'The Way of Love',
                'preacher': 'Fr. John Okafor',
                'excerpt': 'Understanding Christ\'s command to love one another.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/sermons/love.jpg',
                'link': 'https://youtube.com/watch?v=dQw4w9WgXcQ'
            }
        ]
        
        for sermon_data in sermons:
            obj, created = RecentSermon.objects.get_or_create(
                title=sermon_data['title'],
                defaults=sermon_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Sermon - {obj.title}')

    def seed_upcoming_events(self):
        """Seed Upcoming Events"""
        today = timezone.now()
        events = [
            {
                'title': 'Diocesan Mass Celebration',
                'description': 'Join us for the monthly diocesan mass celebration.',
                'date': today + timedelta(days=7),
                'location': "St. Peter's Cathedral, Osogbo",
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/events/mass.jpg'
            },
            {
                'title': 'Youth Prayer Vigil',
                'description': 'A night of prayer and fellowship for young adults.',
                'date': today + timedelta(days=14),
                'location': 'Holy Cross Parish Hall',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/events/vigil.jpg'
            }
        ]
        
        for event_data in events:
            obj, created = UpcomingEvent.objects.get_or_create(
                title=event_data['title'],
                date=event_data['date'],
                defaults=event_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Event - {obj.title}')

    def seed_gallery_images(self):
        """Seed Gallery Images"""
        images = [
            {
                'title': 'Cathedral Interior',
                'description': 'Beautiful view of our cathedral interior.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/gallery/cathedral.jpg',
                'category': 'Places of Worship'
            },
            {
                'title': 'Community Outreach',
                'description': 'Our team serving the community.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/gallery/outreach.jpg',
                'category': 'Community Service'
            }
        ]
        
        for img_data in images:
            obj, created = GalleryImage.objects.get_or_create(
                title=img_data['title'],
                defaults=img_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Gallery Image - {obj.title}')

    def seed_priests(self):
        """Seed Priest/Clergy data"""
        parishes = Parish.objects.all()
        deaneries = Deanery.objects.all()
        
        st_peters = parishes.filter(name="St. Peter's Parish").first()
        st_pauls = parishes.filter(name="St. Paul's Parish").first()
        osogbo_deanery = deaneries.filter(name='Osogbo Deanery').first()
        ijebu_deanery = deaneries.filter(name='Ijebu-Ijesa Deanery').first()
        
        priests = [
            {
                'name': 'Fr. John Okafor',
                'role': 'parish_priest',
                'parish': st_peters,
                'deanery': osogbo_deanery,
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/priests/john.jpg',
                'bio': 'Fr. John has served in our diocese for 15 years with dedication and compassion.',
                'ordained_year': 2009,
                'is_active': True,
                'phone': '+234 803 456 7890',
                'email': 'fr.john@osogbodiocese.org'
            },
            {
                'name': 'Fr. David Adeyemi',
                'role': 'assistant_priest',
                'parish': st_pauls,
                'deanery': ijebu_deanery,
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/priests/david.jpg',
                'bio': 'Fr. David is a young priest committed to youth ministry.',
                'ordained_year': 2020,
                'is_active': True,
                'phone': '+234 803 456 7891',
                'email': 'fr.david@osogbodiocese.org'
            }
        ]
        
        for priest_data in priests:
            obj, created = Priest.objects.get_or_create(
                name=priest_data['name'],
                defaults=priest_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Priest - {obj.name}')

    def seed_lay_leaders(self):
        """Seed Lay Leaders"""
        leaders = [
            {
                'name': 'Mr. Emmanuel Olajire',
                'role': 'president',
                'email': 'emmanuel@example.com',
                'phone': '+234 803 456 7892'
            },
            {
                'name': 'Mrs. Grace Adeniyi',
                'role': 'secretary',
                'email': 'grace@example.com',
                'phone': '+234 803 456 7893'
            }
        ]
        
        for leader_data in leaders:
            obj, created = LayLeader.objects.get_or_create(
                name=leader_data['name'],
                defaults=leader_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Lay Leader - {obj.name}')

    def seed_lay_associations(self):
        """Seed Lay Associations"""
        associations = [
            {
                'name': 'Catholic Youth Organization',
                'acronym': 'CYO',
                'category': 'youth',
                'description': 'Organization for young Catholics in the diocese, promoting faith and community service.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/associations/youth.jpg',
                'patron_saint': 'St. John Bosco',
                'meeting_schedule': 'Second Sunday of the month at 4 PM',
                'meeting_venue': 'Cathedral Hall',
                'contact_phone': '+234 803 111 1111',
                'contact_email': 'cyo@osogbodiocese.org',
                'membership_count': 250,
                'founded_year': 1995,
                'is_active': True,
                'is_featured': True
            },
            {
                'name': "Women's Catholic Association",
                'acronym': 'WCA',
                'category': 'women',
                'description': 'Organization promoting women\'s role in the church and society through faith and charity.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/associations/women.jpg',
                'patron_saint': 'St. Mary',
                'meeting_schedule': 'Third Sunday of the month at 3 PM',
                'meeting_venue': 'St. Peter\'s Parish Hall',
                'contact_phone': '+234 803 222 2222',
                'contact_email': 'wca@osogbodiocese.org',
                'membership_count': 180,
                'founded_year': 1988,
                'is_active': True,
                'is_featured': True
            },
            {
                'name': "Men's Fellowship",
                'acronym': 'MF',
                'category': 'men',
                'description': 'Organization for Catholic men in spiritual growth and community development.',
                'image_url': 'https://res.cloudinary.com/lyz4bdgw/image/upload/v1234567890/associations/men.jpg',
                'patron_saint': 'St. Joseph',
                'meeting_schedule': 'First Saturday of the month at 10 AM',
                'meeting_venue': 'Holy Cross Parish',
                'contact_phone': '+234 803 333 3333',
                'contact_email': 'mf@osogbodiocese.org',
                'membership_count': 150,
                'founded_year': 2000,
                'is_active': True,
                'is_featured': False
            }
        ]
        
        for assoc_data in associations:
            obj, created = LayAssociation.objects.get_or_create(
                name=assoc_data['name'],
                defaults=assoc_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Lay Association - {obj.name}')

    def seed_projects(self):
        """Seed Projects"""
        today = date.today()
        projects = [
            {
                'title': 'School Building Project',
                'description': 'Construction of a new primary school in rural area.',
                'category': 'education',
                'status': 'ongoing',
                'start_date': today - timedelta(days=90),
                'end_date': today + timedelta(days=180),
                'budget': 50000000,
                'progress': 45,
                'location': 'Ijebu-Ijesa',
                'is_featured': True
            },
            {
                'title': 'Healthcare Initiative',
                'description': 'Mobile health clinic for rural communities.',
                'category': 'healthcare',
                'status': 'ongoing',
                'start_date': today - timedelta(days=30),
                'end_date': today + timedelta(days=330),
                'budget': 15000000,
                'progress': 20,
                'location': 'Osogbo Region',
                'is_featured': True
            },
            {
                'title': 'Orphanage Renovation',
                'description': 'Renovation and expansion of our orphanage facility.',
                'category': 'social_welfare',
                'status': 'planned',
                'start_date': today + timedelta(days=60),
                'end_date': today + timedelta(days=330),
                'budget': 25000000,
                'progress': 0,
                'location': 'Osogbo',
                'is_featured': False
            }
        ]
        
        for project_data in projects:
            obj, created = Project.objects.get_or_create(
                title=project_data['title'],
                defaults=project_data
            )
            status = 'Created' if created else 'Exists'
            self.stdout.write(f'  {status}: Project - {obj.title}')
