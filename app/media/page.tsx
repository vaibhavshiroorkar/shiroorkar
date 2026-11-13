import type { Metadata } from "next";
import { MediaGallery } from "@/components/sections/MediaGallery";
import { ReelsRail } from "@/components/sections/ReelsRail";
import { PageHeader } from "@/components/site/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { media } from "@/content/media";
import { instagram } from "@/content/site";
import { publishable } from "@/lib/publish";

export const metadata: Metadata = {
  title: "Reels & Media",
  description: "Instagram Reels, videos, press coverage and photographs of Udaykumar Shiroorkar's work.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  const items = publishable(media);
  const reels = items.filter((m) => m.kind === "reel");
  const others = items.filter((m) => m.kind !== "reel");
  return (
    <>
      <PageHeader title="Reels &" accent="media" intro="Reels from the field, interviews and press. Videos open on their own platform; nothing plays automatically.">
        <Pill href={instagram.url} target="_blank" rel="noopener noreferrer" tone="cream">
          {instagram.handle}
        </Pill>
      </PageHeader>
      {reels.length > 0 ? (
        <ReelsRail reels={reels} profile={instagram} />
      ) : (
        <section className="shell pt-16 lg:pt-24">
          <a
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grain group relative flex flex-col justify-between gap-10 overflow-hidden rounded-[28px] bg-stage p-8 text-cream sm:p-12 md:flex-row md:items-end"
          >
            <span className="display relative z-10 text-[clamp(3rem,8vw,7rem)]">Watch the Reels</span>
            <span className="relative z-10 inline-flex items-center gap-2 text-lg">{instagram.handle} on Instagram</span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </section>
      )}
      <section className="shell py-16 lg:py-24">
        {/* Reels have their own row above, so the gallery shows everything else. */}
        <MediaGallery items={others} />
      </section>
    </>
  );
}
