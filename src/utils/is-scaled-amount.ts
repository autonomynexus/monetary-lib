import type { Rate, ScaledAmount } from "../types";

export function isScaledAmount<TAmount>(
  amount: Rate<TAmount>
): amount is ScaledAmount<TAmount> {
  return amount != null && typeof amount === "object" && "amount" in amount;
}
