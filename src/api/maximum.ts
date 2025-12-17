/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertNonEmpty } from "../helpers";
import type { Calculator, Monetary } from "../types";
import { maximum as max } from "../utils";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type MaximumParams<TAmount> = readonly [
  monetaryObjects: readonly Monetary<TAmount>[],
];

function unsafeMaximum<TAmount>(calculator: Calculator<TAmount>) {
  const maxFn = max(calculator);

  return function maximum(...[monetaryObjects]: MaximumParams<TAmount>) {
    assertNonEmpty(monetaryObjects, "maximum");
    const firstMonetary = monetaryObjects[0];
    const { currency, scale } = firstMonetary;

    const amount = maxFn(monetaryObjects.map((subject) => subject.amount));

    return {
      amount,
      currency,
      scale,
    };
  };
}

export function safeMaximum<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const maxFn = unsafeMaximum(calculator);

  return function maximum(...[monetaryObjects]: MaximumParams<TAmount>) {
    const condition = haveSameCurrency(monetaryObjects);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalizedMonetaryObjects = normalizeFn(monetaryObjects);

    return maxFn(normalizedMonetaryObjects);
  };
}
