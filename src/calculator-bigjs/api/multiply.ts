import type { Big } from "big.js";
import type { BinaryOperation } from "../../types";

/**
 * Returns the product of two Big numbers.
 *
 * @param multiplicand - The Big number to multiply.
 * @param multiplier - The Big number to multiply with.
 *
 * @returns The product of the two Big numbers.
 */
export const multiply: BinaryOperation<Big> = (multiplicand, multiplier) =>
  multiplicand.times(multiplier);
