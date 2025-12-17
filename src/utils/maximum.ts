import type { Calculator } from "../types";

import { lessThan } from "./less-than";

type MaximumCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a maximum function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The maximum function.
 */
export function maximum<TAmount>(calculator: MaximumCalculator<TAmount>) {
  const lessThanFn = lessThan(calculator);

  return (values: readonly TAmount[]) =>
    values.reduce((acc, curr) => (lessThanFn(acc, curr) ? curr : acc));
}
