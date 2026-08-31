"use client";

import Image from "next/image";

interface ResourceTextProps {
  text: string;
}

export default function ResourceText({ text }: ResourceTextProps) {
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