import type { Calculator, Monetary } from "../types";
import { greaterThan } from "../utils";

export type IsPositiveParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
];

export function isPositive<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanFn = greaterThan(calculator);

  return function _isPositive(...[monetaryObject]: IsPositiveParams<TAmount>) {
    const { amount } = monetaryObject;

    return greaterThanFn(amount, calculator.zero());
  };
}
