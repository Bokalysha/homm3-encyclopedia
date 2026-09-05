import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import TownGallery from "@/components/TownGallery";

export const dynamic = "force-dynamic";

interface TownPageProps {
  params: Promise<{ slug: string }>;
}

function ResourceText({ text }: { text: string }) {
  const parts = text.split(/(\d+)|(золотых|золота)/gi).filter(Boolean);

  return (
    <>
      {parts.map((part, index) => {
        const lower = part.toLowerCase();
        if (lower === "золотых" || lower === "золота") {
          return (
            <Image
              key={index}
              src="/images/gold-mini.webp"
              width={20}
              height={16}
              alt="золото"
              className="inline-block mx-0.5"
            />
          );
        }
        if (/^\d+$/.test(part)) {
          return (
            <span key={index} className="italic">
              {part}
            </span>
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
}

export default async function TownPage({ params }: TownPageProps) {
  const { slug } = await params;

  const town = await prisma.town.findUnique({
    where: { slug },
    include: { buildings: true },
  });

  if (!town) notFound();

  const categories = Array.from(
    new Set(town.buildings.map((b) => b.category))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/towns"
        className="text-parchment-dark hover:text-gold transition-colors"
      >
        ← Все фракции
      </Link>
      <div className="flex items-center gap-3 mt-4">
        {town.icon && (
          <Image
            src={town.icon}
            width={48}
            height={32}
            alt={`Иконка города ${town.name}`}
            className="border border-gold/60 rounded"
          />
        )}
        <h1 className="text-4xl font-medieval text-gold">{town.name}</h1>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 table-bg p-2 border border-gold/60 rounded">
        <div className="p-3 border border-gold/60">
          <span className="text-parchment-light">Мировоззрение: {town.alignment}</span>
        </div>
        <div className="p-3 border border-gold/60">
          <span className="text-parchment-light">Родная местность: {town.nativeTerrain}</span>
        </div>
        <div className="p-3 border border-gold/60">
          <span className="text-parchment-light">Государство: {town.country}</span>
        </div>
        <div className="p-3 border border-gold/60">
          <span className="text-parchment-light">Континент: {town.continent}</span>
        </div>
      </div>
      <div className="mt-4 flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {town.description &&
            town.description
              .replace(/\\n/g, "\n")
              .split(/\n\s*\n/)
              .map((paragraph, index) => (
                <p key={index} className="text-parchment-light leading-relaxed">
                  {paragraph}
                </p>
              ))}
        </div>
        <div className="flex-1 lg:max-w-md">
          <TownGallery
            images={[
              town.imageWithoutFort ? { src: town.imageWithoutFort, alt: "Сельская управа" } : null,
              town.imageWithFort ? { src: town.imageWithFort, alt: "Форт" } : null,
              town.imageWithCitadel ? { src: town.imageWithCitadel, alt: "Цитадель" } : null,
              town.imageWithCastle ? { src: town.imageWithCastle, alt: "Замок" } : null,
              town.imageMain ? { src: town.imageMain, alt: "Внутренний вид города" } : null,
              town.imageMainNoBuildings ? { src: town.imageMainNoBuildings, alt: "Внутренний вид города без построек" } : null,
            ].filter(Boolean) as { src: string; alt: string }[]}
            soundtrack={town.soundtrack || undefined}
          />
        </div>
      </div>

      <h2 className="text-2xl font-medieval text-gold mt-10 mb-4">
        Постройки
      </h2>
      {categories.map((category) => (
        <details key={category} className="mb-4 group">
          <summary className="cursor-pointer flex items-center justify-between bg-dark-surface/80 border border-gold/60 rounded-t-lg px-4 py-3 text-left hover:bg-dark-surface transition-colors list-none">
            <span className="text-xl font-medieval text-parchment-light">
              {category}
            </span>
            <span className="text-gold text-2xl leading-none group-open:hidden">+</span>
            <span className="text-gold text-2xl leading-none hidden group-open:inline">−</span>
          </summary>

          <div className="border border-t-0 border-gold/60 rounded-b-lg overflow-x-auto bg-dark-bg/20">
            <table className="w-full text-left border-collapse table-bg">
              <thead>
                <tr className="text-parchment-light text-center">
                  <th className="p-2 border border-gold/60 text-lg">Изображение</th>
                  <th className="p-2 border border-gold/60 text-lg">Название</th>
                  <th className="p-2 border border-gold/60 text-lg">Описание</th>
                  <th className="p-2 border border-gold/60 text-lg">Золото</th>
                  <th className="p-2 border border-gold/60 text-lg">Ресурсы</th>
                  <th className="p-2 border border-gold/60 text-lg">Требования</th>
                </tr>
              </thead>
              <tbody>
                {town.buildings
                  .filter((b) => b.category === category)
                  .map((building) => (
                    <tr
                      key={building.id}
                      className="hover:bg-dark-surface/10 transition-colors"
                    >
                      <td className="p-2 border border-gold/60">
                        {building.image ? (
                          <Image
                            src={building.image}
                            width={250}
                            height={120}
                            alt={building.name}
                            className="rounded border border-gold/60 transition-transform duration-300 hover:scale-110"
                          />
                        ) : (
                          <span className="text-parchment-dark">—</span>
                        )}
                      </td>
                      <td className="p-2 border border-gold/60 text-parchment-light font-bold">
                        {building.name}
                      </td>
                      <td className="p-2 border border-gold/60 text-parchment-dark">
                        {building.description ? <ResourceText text={building.description} /> : "—"}
                      </td>
                      <td className="p-2 border border-gold/60 text-parchment-light">
                        {building.goldCost > 0 ? (
                          <div className="flex items-center gap-1">
                            <span className="italic">{building.goldCost}</span>
                            <Image
                              src="/images/gold-mini.webp"
                              width={20}
                              height={16}
                              alt="Золото"
                            />
                          </div>
                        ) : (
                          <span className="text-parchment-dark">—</span>
                        )}
                      </td>
                      <td className="p-2 border border-gold/60 text-parchment-light">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          {building.woodCost > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="italic">{building.woodCost}</span>
                              <Image src="/images/wood-mini.webp" width={20} height={16} alt="Дерево" />
                            </span>
                          )}
                          {building.oreCost > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="italic">{building.oreCost}</span>
                              <Image src="/images/ore-mini.webp" width={20} height={16} alt="Руда" />
                            </span>
                          )}
                          {building.mercuryCost > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="italic">{building.mercuryCost}</span>
                              <Image src="/images/mercury-mini.webp" width={20} height={16} alt="Ртуть" />
                            </span>
                          )}
                          {building.sulfurCost > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="italic">{building.sulfurCost}</span>
                              <Image src="/images/sulfur-mini.webp" width={20} height={16} alt="Сера" />
                            </span>
                          )}
                          {building.crystalCost > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="italic">{building.crystalCost}</span>
                              <Image src="/images/crystal-mini.webp" width={20} height={16} alt="Кристаллы" />
                            </span>
                          )}
                          {building.gemCost > 0 && (
                            <span className="flex items-center gap-1">
                              <span className="italic">{building.gemCost}</span>
                              <Image src="/images/gem-mini.webp" width={20} height={16} alt="Самоцветы" />
                            </span>
                          )}
                          {building.woodCost === 0 &&
                            building.oreCost === 0 &&
                            building.mercuryCost === 0 &&
                            building.sulfurCost === 0 &&
                            building.crystalCost === 0 &&
                            building.gemCost === 0 && (
                            <span className="text-parchment-dark">—</span>
                          )}
                        </div>
                      </td>
                      <td className="p-2 border border-gold/60 text-parchment-dark">
                        {building.requirements || "—"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </details>
      ))}
    </div>
  );
}