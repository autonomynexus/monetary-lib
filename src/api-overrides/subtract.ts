import type { SubtractParams } from "../api";
import { safeSubtract } from "../api";
import { getCalculator } from "../helpers";

/**
 * Subtract the passed Monetary objects.
 *
 * @param minuend - The Monetary object to subtract from.
 * @param subtrahend - The Monetary object to subtract.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
export function subtract<TAmount>(
  ...[minuend, subtrahend]: SubtractParams<TAmount>
) {
  const calculator = getCalculator(minuend.amount);
  const subtractFn = safeSubtract(calculator);

  return subtractFn(minuend, subtrahend);
}
