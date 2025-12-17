import type { NormalizeScaleParams } from "../api";
import { normalizeScale as coreNormalizeScale } from "../api";
import { assertNonEmpty, getCalculator } from "../helpers";

/**
 * Normalize a set of Monetary objects to the highest scale of the set.
 *
 * @param monetaryObjects - The Monetary objects to normalize.
 *
 * @returns A new set of Monetary objects.
 *
 * @public
 */
export function normalizeScale<TAmount>(
  ...[monetaryObjects]: NormalizeScaleParams<TAmount>
) {
  assertNonEmpty(monetaryObjects, "normalizeScale");
  const calculator = getCalculator(monetaryObjects[0].amount);
  const normalizeScaleFn = coreNormalizeScale(calculator);

  return normalizeScaleFn(monetaryObjects);
}
