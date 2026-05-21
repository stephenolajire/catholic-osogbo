import { useState, useMemo } from "react";
import { useBishopMessages } from "../../../hooks/bishop/message/useBishopMessage";
import BishopMessagesHero from "../../../components/bishop/message/BishopMessagesHero";
import BishopMessageCard from "../../../components/bishop/message/BishopMessageCard";
import BishopMessageModal from "../../../components/bishop/message/BishopMessageModal";
import BishopMessagePagination from "../../../components/bishop/message/BishopMessagePagination";
import type { BishopMessage } from "../../../services/bishop/bishopMessageService";

const PER_PAGE = 9;

// ── Default data ──────────────────────────────────────────
const ALL_DEFAULT_MESSAGES: BishopMessage[] = [
  {
    id: "1",
    isFeatured: true,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Easter Message to the Faithful",
    excerpt:
      "As we celebrate the resurrection of our Lord, let us renew our commitment to live the Gospel with joy and courage in our daily lives.",
    fullMessage: `Dear brothers and sisters in Christ,

The resurrection of our Lord Jesus Christ is the cornerstone of our faith. As we gather this Easter season, we are reminded that death has been conquered and new life has been given to all who believe.

In these challenging times, the message of Easter rings louder than ever. We are called not merely to celebrate a historical event, but to live as resurrection people — people of hope, of joy, and of radical love.

I urge each of you to carry the light of Christ into your homes, your workplaces, and your communities. Let your lives be a testament to the transforming power of God's love. Visit the sick, comfort the grieving, and welcome the stranger as Christ himself.

May the peace of the risen Lord be with you and your families always.

Yours in Christ's service,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=800&q=80",
    date: "April 20, 2025",
    category: "Bishop's Message",
  },
  {
    id: "2",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "On the Sanctity of Family Life",
    excerpt:
      "The family remains the fundamental unit of society and the domestic church. We must guard and nurture it with prayer, sacrifice, and unconditional love.",
    fullMessage: `Dear faithful of the Diocese of Osogbo,

The family is under attack in our modern world — through materialism, individualism, and a culture that prizes convenience over commitment. Yet, the Church has always maintained that the family is the domestic church, the first school of faith.

As your bishop, I call on all parents to take seriously your role as the first evangelisers of your children. Pray together as a family. Read the scriptures together. Attend Mass together. These are not optional extras — they are the lifeblood of a healthy Christian family.

To young couples, I say this: your marriage is not merely a contract between two people. It is a covenant with God, a reflection of Christ's love for His Church. Invest in it. Protect it. Seek help when you struggle.

Our diocesan family life commission stands ready to support every family in our diocese. Do not hesitate to reach out.

In faith and hope,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&q=80",
    date: "March 10, 2025",
    category: "Pastoral Letter",
  },
  {
    id: "3",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Year of Prayer — A Call to Deeper Faith",
    excerpt:
      "This year, I invite every parish, every family, and every soul in our diocese to commit to a deeper, more intentional life of prayer.",
    fullMessage: `My dear people,

Prayer is the breath of the soul. Without it, we wither spiritually, even if we appear to flourish outwardly. The Lord himself withdrew to lonely places to pray, and if the Son of God found it necessary, how much more do we?

I am declaring this year in our diocese as the Year of Prayer. I am asking every parish to establish or reinvigorate an adoration chapel. I am asking every family to set aside at least fifteen minutes each day for prayer together. I am asking every individual to commit to a daily examination of conscience.

Prayer is not passive. It is warfare. It is the most powerful weapon we have against the forces of darkness, division, and despair that threaten our communities.

Let us rise to this call. The Diocese of Osogbo will be known as a praying diocese.

In prayer and solidarity,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1565793979907-c30f4fc9d3ab?w=800&q=80",
    date: "January 5, 2025",
    category: "Pastoral Letter",
  },
  {
    id: "4",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Advent Reflection: Waiting in Hope",
    excerpt:
      "Advent invites us to slow down, to wait, and to hope. In a world obsessed with speed, let us reclaim the sacred art of expectant waiting.",
    fullMessage: `Dear brothers and sisters,

Advent is countercultural. The world around us rushes toward Christmas with noise and consumption, while the Church invites us into silence, waiting, and longing.

This Advent, I invite you to resist the rush. Create space in your days for quiet. Light the Advent candles slowly and deliberately. Read the prophecies of Isaiah and let them sink into your soul.

The coming of Christ at Christmas is not merely a historical commemoration. It is a promise of His coming again — in our daily lives, in the Eucharist, and at the end of time. We are an Advent people, always living in the tension between the already and the not yet.

May this Advent season renew in you a living hope.

With paternal affection,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800&q=80",
    date: "December 1, 2024",
    category: "Reflection",
  },
  {
    id: "5",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Homily: The Good Shepherd Sunday",
    excerpt:
      "On this Good Shepherd Sunday, we reflect on the profound image of Christ as the shepherd who knows each sheep by name and lays down his life for them.",
    fullMessage: `Dear friends in Christ,

Today the Church gives us the beautiful image of the Good Shepherd. In a world filled with noise, confusion, and competing voices, this image speaks powerfully to the deepest hunger of the human heart — the desire to be known, to be loved, and to be led.

Christ says: I know my sheep and my sheep know me. This is not a distant, administrative knowledge. This is intimate knowledge. He knows your name. He knows your struggles. He knows your fears. And still He loves you with an everlasting love.

The Good Shepherd does not drive the flock. He leads it. He goes before us into every difficult terrain of life — illness, grief, failure, temptation — and He calls us to follow. His voice, heard in the scriptures, in the sacraments, and in the community of faith, is always a voice of invitation, never coercion.

Let us learn to recognise His voice today and every day.

Pax Christi,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
    date: "May 11, 2025",
    category: "Homily",
  },
  {
    id: "6",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Message for World Youth Day",
    excerpt:
      "To the young people of our diocese: you are not the Church of tomorrow. You are the Church of today. Rise up and take your place.",
    fullMessage: `Dear young people of the Diocese of Osogbo,

On the occasion of World Youth Day, I write to you with great affection and with great hope. You are the future, yes — but more importantly, you are the present. The Church needs your energy, your creativity, your courage right now, not in some distant tomorrow.

I know the pressures you face: academic stress, unemployment, the lure of a world that offers pleasure without purpose. I know the doubts that come at night, the questions about faith, about identity, about your place in this complex world.

And yet I say to you: do not be afraid. These questions are not signs of weak faith — they are signs of a living faith. Bring them to Christ. Bring them to the community of the Church. You will not be judged for your questions. You will be embraced.

Come back to Mass. Come back to the sacraments. Come back to your community. We need you.

With great love,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    date: "July 22, 2024",
    category: "Bishop's Message",
  },
  {
    id: "7",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Pastoral Letter on Catholic Education",
    excerpt:
      "Our Catholic schools are not merely academic institutions — they are communities of faith where the whole person is formed in truth, virtue, and love.",
    fullMessage: `Dear parents, teachers, and students of our Catholic schools,

Catholic education is one of the most precious gifts the Church offers to society. In our schools, we do not merely educate the mind — we form the whole person: intellectually, morally, spiritually, and socially.

I am proud of the progress our diocesan schools have made in recent years. Academic standards have risen. New facilities have been built. But more importantly, the culture of faith in our schools remains vibrant.

To parents: your children spend many hours in our schools, but they spend even more hours in your homes. Be partners with us in their formation. Reinforce at home what is taught in school. Live your faith visibly before them.

To teachers: yours is one of the most sacred vocations. You touch the future every time you enter a classroom. Do not reduce your work to knowledge transfer — see it as accompaniment of young souls on their journey toward God.

To students: be proud of your Catholic identity. It is not a burden — it is a gift.

In faith and service,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    date: "September 3, 2024",
    category: "Pastoral Letter",
  },
  {
    id: "8",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Christmas Message: Emmanuel, God With Us",
    excerpt:
      "Christmas is not a season of sentiment — it is a revolution. God enters history not with power and dominance, but as a helpless child in a manger.",
    fullMessage: `Dear brothers and sisters in Christ,

Christmas is a scandal. It is the scandalous claim that the infinite God chose to become finite. That the One who holds the universe in being allowed himself to be held in the arms of a young mother in a stable.

This is not mythology. This is history. And it changes everything.

Because if God became one of us, then nothing human is foreign to God. Our joys and our sufferings, our hopes and our fears, our births and our deaths — all of it has been taken up into the divine life through the incarnation of the Son.

So this Christmas, as you gather with family, as you exchange gifts, as you attend midnight Mass, remember what you are really celebrating. You are celebrating the audacious love of a God who refused to remain distant. A God who came close. A God who is with us.

Emmanuel. God with us. That is the word that changes everything.

A blessed Christmas to all,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=800&q=80",
    date: "December 25, 2024",
    category: "Bishop's Message",
  },
  {
    id: "9",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "On the Dignity of the Poor",
    excerpt:
      "The poor are not a problem to be managed — they are Christ in disguise. How we treat the least among us is how we treat the Lord himself.",
    fullMessage: `Dear people of the Diocese,

The preferential option for the poor is not a political slogan — it is a Gospel imperative. Jesus began his public ministry by proclaiming good news to the poor. He ended it by identifying himself completely with the suffering: "Whatever you did to the least of these, you did to me."

In our diocese, there is much poverty. There are families who go to bed hungry. There are children who cannot attend school for lack of fees. There are elderly people who are abandoned and alone. This is not acceptable for a people who call themselves followers of Christ.

I am calling on every parish to establish or strengthen its outreach to the poor in its community. I am calling on our wealthier members to give not from their surplus, but sacrificially, as Christ gave himself.

And I am calling on our social justice commissions to advocate boldly for structures that lift people out of poverty permanently, not merely to relieve symptoms.

We cannot proclaim the Gospel and ignore the poor. The two are inseparable.

In solidarity,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    date: "October 18, 2024",
    category: "Pastoral Letter",
  },
  {
    id: "10",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Pentecost: Fire of the Holy Spirit",
    excerpt:
      "On Pentecost we celebrate not just a historical event but a living reality — the Holy Spirit is still being poured out on the Church today.",
    fullMessage: `Dear faithful,

Pentecost is the birthday of the Church. On that first Pentecost, the frightened disciples were transformed into bold witnesses. Fishermen became theologians. Cowards became martyrs. The small upper room became the launching pad for a movement that would change the world.

The same Holy Spirit that fell on them is available to us today. This is not poetic language — it is theological fact. At baptism and confirmation, you received the Holy Spirit. The question is: have you unleashed that gift in your life?

The fruits of the Spirit — love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control — these are not optional extras for especially holy people. They are the expected harvest of a life open to the Spirit.

This Pentecost, I invite you to pray a simple but radical prayer: Holy Spirit, I am available. Do in me and through me whatever you will. Use me for the building of your Kingdom.

Come, Holy Spirit.

Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=800&q=80",
    date: "June 8, 2025",
    category: "Homily",
  },
  {
    id: "11",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "Reflection on the Synod on Synodality",
    excerpt:
      "The Synod on Synodality calls us to walk together — to listen to one another and to the Holy Spirit as we discern the path forward for the Church.",
    fullMessage: `Dear people of God in the Diocese of Osogbo,

The Synod on Synodality, which has been engaging the universal Church, is not merely a Vatican event. It is an invitation to every local church — including ours — to rediscover the art of walking together.

Synodality is not a new concept. It is rooted in the very nature of the Church as the People of God. But over centuries, we have sometimes drifted toward a more centralised, top-down model. The Synod is calling us back to our roots.

What does this mean practically? It means creating spaces in our parishes where every voice is heard — the young and the old, the educated and the unlettered, the long-standing parishioner and the newcomer. It means leaders who listen before they speak. It means decisions made together, not handed down from above.

This is not easy. Listening is harder than speaking. But it is the way of Christ, who said: Whoever wants to be first must be last.

Let us walk this synodal path together, with faith and hope.

Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
    date: "November 12, 2024",
    category: "Reflection",
  },
  {
    id: "12",
    isFeatured: false,
    isActive: true,
    createdAt: "",
    updatedAt: "",
    title: "New Year Message: A Year of Renewal",
    excerpt:
      "As we step into a new year, let us do so not with mere resolutions, but with a genuine desire for interior renewal and deeper conversion.",
    fullMessage: `Dear brothers and sisters,

Another year begins. For some of us, the new year comes with hope and excitement. For others, it arrives with the weight of unresolved struggles, unanswered prayers, and unhealed wounds. To both groups, I write this message.

The Gospel does not promise that the new year will be without difficulty. What it promises is that you will not face those difficulties alone. Emmanuel — God with us — is not a Christmas-only reality. It is the abiding promise of God to His people in every season.

So as we begin this year, I invite you to one practice above all: daily prayer. Not long, elaborate prayer necessarily — but consistent, faithful, daily conversation with the God who made you and loves you.

Start each morning with five minutes of stillness. End each evening with gratitude and examination. Watch what happens to your heart over the months ahead.

May this be a year of genuine renewal — in our hearts, our families, our parishes, and our diocese.

Happy New Year,
Most Rev. John Akin Oyejola`,
    imageUrl:
      "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=800&q=80",
    date: "January 1, 2025",
    category: "Bishop's Message",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Pastoral Letter": "bg-primary-600/90",
  "Bishop's Message": "bg-emerald-600/90",
  Reflection: "bg-teal-600/90",
  Homily: "bg-cyan-600/90",
  Encyclical: "bg-green-600/90",
};

const BishopMessages = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<BishopMessage | null>(null);

  const { data, isLoading, isError } = useBishopMessages(page);

  // Paginate defaults client-side when API is unavailable
  const paginatedDefaults = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return {
      messages: ALL_DEFAULT_MESSAGES.slice(start, start + PER_PAGE),
      total: ALL_DEFAULT_MESSAGES.length,
      page,
      totalPages: Math.ceil(ALL_DEFAULT_MESSAGES.length / PER_PAGE),
      perPage: PER_PAGE,
    };
  }, [page]);

  const result = !isLoading && !isError && data ? data : paginatedDefaults;

  const featured =
    result.messages.find((m) => m.isFeatured) ?? result.messages[0];
  const rest = result.messages.filter((m) => m.id !== featured?.id);

  return (
    <div className="min-h-screen bg-white">
      <BishopMessagesHero />

      <div className="px-6 md:px-16 lg:px-24 py-16 w-full mx-auto space-y-16">
        {/* ── Featured message ── */}
        {featured && !isLoading && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-0.5 bg-primary-500" />
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
                Latest Message
              </span>
            </div>

            {/* Featured card — wide */}
            <div
              onClick={() => setSelected(featured)}
              className="group cursor-pointer grid md:grid-cols-2 bg-neutral-50 rounded-3xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-300"
            >
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?w=800&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
                <span
                  className={`absolute top-4 left-4 ${CATEGORY_COLORS[featured.category] ?? "bg-primary-600/90"} backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full`}
                >
                  {featured.category}
                </span>
              </div>

              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-neutral-400 text-xs mb-3">{featured.date}</p>
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight mb-4 group-hover:text-primary-600 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-neutral-500 text-base leading-relaxed mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold">
                  Read Full Message
                  <span className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center text-xs group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    →
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── All messages grid ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-0.5 bg-primary-500" />
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
                All Messages
              </span>
            </div>
            <span className="text-neutral-400 text-xs">
              {result.total} message{result.total !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Skeleton */}
          {isLoading && !isError ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(PER_PAGE)].map((_, i) => (
                <div
                  key={i}
                  className="bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 animate-pulse"
                >
                  <div className="h-48 bg-neutral-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-2.5 w-20 bg-neutral-200 rounded-full" />
                    <div className="h-4 w-full bg-neutral-200 rounded-lg" />
                    <div className="h-4 w-4/5 bg-neutral-200 rounded-lg" />
                    <div className="space-y-2 pt-1">
                      <div className="h-3 bg-neutral-100 rounded-full" />
                      <div className="h-3 bg-neutral-100 rounded-full w-4/5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((message) => (
                <BishopMessageCard
                  key={message.id}
                  message={message}
                  categoryColor={
                    CATEGORY_COLORS[message.category] ?? "bg-primary-600/90"
                  }
                  onClick={() => setSelected(message)}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Pagination ── */}
        {result.totalPages > 1 && (
          <BishopMessagePagination
            page={result.page}
            totalPages={result.totalPages}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>

      {/* ── Modal ── */}
      {selected && (
        <BishopMessageModal
          message={selected}
          categoryColor={
            CATEGORY_COLORS[selected.category] ?? "bg-primary-600/90"
          }
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default BishopMessages;
