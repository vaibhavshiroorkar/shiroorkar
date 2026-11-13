"use client";

import { useState } from "react";
import { kindLabels, type MediaItem, type MediaKind } from "@/content/media";
import { Photo } from "@/components/ui/Photo";
import { VerifyBadge } from "@/components/ui/Verify";
import { ArrowUpRight, Play } from "@/components/ui/icons";

type Filter = "all" | MediaKind;

function Card({ item }: { item: MediaItem }) {
  const reel = item.kind === "reel";
  const isPhoto = item.kind === "photo";
  const ratio = reel ? "aspect-[9/16]" : item.kind === "video" ? "aspect-video" : "aspect-[4/3]";
  const body = (
    <>
      <div className="relative overflow-hidden rounded-[22px]">
        {item.kind === "press" && !item.thumb.src ? (
          <div className="grain relative flex aspect-[4/3] items-end bg-forest p-6 text-cream">
            <span className="display relative z-10 text-5xl">{item.outlet}</span>
          </div>
        ) : (
          <Photo image={item.thumb} tone={reel ? "forest" : "sand"} className={`${ratio} transition-transform duration-700 group-hover:scale-[1.03]`} sizes="(min-width: 1024px) 30vw, 100vw" />
        )}
        {(reel || item.kind === "video") && (
          <span className="absolute left-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-cream/90 text-stage">
            <Play className="ml-0.5 size-3.5" />
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-stone">
        {kindLabels[item.kind]}
        {item.date ? ` . ${item.date}` : ""}
        <VerifyBadge status={item.status} note={item.note} />
      </p>
      <h3 className="mt-1 flex items-start gap-2 text-xl font-semibold leading-snug tracking-tight">
        {item.title}
        {!isPhoto && <ArrowUpRight className="mt-1.5 size-4 shrink-0" />}
      </h3>
      {item.excerpt && <p className="mt-2 text-stone">{item.excerpt}</p>}
    </>
  );
  if (isPhoto) return <figure className="group">{body}</figure>;
  return (
    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const kinds = (Object.keys(kindLabels) as MediaKind[]).filter((k) => items.some((i) => i.kind === k));
  const shown = filter === "all" ? items : items.filter((i) => i.kind === filter);

  return (
    <div>
      <div role="group" aria-label="Filter media" className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {(["all", ...kinds] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className="h-11 shrink-0 rounded-full border border-ink/15 px-5 text-sm font-medium transition-colors hover:border-ink aria-pressed:border-stage aria-pressed:bg-stage aria-pressed:text-cream"
          >
            {f === "all" ? "All" : kindLabels[f]}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} items
      </p>
      {shown.length === 0 ? (
        <p className="mt-12 text-stone">Nothing here yet.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
