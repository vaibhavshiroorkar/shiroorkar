import type { ReactNode } from "react";
import { Eyebrow } from "./ui";

/** Opening block for inner pages: eyebrow, oversized serif title, short intro. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line">
      <div className="container-page grid gap-8 pb-14 pt-14 lg:grid-cols-12 lg:pb-20 lg:pt-24">
        <div className="hero-in lg:col-span-8">
          <Eyebrow className="text-forest">{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
        </div>
        {(intro || children) && (
          <div className="hero-in-delay flex flex-col gap-6 lg:col-span-4 lg:self-end">
            {intro && <p className="text-lg leading-relaxed text-muted">{intro}</p>}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
