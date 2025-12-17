import type { Calculator, Monetary } from "../types";
import { equal } from "../utils";

export type IsZeroParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
];

export function isZero<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);

  return function _isZero(...[monetaryObject]: IsZeroParams<TAmount>) {
    const { amount } = monetaryObject;

    return equalFn(amount, calculator.zero());
  };
}
