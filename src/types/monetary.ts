import type { MonetarySnapshot } from ".";

// Monetary objects are now just plain data (same as MonetarySnapshot)
// This makes them fully serializable for Next.js
export type Monetary<TAmount> = MonetarySnapshot<TAmount>;
