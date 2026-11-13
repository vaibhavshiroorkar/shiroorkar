import type { Source } from "./types";

export const sources = {
  fpjProfile: {
    label: "Free Press Journal, April 2025",
    url: "https://www.freepressjournal.in/mumbai/bmc-film-ata-thambaycha-naay-celebrates-uday-shirurkars-vision-to-empower-civic-workers-through-education",
  },
  wikiFilm: {
    label: "Wikipedia: Ata Thambaycha Naay!",
    url: "https://en.wikipedia.org/wiki/Ata_Thambaycha_Naay!",
  },
  fpjRelease: {
    label: "Free Press Journal, film release",
    url: "https://www.freepressjournal.in/amp/mumbai/aata-thambaycha-nay-released-film-celebrates-bmc-workers-struggle-triumph-through-education",
  },
} satisfies Record<string, Source>;
