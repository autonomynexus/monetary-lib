import type { IsZeroParams } from "../api";
import { isZero as coreIsZero } from "../api";
import { getCalculator } from "../helpers";

/**
 * Check whether the value of a Monetary object is zero.
 *
 * @param monetaryObject - The Monetary object to check.
 *
 * @returns Whether the value of a Monetary object is zero.
 *
 * @public
 */
export function isZero<TAmount>(...[monetaryObject]: IsZeroParams<TAmount>) {
  const calculator = getCalculator(monetaryObject.amount);
  const isZeroFn = coreIsZero(calculator);

  return isZeroFn(monetaryObject);
}
