import { sources } from "./sources";
import type { Verifiable } from "./types";

/** Only add figures with a source or family confirmation. Pending figures never render in production. */
export const impact: ({ value: string; label: string; context?: string } & Verifiable)[] = [
  {
    value: "23",
    label: "Class IV civic workers passed their SSC exams",
    context: "Years after leaving school, while working full time.",
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    value: "26",
    label: "more workers joined night classes after them",
    context: "Many had refused before out of shame.",
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    value: "1",
    label: "feature film based on his journey",
    context: "Ata Thambaycha Naay!, released 1 May 2025.",
    status: "sourced",
    source: sources.wikiFilm,
  },
];
