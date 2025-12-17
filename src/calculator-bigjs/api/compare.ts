import type { Big } from "big.js";
import type { BinaryOperation, ComparisonOperator } from "../../types";

/**
 * Compares two Big numbers.
 *
 * @param comparand - The Big number to compare to.
 * @param comparator - The Big number to compare with.
 *
 * @returns 1 if comparand > comparator, -1 if comparand < comparator, 0 if equal.
 */
export const compare: BinaryOperation<Big, ComparisonOperator> = (
  comparand,
  comparator
) => comparand.cmp(comparator) as ComparisonOperator;
