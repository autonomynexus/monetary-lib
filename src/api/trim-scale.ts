import type { Calculator, Monetary } from "../types";
import { computeBase, countTrailingZeros, equal, maximum } from "../utils";

import { transformScale } from "./transform-scale";

export type TrimScaleParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
];

export function trimScale<TAmount>(calculator: Calculator<TAmount>) {
  const countTrailingZerosFn = countTrailingZeros(calculator);
  const equalFn = equal(calculator);
  const maximumFn = maximum(calculator);
  const transformScaleFn = transformScale(calculator);
  const computeBaseFn = computeBase(calculator);

  return function trimScaleFn(...[monetaryObject]: TrimScaleParams<TAmount>) {
    const { amount, currency, scale } = monetaryObject;
    const base = computeBaseFn(currency.base);

    const trailingZerosLength = countTrailingZerosFn(amount, base);
    const difference = calculator.subtract(scale, trailingZerosLength);
    const newScale = maximumFn([difference, currency.exponent]);

    if (equalFn(newScale, scale)) {
      return monetaryObject;
    }

    return transformScaleFn(monetaryObject, newScale);
  };
}
