/* eslint-disable functional/no-let, functional/no-loop-statement, functional/immutable-data, functional/no-expression-statement */

import type { Calculator } from "../types";

import { equal } from "./equal";
import { greaterThan } from "./greater-than";
import { greaterThanOrEqual } from "./greater-than-or-equal";
import { lessThan } from "./less-than";

type DistributeCalculator<TAmount> = Calculator<TAmount>;

/**
 * Returns a distribute function.
 *
 * @param calculator - The calculator to use.
 *
 * @returns The distribute function.
 */
export function distribute<TAmount>(calculator: DistributeCalculator<TAmount>) {
  return (value: TAmount, ratios: readonly TAmount[]) => {
    const equalFn = equal(calculator);
    const greaterThanFn = greaterThan(calculator);
    const lessThanFn = lessThan(calculator);
    const greaterThanOrEqualFn = greaterThanOrEqual(calculator);

    const zero = calculator.zero();
    const one = calculator.increment(zero);

    const total = ratios.reduce((a, b) => calculator.add(a, b), zero);

    if (equalFn(total, zero)) {
      return ratios;
    }

    let remainder = value;

    const shares = ratios.map((ratio) => {
      const share =
        calculator.integerDivide(calculator.multiply(value, ratio), total) ||
        zero;

      remainder = calculator.subtract(remainder, share);

      return share;
    });

    const isPositive = greaterThanOrEqualFn(value, zero);
    const compare = isPositive ? greaterThanFn : lessThanFn;
    const amount = isPositive ? one : calculator.decrement(zero);

    let i = 0;
    const maxIterations = ratios.length * 1000;

    while (compare(remainder, zero)) {
      if (i >= maxIterations) {
        throw new Error("[Monetary] distribute: exceeded max iterations");
      }

      const idx = i % ratios.length;
      const ratio = ratios[idx];
      const share = shares[idx];

      if (ratio !== undefined && share !== undefined && !equalFn(ratio, zero)) {
        shares[idx] = calculator.add(share, amount);
        remainder = calculator.subtract(remainder, amount);
      }

      i++;
    }

    return shares;
  };
}
