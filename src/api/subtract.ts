/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertPair } from "../helpers";
import type { Calculator, Monetary } from "../types";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type SubtractParams<TAmount> = readonly [
  minuend: Monetary<TAmount>,
  subtrahend: Monetary<TAmount>,
];

function unsafeSubtract<TAmount>(calculator: Calculator<TAmount>) {
  return function subtract(...[minuend, subtrahend]: SubtractParams<TAmount>) {
    const { amount: minuendAmount, currency, scale } = minuend;
    const { amount: subtrahendAmount } = subtrahend;

    const amount = calculator.subtract(minuendAmount, subtrahendAmount);

    return {
      amount,
      currency,
      scale,
    };
  };
}

export function safeSubtract<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const subtractFn = unsafeSubtract(calculator);

  return function subtract(...[minuend, subtrahend]: SubtractParams<TAmount>) {
    const condition = haveSameCurrency([minuend, subtrahend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalized = normalizeFn([minuend, subtrahend]);
    assertPair(normalized, "subtract");
    const [newMinuend, newSubtrahend] = normalized;

    return subtractFn(newMinuend, newSubtrahend);
  };
}
