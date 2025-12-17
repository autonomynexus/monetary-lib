/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertPair } from "../helpers";
import type { Calculator, Monetary } from "../types";
import { lessThanOrEqual as lte } from "../utils";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type LessThanOrEqualParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  comparator: Monetary<TAmount>,
];

function unsafeLessThanOrEqual<TAmount>(calculator: Calculator<TAmount>) {
  const lessThanOrEqualFn = lte(calculator);

  return function lessThanOrEqual(
    ...[monetaryObject, comparator]: LessThanOrEqualParams<TAmount>
  ) {
    return lessThanOrEqualFn(monetaryObject.amount, comparator.amount);
  };
}

export function safeLessThanOrEqual<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const lessThanOrEqualFn = unsafeLessThanOrEqual(calculator);

  return function lessThanOrEqual(
    ...[monetaryObject, comparator]: LessThanOrEqualParams<TAmount>
  ) {
    const condition = haveSameCurrency([monetaryObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalized = normalizeFn([monetaryObject, comparator]);
    assertPair(normalized, "lessThanOrEqual");
    const [normalizedSubject, normalizedComparator] = normalized;

    return lessThanOrEqualFn(normalizedSubject, normalizedComparator);
  };
}
