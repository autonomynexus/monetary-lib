import type { MaximumParams } from "../api";
import { safeMaximum } from "../api";
import { assertNonEmpty, getCalculator } from "../helpers";

/**
 * Get the greatest of the passed Monetary objects.
 *
 * @param monetaryObjects - The Monetary objects to maximum.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
export function maximum<TAmount>(...[monetaryObjects]: MaximumParams<TAmount>) {
  assertNonEmpty(monetaryObjects, "maximum");
  const calculator = getCalculator(monetaryObjects[0].amount);
  const maximumFn = safeMaximum(calculator);

  return maximumFn(monetaryObjects);
}
