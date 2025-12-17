import type { Calculator, Monetary } from "../types";

import { haveSameAmount } from "./have-same-amount";
import { haveSameCurrency } from "./have-same-currency";

export type EqualParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  comparator: Monetary<TAmount>,
];

export function equal<TAmount>(calculator: Calculator<TAmount>) {
  return function _equal(
    ...[monetaryObject, comparator]: EqualParams<TAmount>
  ) {
    return (
      haveSameAmount(calculator)([monetaryObject, comparator]) &&
      haveSameCurrency([monetaryObject, comparator])
    );
  };
}
