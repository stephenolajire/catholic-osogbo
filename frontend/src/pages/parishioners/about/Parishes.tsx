import { useMemo, useState } from "react";
import ParishHero from "../../../components/about/parish/ParishHero";
import ParishFilterBar from "../../../components/about/parish/ParishFilterBar";
import ParishFilterModal from "../../../components/about/parish/ParishFilterModal";
import ParishGrid from "../../../components/about/parish/ParishGrid";
import { useParish } from "../../../hooks/about/useParish";
import type { Parish } from "../../../services/about/parishService";

const DEFAULT_PARISHES: Parish[] = [
  {
    id: "1",
    name: "Cathedral of Christ the King, Osogbo",
    deanery: "Cathedral Deanery",
    address: "Oke-Fia, Osogbo, Osun State",
    city: "Osogbo",
    phone: "+234 803 000 0001",
    email: "cathedral@osogbodiocese.org",
    imageUrl:
      "https://images.unsplash.com/photo-1548625149-720754963a89?w=800&q=80",
    priestInCharge: "Most Rev. John Akin Oyejola",
    massSchedule: "Sunday: 6:30am, 8:30am, 10:30am. Weekdays: 6:15am.",
    established: 1961,
    status: "active",
    statusLabel: "Active",
    parishioners: 5200,
    isCathedral: true,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "St. Patrick's Parish, Osogbo",
    deanery: "Cathedral Deanery",
    address: "Odi-Olowo Area, Osogbo, Osun State",
    city: "Osogbo",
    phone: "+234 803 000 0002",
    email: "stpatrick@osogbodiocese.org",
    imageUrl:
      "https://images.unsplash.com/photo-1498622205843-3b0ac17f8ba3?w=800&q=80",
    priestInCharge: "Very Rev. Emmanuel Adeyemi",
    massSchedule: "Sunday: 7:00am, 9:00am. Weekdays: 6:00am.",
    established: 1975,
    status: "active",
    statusLabel: "Active",
    parishioners: 3400,
    isCathedral: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Holy Family Parish, Ile-Ife",
    deanery: "Ile-Ife Deanery",
    address: "Mayfair Area, Ile-Ife, Osun State",
    city: "Ile-Ife",
    phone: "+234 803 000 0003",
    imageUrl:
      "https://images.unsplash.com/photo-1520637736862-4d197d17c86a?w=800&q=80",
    priestInCharge: "Rev. Fr. Michael Oladele",
    massSchedule: "Sunday: 6:30am, 8:30am. Weekdays: 6:00am.",
    established: 1982,
    status: "active",
    statusLabel: "Active",
    parishioners: 2800,
    isCathedral: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "St. Augustine Parish, Ede",
    deanery: "Ede Deanery",
    address: "Station Road, Ede, Osun State",
    city: "Ede",
    phone: "+234 803 000 0004",
    imageUrl:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800&q=80",
    priestInCharge: "Rev. Fr. Samuel Taiwo",
    massSchedule: "Sunday: 7:00am, 9:30am. Weekdays: 6:15am.",
    established: 1988,
    status: "active",
    statusLabel: "Active",
    parishioners: 2300,
    isCathedral: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    name: "St. Theresa Parish, Iwo",
    deanery: "Iwo Deanery",
    address: "Oke-Adan, Iwo, Osun State",
    city: "Iwo",
    phone: "+234 803 000 0005",
    imageUrl:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
    priestInCharge: "Rev. Fr. Peter Afolabi",
    massSchedule: "Sunday: 7:00am, 9:00am. Weekdays: 6:00am.",
    established: 1990,
    status: "active",
    statusLabel: "Active",
    parishioners: 2100,
    isCathedral: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "6",
    name: "Sacred Heart Parish, Ejigbo",
    deanery: "Ejigbo Deanery",
    address: "Isale-Oyo Road, Ejigbo, Osun State",
    city: "Ejigbo",
    imageUrl:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&q=80",
    priestInCharge: "Rev. Fr. James Okonkwo",
    massSchedule: "Sunday: 7:30am, 9:30am. Weekdays: 6:15am.",
    established: 1995,
    status: "active",
    statusLabel: "Active",
    parishioners: 1800,
    isCathedral: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "7",
    name: "St. Mary Mission, Ifetedo",
    deanery: "Ile-Ife Deanery",
    address: "Ile-Ife Road, Ifetedo, Osun State",
    city: "Ifetedo",
    imageUrl:
      "https://images.unsplash.com/photo-1514896856000-91cb6de818e0?w=800&q=80",
    priestInCharge: "Rev. Fr. Joseph Bamidele",
    massSchedule: "Sunday: 8:00am. Wednesday: 5:30pm.",
    established: 2012,
    status: "mission",
    statusLabel: "Mission",
    parishioners: 650,
    isCathedral: false,
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "8",
    name: "St. Joseph Parish, Ikirun",
    deanery: "Ikirun Deanery",
    address: "Central Area, Ikirun, Osun State",
    city: "Ikirun",
    phone: "+234 803 000 0008",
    imageUrl:
      "https://images.unsplash.com/photo-1545178803-4056771d60a3?w=800&q=80",
    priestInCharge: "Rev. Fr. Daniel Oyelaran",
    massSchedule: "Sunday: 7:00am, 9:00am. Weekdays: 6:00am.",
    established: 1998,
    status: "active",
    statusLabel: "Active",
    parishioners: 1600,
    isCathedral: false,
    createdAt: "",
    updatedAt: "",
  },
];

const Parishes = () => {
  const { data, isLoading, isError } = useParish();

  const [search, setSearch] = useState("");
  const [deanery, setDeanery] = useState("");
  const [status, setStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const parishes: Parish[] =
    !isLoading && !isError && Array.isArray(data) && data.length
      ? data
      : DEFAULT_PARISHES;

  const deaneries = useMemo(
    () => [...new Set(parishes.map((p) => p.deanery))].sort(),
    [parishes],
  );

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return parishes.filter((p) => {
      const matchSearch =
        !normalizedSearch ||
        p.name.toLowerCase().includes(normalizedSearch) ||
        p.priestInCharge.toLowerCase().includes(normalizedSearch) ||
        p.city.toLowerCase().includes(normalizedSearch);
      const matchDeanery = !deanery || p.deanery === deanery;
      const matchStatus = !status || p.status === status;
      return matchSearch && matchDeanery && matchStatus;
    });
  }, [parishes, search, deanery, status]);

  const hasFilter = !!(search || deanery || status);

  return (
    <div className="min-h-screen bg-neutral-50">
      <ParishHero
        totalParishes={parishes.length}
        totalDeaneries={deaneries.length}
      />

      <div className="px-6 md:px-25 py-16 w-full mx-auto">
        <section>
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-8 h-0.5"
              style={{ background: "var(--color-warning)" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-warning)" }}
            >
              Parish Directory
            </span>
          </div>

          <div className="mb-6">
            <ParishFilterBar
              search={search}
              deanery={deanery}
              status={status}
              deaneries={deaneries}
              onSearch={setSearch}
              onDeanery={setDeanery}
              onStatus={setStatus}
              onOpenModal={() => setModalOpen(true)}
              resultCount={hasFilter ? filtered.length : 0}
            />
          </div>

          <ParishGrid
            parishes={hasFilter ? filtered : parishes}
            isLoading={isLoading && !isError}
          />
        </section>
      </div>

      {modalOpen && (
        <ParishFilterModal
          search={search}
          deanery={deanery}
          status={status}
          deaneries={deaneries}
          onSearch={setSearch}
          onDeanery={setDeanery}
          onStatus={setStatus}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Parishes;
