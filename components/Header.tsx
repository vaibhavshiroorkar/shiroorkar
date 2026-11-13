"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { site } from "@/content/site";
import { ArrowIcon, Wordmark } from "./ui";

export function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const close = () => dialogRef.current?.close();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link href="/" className="text-forest" aria-label={`${site.brand}, home`}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="link-grow pb-0.5 text-sm text-ink/80 transition-colors hover:text-ink aria-[current=page]:text-forest aria-[current=page]:[background-size:100%_1px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/work-with-us"
            className="group hidden min-h-11 items-center gap-2 bg-forest px-5 text-sm font-medium text-paper transition-colors hover:bg-forest-deep sm:inline-flex"
          >
            Work With Us
            <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="inline-flex size-11 items-center justify-center lg:hidden"
            aria-haspopup="dialog"
          >
            <span className="sr-only">Open menu</span>
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
              <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Native modal dialog: traps focus, closes on Escape, restores focus on close. */}
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="on-dark m-0 h-dvh max-h-none w-full max-w-none bg-forest p-0 text-paper backdrop:bg-ink/60 open:flex open:flex-col"
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" onClick={close} aria-label={`${site.brand}, home`}>
            <Wordmark />
          </Link>
          <button type="button" onClick={close} className="inline-flex size-11 items-center justify-center" autoFocus>
            <span className="sr-only">Close menu</span>
            <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
              <path d="M5 5l14 14M19 5 5 19" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="container-page flex flex-1 flex-col justify-between pb-10 pt-8">
          <ul className="flex flex-col">
            {[{ href: "/", label: "Home" }, ...site.nav].map((item) => (
              <li key={item.href} className="border-b border-paper/15">
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-center justify-between py-4 font-display text-3xl aria-[current=page]:text-ochre"
                >
                  {item.label}
                  <ArrowIcon className="size-5 opacity-60" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4">
            <Link
              href="/work-with-us"
              onClick={close}
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-paper px-6 text-sm font-medium text-forest"
            >
              Work With Us <ArrowIcon />
            </Link>
            <a href={`mailto:${site.email}`} className="text-center text-sm text-paper/70">
              {site.email}
            </a>
          </div>
        </nav>
      </dialog>
    </header>
  );
}
