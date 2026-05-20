import type { Project } from "../../../services/about/projectService";
import { MapPin, Calendar, TrendingUp } from "lucide-react";

type Props = {
  project: Project;
  onClick: (project: Project) => void;
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

const ProjectCard = ({ project, onClick }: Props) => (
  <div
    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-lg hover:shadow-neutral-900/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    onClick={() => onClick(project)}
  >
    {/* Image */}
    <div className="relative h-44 overflow-hidden bg-neutral-100">
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80";
        }}
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

      {/* Status badge */}
      <span
        className={`absolute top-2.5 left-2.5 ${statusColors[project.status]} backdrop-blur-sm text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full`}
      >
        {project.statusLabel}
      </span>

      {/* Category icon */}
      <span className="absolute top-2.5 right-2.5 text-base">
        {categoryIcons[project.category]}
      </span>
    </div>

    {/* Info */}
    <div className="p-3.5">
      <h3 className="font-bold text-neutral-900 text-sm leading-snug mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-2">
        {project.title}
      </h3>

      <div className="flex items-center gap-1.5 text-neutral-500 text-xs mb-1">
        <MapPin size={10} className="shrink-0 text-primary-400" />
        <span className="line-clamp-1">{project.parish}</span>
      </div>

      <div className="flex items-center gap-1.5 text-neutral-400 text-xs mb-2.5">
        <Calendar size={10} className="shrink-0" />
        <span>{new Date(project.startDate).getFullYear()}</span>
      </div>

      {/* Progress bar — only for ongoing */}
      {project.status === "ongoing" && (
        <div className="mb-2.5">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1 text-neutral-400 text-[10px]">
              <TrendingUp size={9} />
              <span>Progress</span>
            </div>
            <span className="text-primary-600 text-[10px] font-bold">
              {project.progress}%
            </span>
          </div>
          <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Deanery pill */}
      <div className="pt-2.5 border-t border-neutral-50">
        <span className="text-[10px] font-semibold text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
          {project.deanery}
        </span>
      </div>
    </div>
  </div>
);

export default ProjectCard;
