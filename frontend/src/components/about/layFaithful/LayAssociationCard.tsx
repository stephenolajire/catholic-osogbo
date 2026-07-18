import { CalendarDays, Crown, Users } from "lucide-react";
import type { LayAssociation } from "../../../services/about/layFaithfulService";
import LayLeaderCard from "./LayLeaderCard";

type Props = {
  association: LayAssociation;
};

const LayAssociationCard = ({ association }: Props) => (
  <section className="bg-white border-2 border-amber-100/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="grid lg:grid-cols-[340px_1fr]">
      {/* Image Section with Overlay */}
      <div className="relative min-h-80 bg-linear-to-br from-amber-100 to-orange-100 overflow-hidden group">
        <img
          src={association.imageUrl}
          alt={association.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80";
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-amber-950/85 via-amber-900/40 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute left-6 right-6 bottom-6 text-white">
          <div className="inline-flex items-center gap-2 bg-amber-300/20 backdrop-blur-sm border border-amber-200/40 rounded-full px-3 py-1 mb-3">
            <span className="text-xs font-bold tracking-widest text-amber-100">
              {association.acronym}
            </span>
          </div>
          <h2 className="text-3xl font-serif font-bold leading-tight text-white">
            {association.name}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 md:p-8 flex flex-col">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-amber-100 to-orange-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200/50">
            <Users size={12} className="text-amber-700" />
            {association.categoryLabel}
          </span>
          {association.patronSaint && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-yellow-100 to-amber-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 border border-amber-200/50">
              <Crown size={12} className="text-amber-600" />
              {association.patronSaint}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-amber-900/80 leading-relaxed max-w-3xl mb-4 font-medium">
          {association.description}
        </p>

        {/* Meeting Schedule */}
        <p className="flex items-center gap-2 text-sm text-amber-700 mb-8 pb-8 border-b border-amber-100/60">
          <CalendarDays size={16} className="text-amber-700 flex-shrink-0" />
          <span className="font-medium">{association.meetingSchedule}</span>
        </p>

        {/* Leadership Section */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 mt-auto">
          {/* Chaplain */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-600"></span>
              Chaplain
            </p>
            <LayLeaderCard leader={association.chaplain} featured />
          </div>

          {/* Officers */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-600"></span>
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
