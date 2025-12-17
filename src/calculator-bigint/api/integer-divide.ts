import type { BinaryOperation } from "../../types";

/**
 * Returns the quotient of two bigints with no fractional part.
 *
 * @param dividend - The bigint to divide.
 * @param divisor - The bigint to divide with.
 *
 * @returns The quotient of the two bigints.
 */
export const integerDivide: BinaryOperation<bigint> = (dividend, divisor) =>
  dividend / divisor;
