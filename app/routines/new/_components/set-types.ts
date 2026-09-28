import type { SetType } from "@/lib/types";

// The colour a set's badge carries, shared by the row and the picker so the two
// can't drift apart. Warm-up is the only one that needed a new token; failure
// reuses danger and drop reuses brand.
export const SET_TYPE_COLORS: Record<SetType, string> = {
  warmup: "text-warning",
  normal: "text-ink",
  failure: "text-danger",
  drop: "text-brand",
};

export const SET_TYPE_OPTIONS = [
  { type: "warmup", badge: "W", name: "Warm Up Set" },
  { type: "normal", badge: "1", name: "Normal Set" },
  { type: "failure", badge: "F", name: "Failure Set" },
  { type: "drop", badge: "D", name: "Drop Set" },
] as const satisfies readonly { type: SetType; badge: string; name: string }[];
