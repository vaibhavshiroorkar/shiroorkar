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

/** Short chapters for the homepage stacking cards. Each line is sourced. */
export const chapters: ({ title: string; lines: string; image: ImageRef } & Verifiable)[] = [
  {
    title: "The ward",
    lines:
      "As Assistant Municipal Commissioner of the BMC's 'B' Ward, he took on unauthorised construction in Madanpura, Pydhonie, Abdul Rehman Street and Nagpada.",
    image: { src: null, alt: "", brief: "Street or ward office photo, 4:3" },
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    title: "The workers",
    lines:
      "He pushed sweepers and manhole cleaners, many earning under Rs 6,000 a month, to go back to their studies. Twenty-three passed their SSC exams.",
    image: { src: null, alt: "", brief: "Photo with civic workers, 4:3" },
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    title: "The film",
    lines:
      "Their story became the Marathi feature film Ata Thambaycha Naay!, released on 1 May 2025, with Ashutosh Gowariker in his role.",
    image: { src: null, alt: "", brief: "Photo at the premiere or screening (own photo only), 4:3" },
    status: "sourced",
    source: sources.wikiFilm,
  },
  {
    title: "The work today",
    lines:
      "Now his cause is the environment: protecting green cover and public space, and explaining civic issues in plain words on Instagram.",
    image: { src: null, alt: "", brief: "Field photo of environmental work, 4:3" },
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
      "Mumbai's municipal corporation runs the services most people never think about until they fail: drains, roads, waste, water. Udaykumar spent his working life there and rose to Assistant Municipal Commissioner.",
      "In 'B' Ward he led demolition drives against unauthorised construction to give public space back to the public. It was unpopular work in places that had grown used to the opposite.",
    ],
    status: "sourced",
    source: sources.fpjProfile,
  },
  {
    heading: "The workers who went back to school",
    paragraphs: [
      "The ward's Class IV staff included sweepers, manhole cleaners and road and pipeline repairmen. Many earned less than Rs 6,000 a month and had left school early.",
      "He encouraged them to study again. Twenty-three passed their SSC exams. The recognition that followed persuaded 26 more to join night classes, many of whom had refused before out of shame.",
      "\"The recognition they received from society had a ripple effect,\" he later said.",
    ],
    status: "sourced",
    source: sources.fpjProfile,
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
