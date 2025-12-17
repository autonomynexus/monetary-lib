import Big from "big.js";
import type { UnaryOperation } from "../../types";

/**
 * Returns an incremented Big number.
 *
 * @param value - The Big number to increment.
 *
 * @returns The incremented Big number.
 */
export const increment: UnaryOperation<Big> = (value) => value.plus(new Big(1));
