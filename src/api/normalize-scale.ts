import type { Calculator, Monetary } from "../types";
import { equal, maximum } from "../utils";

import { transformScale } from "./transform-scale";

export type NormalizeScaleParams<TAmount> = readonly [
  monetaryObjects: readonly Monetary<TAmount>[],
];

export function normalizeScale<TAmount>(calculator: Calculator<TAmount>) {
  const maximumFn = maximum(calculator);
  const convertScaleFn = transformScale(calculator);
  const equalFn = equal(calculator);

  return function _normalizeScale(
    ...[monetaryObjects]: NormalizeScaleParams<TAmount>
  ) {
    const highestScale = monetaryObjects.reduce((highest, current) => {
      const { scale } = current;

      return maximumFn([highest, scale]);
    }, calculator.zero());

    return monetaryObjects.map((d) => {
      const { scale } = d;

      return equalFn(scale, highestScale) ? d : convertScaleFn(d, highestScale);
    });
  };
}
