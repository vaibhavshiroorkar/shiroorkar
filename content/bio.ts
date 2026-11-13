import { sources } from "./sources";
import type { ImageRef, Verifiable } from "./types";

/**
 * Transparent PNG cutouts for the homepage hero. Save the file in public/images/
 * and set `src`. Until then the hero shows a neutral silhouette.
 * Desktop: full or three-quarter body, at least 2000px tall.
 * Mobile: waist-up crop of the same photo.
 */
export const heroCutout = {
  desktop: {
    src: null,
    alt: "Udaykumar Shiroorkar",
    brief: "Transparent PNG cutout, three-quarter body, at least 2000px tall",
  },
  mobile: {
    src: null,
    alt: "Udaykumar Shiroorkar",
    brief: "Transparent PNG cutout, waist-up",
  },
} satisfies Record<string, ImageRef>;

export type WorkArea = { area: string; title: string; lines: string; image: ImageRef } & Verifiable;

/**
 * The homepage "His work" cards: one per area of work, not one per chapter of
 * the film's story. Add new areas here as they are documented.
 */
export const workAreas: WorkArea[] = [
  {
    area: "Environment, today",
    title: "Green Mumbai",
    lines:
      "Protecting green cover and public space, and explaining environmental and civic issues in plain words to a growing audience on Instagram.",
    image: { src: null, alt: "", brief: "Field photo of environmental work, 4:3" },
    status: "confirmed",
    note: "Add named projects, places and dates as they are confirmed.",
  },
  {
    area: "Public service",
    title: "Public space",
    lines:
      "As Assistant Municipal Commissioner of the BMC's 'B' Ward, he led drives against unauthorised construction in Madanpura, Pydhonie, Abdul Rehman Street and Nagpada, and gave streets back to the public.",
    image: { src: null, alt: "", brief: "Street or ward office photo, 4:3" },
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    area: "Civic awareness",
    title: "Clean city",
    lines:
      "In 2017 he planned a Swachh Mumbai caller tune for the ward helpline, with videos for residents on waste segregation and the work of street-cleaning staff.",
    image: { src: null, alt: "", brief: "Cleanliness drive or ward event photo, 4:3" },
    status: "sourced",
    source: sources.dna2017,
  },
  {
    area: "Education",
    title: "Second chances",
    lines:
      "He kept a municipal night school in Dongri open by persuading the ward's civic workers to enrol. Twenty-three passed their SSC exams, a story later told in a feature film.",
    image: { src: null, alt: "", brief: "Photo with the civic workers or at the night school, 4:3" },
    status: "sourced",
    source: sources.yourStory2017,
  },
  {
    area: "Law",
    title: "Advocate",
    lines:
      "He brings a lawyer's discipline to public questions: evidence first, then a clear argument. Shown as background only; no legal services are offered.",
    image: { src: null, alt: "", brief: "Portrait at a desk or with books, 4:3" },
    status: "confirmed",
  },
];

export const portraits = {
  hero: {
    src: null,
    alt: "Udaykumar Shiroorkar",
    brief: "Hero portrait, 4:5, natural light, looking slightly off camera",
  },
  intro: {
    src: null,
    alt: "Udaykumar Shiroorkar at work in the field",
    brief: "Field photo, 4:5, at a site or with a community group",
  },
  about: {
    src: null,
    alt: "Udaykumar Shiroorkar",
    brief: "Editorial portrait, 3:4, seated or at his desk",
  },
} satisfies Record<string, ImageRef>;

export const roles: ({ label: string; title: string; body: string } & Verifiable)[] = [
  {
    label: "Public service",
    title: "Retired Assistant Municipal Commissioner, BMC",
    body: "Served the Brihanmumbai Municipal Corporation, including as Assistant Municipal Commissioner of 'B' Ward, covering Madanpura, Pydhonie, Abdul Rehman Street and Nagpada.",
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    label: "Advocacy",
    title: "Advocate",
    body: "Brings a legal professional's discipline to public questions: evidence first, then a clear argument. Presented here as background only.",
    status: "confirmed",
    note: "Confirm enrolment details before adding any dates. Do not describe legal services.",
  },
  {
    label: "Environment",
    title: "Environmental work",
    body: "Works on environmental protection and civic responsibility, and shares that work with a growing audience through Instagram Reels.",
    status: "confirmed",
  },
];

export const intro = {
  lead: "Udaykumar Shiroorkar spent his career inside one of the largest city administrations in the world. He now puts that experience to work for the environment and the communities who depend on it.",
  body: [
    "As Assistant Municipal Commissioner of the BMC's 'B' Ward, he took on unauthorised construction and reclaimed public space in some of Mumbai's densest neighbourhoods.",
    "He is best known for something quieter. He pushed the ward's Class IV civic workers, many of them sweepers and manhole cleaners, to return to their studies. Twenty-three of them passed their SSC exams, years after leaving school.",
  ],
  source: sources.fpjProfile,
};

export const philosophy = {
  quote:
    "If we work with honesty and dedication, without fear, we can complete our mission.",
  attribution: "Udaykumar Shiroorkar, speaking to the Free Press Journal",
  source: sources.fpjProfile,
};

/** Longer story for the About page. Edit freely; keep paragraphs short. */
export const story: ({ heading: string; paragraphs: string[] } & Verifiable)[] = [
  {
    heading: "A career in the city's engine room",
    paragraphs: [
      "Mumbai's municipal corporation runs the services most people never think about until they fail: drains, roads, waste, water. Udaykumar came to Mumbai from Belgaum for work, spent his working life there and rose to Assistant Municipal Commissioner. Colleagues and the press came to call him the BMC's \"Singham\".",
      "In 'B' Ward he led demolition drives against unauthorised construction to give public space back to the public. It was unpopular work in places that had grown used to the opposite.",
    ],
    status: "sourced",
    source: sources.fpjProfile,
    also: [sources.prahaar2025],
  },
  {
    heading: "The workers who went back to school",
    paragraphs: [
      "The ward's Class IV staff included sweepers, manhole cleaners and road and pipeline repairmen. Many earned less than Rs 6,000 a month and had left school early.",
      "When he learnt that the Dongri Municipal Night School was about to close for lack of students, he urged them to enrol, and filled in their forms himself. In June 2017, 21 men and 2 women aged 30 to 50 passed their SSC exams. The recognition that followed persuaded 26 more to join night classes, many of whom had refused before out of shame.",
      "\"The recognition they received from society had a ripple effect,\" he later said.",
    ],
    status: "sourced",
    source: sources.fpjProfile,
    also: [sources.yourStory2017],
  },
  {
    heading: "From the ward to the screen",
    paragraphs: [
      "The story became the Marathi feature film Ata Thambaycha Naay! (\"Now we won't stop\"), released in theatres on 1 May 2025. Shivraj Waichal directed it, and Ashutosh Gowariker plays Udaykumar.",
      "The film went on to win Best Film at the Filmfare Awards Marathi.",
    ],
    status: "sourced",
    source: sources.wikiFilm,
  },
  {
    heading: "Environmental work today",
    paragraphs: [
      "Today his focus is the environment and civic responsibility. He documents what he sees and does in short Instagram Reels: environmental activities, public issues and lessons from a life in public service.",
    ],
    status: "confirmed",
    note: "Add specific initiatives, places and dates once confirmed.",
  },
];
