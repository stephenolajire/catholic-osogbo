from django.core.management.base import BaseCommand
from bishop.models import LocalOrdinary


class Command(BaseCommand):
    help = "Seed the database with the Local Ordinary (Bishop) information"

    def handle(self, *args, **options):
        # Check if Local Ordinary already exists
        if LocalOrdinary.objects.filter(
            title="Most Rev. John Akinkunmi Oyejola"
        ).exists():
            self.stdout.write(
                self.style.WARNING("Local Ordinary already exists. Skipping seed.")
            )
            return

        # Create the Local Ordinary entry
        local_ordinary_text = """Most Rev. John Akinkunmi Oyejola, was born about Fifty-three years ago in Surulere, Lagos State, Nigeria to the family of Mr. Gabriel Omotayo Oyejoia and Modupelola-Coie Oyejola. He has two brothers and two sisters, with other half brothers and sisters as siblings of the same father. From infancy, precisely since he was three months old, he lived with his grandmother Mama Cecilia Ayetohun Iroko-Coie whom he grew up to know as mother.

He started his educational career from the Salvation Army Primary School, Iyun road Surulere Lagos between 1970-1976. His quest for Secondary education took him to Aawe High School from 1978 to 1983. He was accepted as a seminarian to be trained for the Catholic priesthood in 1983 by His Lordship Most. Rev. Julius Babatunde Adelakun, for the Catholic Diocese of Oyo. He proceeded to the then SS. Peter and Paul Major seminary, Ekpoma campus for his spiritual year programme.

On a successful completion of the spiritual year, he was admitted to SS. Peter and Paul Major Seminary, Bodija, Ibadan, where he studied Philosophy and Theology, from 1984-1991. He was ordained a Catholic priest by Bishop Julius Adelakun (the emeritus), for Oyo diocese along with his three classmates: Rev. Fathers Paul Awowole, Patrick Oladele and late Michael Adeniji at St. Benedict Catholic Cathedral Osogbo, on 5th October 1991.

After his ordination he was promptly assigned to SS. Peter and Paul Catholic Church, Lagere, Ille-Ife as associate Parish Priest, and was put in charge of St. Patrick Catholic Church, Ifetedo, between 1991 and 1993. He was appointed Parish Priest of St. Francis Catholic Church, Modakeke-Ife from 1993 to 1995.

With the creation of Osogbo Diocese in 1995, he moved to Oyo Diocese as the Director of St. Paul Pastoral Center, Oyo from 1995-1997, and doubled up in that capacity as Diocesan Vocations Director for the same period of time.

Bishop John Oyejola holds a Diploma in Religious Studies from the University of Ibadan in 1987, BA Philosophy, and B.Th. from Pontifical Urban University, Rome, in 1991. For his postgraduate studies he left Nigeria for Ireland and studied at All Hallows' College Dublin, where he obtained Post Graduate in Humanities (PG) in 1998, and Masters of Arts (MA) in Pastoral Leadership in 1999.

After his return to Nigeria he was appointed Parish Priest of St. Ferdinand Catholic Parish, Ogbomoso, in Oyo diocese between November 1999 and December 2004. The Regional Bishops of Lagos and Ibadan ecclesiastical Provinces recognized his competence and appointed him as the Director of St. Augustine Regional Pastoral Institute, Ede, Osun State from January 2005 until June 2011.

As the Director of the institute, he initiated a number of meaningful programmes that promoted evangelization, catechesis and pastoral growth in the region. Physical infrastructures, including a massive hostel accommodation for guests and ultra-modern hall for meetings and seminars were put in place during his tenure.

Among other ecclesiastical responsibilities that divine providence placed upon Most Rev. John Oyejola include: Youth Coordinator/Chaplain, Oyo Diocese, Nigeria (1995-1997), Director of Biblical Apostolate, Oyo Diocese, Nigeria (1992-1997 and 2000-2004), Oyo Diocesan Project Director, Nigeria (1999-2010), Diocesan Pastoral Program Coordinator, Oyo Diocese, Nigeria (Nov 2003-2006), Chairman, National Directors of Religious Education, Nigeria (2004-2010) and Member of Oyo Diocesan Consultors (1999-2011).

His conviction about the need for ongoing formation of priests and interest in self-development led him to the United States of America in 2011 for Graduate studies at St. Mary's College, California, where he obtained a Masters of Arts (MA) in Marriage and Family Therapy (MFT) in 2013.

During his stay in America he worked at different times as Counselor Intern for Catholic Charities, Oakland, CA (2013-2014). He was chaplain to the Community Hospital and Catholic Charities, Monterey Peninsula, CA (2014-2015). He also served as Priest-in-Residence at St. Agnes Catholic Church, Concord, CA, (2011-2014).

His hobbies include Volleyball, jogging and sports generally. He enjoys classical music, loves to be in the company of open-minded people, and takes delight in reading inspiring books."""

        local_ordinary = LocalOrdinary.objects.create(
            title="Most Rev. John Akinkunmi Oyejola",
            text=local_ordinary_text,
            is_active=True,
        )
        self.stdout.write(
            self.style.SUCCESS(f"✓ Created: {local_ordinary.title}")
        )
        self.stdout.write(
            self.style.SUCCESS(
                "\n✅ Successfully seeded Local Ordinary information"
            )
        )
        self.stdout.write(
            self.style.WARNING(
                "\n📝 Note: Hero image and Bishop image can be added via Django admin at /admin/bishop/localordinary/"
            )
        )
