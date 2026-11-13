"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type MouseEvent } from "react";
import { scrollToTop } from "@/components/motion/SmoothScroll";
import { site } from "@/content/site";
import { Arrow } from "@/components/ui/icons";

/**
 * Floating pill navigation. It sits on a dark translucent bar so it reads the
 * same over the green stages and the light paper sections.
 */
export function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const close = () => dialogRef.current?.close();

  // On the homepage a link to "/" goes nowhere, so send the visitor back to the top instead.
  const homeClick = (e: MouseEvent<HTMLAnchorElement>) => {
    close();
    if (pathname === "/") {
      e.preventDefault();
      scrollToTop();
    }
  };
  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="shell">
        <div className="pointer-events-auto flex h-14 items-center justify-between gap-4 rounded-full bg-stage/80 pl-5 pr-2 text-cream shadow-[0_8px_30px_rgba(10,31,24,0.25)] backdrop-blur-md">
          <Link href="/" onClick={homeClick} className="display text-[22px] leading-none tracking-wide" aria-label="Shiroorkar, home">
            Shiroorkar
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active(item.href) ? "page" : undefined}
                    className="rounded-full px-4 py-2 text-sm text-cream/75 transition-colors hover:bg-cream/10 hover:text-cream aria-[current=page]:bg-cream/10 aria-[current=page]:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <Link
              href="/contact"
              className="group hidden h-10 items-center gap-2 rounded-full bg-ochre px-5 text-sm font-semibold text-stage transition-colors hover:bg-cream sm:inline-flex"
            >
              Contact
              <Arrow className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              aria-haspopup="dialog"
              className="inline-flex size-11 items-center justify-center rounded-full hover:bg-cream/10 lg:hidden"
            >
              <span className="sr-only">Open menu</span>
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path d="M4 9h16M4 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Native modal: focus trap, Escape to close and focus restore come for free. */}
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="grain pointer-events-auto m-0 h-dvh max-h-none w-full max-w-none bg-stage p-0 text-cream backdrop:bg-stage-deep/70 open:flex open:flex-col"
      >
        <div className="shell relative z-10 flex h-20 items-center justify-between">
          <span className="display text-[22px] leading-none tracking-wide">Shiroorkar</span>
          <button type="button" onClick={close} autoFocus className="inline-flex size-11 items-center justify-center rounded-full bg-cream/10">
            <span className="sr-only">Close menu</span>
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="shell relative z-10 flex flex-1 flex-col justify-between pb-10">
          <ul className="mt-6">
            {[{ href: "/", label: "Home" }, ...site.nav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={item.href === "/" ? homeClick : close}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="display block py-1.5 text-[13vw] text-cream/90 transition-colors hover:text-ochre aria-[current=page]:text-ochre sm:text-7xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            onClick={close}
            className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-ochre font-semibold text-stage"
          >
            Contact <Arrow />
          </Link>
        </nav>
      </dialog>
    </header>
  );
}
