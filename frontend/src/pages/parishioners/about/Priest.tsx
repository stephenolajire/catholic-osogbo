import { useState, useMemo } from "react";
import { usePriest } from "../../../hooks/about/usePriest";

import PriestHero from "../../../components/about/priest/priestHero";
import BishopVicarCard from "../../../components/about/priest/BishopVicarCard";
import PriestFilterBar from "../../../components/about/priest/PriestFilterBar";
import PriestGrid from "../../../components/about/priest/PriestGrid";
import PriestFilterModal from "../../../components/about/priest/PriestFilterModal";

import type { Priest as PriestType } from "../../../services/about/priestService";

// ── Defaults ──────────────────────────────────────────────
const DEFAULT_PRIESTS: PriestType[] = [
  {
    id: "1",
    name: "Most Rev. John Akin Oyejola",
    role: "bishop",
    roleLabel: "Bishop",
    parish: "Cathedral of Christ the King, Osogbo",
    deanery: "Cathedral Deanery",
    imageUrl:
      "/image.png",
    bio: "Most Rev. John Akin Oyejola has served as the Bishop of the Catholic Diocese of Osogbo since 2010. He is known for his pastoral zeal, commitment to education, and deep spirituality.",
    ordainedYear: 1990,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Very Rev. Emmanuel Adeyemi",
    role: "vicar_general",
    roleLabel: "Vicar General",
    parish: "St. Patrick's Parish, Osogbo",
    deanery: "Cathedral Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    bio: "Very Rev. Emmanuel Adeyemi serves as the Vicar General of the Diocese, assisting the Bishop in the governance and administration of the local Church.",
    ordainedYear: 1998,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Rev. Fr. Michael Oladele",
    role: "parish_priest",
    roleLabel: "Parish Priest",
    parish: "Holy Family Parish, Ile-Ife",
    deanery: "Ile-Ife Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    bio: "Dedicated pastor serving Holy Family Parish.",
    ordainedYear: 2005,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Rev. Fr. Samuel Taiwo",
    role: "parish_priest",
    roleLabel: "Parish Priest",
    parish: "St. Augustine Parish, Ede",
    deanery: "Ede Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&q=80",
    bio: "Serving the faithful of St. Augustine Parish.",
    ordainedYear: 2008,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    name: "Rev. Fr. Peter Afolabi",
    role: "parish_priest",
    roleLabel: "Parish Priest",
    parish: "St. Theresa Parish, Iwo",
    deanery: "Iwo Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80",
    bio: "Committed to building the Church in Iwo.",
    ordainedYear: 2010,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "6",
    name: "Rev. Fr. James Okonkwo",
    role: "parish_priest",
    roleLabel: "Parish Priest",
    parish: "Sacred Heart Parish, Ejigbo",
    deanery: "Ejigbo Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80",
    bio: "Serving Sacred Heart Parish with devotion.",
    ordainedYear: 2007,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "7",
    name: "Rev. Fr. Joseph Bamidele",
    role: "assistant_priest",
    roleLabel: "Assistant Priest",
    parish: "Holy Family Parish, Ile-Ife",
    deanery: "Ile-Ife Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "Assisting at Holy Family Parish.",
    ordainedYear: 2015,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "8",
    name: "Rev. Fr. Daniel Oyelaran",
    role: "chaplain",
    roleLabel: "Chaplain",
    parish: "University of Osun Chaplaincy",
    deanery: "Cathedral Deanery",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    bio: "University chaplain and youth minister.",
    ordainedYear: 2012,
    isActive: true,
    createdAt: "",
    updatedAt: "",
  },
];

const Priest = () => {
  const { data, isLoading, isError } = usePriest();

  const [search, setSearch] = useState("");
  const [deanery, setDeanery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const priests: PriestType[] =
    !isLoading && !isError && Array.isArray(data) && data.length
      ? data
      : DEFAULT_PRIESTS;

  // Separate bishop, vicar, rest
  const bishop = priests.find((p) => p.role === "bishop");
  const vicar = priests.find((p) => p.role === "vicar_general");
  const rest = priests.filter(
    (p) => p.role !== "bishop" && p.role !== "vicar_general",
  );

  // Unique deaneries for filter
  const deaneries = useMemo(
    () => [...new Set(rest.map((p) => p.deanery))].sort(),
    [rest],
  );

  // Filtered results
  const filtered = useMemo(() => {
    return rest.filter((p) => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.parish.toLowerCase().includes(search.toLowerCase());
      const matchDeanery = !deanery || p.deanery === deanery;
      return matchSearch && matchDeanery;
    });
  }, [rest, search, deanery]);

  const hasFilter = !!(search || deanery);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero */}
      <PriestHero />

      <div className="px-6 md:px-25 py-16 w-full mx-auto space-y-16">
        {/* ── Bishop & Vicar ── */}
        {(bishop || vicar) && (
          <section className="space-y-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-0.5 bg-primary-500" />
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
                Leadership
              </span>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {bishop && <BishopVicarCard priest={bishop} variant="bishop" />}
              {vicar && <BishopVicarCard priest={vicar} variant="vicar" />}
            </div>
          </section>
        )}

        {/* ── All Priests ── */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-0.5 bg-primary-500" />
            <span className="text-primary-600 text-xs font-semibold uppercase tracking-widest">
              Our Priests
            </span>
          </div>

          <div className="mb-6">
            <PriestFilterBar
              search={search}
              deanery={deanery}
              deaneries={deaneries}
              onSearch={setSearch}
              onDeanery={setDeanery}
              onOpenModal={() => setModalOpen(true)}
              resultCount={hasFilter ? filtered.length : 0}
            />
          </div>

          <PriestGrid
            priests={hasFilter ? filtered : rest}
            isLoading={isLoading && !isError}
          />
        </section>
      </div>

      {/* Filter modal */}
      {modalOpen && (
        <PriestFilterModal
          priests={filtered}
          search={search}
          deanery={deanery}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Priest;
