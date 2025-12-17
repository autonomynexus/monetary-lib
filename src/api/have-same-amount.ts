import { assertNonEmpty } from "../helpers";
import type { Calculator, Monetary } from "../types";
import { equal } from "../utils";

import { normalizeScale } from "./normalize-scale";

export type HaveSameAmountParams<TAmount> = readonly [
  monetaryObjects: readonly Monetary<TAmount>[],
];

export function haveSameAmount<TAmount>(calculator: Calculator<TAmount>) {
  const normalizeFn = normalizeScale(calculator);
  const equalFn = equal(calculator);

  return function _haveSameAmount(
    ...[monetaryObjects]: HaveSameAmountParams<TAmount>
  ) {
    assertNonEmpty(monetaryObjects, "haveSameAmount");
    const normalized = normalizeFn(monetaryObjects);
    // Runtime-redundant but needed for type narrowing (.map preserves length)
    assertNonEmpty(normalized, "haveSameAmount");
    const [firstMonetary, ...otherMonetaries] = normalized;
    const { amount: comparatorAmount } = firstMonetary;

    return otherMonetaries.every((d) => {
      const { amount: subjectAmount } = d;

      return equalFn(subjectAmount, comparatorAmount);
    });
  };
}
