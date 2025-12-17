import type { TrimScaleParams } from "../api";
import { trimScale as coreTrimScale } from "../api";
import { getCalculator } from "../helpers";

/**
 * Trim a Monetary object's scale as much as possible, down to the currency exponent.
 *
 * @param monetaryObject - The Monetary object which scale to trim.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
export function trimScale<TAmount>(
  ...[monetaryObject]: TrimScaleParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const trimScaleFn = coreTrimScale(calculator);

  return trimScaleFn(monetaryObject);
}
