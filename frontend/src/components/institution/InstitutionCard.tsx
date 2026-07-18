import { MapPin, Phone, Mail, Clock, Users } from "lucide-react";
import type { Institution } from "../../services/home/institutionService";

type Props = {
  institution: Institution;
};

const InstitutionCard = ({ institution }: Props) => (
  <div className="bg-white border-2 border-amber-100/60 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
    {/* Image Section */}
    <div className="relative h-48 bg-linear-to-br from-amber-100 to-orange-100 overflow-hidden group">
      <img
        src={institution.imageUrl}
        alt={institution.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80";
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-amber-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Subcategory Badge */}
      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-amber-200 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
        {institution.subcategory}
      </div>
    </div>

    {/* Content Section */}
    <div className="p-5 flex flex-col flex-grow">
      {/* Title */}
      <h3 className="font-serif font-bold text-amber-950 text-lg mb-2 line-clamp-2">
        {institution.name}
      </h3>

      {/* Description */}
      <p className="text-amber-700/70 text-sm line-clamp-2 mb-4">
        {institution.description}
      </p>

      {/* Info Section */}
      <div className="space-y-3 mt-auto pt-4 border-t border-amber-100/60">
        {/* Address */}
        <div className="flex gap-3">
          <MapPin size={16} className="flex-shrink-0 text-amber-700 mt-0.5" />
          <p className="text-sm text-amber-700 line-clamp-2">
            {institution.address}
          </p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <Phone size={16} className="flex-shrink-0 text-amber-700" />
          <a
            href={`tel:${institution.phoneNumber}`}
            className="text-sm text-amber-700 hover:text-amber-900 font-semibold transition-colors"
          >
            {institution.phoneNumber}
          </a>
        </div>

        {/* Principal Name */}
        {institution.principalName && (
          <div className="flex gap-3">
            <Users size={16} className="flex-shrink-0 text-amber-700 mt-0.5" />
            <div className="text-sm text-amber-700">
              <p className="font-semibold text-amber-900">
                {institution.principalName}
              </p>
              <p className="text-xs text-amber-600">Principal/Director</p>
            </div>
          </div>
        )}

        {/* Optional Fields */}
        {institution.email && (
          <div className="flex items-center gap-3">
            <Mail size={16} className="flex-shrink-0 text-amber-700" />
            <a
              href={`mailto:${institution.email}`}
              className="text-sm text-amber-700 hover:text-amber-900 truncate transition-colors"
            >
              {institution.email}
            </a>
          </div>
        )}

        {institution.operatingHours && (
          <div className="flex gap-3">
            <Clock size={16} className="flex-shrink-0 text-amber-700 mt-0.5" />
            <p className="text-sm text-amber-700">
              {institution.operatingHours}
            </p>
          </div>
        )}
      </div>

      {/* Additional Info */}
      {(institution.principalName ||
        institution.established ||
        institution.staffCount) && (
        <div className="mt-4 pt-4 border-t border-amber-100/60 space-y-2 text-xs text-amber-700">
          {institution.established && (
            <p>
              <span className="font-semibold">Established:</span>{" "}
              {institution.established}
            </p>
          )}
          {institution.staffCount && (
            <p>
              <span className="font-semibold">Staff:</span>{" "}
              {institution.staffCount} members
            </p>
          )}
        </div>
      )}
    </div>
  </div>
);

export default InstitutionCard;
