import type { Currency } from "../currencies";

export type MonetaryOptions<TAmount> = {
  readonly amount: TAmount;
  readonly currency: Currency<TAmount>;
  readonly scale?: TAmount;
};
