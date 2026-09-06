import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface TownsPageProps {
  searchParams: Promise<{ sort?: string; versions?: string }>;
}

// Маппинг имён файлов на читаемые названия
const versionLabels: Record<string, string> = {
  "roe.gif": "Возрождение Эрафии",
  "ab.gif": "Клинок Армагеддона",
  "hota.png": "Рог Бездны",
};

export default async function TownsPage({ searchParams }: TownsPageProps) {
  const { sort, versions } = await searchParams;

  const orderBy = ({
    alphabet: { name: "asc" as const },
    alignment: { alignment: "asc" as const },
    terrain: { nativeTerrain: "asc" as const },
    continent: { continent: "asc" as const },
    id: { id: "asc" as const },
  }[sort || "id"] ?? { id: "asc" as const }) as Record<string, "asc" | "desc">;

  const allTowns = await prisma.town.findMany({
    select: { iconVersion: true },
  });
  const availableVersions = Array.from(
    new Set(allTowns.map((t) => t.iconVersion).filter((v): v is string => !!v))
  );

  const selectedVersions = versions ? versions.split(",") : [];

  const where =
    selectedVersions.length > 0
      ? { iconVersion: { in: selectedVersions } }
      : undefined;

  const towns = await prisma.town.findMany({
    where,
    orderBy,
  });

  const createVersionHref = (version: string) => {
    const newVersions = selectedVersions.includes(version)
      ? selectedVersions.filter((v) => v !== version)
      : [...selectedVersions, version];
    const params = new URLSearchParams();
    if (sort && sort !== "id") params.set("sort", sort);
    if (newVersions.length > 0) params.set("versions", newVersions.join(","));
    const query = params.toString();
    return `/towns${query ? `?${query}` : ""}`;
  };

  const createSortHref = (sortKey: string) => {
    const params = new URLSearchParams();
    if (sortKey !== "id") params.set("sort", sortKey);
    if (selectedVersions.length > 0) params.set("versions", selectedVersions.join(","));
    const query = params.toString();
    return `/towns${query ? `?${query}` : ""}`;
  };

  const filterItems = [
    { key: "id", label: "По игре", href: createSortHref("id") },
    { key: "alphabet", label: "По алфавиту", href: createSortHref("alphabet") },
    { key: "alignment", label: "По мировоззрению", href: createSortHref("alignment") },
    { key: "terrain", label: "По родной земле", href: createSortHref("terrain") },
    { key: "continent", label: "По континенту", href: createSortHref("continent") },
  ];

  const activeSort = sort || "id";

  // Функция для получения читаемого имени версии
  const getVersionLabel = (path: string) => {
    const fileName = path.split("/").pop()?.toLowerCase() || "";
    return versionLabels[fileName] || fileName;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-medieval text-gold mb-8">Фракции</h1>

      {/* Фильтры сортировки */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterItems.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`px-4 py-2 rounded border transition-colors ${
              activeSort === item.key
                ? "bg-gold/20 border-gold text-gold"
                : "bg-dark-surface border-gold/30 text-parchment-light hover:border-gold/70"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Фильтрация по версиям */}
      {availableVersions.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-parchment-dark mr-2">Версии:</span>
          {availableVersions.map((version) => {
            const isActive = selectedVersions.includes(version);
            return (
              <Link
                key={version}
                href={createVersionHref(version)}
                className={`p-1 rounded border transition-colors ${
                  isActive
                    ? "border-gold bg-gold/20"
                    : "border-gold/30 opacity-60 hover:opacity-100"
                }`}
                title={getVersionLabel(version)}
              >
                <Image
                  src={version}
                  width={32}
                  height={32}
                  alt={getVersionLabel(version)}
                  className="rounded"
                />
              </Link>
            );
          })}

          {/* Полупрозрачные скобки с выбранными версиями */}
          {selectedVersions.length > 0 && (
            <span className="ml-2 px-3 py-1 bg-gold/20 text-parchment-light rounded text-sm">
              ({selectedVersions.map(getVersionLabel).join(", ")})
            </span>
          )}
        </div>
      )}

      <p className="mt-4 text-parchment-light leading-relaxed">
        Каждая фракция в Heroes of Might and Magic III обладает уникальными
        строениями, существами и героями, определяющими её тактический стиль.
        Выберите фракцию, чтобы узнать больше о её городе, архитектуре и боевых
        возможностях.
      </p>
      <p className="mt-4 text-parchment-light leading-relaxed">
        Фракции также отличаются мировоззрением (добрые, нейтральные, злые) и
        родной местностью, что влияет на скорость передвижения армий по карте.
      </p>

      <p className="mt-4 text-parchment-light leading-relaxed mb-8">
        Всего в игре вместе с дополнениями представлено {towns.length} фракций:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {towns.map((town) => (
          <Link
            key={town.id}
            href={`/towns/${town.slug}`}
            className="group bg-dark-surface border border-gold/30 rounded-lg overflow-hidden hover:border-gold/70 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300"
          >
            <div className="relative w-full h-48 overflow-hidden">
              {town.imageForCard ? (
                <Image
                  src={town.imageForCard}
                  alt={`${town.name} — фракция`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-dark-bg/50 flex items-center justify-center text-parchment-dark">
                  Нет изображения
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-medieval text-gold group-hover:text-parchment-light transition-colors">
                  {town.name}
                </h2>
                {town.iconVersion && (
                  <Image
                    src={town.iconVersion}
                    width={24}
                    height={24}
                    alt={`Версия ${town.name}`}
                    className="rounded"
                  />
                )}
              </div>
              {town.description && (
                <p className="mt-2 text-sm text-parchment-dark line-clamp-2">
                  {town.description.replace(/\\n/g, " ")}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}