import type { UnaryOperation } from "../../types";

/**
 * Returns an decremented bigint.
 *
 * @param value - The bigint to decrement.
 *
 * @returns The decremented bigint.
 */
export const decrement: UnaryOperation<bigint> = (value) => value - 1n;
