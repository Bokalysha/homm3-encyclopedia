import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface TownsPageProps {
  searchParams: Promise<{ sort?: string }>;
}

export default async function TownsPage({ searchParams }: TownsPageProps) {
  const { sort } = await searchParams;

  let orderBy: any;
  switch (sort) {
    case "alphabet":
      orderBy = { name: "asc" };
      break;
    case "alignment":
      orderBy = { alignment: "asc" };
      break;
    case "terrain":
      orderBy = { nativeTerrain: "asc" };
      break;
    case "continent":
      orderBy = { continent: "asc" };
      break;
    default:
      orderBy = { id: "asc" };
  }

  const towns = await prisma.town.findMany({
    orderBy,
  });

  const filterItems = [
    { key: "id", label: "По игре", href: "/towns?sort=id" },
    { key: "alphabet", label: "По алфавиту", href: "/towns?sort=alphabet" },
    { key: "alignment", label: "По мировоззрению", href: "/towns?sort=alignment" },
    { key: "terrain", label: "По родной земле", href: "/towns?sort=terrain" },
    { key: "continent", label: "По континенту", href: "/towns?sort=continent" },
  ];

  const activeSort = sort || "id";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-medieval text-gold mb-8">Фракции</h1>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-2 mb-8">
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
              <h2 className="text-xl font-medieval text-gold group-hover:text-parchment-light transition-colors">
                {town.name}
              </h2>
              {town.description && (
                <p className="mt-2 text-sm text-parchment-dark line-clamp-2">
                  {town.description.replace(/\\n/g, " ")}
                </p>
              )}
              {/* <div className="mt-2 text-xs text-parchment-dark">
                {town.alignment}
              </div>
              <div className="mt-2 text-xs text-parchment-dark">
                {town.nativeTerrain}
              </div>
              <div className="mt-2 text-xs text-parchment-dark">
                {town.country}
              </div>
              <div className="mt-2 text-xs text-parchment-dark">
                {town.continent}
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}