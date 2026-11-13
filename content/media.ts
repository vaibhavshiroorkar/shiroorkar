import { interviews, youtubeThumb, youtubeUrl } from "./interviews";
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
    id: "dna-2018",
    kind: "press",
    title: "Illegal constructions sprout in Mumbai despite BMC demolitions",
    outlet: "DNA India",
    date: "May 2018",
    excerpt: "As ward officer for B and C Wards, he explains why illegal buildings keep rising and plans demolitions on Ismail Curtay Street.",
    url: sources.dna2018.url,
    thumb: { src: null, alt: "", brief: "Optional: press photo with permission" },
    status: "sourced",
  },
  ...interviews.map(
    (v): MediaItem => ({
      id: `video-${v.youtubeId}`,
      kind: "video",
      title: v.title,
      outlet: v.channel,
      excerpt: v.detail,
      url: youtubeUrl(v.youtubeId),
      thumb: { src: youtubeThumb(v.youtubeId), alt: "", brief: "YouTube thumbnail" },
      status: "sourced",
    }),
  ),
  {
    id: "photo-1",
    kind: "photo",
    title: "Photo caption",
    url: "#",
    thumb: { src: null, alt: "", brief: "Field photo, 4:3" },
    status: "pending",
  },
];
