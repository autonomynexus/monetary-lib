/* eslint-disable functional/no-expression-statement */
import { UNEQUAL_CURRENCIES_MESSAGE } from "../checks";
import { assert, assertPair } from "../helpers";
import type { Calculator, Monetary } from "../types";
import { greaterThanOrEqual as gte } from "../utils";

import { haveSameCurrency } from "./have-same-currency";
import { normalizeScale } from "./normalize-scale";

export type GreaterThanOrEqualParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  comparator: Monetary<TAmount>,
];

function unsafeGreaterThanOrEqual<TAmount>(calculator: Calculator<TAmount>) {
  const greaterThanOrEqualFn = gte(calculator);

  return function greaterThanOrEqual(
    ...[monetaryObject, comparator]: GreaterThanOrEqualParams<TAmount>
  ) {
    return greaterThanOrEqualFn(monetaryObject.amount, comparator.amount);
  };
}

export function safeGreaterThanOrEqual<TAmount>(
  calculator: Calculator<TAmount>
) {
  const normalizeFn = normalizeScale(calculator);
  const greaterThanOrEqualFn = unsafeGreaterThanOrEqual(calculator);

  return function greaterThanOrEqual(
    ...[monetaryObject, comparator]: GreaterThanOrEqualParams<TAmount>
  ) {
    const condition = haveSameCurrency([monetaryObject, comparator]);
    assert(condition, UNEQUAL_CURRENCIES_MESSAGE);

    const normalized = normalizeFn([monetaryObject, comparator]);
    assertPair(normalized, "greaterThanOrEqual");
    const [normalizedSubject, normalizedComparator] = normalized;

    return greaterThanOrEqualFn(normalizedSubject, normalizedComparator);
  };
}
