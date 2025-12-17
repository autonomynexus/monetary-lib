import type { Big } from "big.js";
import type { BinaryOperation } from "../../types";

/**
 * Returns a Big number to the power of an exponent.
 *
 * @param base - The base Big number.
 * @param exponent - The exponent Big number.
 *
 * @returns The base to the power of the exponent.
 */
export const power: BinaryOperation<Big> = (base, exponent) => {
  // Big.js pow() expects a number for the exponent
  return base.pow(Number(exponent.toString()));
};
