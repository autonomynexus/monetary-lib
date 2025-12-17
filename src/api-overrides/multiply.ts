import type { MultiplyParams } from "../api";
import { multiply as coreMultiply } from "../api";
import { getCalculator } from "../helpers";

/**
 * Multiply the passed Monetary object.
 *
 * @param multiplicand - The Monetary object to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
export function multiply<TAmount>(
  ...[multiplicand, multiplier]: MultiplyParams<TAmount>
) {
  const calculator = getCalculator(multiplicand.amount);
  const multiplyFn = coreMultiply(calculator);

  return multiplyFn(multiplicand, multiplier);
}
