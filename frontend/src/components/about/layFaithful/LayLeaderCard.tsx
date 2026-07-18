import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import type { LayLeader } from "../../../services/about/layFaithfulService";

type Props = {
  leader: LayLeader;
  featured?: boolean;
};

const LayLeaderCard = ({ leader, featured = false }: Props) => (
  <article
    className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
      featured
        ? "bg-linear-to-br from-amber-900 to-orange-900 border-amber-700/60 text-white shadow-lg hover:shadow-xl"
        : "bg-white border-amber-100/60 text-amber-950 shadow-md hover:shadow-lg"
    }`}
  >
    <div className="flex gap-4 p-4">
      <img
        src={leader.imageUrl}
        alt={leader.name}
        className={`h-28 w-24 rounded-xl object-cover object-top flex-shrink-0 ${
          featured ? "ring-2 ring-amber-300/40" : "ring-1 ring-amber-100/50"
        }`}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80";
        }}
      />
      <div className="min-w-0 flex-1">
        <p
          className={`text-xs font-bold uppercase tracking-widest ${
            featured ? "text-amber-200" : "text-amber-700"
          }`}
        >
          {leader.roleLabel}
        </p>
        <h3
          className={`mt-1.5 font-serif font-bold leading-tight text-base ${
            featured ? "text-white" : "text-amber-950"
          }`}
        >
          {leader.name}
        </h3>
        <div className="mt-3 space-y-1">
          <p
            className={`flex items-center gap-1.5 text-xs ${
              featured ? "text-amber-100" : "text-amber-700"
            }`}
          >
            <MapPin size={13} className="flex-shrink-0" />
            <span className="truncate">{leader.parish}</span>
          </p>
          <p
            className={`flex items-center gap-1.5 text-xs ${
              featured ? "text-amber-100" : "text-amber-600"
            }`}
          >
            <CalendarDays size={13} className="flex-shrink-0" />
            {leader.tenure}
          </p>
        </div>
      </div>
    </div>

    {(leader.phone || leader.email) && (
      <div
        className={`flex items-center gap-2 px-4 py-3 border-t ${
          featured
            ? "border-amber-700/40 text-amber-200"
            : "border-amber-100/60 text-amber-600"
        }`}
      >
        {leader.phone && (
          <a
            href={`tel:${leader.phone}`}
            aria-label={`Call ${leader.name}`}
            className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${
              featured
                ? "bg-amber-300/20 border border-amber-300/40 hover:bg-amber-300/40"
                : "bg-amber-100/40 border border-amber-200/60 hover:bg-amber-100"
            }`}
          >
            <Phone size={13} />
          </a>
        )}
        {leader.email && (
          <a
            href={`mailto:${leader.email}`}
            aria-label={`Email ${leader.name}`}
            className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${
              featured
                ? "bg-amber-300/20 border border-amber-300/40 hover:bg-amber-300/40"
                : "bg-amber-100/40 border border-amber-200/60 hover:bg-amber-100"
            }`}
          >
            <Mail size={13} />
          </a>
        )}
      </div>
    )}
  </article>
);

export default LayLeaderCard;
