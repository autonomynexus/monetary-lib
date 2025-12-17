import type { Calculator, Monetary, ScaledAmount } from "../types";
import { getAmountAndScale } from "../utils";

import { transformScale } from "./transform-scale";

export type MultiplyParams<TAmount> = readonly [
  multiplicand: Monetary<TAmount>,
  multiplier: ScaledAmount<TAmount> | TAmount,
];

export function multiply<TAmount>(calculator: Calculator<TAmount>) {
  const convertScaleFn = transformScale(calculator);
  const zero = calculator.zero();

  return function multiplyFn(
    ...[multiplicand, multiplier]: MultiplyParams<TAmount>
  ) {
    const { amount, currency, scale } = multiplicand;
    const { amount: multiplierAmount, scale: multiplierScale } =
      getAmountAndScale(multiplier, zero);

    const newScale = calculator.add(scale, multiplierScale);

    return convertScaleFn(
      {
        amount: calculator.multiply(amount, multiplierAmount),
        currency,
        scale: newScale,
      },
      newScale
    );
  };
}
