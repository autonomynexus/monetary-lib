import type { ToDecimalParams } from "../api";
import { toDecimal as coreToDecimal } from "../api";
import { getCalculator } from "../helpers";
import type { Monetary, Transformer } from "../types";

export function toDecimal<TAmount>(monetaryObject: Monetary<TAmount>): string;

export function toDecimal<TAmount, TOutput>(
  monetaryObject: Monetary<TAmount>,
  transformer: Transformer<TAmount, TOutput, string>
): TOutput;

/**
 * Get the amount of a Monetary object in decimal form.
 *
 * @param monetaryObject - The Monetary object to format.
 * @param transformer - A transformer function.
 *
 * @returns The amount in decimal form.
 *
 * @public
 */
export function toDecimal<TAmount, TOutput>(
  ...[monetaryObject, transformer]: ToDecimalParams<TAmount, TOutput>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const toDecimalFn = coreToDecimal<TAmount, TOutput>(calculator);

  return toDecimalFn(monetaryObject, transformer);
}
