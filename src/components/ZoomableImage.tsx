"use client";

import Image from "next/image";
import { useLightbox } from "./Lightbox";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  [key: string]: any;
}

export default function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
  ...rest
}: ZoomableImageProps) {
  const { openLightbox } = useLightbox();

  return (
    <button
      onClick={() => openLightbox(src, alt)}
      className="cursor-zoom-in"
      style={{ background: "none", border: "none", padding: 0 }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        {...rest}
      />
    </button>
  );
}