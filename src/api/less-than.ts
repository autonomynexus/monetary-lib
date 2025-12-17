/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertPair } from "../helpers";
import type { Calculator, Monetary } from "../types";
import { lessThan as lt } from "../utils";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type LessThanParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  comparator: Monetary<TAmount>,
];

function unsafeLessThan<TAmount>(calculator: Calculator<TAmount>) {
  const lessThanFn = lt(calculator);

  return function lessThan(
    ...[monetaryObject, comparator]: LessThanParams<TAmount>
  ) {
    return lessThanFn(monetaryObject.amount, comparator.amount);
  };
}

export function safeLessThan<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const lessThanFn = unsafeLessThan(calculator);

  return function lessThan(
    ...[monetaryObject, comparator]: LessThanParams<TAmount>
  ) {
    const condition = haveSameCurrency([monetaryObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalized = normalizeFn([monetaryObject, comparator]);
    assertPair(normalized, "lessThan");
    const [normalizedSubject, normalizedComparator] = normalized;

    return lessThanFn(normalizedSubject, normalizedComparator);
  };
}
