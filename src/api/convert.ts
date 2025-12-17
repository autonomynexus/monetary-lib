import type { Currency } from "../currencies/types";

import { assertDefined } from "../helpers";
import type { Calculator, Monetary, Rates } from "../types";
import { getAmountAndScale, maximum } from "../utils";

import { transformScale } from "./transform-scale";

export type ConvertParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  newCurrency: Currency<TAmount>,
  rates: Rates<TAmount>,
];

export function convert<TAmount>(calculator: Calculator<TAmount>) {
  const convertScaleFn = transformScale(calculator);
  const maximumFn = maximum(calculator);
  const zero = calculator.zero();

  return function convertFn(
    ...[monetaryObject, newCurrency, rates]: ConvertParams<TAmount>
  ) {
    const rate = rates[newCurrency.code];
    assertDefined(rate, `convert: missing rate for ${newCurrency.code}`);
    const { amount, scale } = monetaryObject;
    const { amount: rateAmount, scale: rateScale } = getAmountAndScale(
      rate,
      zero
    );

    const newScale = calculator.add(scale, rateScale);

    return convertScaleFn(
      {
        amount: calculator.multiply(amount, rateAmount),
        currency: newCurrency,
        scale: newScale,
      },
      maximumFn([newScale, newCurrency.exponent])
    );
  };
}
