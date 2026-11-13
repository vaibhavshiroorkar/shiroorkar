import type { Metadata } from "next";
import { MediaGallery } from "@/components/sections/MediaGallery";
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
  return (
    <>
      <PageHeader title="Reels &" accent="media" intro="Reels from the field, interviews and press. Videos open on their own platform; nothing plays automatically.">
        <Pill href={instagram.url} target="_blank" rel="noopener noreferrer" tone="cream">
          {instagram.handle}
        </Pill>
      </PageHeader>
      <section className="shell py-16 lg:py-24">
        <MediaGallery items={publishable(media)} />
      </section>
    </>
  );
}
