import type { Calculator, Monetary } from "../types";
import { lessThan } from "../utils";

export type IsNegativeParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
];

export function isNegative<TAmount>(calculator: Calculator<TAmount>) {
  const lessThanFn = lessThan(calculator);

  return function _isNegative(...[monetaryObject]: IsNegativeParams<TAmount>) {
    const { amount } = monetaryObject;

    return lessThanFn(amount, calculator.zero());
  };
}
