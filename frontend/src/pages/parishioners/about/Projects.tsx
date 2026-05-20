import { useState, useMemo } from "react";
import { useProject } from "../../../hooks/about/useProject";

import ProjectHero from "../../../components/about/project/ProjectHero";
import FeaturedProjectCard from "../../../components/about/project/FeaturedProjectCard";
import ProjectFilterBar from "../../../components/about/project/ProjectFilterBar";
import ProjectGrid from "../../../components/about/project/ProjectGrid";
import ProjectFilterModal from "../../../components/about/project/ProjectFilterModal";

import type { Project } from "../../../services/about/projectService";

// ── Defaults ──────────────────────────────────────────────
const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Cathedral Renovation & Expansion",
    status: "ongoing",
    statusLabel: "Ongoing",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    parish: "Cathedral of Christ the King, Osogbo",
    deanery: "Cathedral Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1548625149-720754963a89?w=800&q=80",
    description:
      "A major renovation of the Cathedral of Christ the King to expand seating capacity and modernise the liturgical space for the growing congregation.",
    startDate: "2022-01-10",
    endDate: undefined,
    progress: 65,
    budget: 85000000,
    isFeatured: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Osogbo Catholic School Building Project",
    status: "ongoing",
    statusLabel: "Ongoing",
    category: "education",
    categoryLabel: "Education",
    parish: "St. Patrick's Parish, Osogbo",
    deanery: "Cathedral Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80",
    description:
      "Construction of a new secondary school block to provide quality Catholic education to over 600 students in the Osogbo metropolis.",
    startDate: "2021-03-15",
    endDate: undefined,
    progress: 80,
    budget: 50000000,
    isFeatured: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    title: "Diocesan Health Centre, Ede",
    status: "completed",
    statusLabel: "Completed",
    category: "healthcare",
    categoryLabel: "Healthcare",
    parish: "St. Augustine Parish, Ede",
    deanery: "Ede Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80",
    description:
      "Establishment of a modern health centre serving the Ede community with primary healthcare, maternal care, and outpatient services.",
    startDate: "2018-06-01",
    endDate: "2020-12-20",
    progress: 100,
    budget: 30000000,
    isFeatured: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    title: "Youth Empowerment & Vocational Centre",
    status: "planned",
    statusLabel: "Planned",
    category: "youth",
    categoryLabel: "Youth",
    parish: "Holy Family Parish, Ile-Ife",
    deanery: "Ile-Ife Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=800&q=80",
    description:
      "A planned centre for youth skill acquisition, entrepreneurship training, and spiritual formation to reduce unemployment among Catholic youths.",
    startDate: "2025-01-01",
    endDate: undefined,
    progress: 0,
    budget: 20000000,
    isFeatured: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    title: "Evangelization Media Studio",
    status: "ongoing",
    statusLabel: "Ongoing",
    category: "evangelization",
    categoryLabel: "Evangelization",
    parish: "Cathedral of Christ the King, Osogbo",
    deanery: "Cathedral Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
    description:
      "Setting up a Diocesan media production studio for radio broadcasts, online evangelization, and digital content creation.",
    startDate: "2023-04-01",
    endDate: undefined,
    progress: 45,
    budget: 12000000,
    isFeatured: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "6",
    title: "Widow & Orphan Support Initiative",
    status: "ongoing",
    statusLabel: "Ongoing",
    category: "social_welfare",
    categoryLabel: "Social Welfare",
    parish: "Sacred Heart Parish, Ejigbo",
    deanery: "Ejigbo Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    description:
      "A social welfare programme providing food, shelter, school fees, and psychosocial support to widows and orphans across the diocese.",
    startDate: "2020-09-01",
    endDate: undefined,
    progress: 55,
    budget: 8000000,
    isFeatured: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "7",
    title: "Iwo Parish Hall Construction",
    status: "on_hold",
    statusLabel: "On Hold",
    category: "infrastructure",
    categoryLabel: "Infrastructure",
    parish: "St. Theresa Parish, Iwo",
    deanery: "Iwo Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    description:
      "Construction of a multipurpose parish hall for community events, catechism classes, and diocesan gatherings. Temporarily paused pending funding.",
    startDate: "2022-07-10",
    endDate: undefined,
    progress: 30,
    budget: 15000000,
    isFeatured: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "8",
    title: "Primary School Renovation, Ile-Ife",
    status: "completed",
    statusLabel: "Completed",
    category: "education",
    categoryLabel: "Education",
    parish: "Holy Family Parish, Ile-Ife",
    deanery: "Ile-Ife Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    description:
      "Full renovation of classrooms, restrooms, and administrative block at St. Mary's Catholic Primary School in Ile-Ife.",
    startDate: "2019-01-15",
    endDate: "2021-03-30",
    progress: 100,
    budget: 18000000,
    isFeatured: false,
    createdAt: "",
    updatedAt: "",
  },
];

const Projects = () => {
  const { data, isLoading, isError } = useProject();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [deanery, setDeanery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const projects: Project[] =
    !isLoading && !isError && Array.isArray(data) && data.length
      ? data
      : DEFAULT_PROJECTS;

  // Separate featured from the rest
  const featured = projects.filter((p) => p.isFeatured);
  const rest = projects.filter((p) => !p.isFeatured);

  // Unique deaneries for filter dropdown
  const deaneries = useMemo(
    () => [...new Set(rest.map((p) => p.deanery))].sort(),
    [rest],
  );

  // Filtered results
  const filtered = useMemo(() => {
    return rest.filter((p) => {
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.parish.toLowerCase().includes(search.toLowerCase());
      const matchCategory = !category || p.category === category;
      const matchStatus = !status || p.status === status;
      const matchDeanery = !deanery || p.deanery === deanery;
      return matchSearch && matchCategory && matchStatus && matchDeanery;
    });
  }, [rest, search, category, status, deanery]);

  const hasFilter = !!(search || category || status || deanery);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <ProjectHero />

      <div className="px-6 md:px-25 py-16 w-full mx-auto space-y-16">
        {/* ── Featured Projects ── */}
        {featured.length > 0 && (
          <section className="space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-0.5 bg-primary-500" />
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
                Featured Projects
              </span>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map((project) => (
                <FeaturedProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* ── All Projects ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-primary-500" />
            <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
              All Projects
            </span>
          </div>

          <div className="mb-6">
            <ProjectFilterBar
              search={search}
              category={category}
              status={status}
              deanery={deanery}
              deaneries={deaneries}
              onSearch={setSearch}
              onCategory={setCategory}
              onStatus={setStatus}
              onDeanery={setDeanery}
              onOpenModal={() => setModalOpen(true)}
              resultCount={hasFilter ? filtered.length : 0}
            />
          </div>

          <ProjectGrid
            projects={hasFilter ? filtered : rest}
            isLoading={isLoading && !isError}
          />
        </section>
      </div>

      {/* Filter modal */}
      {modalOpen && (
        <ProjectFilterModal
          search={search}
          category={category}
          status={status}
          deanery={deanery}
          deaneries={deaneries}
          onSearch={setSearch}
          onCategory={setCategory}
          onStatus={setStatus}
          onDeanery={setDeanery}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Projects;
