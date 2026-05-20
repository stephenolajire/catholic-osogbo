import { UsersRound } from "lucide-react";

type Props = {
  totalAssociations: number;
  totalLeaders: number;
};

const LayFaithfulHero = ({ totalAssociations, totalLeaders }: Props) => (
  <section className="relative overflow-hidden bg-[#f7f4ef] border-b border-neutral-900/10">
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage:
          "linear-gradient(#111827 1px, transparent 1px), linear-gradient(90deg, #111827 1px, transparent 1px)",
        backgroundSize: "34px 34px",
      }}
    />

    <div className="relative px-6 md:px-25 pt-14 pb-12">
      <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-900/15 bg-white/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
            <UsersRound size={13} />
            Lay Apostolate
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-6xl font-bold leading-none text-neutral-950">
            Lay Faithful
            <span className="block text-[#8f3f24]">Associations</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm md:text-base leading-relaxed text-neutral-600">
            Diocesan lay associations and societies, each with its own
            chaplain, officers, formation path, and apostolic responsibility.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-neutral-950 text-white rounded-3xl p-5">
            <p className="text-3xl font-bold">{totalAssociations}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
              Associations
            </p>
          </div>
          <div className="bg-[#24443c] text-white rounded-3xl p-5">
            <p className="text-3xl font-bold">{totalLeaders}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-white/60">
              Leaders
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LayFaithfulHero;
