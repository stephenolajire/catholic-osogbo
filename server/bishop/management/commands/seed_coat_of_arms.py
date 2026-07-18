from django.core.management.base import BaseCommand
from bishop.models import CoatOfArm, CoatOfArmItem


class Command(BaseCommand):
    help = "Seed the database with the Bishop's coat of arms information"

    def handle(self, *args, **options):
        # Check if coat of arms already exists
        if CoatOfArm.objects.filter(title="The Coat of Arms of the Diocese of Osogbo").exists():
            self.stdout.write(
                self.style.WARNING("Coat of Arms already exists. Skipping seed.")
            )
            return

        # Create the main coat of arms entry
        coat_of_arm = CoatOfArm.objects.create(
            title="The Coat of Arms of the Diocese of Osogbo",
            description="The Bishop's coat of arms consists of a shield with its symbols, a scroll with the Bishop's motto, and the external ornaments. Each element carries profound spiritual and cultural significance, representing the mission and values of the Diocese of Osogbo.",
            is_active=True,
            display_order=1,
        )
        self.stdout.write(
            self.style.SUCCESS(f"✓ Created: {coat_of_arm.title}")
        )

        # Create coat of arms items
        items_data = [
            {
                "item_name": "The Pelican Ring",
                "explanation": "Prominently situated in the upper central part of the shield is a golden ring enclosing a bleeding pelican, feeding her young ones in a nest. The nest is a representation of the Church community that includes innumerable people who are vulnerable and are in need of spiritual and material succour. The bleeding pelican, who has to cut her veins to feed the young ones with her own blood, reminds us of the model of leadership given by Jesus Christ, who, like the pelican gave himself to death so that we can have life and have it in abundance (John 10:10).\n\nThe idea of the pelican provokes not only a sentiment of self-sacrifice, but also a strong idea of the family, an impeccable leadership virtue, and a zealous concern for the wellbeing of every member of the community. Thus, the Bishop intends the Diocese of Osogbo to be a family guided by the merits of the sacrifice of Christ on the cross (expressed by the image of the cross behind the adult pelican), and a community where, following in the footsteps of Christ, all the members of the diocesan community would recognize the challenge of caring for one another - especially for the most vulnerable and needy.\n\nThe red background in the ring calls to mind the blood of the martyrs from whom we learn what it means to be CHRISTLIKE and receive all the virtues to continue the mission of Christ in the world.",
                "display_order": 1,
            },
            {
                "item_name": "The Wavy Bars",
                "explanation": "Below the pelican ring are wavy bars in green and white, which represent a river, the symbol of the State of Osun - popularly referred to as the State of the living spring. So, in the spirit of the Church's mission of bringing all to Christ and Christ to all, the intention of imbuing all facets of human existence in our geographical location with the virtues of Jesus Christ, the SPRING OF LIVING WATER is clearly established.\n\nThese wavy bars represent the Diocese's commitment to fulfilling the Church's universal mission while deeply rooted in the cultural and geographical context of Osun State, acknowledging the spiritual significance of water as a symbol of life and renewal.",
                "display_order": 2,
            },
            {
                "item_name": "The Green Shield",
                "explanation": "The choice of green as the predominant colour for the shield is occasioned first and foremost by the heraldry tradition, where it connotes GROWTH and HOPE, and also by the cultural significance it has for us as Nigerians. So, imbuing our culture with salvific values of Christ, it is our HOPE that, under the maternal guide of the Church, we shall grow progressively into the full image of Christ, and we may be bold to say to others with St. Paul: \"Imitate me as I imitate Christ\" (1 Cor. 11:1).\n\nGreen represents not only the hope we have in Christ but also the continuous growth and development we seek as a diocesan community, grounded in Nigerian cultural values and enriched by Gospel virtues.",
                "display_order": 3,
            },
            {
                "item_name": "The Episcopal Motto",
                "explanation": "Called to the Episcopal service during the Jubilee Year of Mercy, the Bishop has chosen as his motto: \"CHRISTLIKE - BÍ KRÍSTÌ\". This reminds us of Phil. 2:5 - \"The attitude you should have is the one that Christ had\". Thus, as Christ is the perfect expression of the invisible God, the motto is a challenge to give an appropriate response to the admonition in Mt. 5:48 - \"Be perfect as your heavenly Father is perfect\".\n\nThis shall be done by becoming ambassadors of Christ (cf. 2 Cor. 5:20); constituting within the ambient of our day-to-day activities, practices that are expressive of Christ's love, selfless sacrifice, humility, unity and quest for the salvation of all men. The motto encapsulates the core mission and spiritual aspiration of the Diocese of Osogbo.",
                "display_order": 4,
            },
            {
                "item_name": "The External Ornaments",
                "explanation": "The coat of arms is completed with the external ornaments, which consist of the symbol of episcopal dignity - a golden episcopal processional cross that is placed at the back of the shield extending above and below the shield. The five red spots on the cross represent both the five piercing wounds Jesus suffered during the crucifixion and the pain and hardship that come the way of those who are striving to be CHRISTLIKE.\n\nIt also contains the heraldic insignia of a prelate of the rank of a bishop, the green pontifical galero (hat) with its six tassels, in three rows on either side of the shield - all in green. These ornaments signify the Bishop's role as a spiritual leader called to shepherd the flock of Christ, bearing witness to His Passion and exemplifying the sacrificial love He demands of His followers.",
                "display_order": 5,
            },
        ]

        for item_data in items_data:
            item = CoatOfArmItem.objects.create(
                coat_of_arm=coat_of_arm,
                **item_data,
            )
            self.stdout.write(
                self.style.SUCCESS(f"  ✓ Added item: {item.item_name}")
            )

        self.stdout.write(
            self.style.SUCCESS(
                f"\n✅ Successfully seeded coat of arms with {len(items_data)} items"
            )
        )
