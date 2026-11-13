/**
 * Every fact on the site carries a status so nothing unverified ships by accident.
 *
 * confirmed: the family has confirmed it.
 * sourced:   reported by a public source; keep the link so readers can check it.
 * pending:   placeholder or unconfirmed. Shown in development, hidden in production
 *            unless NEXT_PUBLIC_SHOW_PENDING=true (useful for review deploys).
 */
export type Status = "confirmed" | "sourced" | "pending";

export type Source = { label: string; url: string };

export type Verifiable = {
  status: Status;
  source?: Source;
  /** Extra sources when one block draws on several reports. */
  also?: Source[];
  /** Internal note for whoever edits content. Never rendered in production. */
  note?: string;
};

/** Path under /public, e.g. "/images/portrait.jpg". Null renders a labelled placeholder. */
export type ImageRef = {
  src: string | null;
  alt: string;
  /** Shown on the placeholder so the editor knows what photo belongs here. */
  brief: string;
  credit?: string;
};
