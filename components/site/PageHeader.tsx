import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/** Green stage that opens every inner page, echoing the homepage hero. */
export function PageHeader({ title, accent, intro, children }: { title: string; accent?: string; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="grain relative overflow-hidden bg-stage text-cream">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(198,154,90,0.16),transparent_70%)]" />
      <div className="shell relative z-10 pb-14 pt-36 sm:pt-44 lg:pb-20">
        <Reveal>
          <h1 className="display text-[clamp(4rem,13vw,12rem)]">
            {title}{" "}
            {accent && <span className="font-serif font-normal normal-case italic tracking-normal text-ochre">{accent}</span>}
          </h1>
        </Reveal>
        {(intro || children) && (
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              {intro && <p className="max-w-xl text-lg leading-relaxed text-cream/75">{intro}</p>}
              {children}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
