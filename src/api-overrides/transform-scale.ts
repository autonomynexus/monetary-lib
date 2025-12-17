import type { TransformScaleParams } from "../api";
import { transformScale as coreTransformScale } from "../api";
import { getCalculator } from "../helpers";

/**
 * Transform a Monetary object to a new scale.
 *
 * @param monetaryObject - The Monetary object to transform.
 * @param newScale - The new scale.
 * @param divide - A custom divide function.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
export function transformScale<TAmount>(
  ...[monetaryObject, newScale, divide]: TransformScaleParams<TAmount>
) {
  const calculator = getCalculator(monetaryObject.amount);
  const transformScaleFn = coreTransformScale(calculator);

  return transformScaleFn(monetaryObject, newScale, divide);
}
