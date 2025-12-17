/* eslint-disable functional/no-expression-statement */

import { INVALID_AMOUNT_MESSAGE, INVALID_SCALE_MESSAGE } from "./checks";
import { assert } from "./helpers";
import type { Monetary, MonetaryOptions } from "./types";

/**
 * Create a Monetary object (serializable POJO).
 *
 * @param options.amount - The amount in minor currency units.
 * @param options.currency - The currency.
 * @param options.scale - The number of decimal places to represent.
 *
 * @returns The created Monetary object (plain data, fully serializable).
 *
 * @public
 */
export function monetary<TAmount = number>(
  options: MonetaryOptions<TAmount>
): Monetary<TAmount> {
  const { amount, currency, scale = currency.exponent } = options;

  // Validate for number type (this is the number-only entry point)
  if (typeof amount === "number") {
    assert(Number.isInteger(amount), INVALID_AMOUNT_MESSAGE);
    assert(Number.isInteger(scale), INVALID_SCALE_MESSAGE);
  }

  // Return plain object (fully serializable)
  return {
    amount,
    currency,
    scale,
  };
}
