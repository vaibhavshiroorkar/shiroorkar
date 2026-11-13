import type { Metadata } from "next";
import Link from "next/link";
import { InquiryBand } from "@/components/InquiryBand";
import { MediaGallery } from "@/components/MediaGallery";
import { PageHero } from "@/components/PageHero";
import { ArrowLink } from "@/components/ui";
import { media } from "@/content/media";
import { instagram } from "@/content/site";
import { publishable } from "@/lib/publish";

export const metadata: Metadata = {
  title: "Reels & Media",
  description:
    "Instagram Reels, videos, press coverage and photographs of Udaykumar Shiroorkar's work.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  const items = publishable(media);
  return (
    <>
      <PageHero
        eyebrow="Reels and media"
        title={
          <>
            Watch, read and <em className="text-forest">share.</em>
          </>
        }
        intro="Reels from the field, interviews and press coverage. Videos open on their own platform; nothing plays automatically."
      >
        <ArrowLink href={instagram.url} external className="text-forest">
          {instagram.handle} on Instagram
        </ArrowLink>
      </PageHero>

      <section className="container-page py-16 lg:py-24">
        <MediaGallery items={items} />
      </section>

      <section className="container-page pb-24">
        <div className="grid gap-6 border-t border-line pt-10 sm:grid-cols-2">
          <p className="font-display text-2xl">Journalists and producers</p>
          <p className="text-muted">
            For interviews, features and documentary requests, use the media option on the{" "}
            <Link href="/work-with-us?type=media#inquiry" className="text-forest underline underline-offset-4">
              inquiry form
            </Link>
            .
          </p>
        </div>
      </section>

      <InquiryBand />
    </>
  );
}
