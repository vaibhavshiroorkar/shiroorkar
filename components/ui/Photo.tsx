import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { draftMode } from "@/lib/publish";

const tones = {
  moss: "bg-moss text-cream",
  forest: "bg-forest text-cream",
  sand: "bg-[#e6dcc6] text-ink",
};

/**
 * A real photo when `image.src` is set, otherwise a quiet tonal block.
 * The brief (what photo belongs here) only shows in draft mode.
 */
export function Photo({
  image,
  className = "",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  tone = "moss",
  priority = false,
}: {
  image: ImageRef;
  className?: string;
  sizes?: string;
  tone?: keyof typeof tones;
  priority?: boolean;
}) {
  if (image.src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      className={`grain relative overflow-hidden ${tones[tone]} ${className}`}
      role={image.alt ? "img" : undefined}
      aria-label={image.alt || undefined}
      aria-hidden={image.alt ? undefined : true}
    >
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_30%_25%,rgba(239,232,216,0.16),transparent_70%)]" />
      {draftMode && (
        <p className="absolute inset-x-3 bottom-3 z-10 rounded-lg bg-black/35 px-3 py-2 text-[11px] leading-snug text-cream backdrop-blur-sm">
          Photo: {image.brief}
        </p>
      )}
    </div>
  );
}
