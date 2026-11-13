import type { Metadata } from "next";
import { InquiryBand } from "@/components/InquiryBand";
import { PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { SourceNote, VerifyBadge } from "@/components/Verify";
import { ArrowLink, SectionHeader } from "@/components/ui";
import { focusAreas, initiatives } from "@/content/initiatives";
import { instagram } from "@/content/site";
import { publishable } from "@/lib/publish";

export const metadata: Metadata = {
  title: "Environmental Work",
  description:
    "Environmental initiatives, awareness activities and community work by Udaykumar Shiroorkar.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const items = publishable(initiatives);
  return (
    <>
      <PageHero
        eyebrow="Environmental work"
        title={
          <>
            Protecting the places people <em className="text-forest">share.</em>
          </>
        }
        intro="Green cover, clean public space and civic responsibility. Work on the ground, and the public conversation around it."
      >
        <ArrowLink href={instagram.url} external className="text-forest">
          Follow the work as it happens on Instagram
        </ArrowLink>
      </PageHero>

      <section className="container-page py-20 lg:py-28">
        <div className="grid gap-px bg-line sm:grid-cols-3">
          {focusAreas.map((f, i) => (
            <div key={f.title} className="reveal bg-paper p-8 lg:p-10">
              <p className="font-display text-sm text-ochre">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-6 text-2xl">{f.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-24 lg:pb-32">
        <SectionHeader
          eyebrow="Initiatives"
          title="Projects and campaigns."
          intro="Each initiative is documented with what happened, where, and what came of it."
        />
        {items.length === 0 ? (
          <div className="mt-14 border border-line p-10 text-center">
            <p className="font-display text-2xl">Project write-ups are being prepared.</p>
            <p className="mx-auto mt-3 max-w-md text-muted">
              Until then, the latest work is shared first on Instagram.
            </p>
            <div className="mt-6 flex justify-center">
              <ArrowLink href={instagram.url} external className="text-forest">
                {instagram.handle}
              </ArrowLink>
            </div>
          </div>
        ) : (
          <div className="mt-14 flex flex-col">
            {items.map((item, i) => (
              <article
                key={item.slug}
                id={item.slug}
                className="reveal grid scroll-mt-28 gap-8 border-t border-line py-12 lg:grid-cols-12 lg:gap-16"
              >
                <div className={`lg:col-span-6 ${i % 2 === 1 ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <Photo image={item.image} ratio="aspect-[3/2]" sizes="(min-width: 1024px) 45vw, 100vw" tone="paper" />
                </div>
                <div className={`flex flex-col justify-center lg:col-span-5 ${i % 2 === 1 ? "lg:order-1" : "lg:col-start-8"}`}>
                  <p className="text-xs uppercase tracking-[0.16em] text-muted">
                    {item.category} &middot; {item.location} &middot; {item.period}
                  </p>
                  <h3 className="mt-4 text-3xl leading-tight sm:text-4xl">
                    {item.title}
                    <VerifyBadge status={item.status} note={item.note} />
                  </h3>
                  <p className="mt-5 leading-relaxed text-muted">{item.summary}</p>
                  {item.outcome && (
                    <p className="mt-6 border-l-2 border-ochre pl-4 text-sm leading-relaxed">{item.outcome}</p>
                  )}
                  <div className="mt-6 flex flex-wrap gap-6">
                    {item.link && (
                      <ArrowLink href={item.link.url} external className="text-forest">
                        {item.link.label}
                      </ArrowLink>
                    )}
                    <SourceNote source={item.source} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <InquiryBand
        title="Working on an environmental project?"
        body="Talk to us about collaborating on a project, an awareness campaign or a community programme."
      />
    </>
  );
}
