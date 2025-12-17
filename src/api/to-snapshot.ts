import type { Monetary } from "../types";

export function toSnapshot<TAmount>(monetaryObject: Monetary<TAmount>) {
  // Monetary objects are now POJOs, so they're already snapshots
  return monetaryObject;
}
