import type { MinimumParams } from "../api";
import { safeMinimum } from "../api";
import { assertNonEmpty, getCalculator } from "../helpers";

/**
 * Get the lowest of the passed Monetary objects.
 *
 * @param monetaryObjects - The Monetary objects to minimum.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
export function minimum<TAmount>(...[monetaryObjects]: MinimumParams<TAmount>) {
  assertNonEmpty(monetaryObjects, "minimum");
  const calculator = getCalculator(monetaryObjects[0].amount);
  const minimumFn = safeMinimum(calculator);

  return minimumFn(monetaryObjects);
}
