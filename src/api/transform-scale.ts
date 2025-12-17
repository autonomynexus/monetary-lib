import { down } from "../divide";
import type { Calculator, DivideOperation, Monetary } from "../types";
import { computeBase, greaterThan } from "../utils";

export type TransformScaleParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  newScale: TAmount,
  divide?: DivideOperation,
];

export function transformScale<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanFn = greaterThan(calculator);
  const computeBaseFn = computeBase(calculator);

  return function transformScaleFn(
    ...[monetaryObject, newScale, divide = down]: TransformScaleParams<TAmount>
  ) {
    const { amount, currency, scale } = monetaryObject;

    const isLarger = greaterThanFn(newScale, scale);
    const operation = isLarger ? calculator.multiply : divide;
    const [a, b] = isLarger ? [newScale, scale] : [scale, newScale];
    const base = computeBaseFn(currency.base);

    const factor = calculator.power(base, calculator.subtract(a, b));

    return {
      amount: operation(amount, factor, calculator),
      currency,
      scale: newScale,
    };
  };
}
