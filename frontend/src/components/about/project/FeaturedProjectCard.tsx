import type { Project } from "../../../services/about/projectService";
import { MapPin, Calendar, TrendingUp } from "lucide-react";

type Props = {
  project: Project;
};

const statusColors: Record<Project["status"], string> = {
  ongoing: "bg-primary-600/90",
  completed: "bg-neutral-600/90",
  planned: "bg-info/90",
  on_hold: "bg-warning/90",
};

const categoryIcons: Record<Project["category"], string> = {
  infrastructure: "🏛️",
  education: "📚",
  healthcare: "🏥",
  evangelization: "✝️",
  social_welfare: "🤝",
  youth: "🌱",
};

const FeaturedProjectCard = ({ project }: Props) => (
  <div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-900/10 transition-all duration-300">
    {/* Image */}
    <div className="relative h-64 overflow-hidden bg-neutral-100">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80";
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

      {/* Status badge */}
      <span
        className={`absolute top-3 left-3 ${statusColors[project.status]} backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`}
      >
        {project.statusLabel}
      </span>

      {/* Category badge */}
      <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
        <span>{categoryIcons[project.category]}</span>
        <span className="font-medium">{project.categoryLabel}</span>
      </span>

      {/* Featured label overlaid on image bottom */}
      <div className="absolute bottom-3 left-3">
        <span className="text-white text-[10px] font-semibold uppercase tracking-widest opacity-80">
          ★ Featured Project
        </span>
      </div>
    </div>

    {/* Content */}
    <div className="p-5">
      <h3 className="font-bold text-neutral-900 text-base leading-snug mb-2 group-hover:text-primary-600 transition-colors">
        {project.title}
      </h3>

      <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2 mb-4">
        {project.description}
      </p>

      <div className="space-y-1.5 mb-4">
        <div className="flex items-center gap-1.5 text-neutral-500 text-xs">
          <MapPin size={11} className="shrink-0 text-primary-400" />
          <span className="line-clamp-1">{project.parish}</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
          <Calendar size={11} className="shrink-0" />
          <span>Started {new Date(project.startDate).getFullYear()}</span>
        </div>
      </div>

      {/* Progress bar */}
      {project.status === "ongoing" && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1 text-neutral-500 text-xs">
              <TrendingUp size={11} className="text-primary-400" />
              <span>Progress</span>
            </div>
            <span className="text-primary-600 text-xs font-bold">
              {project.progress}%
            </span>
          </div>
          <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-700"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Deanery pill */}
      <div className="mt-4 pt-4 border-t border-neutral-50">
        <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full">
          {project.deanery}
        </span>
      </div>
    </div>
  </div>
);

export default FeaturedProjectCard;
