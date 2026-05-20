import { useState, useEffect, useCallback } from "react";
import { X, MapPin, Calendar, TrendingUp } from "lucide-react";
import ProjectCard from "./ProjectCard";
import type { Project } from "../../../services/about/projectService";

type Props = {
  projects: Project[];
  isLoading: boolean;
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

// ── Skeleton ──────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-neutral-100 animate-pulse">
    <div className="h-44 bg-neutral-200" />
    <div className="p-3.5 space-y-2">
      <div className="h-3.5 bg-neutral-200 rounded-full w-3/4" />
      <div className="h-3 bg-neutral-100 rounded-full w-full" />
      <div className="h-3 bg-neutral-100 rounded-full w-1/2" />
      <div className="h-1 bg-neutral-100 rounded-full w-full mt-2" />
      <div className="pt-2">
        <div className="h-5 bg-neutral-100 rounded-full w-24" />
      </div>
    </div>
  </div>
);

// ── Detail Modal ──────────────────────────────────────────
const ProjectModal = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1.5 transition-colors backdrop-blur-sm"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* Status badge */}
        <span
          className={`absolute top-3 left-3 z-10 ${statusColors[project.status]} backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full`}
        >
          {project.statusLabel}
        </span>

        {/* Full image */}
        <div className="relative bg-neutral-100 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full max-h-[60vh] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80";
            }}
          />
        </div>

        {/* Details */}
        <div className="p-6">
          {/* Category */}
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-base">{categoryIcons[project.category]}</span>
            <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
              {project.categoryLabel}
            </span>
          </div>

          <h2 className="font-bold text-neutral-900 text-xl leading-snug mb-2">
            {project.title}
          </h2>

          <p className="text-neutral-500 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-neutral-600 text-sm">
              <MapPin size={13} className="shrink-0 text-primary-400" />
              <span>{project.parish}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-500 text-sm">
              <Calendar size={13} className="shrink-0" />
              <span>
                Started {new Date(project.startDate).getFullYear()}
                {project.endDate &&
                  ` · Completed ${new Date(project.endDate).getFullYear()}`}
              </span>
            </div>
          </div>

          {/* Progress */}
          {project.status === "ongoing" && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-neutral-500 text-sm">
                  <TrendingUp size={13} className="text-primary-400" />
                  <span>Progress</span>
                </div>
                <span className="text-primary-600 text-sm font-bold">
                  {project.progress}%
                </span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Budget */}
          {project.budget && (
            <div className="mb-4 p-3 bg-neutral-50 rounded-xl">
              <p className="text-xs text-neutral-400 mb-0.5">Project Budget</p>
              <p className="text-base font-bold text-neutral-800">
                ₦{project.budget.toLocaleString()}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-neutral-100">
            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1.5 rounded-full">
              {project.deanery}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ── Grid ──────────────────────────────────────────────────
const ProjectGrid = ({ projects, isLoading }: Props) => {
  const [selected, setSelected] = useState<Project | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {[...Array(10)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <p className="text-neutral-700 font-semibold text-base mb-1">
          No projects found
        </p>
        <p className="text-neutral-400 text-sm">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={setSelected}
          />
        ))}
      </div>

      {selected && <ProjectModal project={selected} onClose={handleClose} />}
    </>
  );
};

export default ProjectGrid;
