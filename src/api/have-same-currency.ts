import { assertNonEmpty, getCalculator } from "../helpers";
import type { Monetary } from "../types";
import { computeBase, equal } from "../utils";

export function haveSameCurrency<TAmount>(
  monetaryObjects: readonly Monetary<TAmount>[]
) {
  assertNonEmpty(monetaryObjects, "haveSameCurrency");
  const [firstMonetary, ...otherMonetaries] = monetaryObjects;
  const calculator = getCalculator(firstMonetary.amount);
  const computeBaseFn = computeBase(calculator);

  const { currency: comparator } = firstMonetary;
  const equalFn = equal(calculator);
  const comparatorBase = computeBaseFn(comparator.base);

  return otherMonetaries.every((d) => {
    const { currency: subject } = d;
    const subjectBase = computeBaseFn(subject.base);

    return (
      subject.code === comparator.code &&
      equalFn(subjectBase, comparatorBase) &&
      equalFn(subject.exponent, comparator.exponent)
    );
  });
}
