from django.core.management.base import BaseCommand
from newsandevent.models import News, Podcast, Video
from django.utils import timezone


class Command(BaseCommand):
    help = "Seed the database with news, podcasts, and videos"

    def handle(self, *args, **options):
        # Seed News
        self.seed_news()
        
        # Seed Podcasts
        self.seed_podcasts()
        
        # Seed Videos
        self.seed_videos()

    def seed_news(self):
        """Seed news articles"""
        if News.objects.exists():
            self.stdout.write(
                self.style.WARNING("News already exists. Skipping seed.")
            )
            return

        news_data = [
            {
                "title": "Diocese Launches New Community Outreach Program",
                "excerpt": "The Diocese of Osogbo has launched a comprehensive community outreach initiative aimed at serving the poor and marginalized in our communities.",
                "full_content": """The Diocese of Osogbo has launched a comprehensive community outreach initiative aimed at serving the poor and marginalized in our communities.

Under the leadership of Most Rev. John Akinkunmi Oyejola, the Diocese is implementing new programs that focus on healthcare, education, and social welfare. These initiatives are designed to embody the Gospel's call to care for those in need.

The program includes:

1. Free Medical Clinics: Monthly health screenings and medical services in underserved areas
2. Educational Scholarships: Support for talented but financially disadvantaged students
3. Skills Training: Vocational programs to empower youth with marketable skills
4. Food Distribution: Regular food packages for families struggling with hunger
5. Pastoral Care: Spiritual guidance and counseling for the vulnerable

This holistic approach reflects the Diocese's commitment to integral human development. We believe that serving Christ means serving the least among us with compassion and dignity.

Parish leaders have expressed enthusiasm for these programs, and community members have begun to respond positively. We invite all faithful to participate in this mission by volunteering their time and talents.

For more information or to volunteer, please contact your local parish office.""",
                "category": "news",
                "featured": True,
                "display_order": 1,
            },
            {
                "title": "Diocesan Youth Day Scheduled for August",
                "excerpt": "Young people of the Diocese are invited to gather for a day of spiritual renewal, entertainment, and fellowship.",
                "full_content": """Young people of the Diocese are invited to gather for a day of spiritual renewal, entertainment, and fellowship at our upcoming Diocesan Youth Day.

Date: August 15, 2026
Time: 9:00 AM - 5:00 PM
Venue: St. Peter's Pastoral Center, Osogbo

The event features:

- Opening Mass with Most Rev. John Akinkunmi Oyejola
- Interactive workshops on faith and modern challenges
- Entertainment and cultural performances
- Sports and games
- Networking opportunities with young people from across the Diocese
- Closing ceremony with special recognition for young leaders

Cost: Free for all participants
Registration: Please register at your parish by August 1st

This is a wonderful opportunity to deepen your faith, make new friends, and discover your vocation. Whether you are considering religious life, marriage, or another calling, come and join us.

For questions, contact the Youth Ministry Office at youth@osogbodiocese.org""",
                "category": "event",
                "featured": True,
                "display_order": 2,
            },
            {
                "title": "New Parish Building Blessed and Opened",
                "excerpt": "The newly constructed St. Joseph Parish Church in Modakeke was officially blessed and opened for worship.",
                "full_content": """The newly constructed St. Joseph Parish Church in Modakeke was officially blessed and opened for worship on Sunday, July 14, 2026.

Most Rev. John Akinkunmi Oyejola presided over the blessing ceremony in the presence of numerous priests and thousands of faithful from surrounding parishes.

The modern facility boasts:

- Seating capacity of 2,000 worshippers
- Climate-controlled interior
- State-of-the-art sound and lighting systems
- Multiple meeting rooms for parish activities
- A dedicated adoration chapel
- Accessible facilities for persons with disabilities

The construction project, which began in 2023, was made possible through the generous contributions of parishioners and benefactors. The parish has mobilized considerable resources to ensure that the facility meets contemporary standards while maintaining traditional Catholic aesthetics.

Rev. Fr. Samuel Oladele, the Parish Priest, expressed gratitude for the completion of this landmark project. "This new church building is a testament to the faith and commitment of our parishioners. It will serve as a house of prayer for generations to come," he said.

The parish invites all members of the Catholic community to visit and experience this beautiful new sacred space.""",
                "category": "announcement",
                "featured": False,
                "display_order": 3,
            },
            {
                "title": "Vocations Retreat Inspires Young Seminarians",
                "excerpt": "The annual vocations retreat brought together young men discerning the call to priesthood.",
                "full_content": """The annual vocations retreat brought together young men discerning the call to priesthood and religious life. The three-day retreat, held at the Diocesan Seminary, focused on prayer, reflection, and pastoral formation.

Participants engaged in:

- Daily Mass and Eucharistic Adoration
- Meditations on the themes of vocation and discipleship
- Discussions with experienced priests and religious
- Spiritual direction sessions
- Recreational activities and fellowship

Rev. Fr. Patrick Awowole, Director of Seminarians, noted that the retreat provided a valuable opportunity for young men to deepen their understanding of religious vocations. "Many young people are responding to God's call in our Diocese. It's encouraging to see such fervor and dedication," he said.

The Diocese continues to emphasize vocations as a priority. Various programs are in place to accompany young people through their discernment process.

Anyone interested in learning more about seminarian life or the priesthood is encouraged to contact the Vocations Office.""",
                "category": "news",
                "featured": False,
                "display_order": 4,
            },
        ]

        for item in news_data:
            news = News.objects.create(**item)
            self.stdout.write(
                self.style.SUCCESS(f"✓ Created news: {news.title}")
            )

    def seed_podcasts(self):
        """Seed podcast episodes"""
        if Podcast.objects.exists():
            self.stdout.write(
                self.style.WARNING("Podcasts already exist. Skipping seed.")
            )
            return

        podcast_data = [
            {
                "title": "Understanding Catholic Faith - Episode 1",
                "description": "In this episode, we explore the fundamentals of Catholic theology and how it shapes our daily lives.",
                "spotify_link": "https://open.spotify.com/episode/podcast1",
                "duration_seconds": 1800,
                "featured": True,
                "display_order": 1,
            },
            {
                "title": "Saints and Their Virtues - St. Francis of Assisi",
                "description": "Learn about the life and teachings of St. Francis of Assisi, the patron saint of animals and the environment.",
                "spotify_link": "https://open.spotify.com/episode/podcast2",
                "duration_seconds": 2100,
                "featured": True,
                "display_order": 2,
            },
            {
                "title": "Living the Gospel Message in Modern Times",
                "description": "How can we apply Gospel values in a world focused on materialism and consumerism? This episode explores practical ways to live authentically.",
                "spotify_link": "https://open.spotify.com/episode/podcast3",
                "duration_seconds": 1650,
                "featured": False,
                "display_order": 3,
            },
            {
                "title": "Marriage and Family in the Church",
                "description": "Most Rev. John Akinkunmi Oyejola discusses the sacrament of matrimony and the importance of family in building strong communities.",
                "spotify_link": "https://open.spotify.com/episode/podcast4",
                "duration_seconds": 2400,
                "featured": False,
                "display_order": 4,
            },
            {
                "title": "Prayer: The Breath of the Soul",
                "description": "An in-depth discussion on different forms of prayer and how regular prayer can transform our spiritual lives.",
                "spotify_link": "https://open.spotify.com/episode/podcast5",
                "duration_seconds": 1950,
                "featured": False,
                "display_order": 5,
            },
        ]

        for item in podcast_data:
            podcast = Podcast.objects.create(**item)
            self.stdout.write(
                self.style.SUCCESS(f"✓ Created podcast: {podcast.title}")
            )

    def seed_videos(self):
        """Seed video content"""
        if Video.objects.exists():
            self.stdout.write(
                self.style.WARNING("Videos already exist. Skipping seed.")
            )
            return

        video_data = [
            {
                "title": "Welcome to the Diocese of Osogbo",
                "description": "An introduction to the Diocese of Osogbo and its mission of evangelization and pastoral care.",
                "video_link": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "duration_seconds": 300,
                "featured": True,
                "display_order": 1,
            },
            {
                "title": "Sunday Mass Celebration",
                "description": "Live Sunday Mass celebrated at St. Peter's Cathedral with Most Rev. John Akinkunmi Oyejola.",
                "video_link": "https://www.youtube.com/watch?v=livestream1",
                "duration_seconds": 3600,
                "featured": True,
                "display_order": 2,
            },
            {
                "title": "Diocesan Formation Programs",
                "description": "An overview of the various formation programs and opportunities available for spiritual growth within the Diocese.",
                "video_link": "https://www.youtube.com/watch?v=formation1",
                "duration_seconds": 480,
                "featured": False,
                "display_order": 3,
            },
            {
                "title": "Visiting the Shrine of Our Lady",
                "description": "A virtual tour of the Shrine of Our Lady within the Diocese, highlighting its spiritual significance.",
                "video_link": "https://www.youtube.com/watch?v=shrine1",
                "duration_seconds": 420,
                "featured": False,
                "display_order": 4,
            },
            {
                "title": "Catechesis on the Sacraments",
                "description": "Educational video explaining the seven sacraments of the Catholic Church and their importance in our faith.",
                "video_link": "https://www.youtube.com/watch?v=sacraments1",
                "duration_seconds": 1200,
                "featured": False,
                "display_order": 5,
            },
        ]

        for item in video_data:
            video = Video.objects.create(**item)
            self.stdout.write(
                self.style.SUCCESS(f"✓ Created video: {video.title}")
            )

        self.stdout.write(
            self.style.SUCCESS(
                "\n✅ Successfully seeded all news, podcasts, and videos"
            )
        )
