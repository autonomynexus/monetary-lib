import type { AllocateParams } from "../api";
import { safeAllocate } from "../api";
import { getCalculator } from "../helpers";

/**
 * Distribute the amount of a Monetary object across a list of ratios.
 *
 * @param monetaryObject - The Monetary object to allocate from.
 * @param ratios - The ratios to allocate the amount to.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
export function allocate<TAmount>(
  ...[monetaryObject, ratios]: AllocateParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const allocateFn = safeAllocate(calculator);

  return allocateFn(monetaryObject, ratios);
}
