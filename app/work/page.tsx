import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { PageHeader } from "@/components/site/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { Pill } from "@/components/ui/Pill";
import { SourceLink, VerifyBadge } from "@/components/ui/Verify";
import { focusAreas, initiatives } from "@/content/initiatives";
import { instagram } from "@/content/site";
import { publishable } from "@/lib/publish";

export const metadata: Metadata = {
  title: "Environmental Work",
  description: "Environmental initiatives, awareness activities and community work by Udaykumar Shiroorkar.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const items = publishable(initiatives);
  return (
    <>
      <PageHeader title="The" accent="work" intro="Green cover, clean public space and civic responsibility. Work on the ground, and the public conversation around it." />

      <section className="shell grid gap-4 py-20 md:grid-cols-3 lg:py-28">
        {focusAreas.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="flex h-full flex-col justify-between gap-16 rounded-[28px] bg-card p-8">
              <span className="display text-6xl text-ochre">{String(i + 1)}</span>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-stage">{f.title}</h2>
                <p className="mt-3 text-stone">{f.body}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="shell pb-28">
        {items.length === 0 ? (
          <div className="grain relative overflow-hidden rounded-[28px] bg-stage p-10 text-cream sm:p-14">
            <p className="display relative z-10 text-[clamp(2.5rem,6vw,5rem)]">Write-ups are on the way</p>
            <p className="relative z-10 mt-4 max-w-lg text-cream/75">Until then, the latest work is shared first on Instagram.</p>
            <div className="relative z-10 mt-8">
              <Pill href={instagram.url} target="_blank" rel="noopener noreferrer">
                {instagram.handle}
              </Pill>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {items.map((item) => (
              <Reveal key={item.slug}>
                <article id={item.slug} className="grid scroll-mt-28 gap-6 rounded-[28px] bg-card p-4 md:grid-cols-2 md:p-6">
                  <Photo image={item.image} className="aspect-[4/3] rounded-2xl" sizes="(min-width: 768px) 45vw, 100vw" />
                  <div className="flex flex-col justify-center p-2 md:p-6">
                    <p className="text-sm text-stone">
                      {item.category} . {item.location} . {item.period}
                    </p>
                    <h2 className="mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-tight tracking-tight text-stage">
                      {item.title}
                      <VerifyBadge status={item.status} note={item.note} />
                    </h2>
                    <p className="mt-4 text-lg text-ink/80">{item.summary}</p>
                    {item.outcome && <p className="mt-4 rounded-2xl bg-paper px-5 py-4">{item.outcome}</p>}
                    <SourceLink source={item.source} className="mt-4" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
