/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertPair } from "../helpers";
import type { Calculator, Monetary } from "../types";
import { compare as cmp } from "../utils";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type CompareParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  comparator: Monetary<TAmount>,
];

function unsafeCompare<TAmount>(calculator: Calculator<TAmount>) {
  const compareFn = cmp(calculator);

  return function compare(
    ...[monetaryObject, comparator]: CompareParams<TAmount>
  ) {
    return compareFn(monetaryObject.amount, comparator.amount);
  };
}

export function safeCompare<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const compareFn = unsafeCompare(calculator);

  return function compare(
    ...[monetaryObject, comparator]: CompareParams<TAmount>
  ) {
    const condition = haveSameCurrency([monetaryObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalized = normalizeFn([monetaryObject, comparator]);
    assertPair(normalized, "compare");
    const [normalizedSubject, normalizedComparator] = normalized;

    return compareFn(normalizedSubject, normalizedComparator);
  };
}
