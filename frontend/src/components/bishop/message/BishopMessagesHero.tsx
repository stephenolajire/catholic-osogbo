import { ScrollText } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1476231790671-807a53ac0af8?w=1600&q=80";

const BishopMessagesHero = () => {
  return (
    <section className="relative overflow-hidden bg-stone-900">
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-950/80 via-stone-950/70 to-stone-950/90" />
      </div>

      <div className="relative px-6 py-24 text-center md:px-16 lg:px-24 lg:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-stone-300">
            <ScrollText size={13} className="text-stone-400" />
            From the Bishop
          </span>
          <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
            Bishop's Messages
          </h1>
          <p className="mt-4 text-lg font-light leading-relaxed text-stone-300">
            Pastoral letters, homilies, reflections, and messages from Most Rev.
            John Akin Oyejola, Bishop of the Catholic Diocese of Osogbo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BishopMessagesHero;
