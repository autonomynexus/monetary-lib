import type { ConvertParams } from "../api";
import { convert as coreConvert } from "../api";
import { getCalculator } from "../helpers";

/**
 * Convert a Monetary object to another currency.
 *
 * @param monetaryObject - The Monetary object to format.
 * @param newCurrency - The currency to convert to.
 * @param rates - The rates to convert with.
 *
 * @returns A converted Monetary object.
 *
 * @public
 */
export function convert<TAmount>(
  ...[monetaryObject, newCurrency, rates]: ConvertParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const converter = coreConvert(calculator);

  return converter(monetaryObject, newCurrency, rates);
}
