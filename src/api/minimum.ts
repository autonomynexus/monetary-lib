/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertNonEmpty } from "../helpers";
import type { Calculator, Monetary } from "../types";
import { minimum as min } from "../utils";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type MinimumParams<TAmount> = readonly [
  monetaryObjects: readonly Monetary<TAmount>[],
];

function unsafeMinimum<TAmount>(calculator: Calculator<TAmount>) {
  const minFn = min(calculator);

  return function minimum(...[monetaryObjects]: MinimumParams<TAmount>) {
    assertNonEmpty(monetaryObjects, "minimum");
    const firstMonetary = monetaryObjects[0];
    const { currency, scale } = firstMonetary;

    const amount = minFn(monetaryObjects.map((subject) => subject.amount));

    return {
      amount,
      currency,
      scale,
    };
  };
}

export function safeMinimum<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const minFn = unsafeMinimum(calculator);

  return function maximum(...[monetaryObjects]: MinimumParams<TAmount>) {
    const condition = haveSameCurrency(monetaryObjects);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalizedMonetaryObjects = normalizeFn(monetaryObjects);

    return minFn(normalizedMonetaryObjects);
  };
}
