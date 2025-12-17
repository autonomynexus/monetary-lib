import type { Big } from "big.js";
import type { BinaryOperation } from "../../types";

/**
 * Returns the sum of two Big numbers.
 *
 * @param augend - The Big number to add to.
 * @param addend - The Big number to add.
 *
 * @returns The sum of the two Big numbers.
 */
export const add: BinaryOperation<Big> = (augend, addend) =>
  augend.plus(addend);
