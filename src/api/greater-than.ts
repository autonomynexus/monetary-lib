/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertPair } from "../helpers";
import type { Calculator, Monetary } from "../types";
import { greaterThan as gt } from "../utils";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type GreaterThanParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  comparator: Monetary<TAmount>,
];

function unsafeGreaterThan<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanFn = gt(calculator);

  return function greaterThan(
    ...[monetaryObject, comparator]: GreaterThanParams<TAmount>
  ) {
    return greaterThanFn(monetaryObject.amount, comparator.amount);
  };
}

export function safeGreaterThan<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const greaterThanFn = unsafeGreaterThan(calculator);

  return function greaterThan(
    ...[monetaryObject, comparator]: GreaterThanParams<TAmount>
  ) {
    const condition = haveSameCurrency([monetaryObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalized = normalizeFn([monetaryObject, comparator]);
    assertPair(normalized, "greaterThan");
    const [normalizedSubject, normalizedComparator] = normalized;

    return greaterThanFn(normalizedSubject, normalizedComparator);
  };
}
