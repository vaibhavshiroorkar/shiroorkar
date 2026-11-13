"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { youtubeThumb, youtubeUrl, type Interview } from "@/content/interviews";
import { Arrow, ArrowUpRight, Play } from "@/components/ui/icons";

/**
 * Swipeable row of interviews. Each card shows the thumbnail until tapped, then
 * swaps in YouTube's privacy-enhanced player, so nothing loads or plays on its own.
 */
export function InterviewCarousel({ items }: { items: Interview[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector("li");
    if (!track || !card) return;
    track.scrollBy({ left: dir * (card.clientWidth + 16), behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          className="flex size-12 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-stage hover:text-cream"
        >
          <span className="sr-only">Previous interview</span>
          <Arrow className="size-5 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          className="flex size-12 items-center justify-center rounded-full border border-ink/20 transition-colors hover:bg-stage hover:text-cream"
        >
          <span className="sr-only">Next interview</span>
          <Arrow className="size-5" />
        </button>
      </div>

      <ul
        ref={trackRef}
        aria-label="Interviews"
        className="relative -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-10 lg:scroll-px-10 lg:px-10 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((v) => (
          <li key={v.youtubeId} className="w-[86vw] shrink-0 snap-start sm:w-[70vw] lg:w-[46vw] xl:w-[40vw]">
            <div className="relative aspect-video overflow-hidden rounded-[22px] bg-stage">
              {playing === v.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                  title={v.title}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full"
                />
              ) : (
                <button type="button" onClick={() => setPlaying(v.youtubeId)} className="group absolute inset-0">
                  <Image
                    src={youtubeThumb(v.youtubeId)}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 46vw, 86vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-stage/70 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 flex size-14 items-center justify-center rounded-full bg-cream text-stage transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 size-4" />
                  </span>
                  <span className="sr-only">Play: {v.title}</span>
                </button>
              )}
            </div>
            <p className="mt-4 text-sm text-stone">
              {v.channel}
              {v.detail ? ` . ${v.detail}` : ""}
            </p>
            <h3 className="mt-1 text-xl font-semibold leading-snug tracking-tight">{v.title}</h3>
            <a
              href={youtubeUrl(v.youtubeId)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm text-forest underline-offset-4 hover:underline"
            >
              Watch on YouTube <ArrowUpRight className="size-3.5" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
