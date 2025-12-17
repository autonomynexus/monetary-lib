import type { ScaledAmount } from "../types";

import { isScaledAmount } from "./is-scaled-amount";

export function getAmountAndScale<TAmount>(
  value: ScaledAmount<TAmount> | TAmount,
  zero: TAmount
): { amount: TAmount; scale: TAmount } {
  if (isScaledAmount(value)) {
    return { amount: value.amount, scale: value.scale ?? zero };
  }

  return { amount: value, scale: zero };
}
