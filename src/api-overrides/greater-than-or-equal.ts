import type { GreaterThanOrEqualParams } from "../api";
import { safeGreaterThanOrEqual } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether the value of a Monetary object is greater than or equal another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns Whether the Monetary to compare is greater than or equal the other.
 *
 * @public
 */
export function greaterThanOrEqual<TAmount>(
  ...[monetaryObject, comparator]: GreaterThanOrEqualParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const greaterThanOrEqualFn = safeGreaterThanOrEqual(calculator);

  return greaterThanOrEqualFn(monetaryObject, comparator);
}
