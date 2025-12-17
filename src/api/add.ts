/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertPair } from "../helpers";
import type { Calculator, Monetary } from "../types";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type AddParams<TAmount> = readonly [
  augend: Monetary<TAmount>,
  addend: Monetary<TAmount>,
];

function unsafeAdd<TAmount>(calculator: Calculator<TAmount>) {
  return function add(...[augend, addend]: AddParams<TAmount>) {
    const { amount: augendAmount, currency, scale } = augend;
    const { amount: addendAmount } = addend;

    const amount = calculator.add(augendAmount, addendAmount);

    return {
      amount,
      currency,
      scale,
    };
  };
}

export function safeAdd<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const addFn = unsafeAdd(calculator);

  return function add(...[augend, addend]: AddParams<TAmount>) {
    const condition = haveSameCurrency([augend, addend]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalized = normalizeFn([augend, addend]);
    assertPair(normalized, "add");
    const [newAugend, newAddend] = normalized;

    return addFn(newAugend, newAddend);
  };
}
