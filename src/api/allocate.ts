/* eslint-disable functional/no-expression-statement */
import { INVALID_RATIOS_MESSAGE } from "../checks";
import { assert } from "../helpers";
import type { Calculator, Monetary, ScaledAmount } from "../types";
import {
  distribute,
  equal,
  getAmountAndScale,
  greaterThan,
  greaterThanOrEqual,
  maximum,
} from "../utils";

import { transformScale } from "./transform-scale";

type UnsafeAllocateParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  ratios: readonly ScaledAmount<TAmount>[],
];

function unsafeAllocate<TAmount>(calculator: Calculator<TAmount>) {
  return function allocate(
    ...[monetaryObject, ratios]: UnsafeAllocateParams<TAmount>
  ) {
    const { amount, currency, scale } = monetaryObject;
    const distributeFn = distribute(calculator);
    const shares = distributeFn(
      amount,
      ratios.map((ratio) => ratio.amount)
    );

    return shares.map((share) => ({
      amount: share,
      currency,
      scale,
    }));
  };
}

export type AllocateParams<TAmount> = readonly [
  monetaryObject: Monetary<TAmount>,
  ratios: ReadonlyArray<ScaledAmount<TAmount> | TAmount>,
];

export function safeAllocate<TAmount>(calculator: Calculator<TAmount>) {
  const allocateFn = unsafeAllocate(calculator);
  const greaterThanOrEqualFn = greaterThanOrEqual(calculator);
  const greaterThanFn = greaterThan(calculator);
  const convertScaleFn = transformScale(calculator);
  const maximumFn = maximum(calculator);
  const equalFn = equal(calculator);
  const zero = calculator.zero();
  const ten = new Array(10).fill(null).reduce(calculator.increment, zero);

  return function allocate(
    ...[monetaryObject, ratios]: AllocateParams<TAmount>
  ) {
    const hasRatios = ratios.length > 0;
    const scaledRatios = ratios.map((ratio) => getAmountAndScale(ratio, zero));
    const highestRatioScale = hasRatios
      ? maximumFn(scaledRatios.map(({ scale: s }) => s))
      : zero;
    const normalizedRatios = scaledRatios.map(({ amount: amt, scale: scl }) => {
      const factor = equalFn(scl, highestRatioScale)
        ? zero
        : calculator.subtract(highestRatioScale, scl);

      return {
        amount: calculator.multiply(amt, calculator.power(ten, factor)),
        scale: scl,
      };
    });
    const hasOnlyPositiveRatios = normalizedRatios.every(({ amount: a }) =>
      greaterThanOrEqualFn(a, zero)
    );
    const hasOneNonZeroRatio = normalizedRatios.some(({ amount: a }) =>
      greaterThanFn(a, zero)
    );

    const condition = hasRatios && hasOnlyPositiveRatios && hasOneNonZeroRatio;
    assert(condition, INVALID_RATIOS_MESSAGE);

    const { scale } = monetaryObject;
    const newScale = calculator.add(scale, highestRatioScale);

    return allocateFn(
      convertScaleFn(monetaryObject, newScale),
      normalizedRatios
    );
  };
}
