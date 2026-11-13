import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { draftMode } from "@/lib/publish";

/**
 * Renders a real photo when `image.src` is set, otherwise a quiet placeholder.
 * The placeholder brief is only printed in draft mode, so production shows a
 * plain tonal block instead of editor notes.
 */
export function Photo({
  image,
  ratio = "aspect-[4/5]",
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  className = "",
  tone = "sage",
}: {
  image: ImageRef;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  tone?: "sage" | "paper" | "forest";
}) {
  if (image.src) {
    return (
      <figure className={`relative overflow-hidden bg-paper-deep ${ratio} ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
        />
        {image.credit && (
          <figcaption className="absolute bottom-2 right-3 text-[10px] tracking-wide text-white/80">
            {image.credit}
          </figcaption>
        )}
      </figure>
    );
  }

  const tones = {
    sage: "bg-sage-soft text-forest/70",
    paper: "bg-paper-deep text-muted",
    forest: "bg-forest-deep text-paper/60",
  };

  return (
    <div
      role={image.alt ? "img" : undefined}
      aria-label={image.alt || undefined}
      aria-hidden={image.alt ? undefined : true}
      className={`relative overflow-hidden ${tones[tone]} ${ratio} ${className}`}
    >
      <div className={`${tone === "forest" ? "contour-light" : "contour"} absolute inset-0`} aria-hidden />
      {draftMode && (
        <div className="absolute inset-x-3 bottom-3 border border-current/30 bg-paper/85 px-3 py-2 text-[11px] leading-snug text-ink">
          <span className="font-semibold tracking-wider">PHOTO</span> {image.brief}
        </div>
      )}
    </div>
  );
}
