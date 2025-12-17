import Big from "big.js";
import type { BinaryOperation } from "../../types";

/**
 * Returns the quotient of two Big numbers using integer division.
 *
 * @param dividend - The Big number to divide.
 * @param divisor - The Big number to divide with.
 *
 * @returns The quotient of the two Big numbers.
 */
export const integerDivide: BinaryOperation<Big> = (dividend, divisor) =>
  dividend.div(divisor).round(0, Big.roundDown);
