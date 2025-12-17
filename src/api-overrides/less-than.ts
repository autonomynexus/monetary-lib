import type { LessThanParams } from "../api";
import { safeLessThan } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether the value of a Monetary object is lesser than another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns Whether the Monetary to compare is lesser than the other.
 *
 * @public
 */
export function lessThan<TAmount>(
  ...[monetaryObject, comparator]: LessThanParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const lessThanFn = safeLessThan(calculator);

  return lessThanFn(monetaryObject, comparator);
}
