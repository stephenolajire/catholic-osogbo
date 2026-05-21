import { useState } from "react";
import { useDeanery } from "../../../hooks/about/useDeanery";
import DeaneryHero from "../../../components/about/deanery/DeaneryHero";
import DeaneryStats from "../../../components/about/deanery/DeaneryStats";
import DeaneryCard from "../../../components/about/deanery/DeaneryCard";
import type { Deanery } from "../../../services/about/deaneryService";

// ── Default data ──────────────────────────────────────────
export const DEFAULT_DEANERIES: Deanery[] = [
  {
    id: "1",
    name: "Ife Deanery",
    isActive: true,
    parishes: [
      {
        id: "1-1",
        name: "SS Peter & Paul",
        location: "Lagere, Ile-Ife",
        isActive: true,
      },
      { id: "1-2", name: "OLPLC", location: "OAU, Ile-Ife", isActive: true },
      {
        id: "1-3",
        name: "Ss. John & Paul",
        location: "Oranfe, Ile-Ife",
        isActive: true,
      },
      { id: "1-4", name: "St Mary", location: "Igboya", isActive: true },
      { id: "1-5", name: "Holy Family", location: "Road 7", isActive: true },
      {
        id: "1-6",
        name: "St. Paul",
        location: "Mokuro, Ile-Ife",
        isActive: true,
      },
      {
        id: "1-7",
        name: "St John's",
        location: "Ilode, Ile-Ife",
        isActive: true,
      },
    ],
  },
  {
    id: "2",
    name: "Modakeke Deanery",
    isActive: true,
    parishes: [
      {
        id: "2-1",
        name: "St Augustine's",
        location: "Ipetumodu",
        isActive: true,
      },
      { id: "2-2", name: "St Patrick's", location: "Ifetedo", isActive: true },
      { id: "2-3", name: "St Francis'", location: "Modakeke", isActive: true },
      {
        id: "2-4",
        name: "Sacred Heart",
        location: "Ajebandele, Ife",
        isActive: true,
      },
      {
        id: "2-5",
        name: "St Anthony",
        location: "Ondo-Road, Ife",
        isActive: true,
      },
      {
        id: "2-6",
        name: "St Lawrence's",
        location: "Akarabata",
        isActive: true,
      },
      { id: "2-7", name: "St Peter's", location: "Olode", isActive: true },
      { id: "2-8", name: "St Joseph", location: "Mefoworade", isActive: true },
    ],
  },
  {
    id: "3",
    name: "Ilesa Deanery",
    isActive: true,
    parishes: [
      {
        id: "3-1",
        name: "St Mary's Pro-Cathedral",
        location: "Ilesa",
        isActive: true,
      },
      {
        id: "3-2",
        name: "All Saint's",
        location: "Ipetu-Ijesa",
        isActive: true,
      },
      {
        id: "3-3",
        name: "St James'",
        location: "Oke-Ese, Ilesa",
        isActive: true,
      },
      { id: "3-4", name: "St Dominic's", location: "Ifewara", isActive: true },
      {
        id: "3-5",
        name: "St Lawrence",
        location: "Imo, Ilesa",
        isActive: true,
      },
      {
        id: "3-6",
        name: "St Christopher",
        location: "Owena-Ijesa",
        isActive: true,
      },
      { id: "3-7", name: "St Michael", location: "Irojo", isActive: true },
      {
        id: "3-8",
        name: "St Raphael Military Chaplaincy",
        location: "Ipetu-Ijesha",
        isActive: true,
      },
      {
        id: "3-9",
        name: "Sacred Heart",
        location: "Ipetu-Ijesha",
        isActive: true,
      },
      { id: "3-10", name: "St Joseph", location: "Ijofi", isActive: true },
      { id: "3-11", name: "St Anthony", location: "Osu", isActive: true },
    ],
  },
  {
    id: "4",
    name: "Ibokun Deanery",
    isActive: true,
    parishes: [
      { id: "4-1", name: "St Michael's", location: "Ibokun", isActive: true },
      {
        id: "4-2",
        name: "C.K.C.",
        location: "Oloruntedo, Ilesa",
        isActive: true,
      },
      { id: "4-3", name: "St Joseph", location: "Ijebu-Jesa", isActive: true },
      {
        id: "4-4",
        name: "St Francis",
        location: "Ilare, Ijesa",
        isActive: true,
      },
      {
        id: "4-5",
        name: "Church of Resurrection",
        location: "Ireti Ayo, Ilesa",
        isActive: true,
      },
      { id: "4-6", name: "St Peter's", location: "Esa-Oke", isActive: true },
    ],
  },
  {
    id: "5",
    name: "Osogbo Deanery",
    isActive: true,
    parishes: [
      {
        id: "5-1",
        name: "St Benedict's Cathedral",
        location: "Osogbo",
        isActive: true,
      },
      {
        id: "5-2",
        name: "St Mary's",
        location: "Ayetoro, Osogbo",
        isActive: true,
      },
      {
        id: "5-3",
        name: "St. John Paul II",
        location: "Oke-Baale",
        isActive: true,
      },
      {
        id: "5-4",
        name: "St Vincent de Paul",
        location: "Ogo-Oluwa",
        isActive: true,
      },
      {
        id: "5-5",
        name: "St Thomas",
        location: "Ota-Efun, Osogbo",
        isActive: true,
      },
      {
        id: "5-6",
        name: "St Joseph",
        location: "Oke-Odo, Osogbo",
        isActive: true,
      },
      {
        id: "5-7",
        name: "St Gerald Police Chaplaincy",
        location: "Osogbo",
        isActive: true,
      },
      { id: "5-8", name: "St Lawrence", location: "Oke-Ayepe", isActive: true },
      { id: "5-9", name: "St Julius", location: "Kajola", isActive: true },
    ],
  },
  {
    id: "6",
    name: "Ede Deanery",
    isActive: true,
    parishes: [
      { id: "6-1", name: "St Anthony's", location: "Ede", isActive: true },
      {
        id: "6-2",
        name: "Sacred Heart",
        location: "Oke-Fia, Osogbo",
        isActive: true,
      },
      { id: "6-3", name: "St George", location: "Ofatedo", isActive: true },
      { id: "6-4", name: "Holy Family", location: "Owode-Ede", isActive: true },
      {
        id: "6-5",
        name: "St. John The Bapt.",
        location: "Agunbelewo",
        isActive: true,
      },
      { id: "6-6", name: "St. James", location: "Okinni", isActive: true },
      { id: "6-7", name: "St Joseph's", location: "Ifon", isActive: true },
      { id: "6-8", name: "St Thomas", location: "Ejigbo", isActive: true },
      { id: "6-9", name: "St Leo", location: "Oke-Oniti", isActive: true },
      {
        id: "6-10",
        name: "St Peter Military Chaplaincy",
        location: "Ede",
        isActive: true,
      },
    ],
  },
  {
    id: "7",
    name: "Otan Deanery",
    isActive: true,
    parishes: [
      {
        id: "7-1",
        name: "St Nicholas'",
        location: "Otan-Ayegbaju",
        isActive: true,
      },
      { id: "7-2", name: "St Anthony's", location: "Aagba", isActive: true },
      { id: "7-3", name: "St Julius", location: "Ila-Orangun", isActive: true },
      { id: "7-4", name: "St Patrick's", location: "Ororuwo", isActive: true },
      { id: "7-5", name: "St Mary's", location: "Iree", isActive: true },
      { id: "7-6", name: "St Anthony's", location: "Igbajo", isActive: true },
      {
        id: "7-7",
        name: "St. Peter",
        location: "Oke-Anaye, Otan",
        isActive: true,
      },
      {
        id: "7-8",
        name: "SS Peter & Paul",
        location: "Oke-Ila",
        isActive: true,
      },
    ],
  },
  {
    id: "8",
    name: "Inisa Deanery",
    isActive: true,
    parishes: [
      { id: "8-1", name: "St Joseph's", location: "Inisa", isActive: true },
      { id: "8-2", name: "St Paul's", location: "Ikirun", isActive: true },
      { id: "8-3", name: "St Michael's", location: "Oyan", isActive: true },
      { id: "8-4", name: "St Mary's", location: "Ijabe", isActive: true },
      { id: "8-5", name: "St Anthony's", location: "Okuku", isActive: true },
      { id: "8-6", name: "Christ the King", location: "Iba", isActive: true },
    ],
  },
];

const DeaneryStructure = () => {
  const { data, isLoading, isError } = useDeanery();
  const [activeId, setActiveId] = useState<string | null>(null);

  const deaneries: Deanery[] =
    !isLoading && !isError && Array.isArray(data) && data.length
      ? data
      : DEFAULT_DEANERIES;

  const totalParishes = deaneries.reduce(
    (acc, d) => acc + d.parishes.length,
    0,
  );

  return (
    <div className="min-h-screen bg-white">
      <DeaneryHero />

      <DeaneryStats
        deaneryCount={deaneries.length}
        parishCount={totalParishes}
      />

      {/* ── Grid ── */}
      <section className="px-6 md:px-16 lg:px-24 py-16 w-full mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-0.5 bg-primary-500" />
          <span className="text-primary-400 text-xs font-semibold uppercase tracking-widest">
            All Deaneries
          </span>
        </div>

        {isLoading && !isError ? (
          // Skeleton
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-neutral-900 rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-2 bg-neutral-700" />
                <div className="p-5 space-y-3">
                  <div className="h-5 w-2/3 bg-neutral-800 rounded-lg" />
                  <div className="h-3 w-1/3 bg-neutral-800 rounded-full" />
                  <div className="pt-3 space-y-2">
                    {[...Array(5)].map((_, j) => (
                      <div
                        key={j}
                        className="h-3 bg-neutral-800/60 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {deaneries.map((deanery, index) => (
              <DeaneryCard
                key={deanery.id}
                deanery={deanery}
                index={index}
                isActive={activeId === deanery.id}
                onToggle={() =>
                  setActiveId(activeId === deanery.id ? null : deanery.id)
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DeaneryStructure;
