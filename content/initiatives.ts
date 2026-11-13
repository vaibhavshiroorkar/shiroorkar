import type { ImageRef, Verifiable } from "./types";

/** Broad areas of work. Keep these general until specific projects are confirmed. */
export const focusAreas: ({ title: string; body: string } & Verifiable)[] = [
  {
    title: "Environmental protection",
    body: "Hands-on work to protect green cover, clean public spaces and hold polluters to account.",
    status: "confirmed",
  },
  {
    title: "Public awareness",
    body: "Short, plain-spoken Reels that explain environmental and civic issues to a general audience.",
    status: "confirmed",
  },
  {
    title: "Civic responsibility",
    body: "Lessons from decades inside city administration on how citizens and institutions can act together.",
    status: "confirmed",
  },
];

export type Initiative = {
  slug: string;
  title: string;
  category: "Project" | "Awareness" | "Community";
  location: string;
  period: string;
  summary: string;
  outcome?: string;
  image: ImageRef;
  link?: { label: string; url: string };
} & Verifiable;

/**
 * Specific projects. Every entry below is a layout placeholder (status: pending).
 * Replace with real initiatives and set status to "confirmed".
 */
export const initiatives: Initiative[] = [
  {
    slug: "initiative-one",
    title: "Lead initiative title",
    category: "Project",
    location: "Location",
    period: "Year",
    summary:
      "Two or three sentences on what the initiative set out to do, who was involved and what changed. Keep it concrete.",
    outcome: "One documented result, with a source if possible.",
    image: { src: null, alt: "", brief: "Wide field photo, 3:2, people at work on site" },
    status: "pending",
  },
  {
    slug: "initiative-two",
    title: "Awareness drive title",
    category: "Awareness",
    location: "Location",
    period: "Year",
    summary: "What the awareness activity was and who it reached.",
    image: { src: null, alt: "", brief: "Photo, 4:3, talk or rally" },
    status: "pending",
  },
  {
    slug: "initiative-three",
    title: "Community programme title",
    category: "Community",
    location: "Location",
    period: "Year",
    summary: "What the community did together and what came of it.",
    image: { src: null, alt: "", brief: "Photo, 4:3, community group" },
    status: "pending",
  },
];
