import type { Source, Status } from "@/content/types";
import { draftMode } from "@/lib/publish";
import { ExternalIcon } from "./ui";

/** Draft-only marker so editors can see what still needs confirming. */
export function VerifyBadge({ status, note }: { status: Status; note?: string }) {
  if (!draftMode || status === "confirmed") return null;
  const label = status === "pending" ? "TO VERIFY" : "PRESS SOURCED";
  return (
    <span
      title={note}
      className={`ml-2 inline-block align-middle px-1.5 py-0.5 font-sans text-[10px] font-semibold tracking-wider ${
        status === "pending" ? "bg-ochre text-ink" : "bg-sage-soft text-forest"
      }`}
    >
      {label}
    </span>
  );
}

/** Public citation, shown in production too. Builds trust the way photo credits do. */
export function SourceNote({ source, dark = false }: { source?: Source; dark?: boolean }) {
  if (!source) return null;
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-xs underline-offset-4 hover:underline ${
        dark ? "text-paper/60" : "text-muted"
      }`}
    >
      Source: {source.label}
      <ExternalIcon className="size-3" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}
