import { NON_DECIMAL_CURRENCY_MESSAGE } from "../checks";
import { assert, assertPair, getFormatter } from "../helpers";
import type { Calculator, Formatter, Monetary, Transformer } from "../types";
import { absolute, computeBase, equal, isArray, lessThan } from "../utils";

import { toUnits } from "./to-units";

export type ToDecimalParams<TAmount, TOutput> = readonly [
  monetaryObject: Monetary<TAmount>,
  transformer?: Transformer<TAmount, TOutput, string>,
];

export function toDecimal<TAmount, TOutput>(calculator: Calculator<TAmount>) {
  const toUnitsFn = toUnits<TAmount, readonly TAmount[]>(calculator);
  const computeBaseFn = computeBase(calculator);
  const equalFn = equal(calculator);

  return function toDecimalFn(
    ...[monetaryObject, transformer]: ToDecimalParams<TAmount, TOutput>
  ) {
    const { currency, scale } = monetaryObject;

    const base = computeBaseFn(currency.base);
    const zero = calculator.zero();
    const ten = new Array(10).fill(null).reduce(calculator.increment, zero);

    const isMultiBase = isArray(currency.base);
    const isBaseTen = equalFn(calculator.modulo(base, ten), zero);
    const isDecimal = !isMultiBase && isBaseTen;

    // eslint-disable-next-line functional/no-expression-statement
    assert(isDecimal, NON_DECIMAL_CURRENCY_MESSAGE);

    const units = toUnitsFn(monetaryObject);

    const formatter = getFormatter(monetaryObject.amount);
    const getDecimalFn = getDecimal(calculator, formatter);
    const value = getDecimalFn(units, scale);

    if (!transformer) {
      return value;
    }

    return transformer({ value, currency });
  };
}

function getDecimal<TAmount>(
  calculator: Calculator<TAmount>,
  formatter: Formatter<TAmount>
) {
  const absoluteFn = absolute(calculator);
  const equalFn = equal(calculator);
  const lessThanFn = lessThan(calculator);
  const zero = calculator.zero();

  return (units: readonly TAmount[], scale: TAmount) => {
    assertPair(units, "toDecimal");
    const [wholeUnit, fractionalUnit] = units;

    const whole = formatter.toString(wholeUnit);
    const fractional = formatter.toString(absoluteFn(fractionalUnit));

    const scaleNumber = formatter.toNumber(scale);
    const decimal = `${whole}.${fractional.padStart(scaleNumber, "0")}`;

    const leadsWithZero = equalFn(wholeUnit, zero);
    const isNegative = lessThanFn(fractionalUnit, zero);

    // A leading negative zero is a special case because the `toString`
    // formatter won't preserve its negative sign (since 0 === -0).
    return leadsWithZero && isNegative ? `-${decimal}` : decimal;
  };
}
