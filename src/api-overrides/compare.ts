import type { CompareParams } from "../api";
import { safeCompare } from "../api";
import { getCalculator } from "../helpers";

/**
 * Compare the value of a Monetary object relative to another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns One of -1, 0, or 1 depending on whether the first Monetary object is less than, equal to, or greater than the other.
 *
 * @public
 */
export function compare<TAmount>(
  ...[monetaryObject, comparator]: CompareParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const compareFn = safeCompare(calculator);

  return compareFn(monetaryObject, comparator);
}
