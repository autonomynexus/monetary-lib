import type { HaveSameAmountParams } from "../api";
import { haveSameAmount as coreHaveSameAmount } from "../api";
import { assertNonEmpty, getCalculator } from "../helpers";

/**
 * Check whether a set of Monetary objects have the same amount.
 *
 * @param monetaryObjects - The Monetary objects to compare.
 *
 * @returns Whether the Monetary objects have the same amount.
 *
 * @public
 */
export function haveSameAmount<TAmount>(
  ...[monetaryObjects]: HaveSameAmountParams<TAmount>
) {
  assertNonEmpty(monetaryObjects, "haveSameAmount");
  const calculator = getCalculator(monetaryObjects[0].amount);
  const haveSameAmountFn = coreHaveSameAmount(calculator);

  return haveSameAmountFn(monetaryObjects);
}
