import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import type { LayLeader } from "../../../services/about/layFaithfulService";

type Props = {
  leader: LayLeader;
  featured?: boolean;
};

const LayLeaderCard = ({ leader, featured = false }: Props) => (
  <article
    className={`rounded-3xl overflow-hidden border shadow-sm ${
      featured
        ? "bg-neutral-950 border-neutral-950 text-white"
        : "bg-white border-neutral-900/10 text-neutral-950"
    }`}
  >
    <div className="flex gap-4 p-4">
      <img
        src={leader.imageUrl}
        alt={leader.name}
        className="h-24 w-20 rounded-2xl object-cover object-top bg-neutral-200 shrink-0"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80";
        }}
      />
      <div className="min-w-0">
        <p
          className={`text-[10px] font-bold uppercase tracking-widest ${
            featured ? "text-[#f3b56d]" : "text-[#8f3f24]"
          }`}
        >
          {leader.roleLabel}
        </p>
        <h3 className="mt-1 font-bold leading-tight">{leader.name}</h3>
        <p
          className={`mt-2 flex items-center gap-1.5 text-xs ${
            featured ? "text-neutral-300" : "text-neutral-500"
          }`}
        >
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{leader.parish}</span>
        </p>
        <p
          className={`mt-1 flex items-center gap-1.5 text-xs ${
            featured ? "text-neutral-300" : "text-neutral-500"
          }`}
        >
          <CalendarDays size={12} className="shrink-0" />
          {leader.tenure}
        </p>
      </div>
    </div>

    {(leader.phone || leader.email) && (
      <div
        className={`flex items-center gap-2 px-4 pb-4 ${
          featured ? "text-neutral-300" : "text-neutral-500"
        }`}
      >
        {leader.phone && (
          <a
            href={`tel:${leader.phone}`}
            aria-label={`Call ${leader.name}`}
            className="h-8 w-8 rounded-full bg-white/10 border border-current/10 flex items-center justify-center hover:text-[#8f3f24] transition-colors"
          >
            <Phone size={13} />
          </a>
        )}
        {leader.email && (
          <a
            href={`mailto:${leader.email}`}
            aria-label={`Email ${leader.name}`}
            className="h-8 w-8 rounded-full bg-white/10 border border-current/10 flex items-center justify-center hover:text-[#8f3f24] transition-colors"
          >
            <Mail size={13} />
          </a>
        )}
      </div>
    )}
  </article>
);

export default LayLeaderCard;
