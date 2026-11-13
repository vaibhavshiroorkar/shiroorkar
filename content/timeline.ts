import { sources } from "./sources";
import type { Verifiable } from "./types";

export type TimelineEntry = {
  /** Shown only when periodStatus is not pending (or in development). */
  period: string;
  periodStatus: "confirmed" | "sourced" | "pending";
  title: string;
  body: string;
} & Verifiable;

export const timeline: TimelineEntry[] = [
  {
    period: "Career",
    periodStatus: "confirmed",
    title: "Public service with the BMC",
    body: "Rises to Assistant Municipal Commissioner of the Brihanmumbai Municipal Corporation.",
    status: "sourced",
    source: sources.fpjProfile,
    note: "Add joining year and postings.",
  },
  {
    period: "Year to confirm",
    periodStatus: "pending",
    title: "Assistant Municipal Commissioner, 'B' Ward",
    body: "Leads drives against unauthorised construction in Madanpura, Pydhonie, Abdul Rehman Street and Nagpada.",
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    period: "2016 or 2017",
    periodStatus: "pending",
    title: "23 civic workers pass their SSC exams",
    body: "Class IV workers he encouraged to return to study pass the Secondary School Certificate. 26 more sign up for night classes.",
    status: "sourced",
    source: sources.fpjProfile,
    note: "Sources disagree: FPJ says 2017, Wikipedia says 2016. Confirm.",
  },
  {
    period: "Year to confirm",
    periodStatus: "pending",
    title: "Retires from the BMC",
    body: "Retires as Assistant Municipal Commissioner.",
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    period: "1 May 2025",
    periodStatus: "sourced",
    title: "Ata Thambaycha Naay! released",
    body: "A Marathi feature film based on his story opens in theatres on Maharashtra Day, with Ashutosh Gowariker in the role.",
    status: "sourced",
    source: sources.wikiFilm,
  },
  {
    period: "2026",
    periodStatus: "sourced",
    title: "Best Film, Filmfare Awards Marathi",
    body: "The film wins Best Film and Best Director, among other awards.",
    status: "sourced",
    source: sources.wikiFilm,
  },
  {
    period: "Today",
    periodStatus: "confirmed",
    title: "Environmental work and public voice",
    body: "Works on environmental and civic causes and shares them through Instagram Reels.",
    status: "confirmed",
  },
];
