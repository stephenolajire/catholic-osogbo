from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta
from bishop.models import BishopMessage


class Command(BaseCommand):
    help = "Seed bishop messages with meaningful and lengthy content"

    def handle(self, *args, **options):
        messages = [
            {
                "title": "Easter Message to the Faithful",
                "excerpt": "As we celebrate the resurrection of our Lord, let us renew our commitment to live the Gospel with joy and courage in our daily lives.",
                "full_message": """Dear brothers and sisters in Christ,

The resurrection of our Lord Jesus Christ is the cornerstone of our faith. As we gather this Easter season, we are reminded that death has been conquered and new life has been given to all who believe. This is not merely a historical commemoration, but a living reality that transforms our very existence and calls us to a radical conversion of heart.

In these challenging times, when despair threatens to overwhelm us and divisions threaten to tear apart the fabric of our communities, the message of Easter rings louder than ever. We are called not merely to celebrate a historical event, but to live as resurrection people — people of hope, of joy, and of radical love. The risen Christ stands before us as a sign that no human darkness, no matter how deep or overwhelming, can ultimately triumph over the light of God's love.

I urge each of you to carry the light of Christ into your homes, your workplaces, and your communities. Let your lives be a testament to the transforming power of God's love. Visit the sick, comfort the grieving, welcome the stranger as Christ himself. Show mercy to those who have wronged you, just as the Father showed mercy to us in Christ.

May the peace of the risen Lord be with you and your families always. May we go forth from this celebration with renewed commitment to live the Gospel in its fullness.

Yours in Christ's service,
Most Rev. John Akin Oyejola""",
                "category": "Bishop's Message",
                "featured": True,
                "date_offset": 0,
            },
            {
                "title": "On the Sanctity of Family Life",
                "excerpt": "The family remains the fundamental unit of society and the domestic church. We must guard and nurture it with prayer, sacrifice, and unconditional love.",
                "full_message": """Dear faithful of the Diocese of Osogbo,

The family is under unprecedented attack in our modern world — through materialism, individualism, and a culture that prizes convenience over commitment, pleasure over responsibility. Yet, the Church has always maintained that the family is the domestic church, the first school of faith, and the fundamental cell of society. It is within the family that each person learns what it means to be loved unconditionally, to sacrifice for others, and to encounter the living God.

As your bishop, I call on all parents to take seriously your role as the first evangelisers of your children. This is not a burden, but a profound privilege and responsibility. Pray together as a family. Read the scriptures together. Attend Mass together. These are not optional extras — they are the lifeblood of a healthy Christian family and the foundation upon which everything else is built.

To young couples, I say this: your marriage is not merely a contract between two people, subject to dissolution when feelings fade. It is a covenant with God, a reflection of Christ's love for His Church, which is sacrificial, unconditional, and eternal. Invest in it. Protect it. Seek help when you struggle. Do not let the poisons of our culture — infidelity, divorce, contraception — destroy what God has joined together.

To single adults, you are not called to live lives of despair or desperation. Your celibacy, whether temporary or permanent, is a gift that calls you to a deeper union with Christ and to generous service of His Church and the poor.

Our diocesan family life commission stands ready to support every family in our diocese. Do not hesitate to reach out. We offer marriage preparation, marriage enrichment, and counselling services.

In faith and hope,
Most Rev. John Akin Oyejola""",
                "category": "Pastoral Letter",
                "featured": False,
                "date_offset": 20,
            },
            {
                "title": "Year of Prayer — A Call to Deeper Faith",
                "excerpt": "This year, I invite every parish, every family, and every soul in our diocese to commit to a deeper, more intentional life of prayer.",
                "full_message": """My dear people,

Prayer is the breath of the soul. Without it, we wither spiritually, even if we appear to flourish outwardly. Prayer is not a luxury reserved for priests and religious; it is the essential foundation upon which every Christian life must be built. The Lord himself withdrew to lonely places to pray, and if the Son of God found it necessary, how much more do we?

I am declaring this year in our diocese as the Year of Prayer. This is not a mere administrative decision, but a heartfelt call born from my deep concern for the spiritual health of this flock entrusted to my care. I am asking every parish to establish or reinvigorate an adoration chapel where the Blessed Sacrament is exposed for the faithful to visit and pray. I am asking every family to set aside at least fifteen minutes each day for prayer together — prayer that includes the rosary, the examination of conscience, and intercessory prayer for the needs of our world. I am asking every individual to commit to a daily examination of conscience, that ancient practice of reviewing the day in the light of God's word.

Prayer is not passive. It is warfare. It is the most powerful weapon we have against the forces of darkness, division, and despair that threaten our communities and our world. Through prayer, we align ourselves with God's will and become instruments of His healing and reconciliation.

Let us rise to this call. The Diocese of Osogbo will be known as a praying diocese — a people who have turned back to the source of all grace and truth.

In prayer and solidarity,
Most Rev. John Akin Oyejola""",
                "category": "Pastoral Letter",
                "featured": False,
                "date_offset": 40,
            },
            {
                "title": "Advent Reflection: Waiting in Hope",
                "excerpt": "Advent invites us to slow down, to wait, and to hope. In a world obsessed with speed, let us reclaim the sacred art of expectant waiting.",
                "full_message": """Dear brothers and sisters,

Advent is profoundly countercultural. The world around us rushes toward Christmas with noise, consumption, and frantic activity, while the Church invites us into silence, waiting, and longing. Advent calls us to remember that the coming of Christ is not merely a past event to be celebrated, but an ongoing reality of His presence with us and a promise of His final coming in glory.

This Advent, I invite you to resist the rush of our culture. Create space in your days for quiet. Light the Advent candles slowly and deliberately, reflecting on the themes of hope, love, joy, and peace. Read the prophecies of Isaiah and let them sink deep into your soul. Attend daily Mass if possible. Spend time in adoration before the Blessed Sacrament.

The coming of Christ at Christmas is not merely a historical commemoration of an event that happened long ago. It is a promise of His coming again in our daily lives, in the Eucharist where He is truly present, and at the end of time when He will judge the living and the dead. We are an Advent people, always living in the tension between the already and the not yet, between the redemption Christ has already accomplished and the fullness of redemption that is still to come.

May this Advent season renew in you a living hope — not the false hope of the world, which is built on sand, but the hope that comes from knowing that our Redeemer lives and that His kingdom will have no end.

With paternal affection,
Most Rev. John Akin Oyejola""",
                "category": "Reflection",
                "featured": False,
                "date_offset": 60,
            },
            {
                "title": "Homily: The Good Shepherd Sunday",
                "excerpt": "On this Good Shepherd Sunday, we reflect on the profound image of Christ as the shepherd who knows each sheep by name and lays down his life for them.",
                "full_message": """Dear friends in Christ,

Today the Church gives us the beautiful image of the Good Shepherd. In a world filled with noise, confusion, and competing voices — voices that seek to draw us away from truth, from love, from God — this image speaks powerfully to the deepest hunger of the human heart — the desire to be known, to be loved unconditionally, and to be led to pastures where we will find true rest and fulfillment.

Christ says: I am the good shepherd. I know my sheep and my sheep know me. This is not a distant, administrative knowledge based on records and statistics. This is intimate, personal knowledge. He knows your name. He knows your struggles, your temptations, your fears, your failures. He knows the secrets of your heart that you have hidden even from those closest to you. And still He loves you with an everlasting love. He knows when you wander from the path, and He comes seeking you like the shepherd who leaves the ninety-nine to search for the one who is lost.

The Good Shepherd does not drive the flock with a whip or with force. He leads it by voice and example. He goes before us into every difficult terrain of life — illness, grief, failure, temptation — and He calls us to follow. His voice, heard in the scriptures, in the sacraments, and in the community of faith, is always a voice of invitation, never coercion.

Let us learn to recognise His voice today and every day. Let us respond to His call with generosity and faith.

Pax Christi,
Most Rev. John Akin Oyejola""",
                "category": "Homily",
                "featured": False,
                "date_offset": 80,
            },
            {
                "title": "Message for World Youth Day",
                "excerpt": "To the young people of our diocese: you are not the Church of tomorrow. You are the Church of today. Rise up and take your place.",
                "full_message": """Dear young people of the Diocese of Osogbo,

On the occasion of World Youth Day, I write to you with great affection and with great hope. Many people tell you that you are the Church of the future, and there is truth in that. But I tell you something more: you are the Church of today. The Church needs you right now, in this present moment. Your energy, your idealism, your creativity, your courage — these are not luxuries that can wait until you are older. They are needed urgently in this moment in history.

I know the pressures you face. I know about academic stress, unemployment, and the lure of a world that offers pleasure without purpose, excitement without substance, entertainment without meaning. I know the confusion about identity, about sexuality, about your place in this complex and often contradictory world. I know the doubts that come at night, the questions about faith, about God, about whether any of this really makes sense.

And yet I say to you: do not be afraid. These questions are not signs of weak faith — they are signs of a living faith, a faith that engages seriously with reality and refuses to accept easy answers. Bring your questions to Christ. Bring them to the community of the Church. You will not be judged for your questions. You will be embraced.

Come back to Mass. Come back to the sacraments. Come back to your community. We need you. More importantly, Christ needs you. He is calling you to something greater than you can imagine.

With great love,
Most Rev. John Akin Oyejola""",
                "category": "Bishop's Message",
                "featured": False,
                "date_offset": 100,
            },
            {
                "title": "Pastoral Letter on Catholic Education",
                "excerpt": "Our Catholic schools are not merely academic institutions — they are communities of faith where the whole person is formed in truth, virtue, and love.",
                "full_message": """Dear parents, teachers, and students of our Catholic schools,

Catholic education is one of the most precious gifts the Church offers to society. It is not merely an alternative to public education, but a distinctive approach to human formation that integrates academic excellence with spiritual development and moral formation. In our schools, we do not merely educate the mind — we form the whole person: intellectually, morally, spiritually, and socially.

I am proud of the progress our diocesan schools have made in recent years. Academic standards have risen. New facilities have been built. Dedicated teachers work long hours for modest compensation because they believe in the mission. But more importantly, the culture of faith in our schools remains vibrant. Students pray together. Teachers witness to Christ by their lives. The presence of Christ permeates our halls.

To parents: your children spend many hours in our schools, but they spend even more hours in your homes. Be partners with us in their formation. Reinforce at home what is taught in school. Live your faith visibly before them. Your example is more powerful than any words we could speak. Your fidelity to Sunday Mass, your generosity to the poor, your integrity in business and relationships — these teach your children far more than any lesson plan.

To teachers: yours is one of the most sacred vocations. You are called to be prophets in the modern world, witnessing to truth in an age of relativism, to hope in an age of despair, to love in an age of hatred. You touch the future every time you enter a classroom. Do not reduce your work to knowledge transfer — see it as accompaniment of young souls on their journey toward God and toward their fullest humanity.

To students: be proud of your Catholic identity. It is not a burden — it is a gift. Live it boldly and joyfully. Be not ashamed of the Gospel.

In faith and service,
Most Rev. John Akin Oyejola""",
                "category": "Pastoral Letter",
                "featured": False,
                "date_offset": 120,
            },
            {
                "title": "Living as Witnesses of Christ in a Secular World",
                "excerpt": "In a world that increasingly marginalizes faith, we are called to be bold witnesses to the reality of God's love and the transformative power of the Gospel.",
                "full_message": """Dear faithful,

We live in a world that is increasingly secular, where faith is seen as a private matter best kept silent in public discourse. The Gospel values are mocked. Traditional morality is ridiculed. Our young people are bombarded with messages that contradict everything we believe about human dignity, sexuality, marriage, and the value of life.

And yet we are called to be witnesses. Not aggressive preachers forcing our views on others, but living witnesses whose lives testify to the reality that God exists, that He loves us, and that following Christ leads to genuine happiness and fulfillment.

This witness takes many forms. It is the married couple who remains faithful to their vows in an age of casual divorce. It is the parent who brings their children to Mass even when it would be easier to sleep in. It is the worker who refuses to compromise their integrity for profit. It is the young person who chooses chastity and speaks truth about sexuality. It is the wealthy person who shares their wealth generously with the poor. It is the person who forgives those who have wronged them.

Do not underestimate the power of your witness. In a dark world, even a small light shines brightly. Your faithfulness, your courage, your love — these speak louder than any argument or theological treatise. Through your witness, Christ makes Himself present to the world.

In Christ's love,
Most Rev. John Akin Oyejola""",
                "category": "Reflection",
                "featured": False,
                "date_offset": 140,
            },
        ]

        created_count = 0
        for i, msg_data in enumerate(messages):
            date = timezone.now() - timedelta(days=msg_data["date_offset"])
            
            obj, created = BishopMessage.objects.get_or_create(
                title=msg_data["title"],
                defaults={
                    "excerpt": msg_data["excerpt"],
                    "full_message": msg_data["full_message"],
                    "category": msg_data["category"],
                    "featured": msg_data["featured"],
                    "date": date,
                    "is_active": True,
                    "display_order": i,
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f'✓ Created: "{obj.title}"')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'✗ Already exists: "{obj.title}"')
                )

        self.stdout.write(
            self.style.SUCCESS(f"\n✓ Successfully created {created_count} messages!")
        )
