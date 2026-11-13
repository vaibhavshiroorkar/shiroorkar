import type { MediaItem } from "@/content/media";
import { Photo } from "./Photo";
import { VerifyBadge } from "./Verify";
import { ExternalIcon } from "./ui";

function host(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** Vertical 9:16 card for Reels. Opens Instagram in a new tab; nothing plays on this site. */
export function ReelCard({ item, rail = false }: { item: MediaItem; rail?: boolean }) {
  // `relative` keeps the absolutely positioned sr-only text inside a scrolling rail,
  // otherwise it escapes the overflow container and widens the page.
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative block ${rail ? "w-[68vw] max-w-[260px] shrink-0 snap-start sm:w-auto sm:max-w-none" : ""}`}
    >
      <div className="relative">
        <Photo image={item.thumb} ratio="aspect-[9/16]" sizes="(min-width: 1024px) 22vw, 68vw" tone="forest" />
        <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/60 bg-ink/30 text-paper transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 16 16" className="ml-0.5 size-4" aria-hidden>
            <path d="M4 2.5v11L13 8z" fill="currentColor" />
          </svg>
        </span>
      </div>
      <p className="mt-4 text-sm font-medium leading-snug">
        {item.title}
        <VerifyBadge status={item.status} note={item.note} />
      </p>
      <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-muted">
        Watch on Instagram <ExternalIcon className="size-3" />
        <span className="sr-only">(opens instagram.com in a new tab)</span>
      </p>
    </a>
  );
}

/** Card for press, videos and photos. */
export function MediaCard({ item }: { item: MediaItem }) {
  const isPhoto = item.kind === "photo";
  const ratio = item.kind === "video" ? "aspect-video" : isPhoto ? "aspect-[4/3]" : "aspect-[3/2]";
  const domain = host(item.url);
  const inner = (
    <>
      {item.kind === "press" && !item.thumb.src ? (
        <div className="flex aspect-[3/2] flex-col justify-between bg-paper-deep p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">{item.outlet}</p>
          <p className="font-display text-6xl leading-none text-ochre" aria-hidden>
            &ldquo;
          </p>
        </div>
      ) : (
        <Photo image={item.thumb} ratio={ratio} sizes="(min-width: 1024px) 30vw, 100vw" tone="paper" />
      )}
      <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-muted">
        <span>{item.kind}</span>
        {item.date && (
          <>
            <span aria-hidden className="h-px w-4 bg-line" />
            <span>{item.date}</span>
          </>
        )}
        <VerifyBadge status={item.status} note={item.note} />
      </div>
      <h3 className="mt-3 text-xl leading-snug transition-colors group-hover:text-forest">{item.title}</h3>
      {item.excerpt && <p className="mt-2 text-sm leading-relaxed text-muted">{item.excerpt}</p>}
      {!isPhoto && domain && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
          {item.outlet ?? domain} <ExternalIcon className="size-3" />
          <span className="sr-only">(opens {domain} in a new tab)</span>
        </p>
      )}
    </>
  );

  if (isPhoto) return <figure className="group">{inner}</figure>;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
      {inner}
    </a>
  );
}
