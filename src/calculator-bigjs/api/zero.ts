import type { Big as BigType } from "big.js";
import Big from "big.js";

/**
 * Returns a Big zero.
 *
 * @returns A Big zero.
 */
export function zero(): BigType {
  return new Big(0);
}
