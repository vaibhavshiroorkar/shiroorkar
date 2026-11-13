import Link from "next/link";
import type { ComponentProps } from "react";
import { Arrow } from "./icons";

type Tone = "ochre" | "cream" | "stage" | "outline-cream" | "outline-ink";

const tones: Record<Tone, string> = {
  ochre: "bg-ochre text-stage hover:bg-cream",
  cream: "bg-cream text-stage hover:bg-ochre",
  stage: "bg-stage text-cream hover:bg-forest",
  "outline-cream": "border border-cream/40 text-cream hover:bg-cream hover:text-stage",
  "outline-ink": "border border-ink/25 text-ink hover:bg-ink hover:text-cream",
};

/** Rounded call-to-action. The arrow slides on hover; nothing else moves. */
export function Pill({
  tone = "ochre",
  className = "",
  arrow = true,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "className"> & { tone?: Tone; className?: string; arrow?: boolean }) {
  return (
    <Link
      {...props}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-[15px] font-semibold transition-colors duration-300 ${tones[tone]} ${className}`}
    >
      {children}
      {arrow && <Arrow className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </Link>
  );
}
