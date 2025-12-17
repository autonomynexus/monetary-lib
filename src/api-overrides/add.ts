import type { AddParams } from "../api";
import { safeAdd } from "../api";
import { getCalculator } from "../helpers";

/**
 * Add up the passed Monetary objects.
 *
 * @param augend - The Monetary object to add to.
 * @param addend - The Monetary object to add.
 *
 * @returns A new Monetary object.
 *
 * @public
 */
export function add<TAmount>(...[augend, addend]: AddParams<TAmount>) {
  const calculator = getCalculator(augend.amount);
  const addFn = safeAdd(calculator);

  return addFn(augend, addend);
}
