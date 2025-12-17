import type { LessThanOrEqualParams } from "../api";
import { safeLessThanOrEqual } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether the value of a Monetary object is lesser than or equal to another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns Whether the Monetary to compare is lesser than or equal to the other.
 *
 * @public
 */
export function lessThanOrEqual<TAmount>(
  ...[monetaryObject, comparator]: LessThanOrEqualParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const lessThanOrEqualFn = safeLessThanOrEqual(calculator);

  return lessThanOrEqualFn(monetaryObject, comparator);
}
