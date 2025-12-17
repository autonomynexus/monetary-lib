import type { IsPositiveParams } from "../api";
import { isPositive as coreIsPositive } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether a Monetary object is positive.
 *
 * @param monetaryObject - The Monetary object to check.
 *
 * @returns Whether the Monetary object is positive.
 *
 * @public
 */
export function isPositive<TAmount>(
  ...[monetaryObject]: IsPositiveParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const isPositiveFn = coreIsPositive(calculator);

  return isPositiveFn(monetaryObject);
}
