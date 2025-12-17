import Big from "big.js";
import type { UnaryOperation } from "../../types";

/**
 * Returns a decremented Big number.
 *
 * @param value - The Big number to decrement.
 *
 * @returns The decremented Big number.
 */
export const decrement: UnaryOperation<Big> = (value) =>
  value.minus(new Big(1));
