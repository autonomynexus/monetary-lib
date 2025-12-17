import type { EqualParams } from "../api";
import { equal as coreEqual } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether the value of a Monetary object is equal to another.
 *
 * @param monetaryObject - The first Monetary object to compare.
 * @param comparator - The second Monetary object to compare.
 *
 * @returns Whether the Monetary objects are equal.
 *
 * @public
 */
export function equal<TAmount>(
  ...[monetaryObject, comparator]: EqualParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const equalFn = coreEqual(calculator);

  return equalFn(monetaryObject, comparator);
}
