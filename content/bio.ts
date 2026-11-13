import { sources } from "./sources";
import type { ImageRef, Source, Verifiable } from "./types";

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

export type StoryCard = { title: string; lines: string; image: ImageRef } & Verifiable;

/**
 * How a story is presented after its sentence. Each story gets its own so the
 * homepage never repeats itself:
 * cards:  stacking cards that slide over each other
 * trio:   three moments side by side
 * places: giant drifting place names, then the facts
 * call:   a phone mid-call to the ward helpline, beside the facts
 * reveal: a photo window that grows to fill the screen
 */
export type StoryLayout = "cards" | "trio" | "places" | "call" | "reveal";

/** A homepage story: one sentence that lights up on scroll, then its own layout. */
export type Story = {
  id: string;
  title: string;
  layout: StoryLayout;
  /** For the places layout: neighbourhoods named in the sources. */
  places?: { name: string; source: Source }[];
  statement: { text: string; accent?: boolean }[];
  /** Cited under the sentence when the sentence itself states a fact. */
  source?: Source;
  cards: StoryCard[];
};

const photo = (brief: string): ImageRef => ({ src: null, alt: "", brief });

/**
 * Homepage stories, in order. Each card states only what its source reports.
 * Add a new story here and the homepage picks it up.
 */
export const stories: Story[] = [
  {
    id: "second-chances",
    title: "Second chances",
    layout: "cards",
    statement: [
      { text: "He asked the people who clean Mumbai to go back to school." },
      { text: "Twenty-three of them passed.", accent: true },
    ],
    cards: [
      {
        title: "The school",
        lines:
          "The Dongri Municipal Night School was about to close for lack of students. He saw a way to keep it open.",
        image: photo("The Dongri night school or its classroom, 4:3"),
        status: "sourced",
        source: sources.nagpurToday,
      },
      {
        title: "The workers",
        lines:
          "Sweepers, manhole cleaners and repairmen aged 30 to 50, many earning under Rs 6,000 a month. He filled in their forms himself.",
        image: photo("Photo with the civic workers, 4:3"),
        status: "sourced",
        source: sources.yourStory2017,
      },
      {
        title: "The result",
        lines:
          "In June 2017, 21 men and 2 women passed their SSC exams and earned raises of up to Rs 3,000. Then 26 more joined night classes.",
        image: photo("The felicitation at the night school, 4:3"),
        status: "sourced",
        source: sources.yourStory2017,
      },
      {
        title: "The film",
        lines:
          "Their story became the Marathi feature film Ata Thambaycha Naay!, released on 1 May 2025, with Ashutosh Gowariker in his role.",
        image: photo("His own photo at the premiere or a screening, 4:3"),
        status: "sourced",
        source: sources.wikiFilm,
      },
    ],
  },
  {
    id: "public-space",
    title: "Public space",
    layout: "places",
    places: [
      { name: "Madanpura", source: sources.fpjProfile },
      { name: "Pydhonie", source: sources.fpjProfile },
      { name: "Abdul Rehman Street", source: sources.fpjProfile },
      { name: "Nagpada", source: sources.fpjProfile },
      { name: "Dongri", source: sources.dna2018 },
      { name: "Ismail Curtay Street", source: sources.dna2018 },
    ],
    statement: [
      { text: "In some of Mumbai's densest streets," },
      { text: "he gave public space back to the public.", accent: true },
    ],
    cards: [
      {
        title: "B Ward",
        lines:
          "As Assistant Municipal Commissioner of 'B' Ward he was responsible for Madanpura, Pydhonie, Abdul Rehman Street and Nagpada.",
        image: photo("Street scene or the ward office, 4:3"),
        status: "sourced",
        source: sources.fpjProfile,
      },
      {
        title: "The drives",
        lines:
          "He took a firm stand against unauthorised construction and led demolition drives to reclaim public space.",
        image: photo("A reclaimed street or footpath, 4:3"),
        status: "sourced",
        source: sources.fpjProfile,
      },
      {
        title: "Two wards",
        lines:
          "In 2018 he ran B Ward and C Ward at the same time, and moved to demolish illegal buildings on Ismail Curtay Street.",
        image: photo("Ward office or Ismail Curtay Street, 4:3"),
        status: "sourced",
        source: sources.dna2018,
      },
      {
        title: "Singham",
        lines: "That firmness earned him a name across Mumbai: the BMC's \"Singham\".",
        image: photo("Portrait from his BMC years, 4:3"),
        status: "sourced",
        source: sources.prahaar2025,
      },
    ],
  },
  {
    id: "clean-city",
    title: "Clean city",
    layout: "call",
    statement: [
      { text: "He wanted every call to the ward office" },
      { text: "to carry a reason to keep Mumbai clean.", accent: true },
    ],
    cards: [
      {
        title: "The tune",
        lines:
          "In 2017 he planned a Swachh Mumbai jingle as the caller tune for B Ward's civic helpline.",
        image: photo("Cleanliness drive in the ward, 4:3"),
        status: "sourced",
        source: sources.dna2017,
      },
      {
        title: "The message",
        lines:
          "Its words would change with each campaign: waste segregation one month, the work of street-cleaning staff the next.",
        image: photo("Street-cleaning staff at work, 4:3"),
        status: "sourced",
        source: sources.dna2017,
      },
      {
        title: "The videos",
        lines: "Short videos on the ward's cleanliness work were planned for residents as well.",
        image: photo("Residents or a ward awareness event, 4:3"),
        status: "sourced",
        source: sources.dna2017,
      },
    ],
  },
  {
    id: "recognition",
    title: "Recognition",
    layout: "trio",
    statement: [
      { text: "The ward officer Mumbai called Singham" },
      { text: "now speaks on national stages.", accent: true },
    ],
    cards: [
      {
        title: "Real hero",
        lines:
          "When Ata Thambaycha Naay! opened in May 2025, Prahaar welcomed him to its Mumbai office and honoured him as the film's real hero.",
        image: photo("At the Prahaar office or the premiere, 4:3"),
        status: "sourced",
        source: sources.prahaar2025,
      },
      {
        title: "Service beyond duty",
        lines: "ABP Live's Lead Inc. series sat down with him for a conversation on public service titled Service Beyond Duty.",
        image: photo("Frame from the ABP Live interview, 4:3"),
        status: "sourced",
        source: sources.abpLeadInc,
      },
      {
        title: "Ideas of India",
        lines:
          "In February 2026 he joined the ABP Ideas of India Summit on a panel titled Ordinary People, Extraordinary Achievements.",
        image: photo("On stage at Ideas of India, 4:3"),
        status: "sourced",
        source: sources.abpIdeas2026,
      },
    ],
  },
  {
    id: "environment",
    title: "Nisarg Rakshak",
    layout: "reveal",
    statement: [
      { text: "Today he goes by Nisarg Rakshak," },
      { text: "the protector of nature.", accent: true },
    ],
    source: sources.facebookPage,
    cards: [
      {
        title: "Green cover",
        lines: "Protecting green cover and shared public space, and holding the people responsible to account.",
        image: photo("Field photo of environmental work, 4:3"),
        status: "confirmed",
        note: "Add named projects, places and dates as they are confirmed.",
      },
      {
        title: "Reels",
        lines:
          "Short, plain-spoken Instagram Reels explain environmental and civic issues to a growing audience.",
        image: photo("A frame from one of his Reels, 4:3"),
        status: "confirmed",
      },
    ],
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
