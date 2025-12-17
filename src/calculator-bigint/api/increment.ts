import type { UnaryOperation } from "../../types";

/**
 * Returns an incremented bigint.
 *
 * @param value - The bigint to increment.
 *
 * @returns The incremented bigint.
 */
export const increment: UnaryOperation<bigint> = (value) => value + 1n;
