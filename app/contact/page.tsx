import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Pill } from "@/components/ui/Pill";
import { ArrowUpRight } from "@/components/ui/icons";
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
      <PageHeader title="Say" accent="hello" intro="For speaking, workshops, projects and partnerships, the inquiry form is the quickest route.">
        <Pill href="/work-with-us#inquiry">Send an inquiry</Pill>
      </PageHeader>
      <section className="shell space-y-3 py-20 lg:py-28">
        {rows.map((r) => (
          <a
            key={r.label}
            href={r.href}
            {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex flex-col gap-2 rounded-[24px] bg-card p-7 transition-colors hover:bg-stage hover:text-cream sm:flex-row sm:items-center sm:justify-between sm:p-9"
          >
            <span className="text-sm text-stone group-hover:text-cream/70">{r.label}</span>
            <span className="flex items-center gap-3 break-all text-[clamp(1.5rem,4vw,3rem)] font-semibold tracking-tight">
              {r.value}
              <ArrowUpRight className="size-6 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </span>
            {r.external && <span className="sr-only">(opens in a new tab)</span>}
          </a>
        ))}
      </section>
    </>
  );
}
