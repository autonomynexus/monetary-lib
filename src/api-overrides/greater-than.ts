import type { GreaterThanParams } from "../api";
import { safeGreaterThan } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether the value of a Monetary object is greater than another.
 *
 * @param monetaryObject - The Monetary object to compare.
 * @param comparator - The Monetary object to compare to.
 *
 * @returns Whether the Monetary to compare is greater than the other.
 *
 * @public
 */
export function greaterThan<TAmount>(
  ...[monetaryObject, comparator]: GreaterThanParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const greaterThanFn = safeGreaterThan(calculator);

  return greaterThanFn(monetaryObject, comparator);
}
