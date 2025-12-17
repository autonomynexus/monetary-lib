import type { Calculator } from "../types";
import { ComparisonOperator } from "../types";

type GreaterThanCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a greaterThan function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The greaterThan function.
 */
export function greaterThan<TAmount>(
  calculator: GreaterThanCalculator<TAmount>
) {
  return (subject: TAmount, comparator: TAmount) =>
    calculator.compare(subject, comparator) === ComparisonOperator.GT;
}
