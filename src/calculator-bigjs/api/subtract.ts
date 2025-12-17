import type { Big } from "big.js";
import type { BinaryOperation } from "../../types";

/**
 * Returns the difference of two Big numbers.
 *
 * @param minuend - The Big number to subtract from.
 * @param subtrahend - The Big number to subtract.
 *
 * @returns The difference of the two Big numbers.
 */
export const subtract: BinaryOperation<Big> = (minuend, subtrahend) =>
  minuend.minus(subtrahend);
