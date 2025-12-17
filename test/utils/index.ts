// Simplified test utilities for the consolidated monetary package
import Big from "big.js";
import { monetary } from "../../src";
import { calculator as bigintCalculator } from "../../src/calculator-bigint";
import type { Currency } from "../../src/currencies/types/currency";
import { createMonetary } from "../../src/helpers";
import type { ComparisonOperator, MonetaryOptions } from "../../src/types";

// For number-based tests (default)
export function createNumberMonetary(options: MonetaryOptions<number>) {
  return monetary(options);
}

// For BigInt-based tests
export function createBigintMonetary(options: MonetaryOptions<bigint>) {
  return createMonetary({
    calculator: bigintCalculator,
  })(options);
}

// For Big.js-based tests
const bigjsMonetary = createMonetary({
  calculator: {
    add: (a, b) => a.plus(b),
    compare: (a, b) => a.cmp(b) as unknown as ComparisonOperator,
    decrement: (v) => v.minus(new Big(1)),
    increment: (v) => v.plus(new Big(1)),
    integerDivide: (a, b) => a.div(b).round(0, Big.roundDown),
    modulo: (a, b) => a.mod(b),
    multiply: (a, b) => a.times(b),
    power: (a, b) => a.pow(Number(b)),
    subtract: (a, b) => a.minus(b),
    zero: () => new Big(0),
  },
});

export function createBigjsMonetary(options: MonetaryOptions<Big>) {
  return bigjsMonetary(options);
}

// Currency casting helpers
export function castToBigintCurrency(
  currency: Currency<number>
): Currency<bigint> {
  const base = currency.base;
  return {
    ...currency,
    base: Array.isArray(base)
      ? base.map((b) => BigInt(b))
      : BigInt(base as number),
    exponent: BigInt(currency.exponent),
  };
}

export function castToBigjsCurrency(currency: Currency<number>): Currency<Big> {
  const base = currency.base;
  return {
    ...currency,
    base: Array.isArray(base)
      ? base.map((b) => new Big(b))
      : new Big(base as number),
    exponent: new Big(currency.exponent),
  };
}
