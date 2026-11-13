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
    period: "Early life",
    periodStatus: "sourced",
    title: "From Belgaum to Mumbai",
    body: "Born in Belgaum (Belagavi), he moved to Mumbai for work and stayed out of love for the city.",
    status: "sourced",
    source: sources.prahaar2025,
  },
  {
    period: "Career",
    periodStatus: "confirmed",
    title: "Public service with the BMC",
    body: "Rises to Assistant Municipal Commissioner of the Brihanmumbai Municipal Corporation, where he becomes known as the BMC's \"Singham\".",
    status: "sourced",
    source: sources.prahaar2025,
    note: "Add joining year and postings.",
  },
  {
    period: "By 2017",
    periodStatus: "sourced",
    title: "Assistant Municipal Commissioner, 'B' Ward",
    body: "Leads drives against unauthorised construction in Madanpura, Pydhonie, Abdul Rehman Street and Nagpada.",
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    period: "June 2017",
    periodStatus: "sourced",
    title: "23 civic workers pass their SSC exams",
    body: "Learning that the Dongri Municipal Night School was about to close for lack of students, he urged the ward's Class IV workers to enrol. 21 men and 2 women, aged 30 to 50, passed in the 2016-17 exams and earned raises of up to Rs 3,000. 26 more then joined night classes.",
    status: "sourced",
    source: sources.yourStory2017,
  },
  {
    period: "August 2017",
    periodStatus: "sourced",
    title: "A caller tune for a cleaner city",
    body: "Plans a Swachh Mumbai jingle for the B Ward helpline, plus videos for residents on waste segregation and the work of street-cleaning staff.",
    status: "sourced",
    source: sources.dna2017,
  },
  {
    period: "Year to confirm",
    periodStatus: "pending",
    title: "Retires from the BMC",
    body: "Retires as Assistant Municipal Commissioner from the B Ward office.",
    status: "sourced",
    source: sources.prahaar2025,
  },
  {
    // Held back from the public site: the brief says the site must not read as a political campaign.
    period: "October 2019",
    periodStatus: "sourced",
    title: "Independent candidate, Mumbadevi",
    body: "Contests the Mumbadevi Assembly seat as an independent candidate.",
    status: "pending",
    source: sources.tv9Marathi2019,
    note: "Public fact, hidden by choice. Family to decide whether it appears on the site.",
  },
  {
    period: "29 April 2025",
    periodStatus: "sourced",
    title: "Premiere in Mumbai",
    body: "Ata Thambaycha Naay! premieres in Mumbai, two days before its release.",
    status: "sourced",
    source: sources.premiere2025,
  },
  {
    period: "1 May 2025",
    periodStatus: "sourced",
    title: "Ata Thambaycha Naay! released",
    body: "A Marathi feature film based on his story opens in theatres on Maharashtra Day, with Ashutosh Gowariker in the role. He is honoured as its real hero.",
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
