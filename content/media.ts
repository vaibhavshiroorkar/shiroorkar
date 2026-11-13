import { sources } from "./sources";
import type { ImageRef, Verifiable } from "./types";

export type MediaKind = "reel" | "video" | "press" | "photo";

export type MediaItem = {
  id: string;
  kind: MediaKind;
  title: string;
  /** Where the item opens. Reels and videos open on their own platform; nothing autoplays here. */
  url: string;
  outlet?: string;
  date?: string;
  excerpt?: string;
  thumb: ImageRef;
  featured?: boolean;
} & Verifiable;

export const kindLabels: Record<MediaKind, string> = {
  reel: "Reels",
  video: "Videos",
  press: "Press",
  photo: "Photos",
};

const reelThumb = (n: number): ImageRef => ({
  src: null,
  alt: "",
  brief: `Reel ${n} cover frame, 9:16`,
});

/**
 * To add a Reel: copy its link from Instagram (Share -> Copy link), save a cover
 * frame to /public/images/reels/, then add an entry with status "confirmed".
 */
export const media: MediaItem[] = [
  {
    id: "reel-1",
    kind: "reel",
    title: "Reel title",
    url: "https://www.instagram.com/udaykumarshiroorkar/",
    thumb: reelThumb(1),
    featured: true,
    status: "pending",
  },
  {
    id: "reel-2",
    kind: "reel",
    title: "Reel title",
    url: "https://www.instagram.com/udaykumarshiroorkar/",
    thumb: reelThumb(2),
    featured: true,
    status: "pending",
  },
  {
    id: "reel-3",
    kind: "reel",
    title: "Reel title",
    url: "https://www.instagram.com/udaykumarshiroorkar/",
    thumb: reelThumb(3),
    featured: true,
    status: "pending",
  },
  {
    id: "reel-4",
    kind: "reel",
    title: "Reel title",
    url: "https://www.instagram.com/udaykumarshiroorkar/",
    thumb: reelThumb(4),
    featured: true,
    status: "pending",
  },
  {
    id: "fpj-profile",
    kind: "press",
    title: "BMC film celebrates Uday Shirurkar's vision to empower civic workers through education",
    outlet: "Free Press Journal",
    date: "April 2025",
    excerpt:
      "How a ward officer pushed sweepers and manhole cleaners back to their books, and the film it inspired.",
    url: sources.fpjProfile.url,
    thumb: { src: null, alt: "", brief: "Optional: press photo with permission" },
    status: "sourced",
  },
  {
    id: "fpj-release",
    kind: "press",
    title: "Aata Thambaycha Nay! released: film celebrates BMC workers' struggle and triumph through education",
    outlet: "Free Press Journal",
    date: "May 2025",
    url: sources.fpjRelease.url,
    thumb: { src: null, alt: "", brief: "Optional: press photo with permission" },
    status: "sourced",
  },
  {
    id: "prahaar-2025",
    kind: "press",
    title: "Udaykumar Shiroorkar: problems will always exist, find the solution",
    outlet: "Prahaar",
    date: "May 2025",
    excerpt: "The BMC's \"Singham\" visits Prahaar and is honoured as the real hero of Ata Thambaycha Naay! (Marathi)",
    url: sources.prahaar2025.url,
    thumb: { src: null, alt: "", brief: "Optional: press photo with permission" },
    status: "sourced",
  },
  {
    id: "premiere-2025",
    kind: "press",
    title: "Star-studded premiere for Ata Thambaycha Naay! marks a tribute to Mumbai's unsung heroes",
    outlet: "Social News XYZ",
    date: "April 2025",
    url: sources.premiere2025.url,
    thumb: { src: null, alt: "", brief: "Optional: premiere photo with permission" },
    status: "sourced",
  },
  {
    id: "dna-2017",
    kind: "press",
    title: "Soon, B-ward's caller tune to spread cleanliness word",
    outlet: "DNA India",
    date: "August 2017",
    excerpt: "A Swachh Mumbai jingle for the ward helpline, planned while he was B Ward's Assistant Municipal Commissioner.",
    url: sources.dna2017.url,
    thumb: { src: null, alt: "", brief: "Optional: press photo with permission" },
    status: "sourced",
  },
  {
    id: "yourstory-2017",
    kind: "press",
    title: "Meet the sweepers, manhole cleaners and repairmen who have cleared the SSC exam",
    outlet: "YourStory",
    date: "June 2017",
    excerpt: "The original story of the 23 workers, felicitated at Dongri Municipal Night School.",
    url: sources.yourStory2017.url,
    thumb: { src: null, alt: "", brief: "Optional: press photo with permission" },
    status: "sourced",
  },
  {
    id: "nagpur-today-2017",
    kind: "press",
    title: "23 BMC workers clear class X exam",
    outlet: "Nagpur Today",
    date: "2017",
    url: sources.nagpurToday.url,
    thumb: { src: null, alt: "", brief: "Optional: press photo with permission" },
    status: "sourced",
  },
  {
    id: "mumbai-live-flag",
    kind: "press",
    title: "'Singham' Uday Shirurkar hoists the national flag",
    outlet: "Mumbai Live",
    url: sources.mumbaiLive.url,
    thumb: { src: null, alt: "", brief: "Optional: press photo with permission" },
    status: "sourced",
  },
  {
    id: "youtube-interview",
    kind: "video",
    title: "Interview: retired Assistant Commissioner Udaykumar Shiroorkar",
    outlet: "YouTube",
    url: sources.youtubeInterview.url,
    thumb: { src: null, alt: "", brief: "Video thumbnail, 16:9 (save a frame from the interview)" },
    status: "sourced",
  },
  {
    id: "photo-1",
    kind: "photo",
    title: "Photo caption",
    url: "#",
    thumb: { src: null, alt: "", brief: "Field photo, 4:3" },
    status: "pending",
  },
];
