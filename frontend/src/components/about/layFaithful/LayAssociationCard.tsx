import { CalendarDays, Crown, UsersRound } from "lucide-react";
import type { LayAssociation } from "../../../services/about/layFaithfulService";
import LayLeaderCard from "./LayLeaderCard";

type Props = {
  association: LayAssociation;
};

const LayAssociationCard = ({ association }: Props) => (
  <section className="bg-[#f7f4ef] border border-neutral-900/10 rounded-[2rem] overflow-hidden shadow-sm">
    <div className="grid lg:grid-cols-[320px_1fr]">
      <div className="relative min-h-72 bg-neutral-200 overflow-hidden">
        <img
          src={association.imageUrl}
          alt={association.name}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
        <div className="absolute left-5 right-5 bottom-5 text-white">
          <p className="text-[#f3b56d] text-xs font-bold tracking-widest">
            {association.acronym}
          </p>
          <h2 className="mt-1 text-2xl font-bold leading-tight">
            {association.name}
          </h2>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8f3f24]">
            <UsersRound size={12} />
            {association.categoryLabel}
          </span>
          {association.patronSaint && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              <Crown size={12} />
              {association.patronSaint}
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-neutral-600 max-w-3xl">
          {association.description}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
          <CalendarDays size={14} className="text-[#8f3f24]" />
          {association.meetingSchedule}
        </p>

        <div className="mt-6 grid xl:grid-cols-[280px_1fr] gap-4">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Chaplain
            </p>
            <LayLeaderCard leader={association.chaplain} featured />
          </div>

          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Officers
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {association.officers.map((leader) => (
                <LayLeaderCard key={leader.id} leader={leader} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default LayAssociationCard;
