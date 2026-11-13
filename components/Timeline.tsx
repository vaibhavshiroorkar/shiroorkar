import { timeline } from "@/content/timeline";
import { draftMode, publishable } from "@/lib/publish";
import { SourceNote, VerifyBadge } from "./Verify";

export function Timeline() {
  const entries = publishable(timeline);
  return (
    <ol className="relative">
      {entries.map((entry) => {
        const showPeriod = entry.periodStatus !== "pending" || draftMode;
        return (
          <li key={entry.title} className="reveal grid gap-3 border-t border-line py-8 md:grid-cols-12 md:gap-8">
            <p className="font-display text-xl text-forest md:col-span-3">
              {showPeriod ? entry.period : ""}
              {entry.periodStatus === "pending" && <VerifyBadge status="pending" note={entry.note} />}
            </p>
            <div className="md:col-span-8">
              <h3 className="text-2xl leading-snug sm:text-3xl">
                {entry.title}
                <VerifyBadge status={entry.status} note={entry.note} />
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{entry.body}</p>
              {entry.source && (
                <div className="mt-3">
                  <SourceNote source={entry.source} />
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
