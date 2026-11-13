import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.05rem] uppercase tracking-[0.32em] ${className}`}>
      Shiroorkar
    </span>
  );
}

export function ArrowIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ExternalIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={className}>
      <path d="M6 3H3v10h10v-3M9 3h4v4M13 3 7 9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

type Variant = "primary" | "secondary" | "light" | "outline-light";

const variants: Record<Variant, string> = {
  primary: "bg-forest text-paper hover:bg-forest-deep",
  secondary: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-forest hover:bg-white",
  "outline-light": "border border-paper/40 text-paper hover:border-paper hover:bg-paper hover:text-forest",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

export function ButtonLink({ variant = "primary", className = "", arrow = true, children, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 px-6 text-sm font-medium tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </Link>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="link-grow pb-0.5">{children}</span>
      {external ? (
        <ExternalIcon />
      ) : (
        <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </>
  );
  const cls = `group inline-flex items-center gap-2 text-sm font-medium ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  intro,
  action,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow className={dark ? "text-sage" : "text-forest"}>{eyebrow}</Eyebrow>
        <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h2>
      </div>
      {(intro || action) && (
        <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9">
          {intro && <p className={`text-base leading-relaxed ${dark ? "text-paper/75" : "text-muted"}`}>{intro}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
