import { useMemo, useState } from "react";
import LayAssociationGrid from "../../../components/about/layFaithful/LayAssociationGrid";
import LayFaithfulFilterBar from "../../../components/about/layFaithful/LayFaithfulFilterBar";
import LayFaithfulHero from "../../../components/about/layFaithful/LayFaithfulHero";
import { DEFAULT_LAY_ASSOCIATIONS } from "../../../components/about/layFaithful/defaultLayAssociations";
import { useLayFaithful } from "../../../hooks/about/useLayFaithful";
import type { LayAssociation } from "../../../services/about/layFaithfulService";

const LayFaithful = () => {
  const { data, isLoading, isError } = useLayFaithful();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const associations: LayAssociation[] =
    !isLoading && !isError && Array.isArray(data) && data.length
      ? data
      : DEFAULT_LAY_ASSOCIATIONS;

  const categories = useMemo(
    () => [...new Set(associations.map((item) => item.categoryLabel))].sort(),
    [associations],
  );

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return associations.filter((association) => {
      const leaderText = [
        association.chaplain,
        ...association.officers,
      ]
        .map((leader) => `${leader.name} ${leader.roleLabel} ${leader.parish}`)
        .join(" ")
        .toLowerCase();

      const matchSearch =
        !normalizedSearch ||
        association.name.toLowerCase().includes(normalizedSearch) ||
        association.acronym.toLowerCase().includes(normalizedSearch) ||
        association.description.toLowerCase().includes(normalizedSearch) ||
        leaderText.includes(normalizedSearch);
      const matchCategory =
        !category || association.categoryLabel === category;

      return matchSearch && matchCategory;
    });
  }, [associations, search, category]);

  const totalLeaders = associations.reduce(
    (total, association) => total + association.officers.length + 1,
    0,
  );

  const hasFilter = !!(search || category);

  return (
    <div className="min-h-screen bg-[#f7f4ef] text-neutral-900">
      <LayFaithfulHero
        totalAssociations={associations.length}
        totalLeaders={totalLeaders}
      />

      <main className="px-6 md:px-25 py-14 space-y-7">
        <LayFaithfulFilterBar
          search={search}
          category={category}
          categories={categories}
          onSearch={setSearch}
          onCategory={setCategory}
        />

        <LayAssociationGrid
          associations={hasFilter ? filtered : associations}
          isLoading={isLoading && !isError}
        />
      </main>
    </div>
  );
};

export default LayFaithful;
