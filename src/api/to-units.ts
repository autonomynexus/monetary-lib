import { assertDefined } from "../helpers";
import type { Calculator, Monetary, Transformer } from "../types";
import { getDivisors, isArray } from "../utils";

export type ToUnitsParams<TAmount, TOutput> = readonly [
  monetaryObject: Monetary<TAmount>,
  transformer?: Transformer<TAmount, TOutput, readonly TAmount[]>,
];

export function toUnits<TAmount, TOutput>(calculator: Calculator<TAmount>) {
  const getDivisorsFn = getDivisors(calculator);

  return function toUnitsFn(
    ...[monetaryObject, transformer]: ToUnitsParams<TAmount, TOutput>
  ) {
    const { amount, currency, scale } = monetaryObject;
    const { power, integerDivide, modulo } = calculator;

    const bases = isArray(currency.base) ? currency.base : [currency.base];
    const divisors = getDivisorsFn(bases.map((base) => power(base, scale)));
    const value = divisors.reduce<readonly TAmount[]>(
      (amounts, divisor, index) => {
        const amountLeft = amounts[index];
        assertDefined(amountLeft, `toUnits: missing amount at index ${index}`);

        const quotient = integerDivide(amountLeft, divisor);
        const remainder = modulo(amountLeft, divisor);

        return [...amounts.filter((_, i) => i !== index), quotient, remainder];
      },
      [amount]
    );

    if (!transformer) {
      return value;
    }

    return transformer({ value, currency });
  };
}
