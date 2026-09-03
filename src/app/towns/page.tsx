import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function TownsPage() {
  const towns = await prisma.town.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-medieval text-gold mb-8">Города</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {towns.map((town) => (
          <Link
            key={town.id}
            href={`/towns/${town.slug}`}
            className="group bg-dark-surface border border-gold/30 rounded-lg overflow-hidden hover:border-gold/70 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300"
          >
            {/* Изображение главного экрана с постройками */}
            <div className="relative w-full h-48 overflow-hidden">
              {town.imageMain ? (
                <Image
                  src={town.imageMain}
                  alt={`${town.name} — главный экран`}
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
              <div className="mt-2 text-xs text-parchment-dark">
                {town.alignment}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}