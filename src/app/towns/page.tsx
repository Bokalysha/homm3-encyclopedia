import Link from "next/link";
import { prisma } from "@/lib/prisma";

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
            className="group bg-dark-surface border border-gold/30 rounded-lg p-6 hover:border-gold/70 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300"
          >
            <h2 className="text-xl font-medieval text-gold group-hover:text-parchment-light transition-colors">
              {town.name}
            </h2>
            {town.description && (
              <p className="mt-2 text-sm text-parchment-dark line-clamp-3">
                {town.description}
              </p>
            )}
            <div className="mt-4 text-xs text-parchment-dark">
              {town.alignment}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}