"use client";

import { useState } from "react";
import Image from "next/image";
import ResourceText from "./ResourceText";
import type { Building } from "@prisma/client";

interface BuildingsCategoryProps {
  category: string;
  buildings: Building[];
}

export default function BuildingsCategory({ category, buildings }: BuildingsCategoryProps) {
  const [isOpen, setIsOpen] = useState(true); // по умолчанию открыто

  if (buildings.length === 0) return null;

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between bg-dark-surface/80 border border-gold/60 rounded-t-lg px-4 py-3 text-left hover:bg-dark-surface transition-colors"
      >
        <span className="text-xl font-medieval text-parchment-light">
          {category}
        </span>
        <span className="text-gold text-2xl leading-none">
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
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
              {buildings.map((building) => (
                <tr
                  key={building.id}
                  className="hover:bg-dark-surface/10 transition-colors"
                >
                  <td className="p-2 border border-gold/60">
                    {building.image ? (
                      <Image
                        src={building.image}
                        width={150}
                        height={70}
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
                    {building.description ? (
                      <ResourceText text={building.description} />
                    ) : (
                      "—"
                    )}
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
      )}
    </div>
  );
}