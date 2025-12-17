import type { Currency } from "../currencies";

export type MonetarySnapshot<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale: TAmount;
};
