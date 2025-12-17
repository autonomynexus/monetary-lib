import type { Calculator, Monetary } from "../types";
import { computeBase, equal } from "../utils";

export type HasSubUnitsParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
];

export function hasSubUnits<TAmount>(calculator: Calculator<TAmount>) {
  const equalFn = equal(calculator);
  const computeBaseFn = computeBase(calculator);

  return function _hasSubUnits(
    ...[monetaryObject]: HasSubUnitsParams<TAmount>
  ) {
    const { amount, currency, scale } = monetaryObject;
    const base = computeBaseFn(currency.base);

    return !equalFn(
      calculator.modulo(amount, calculator.power(base, scale)),
      calculator.zero()
    );
  };
}
