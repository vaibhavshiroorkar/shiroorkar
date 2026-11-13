import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ArrowIcon, ButtonLink } from "@/components/ui";
import { site, whatsappLink } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact details and social media for Udaykumar Shiroorkar.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = whatsappLink();
  const rows = [
    { label: "Email", value: site.email, href: `mailto:${site.email}`, external: false },
    ...(wa ? [{ label: "WhatsApp", value: "Message on WhatsApp", href: wa, external: true }] : []),
    ...site.socials.map((s) => ({ label: s.label, value: s.handle, href: s.url, external: true })),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Get in <em className="text-forest">touch.</em>
          </>
        }
        intro="For speaking, workshops, projects and partnerships, the inquiry form is the quickest route. For anything else, write directly."
      >
        <ButtonLink href="/work-with-us#inquiry" className="self-start">
          Send an inquiry
        </ButtonLink>
      </PageHero>

      <section className="container-page py-16 lg:py-24">
        <ul className="border-t border-line">
          {rows.map((r) => (
            <li key={r.label} className="border-b border-line">
              <a
                href={r.href}
                {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group grid gap-2 py-8 sm:grid-cols-12 sm:items-center"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted sm:col-span-3">
                  {r.label}
                </span>
                <span className="break-all font-display text-2xl transition-colors group-hover:text-forest sm:col-span-8 sm:text-4xl">
                  {r.value}
                </span>
                <ArrowIcon className="hidden size-6 justify-self-end text-forest transition-transform group-hover:translate-x-1 sm:col-span-1 sm:block" />
                {r.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">
          This website is managed by the Shiroorkar family. Engagements arranged here are kept
          separate from any non-profit or voluntary work, and no legal services are offered.
        </p>
      </section>
    </>
  );
}
