import type { Big } from "big.js";
import type { BinaryOperation } from "../../types";

/**
 * Returns the remainder of two Big numbers.
 *
 * @param dividend - The Big number to divide.
 * @param divisor - The Big number to divide with.
 *
 * @returns The remainder of the two Big numbers.
 */
export const modulo: BinaryOperation<Big> = (dividend, divisor) =>
  dividend.mod(divisor);
