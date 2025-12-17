import type { ToUnitsParams } from "../api";
import { toUnits as coreToUnits } from "../api";
import { getCalculator } from "../helpers";
import type { Monetary, Transformer } from "../types";

export function toUnits<TAmount>(
  monetaryObject: Monetary<TAmount>
): readonly TAmount[];

export function toUnits<TAmount, TOutput>(
  monetaryObject: Monetary<TAmount>,
  transformer: Transformer<TAmount, TOutput, readonly TAmount[]>
): TOutput;

/**
 * Get the amount of a Monetary object in units.
 *
 * @param monetaryObject - The Monetary object to format.
 * @param transformer - A transformer function.
 *
 * @returns The amount in units.
 *
 * @public
 */
export function toUnits<TAmount, TOutput>(
  ...[monetaryObject, transformer]: ToUnitsParams<TAmount, TOutput>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const toUnitsFn = coreToUnits<TAmount, TOutput>(calculator);

  return toUnitsFn(monetaryObject, transformer);
}
