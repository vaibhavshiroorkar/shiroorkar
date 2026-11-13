import type { Status } from "@/content/types";

const showPending =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PENDING === "true";

/** True when draft markers (TO VERIFY badges, internal notes) should be visible. */
export const draftMode = showPending;

export function isPublishable(status: Status) {
  return status !== "pending" || showPending;
}

export function publishable<T extends { status: Status }>(items: T[]): T[] {
  return items.filter((item) => isPublishable(item.status));
}
