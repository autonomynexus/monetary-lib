import type { ScaledAmount } from "./scaled-amount";

export type Rate<TAmount> = ScaledAmount<TAmount> | TAmount;

export type Rates<TAmount> = Record<string, Rate<TAmount>>;
