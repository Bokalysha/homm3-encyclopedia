import Link from "next/link";

const sections = [
  {
    title: "Существа",
    description: "Все существа, их характеристики, улучшения и способности",
    icon: "🐉",
    href: "/creatures",
  },
  {
    title: "Герои",
    description: "Герои всех фракций, стартовые навыки и специализации",
    icon: "⚔️",
    href: "/heroes",
  },
  {
    title: "Заклинания",
    description: "Школы магии, уровни заклинаний, эффекты",
    icon: "✨",
    href: "/spells",
  },
  {
    title: "Артефакты",
    description: "Магические предметы, их бонусы и редкость",
    icon: "💍",
    href: "/artifacts",
  },
  {
    title: "Фракции",
    description: "Фракционные города, строения, найм существ",
    icon: "🏰",
    href: "/towns",
  },
  {
    title: "Лор",
    description: "История мира, фракций и ключевых персонажей",
    icon: "📜",
    href: "/lore",
  },
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-medieval text-gold">
          Визуальная энциклопедия
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group bg-dark-surface border border-gold/30 rounded-lg p-6 hover:border-gold/70 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300"
          >
            <div className="text-4xl mb-4">{section.icon}</div>
            <h2 className="text-xl font-medieval text-gold group-hover:text-parchment-light transition-colors">
              {section.title}
            </h2>
            <p className="mt-2 text-sm text-parchment-dark">
              {section.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}