"use client";

import { useState } from "react";

interface TownGalleryProps {
  images: { src: string; alt: string }[];
  soundtrack?: string;
}

export default function TownGallery({ images, soundtrack }: TownGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center">
      {/* Окно галереи */}
      <div className="w-full max-w-[800px] aspect-[800/400] rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Панель управления */}
      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={goPrev}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-surface hover:bg-gold/50 text-parchment-light transition-colors"
          aria-label="Предыдущее изображение"
        >
          🢀
        </button>

        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-gold" : "bg-dark-surface hover:bg-gold/50"
              }`}
              aria-label={`Показать изображение ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goNext}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-dark-surface hover:bg-gold/50 text-parchment-light transition-colors"
          aria-label="Следующее изображение"
        >
          🢂
        </button>
      </div>

      <p className="text-sm text-parchment-dark mt-2">{currentImage.alt}</p>

      {soundtrack && (
        <div className="mt-4 w-full max-w-[800px]">
          <audio controls className="w-full">
            <source src={soundtrack} type="audio/mpeg" />
            Ваш браузер не поддерживает аудио.
          </audio>
        </div>
      )}
    </div>
  );
}