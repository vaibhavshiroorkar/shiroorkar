"use client";

import { useState } from "react";
import { kindLabels, type MediaItem, type MediaKind } from "@/content/media";
import { MediaCard, ReelCard } from "./MediaCard";

type Filter = "all" | MediaKind;

export function MediaGallery({ items }: { items: MediaItem[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const kinds = (Object.keys(kindLabels) as MediaKind[]).filter((k) => items.some((i) => i.kind === k));
  const filters: Filter[] = ["all", ...kinds];
  const shown = filter === "all" ? items : items.filter((i) => i.kind === filter);
  const reels = shown.filter((i) => i.kind === "reel");
  const rest = shown.filter((i) => i.kind !== "reel");

  return (
    <div>
      <div role="group" aria-label="Filter media" className="relative -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className="min-h-10 shrink-0 border border-line px-4 text-sm transition-colors hover:border-ink aria-pressed:border-forest aria-pressed:bg-forest aria-pressed:text-paper"
          >
            {f === "all" ? "All" : kindLabels[f]}
            <span className="ml-2 text-xs opacity-60">
              {f === "all" ? items.length : items.filter((i) => i.kind === f).length}
            </span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} items
      </p>

      {reels.length > 0 && (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {reels.map((item) => (
            <ReelCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {rest.length > 0 && (
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
