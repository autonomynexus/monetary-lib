import type { BinaryOperation } from "../../types";

/**
 * Returns the product of two numbers.
 *
 * @param multiplicand - The number to multiply.
 * @param multiplier - The number to multiply with.
 *
 * @returns The product of the two numbers.
 */
export const multiply: BinaryOperation<number> = (multiplicand, multiplier) =>
  multiplicand * multiplier;
