import type { IsNegativeParams } from "../api";
import { isNegative as coreIsNegative } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether a Monetary object is negative.
 *
 * @param monetaryObject - The Monetary object to check.
 *
 * @returns Whether the Monetary object is negative.
 *
 * @public
 */
export function isNegative<TAmount>(
  ...[monetaryObject]: IsNegativeParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const isNegativeFn = coreIsNegative(calculator);

  return isNegativeFn(monetaryObject);
}
