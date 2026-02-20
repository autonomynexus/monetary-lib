import Big from "big.js";

//#region src/checks/messages.ts
const INVALID_AMOUNT_MESSAGE = "Amount is invalid.";
const INVALID_SCALE_MESSAGE = "Scale is invalid.";
const INVALID_RATIOS_MESSAGE = "Ratios are invalid.";
const UNEQUAL_CURRENCIES_MESSAGE = "Objects must have the same currency.";
const NON_DECIMAL_CURRENCY_MESSAGE = "Currency is not decimal.";

//#endregion
//#region src/helpers/assert.ts
/**
* Assert a condition.
*
* @param condition - The condition to verify.
* @param message - The error message to throw.
*
* @throws If the condition isn't met.
*/
function assert(condition, message) {
	if (!condition) throw new Error(`[Monetary] ${message}`);
}
/**
* Assert array is non-empty and return typed tuple with first element.
*
* @throws If array is empty.
*/
function assertNonEmpty(arr, context) {
	if (arr.length === 0) throw new Error(`[Monetary] ${context}: expected non-empty array`);
}
/**
* Assert value is defined.
*
* @throws If value is undefined.
*/
function assertDefined(value, context) {
	if (value === void 0) throw new Error(`[Monetary] ${context}: expected defined value`);
}
/**
* Assert array has exactly 2 elements (for binary operations).
*
* @throws If array length !== 2.
*/
function assertPair(arr, context) {
	if (arr.length !== 2) throw new Error(`[Monetary] ${context}: expected pair, got ${arr.length} elements`);
}

//#endregion
//#region src/helpers/create-monetary.ts
/**
* Create a Monetary factory function.
*
* Note: The calculator and formatter are no longer attached to the returned objects.
* They are inferred from the amount type at operation time.
*/
function createMonetary({ calculator: _calculator, onCreate, formatter: _formatter = {
	toNumber: Number,
	toString: String
} }) {
	return function monetary$1({ amount, currency: { code, base, exponent }, scale = exponent }) {
		const currency = {
			code,
			base,
			exponent
		};
		onCreate?.({
			amount,
			currency,
			scale
		});
		return {
			amount,
			currency,
			scale
		};
	};
}

//#endregion
//#region src/calculator-bigint/api/add.ts
/**
* Returns the sum of two bigints.
*
* @param augend - The bigint to add to.
* @param addend - The bigint to add.
*
* @returns The sum of the two bigints.
*/
const add$3 = (augend, addend) => augend + addend;

//#endregion
//#region src/types/calculator.ts
const ComparisonOperator = {
	LT: -1,
	EQ: 0,
	GT: 1
};

//#endregion
//#region src/calculator-bigint/api/compare.ts
/**
* Compare two bigints.
*
* @param a - The first bigint to compare.
* @param b - The second bigint to compare.
*
* @returns Whether the two bigints are equal, or whether the first one is greater or less than the other.
*/
const compare$4 = (a, b) => {
	if (a < b) return ComparisonOperator.LT;
	if (a > b) return ComparisonOperator.GT;
	return ComparisonOperator.EQ;
};

//#endregion
//#region src/calculator-bigint/api/decrement.ts
/**
* Returns an decremented bigint.
*
* @param value - The bigint to decrement.
*
* @returns The decremented bigint.
*/
const decrement$2 = (value) => value - 1n;

//#endregion
//#region src/calculator-bigint/api/increment.ts
/**
* Returns an incremented bigint.
*
* @param value - The bigint to increment.
*
* @returns The incremented bigint.
*/
const increment$2 = (value) => value + 1n;

//#endregion
//#region src/calculator-bigint/api/integer-divide.ts
/**
* Returns the quotient of two bigints with no fractional part.
*
* @param dividend - The bigint to divide.
* @param divisor - The bigint to divide with.
*
* @returns The quotient of the two bigints.
*/
const integerDivide$2 = (dividend, divisor) => dividend / divisor;

//#endregion
//#region src/calculator-bigint/api/modulo.ts
/**
* Returns the remainder of two bigints.
*
* @param dividend - The bigint to divide.
* @param divisor - The bigint to divide with.
*
* @returns The remainder of the two bigints.
*/
const modulo$2 = (dividend, divisor) => dividend % divisor;

//#endregion
//#region src/calculator-bigint/api/multiply.ts
/**
* Returns the product of two bigints.
*
* @param multiplicand - The bigint to multiply.
* @param multiplier - The bigint to multiply with.
*
* @returns The product of the two bigints.
*/
const multiply$4 = (multiplicand, multiplier) => multiplicand * multiplier;

//#endregion
//#region src/calculator-bigint/api/power.ts
/**
* Returns an bigint to the power of an exponent.
*
* @param base - The base bigint.
* @param exponent - The exponent to raise the base to.
*
* @returns The base to the power of the exponent.
*/
const power$2 = (base, exponent) => base ** exponent;

//#endregion
//#region src/calculator-bigint/api/subtract.ts
/**
* Returns the difference between two bigints.
*
* @param minuend - The bigint to subtract from.
* @param subtrahend - The bigint to subtract.
*
* @returns The difference of the two bigints.
*/
const subtract$3 = (minuend, subtrahend) => minuend - subtrahend;

//#endregion
//#region src/calculator-bigint/api/zero.ts
/**
* Return zero as a bigint.
*
* @returns Zero as a bigint.
*/
function zero$2() {
	return 0n;
}

//#endregion
//#region src/calculator-bigint/calculator.ts
const calculator = {
	add: add$3,
	compare: compare$4,
	decrement: decrement$2,
	increment: increment$2,
	integerDivide: integerDivide$2,
	modulo: modulo$2,
	multiply: multiply$4,
	power: power$2,
	subtract: subtract$3,
	zero: zero$2
};

//#endregion
//#region src/calculator-bigjs/api/add.ts
/**
* Returns the sum of two Big numbers.
*
* @param augend - The Big number to add to.
* @param addend - The Big number to add.
*
* @returns The sum of the two Big numbers.
*/
const add$2 = (augend, addend) => augend.plus(addend);

//#endregion
//#region src/calculator-bigjs/api/compare.ts
/**
* Compares two Big numbers.
*
* @param comparand - The Big number to compare to.
* @param comparator - The Big number to compare with.
*
* @returns 1 if comparand > comparator, -1 if comparand < comparator, 0 if equal.
*/
const compare$3 = (comparand, comparator) => comparand.cmp(comparator);

//#endregion
//#region src/calculator-bigjs/api/decrement.ts
/**
* Returns a decremented Big number.
*
* @param value - The Big number to decrement.
*
* @returns The decremented Big number.
*/
const decrement$1 = (value) => value.minus(new Big(1));

//#endregion
//#region src/calculator-bigjs/api/increment.ts
/**
* Returns an incremented Big number.
*
* @param value - The Big number to increment.
*
* @returns The incremented Big number.
*/
const increment$1 = (value) => value.plus(new Big(1));

//#endregion
//#region src/calculator-bigjs/api/integer-divide.ts
/**
* Returns the quotient of two Big numbers using integer division.
*
* @param dividend - The Big number to divide.
* @param divisor - The Big number to divide with.
*
* @returns The quotient of the two Big numbers.
*/
const integerDivide$1 = (dividend, divisor) => dividend.div(divisor).round(0, Big.roundDown);

//#endregion
//#region src/calculator-bigjs/api/modulo.ts
/**
* Returns the remainder of two Big numbers.
*
* @param dividend - The Big number to divide.
* @param divisor - The Big number to divide with.
*
* @returns The remainder of the two Big numbers.
*/
const modulo$1 = (dividend, divisor) => dividend.mod(divisor);

//#endregion
//#region src/calculator-bigjs/api/multiply.ts
/**
* Returns the product of two Big numbers.
*
* @param multiplicand - The Big number to multiply.
* @param multiplier - The Big number to multiply with.
*
* @returns The product of the two Big numbers.
*/
const multiply$3 = (multiplicand, multiplier) => multiplicand.times(multiplier);

//#endregion
//#region src/calculator-bigjs/api/power.ts
/**
* Returns a Big number to the power of an exponent.
*
* @param base - The base Big number.
* @param exponent - The exponent Big number.
*
* @returns The base to the power of the exponent.
*/
const power$1 = (base, exponent) => {
	return base.pow(Number(exponent.toString()));
};

//#endregion
//#region src/calculator-bigjs/api/subtract.ts
/**
* Returns the difference of two Big numbers.
*
* @param minuend - The Big number to subtract from.
* @param subtrahend - The Big number to subtract.
*
* @returns The difference of the two Big numbers.
*/
const subtract$2 = (minuend, subtrahend) => minuend.minus(subtrahend);

//#endregion
//#region src/calculator-bigjs/api/zero.ts
/**
* Returns a Big zero.
*
* @returns A Big zero.
*/
function zero$1() {
	return new Big(0);
}

//#endregion
//#region src/calculator-bigjs/calculator.ts
const calculator$1 = {
	add: add$2,
	compare: compare$3,
	decrement: decrement$1,
	increment: increment$1,
	integerDivide: integerDivide$1,
	modulo: modulo$1,
	multiply: multiply$3,
	power: power$1,
	subtract: subtract$2,
	zero: zero$1
};

//#endregion
//#region src/calculator-number/api/add.ts
/**
* Returns the sum of two numbers.
*
* @param augend - The number to add to.
* @param addend - The number to add.
*
* @returns The sum of the two numbers.
*/
const add$1 = (augend, addend) => augend + addend;

//#endregion
//#region src/calculator-number/api/compare.ts
/**
* Compare two numbers.
*
* @param a - The first number to compare.
* @param b - The second number to compare.
*
* @returns Whether the two numbers are equal, or whether the first one is greater or less than the other.
*/
const compare$2 = (a, b) => {
	if (a < b) return ComparisonOperator.LT;
	if (a > b) return ComparisonOperator.GT;
	return ComparisonOperator.EQ;
};

//#endregion
//#region src/calculator-number/api/decrement.ts
/**
* Returns an decremented number.
*
* @param value - The number to decrement.
*
* @returns The decremented number.
*/
const decrement = (value) => value - 1;

//#endregion
//#region src/calculator-number/api/increment.ts
/**
* Returns an incremented number.
*
* @param value - The number to increment.
*
* @returns The incremented number.
*/
const increment = (value) => value + 1;

//#endregion
//#region src/calculator-number/api/integer-divide.ts
/**
* Returns the quotient of two numbers with no fractional part.
*
* @param dividend - The number to divide.
* @param divisor - The number to divide with.
*
* @returns The quotient of the two numbers.
*/
const integerDivide = (dividend, divisor) => Math.trunc(dividend / divisor);

//#endregion
//#region src/calculator-number/api/modulo.ts
/**
* Returns the remainder of two numbers.
*
* @param dividend - The number to divide.
* @param divisor - The number to divide with.
*
* @returns The remainder of the two numbers.
*/
const modulo = (dividend, divisor) => dividend % divisor;

//#endregion
//#region src/calculator-number/api/multiply.ts
/**
* Returns the product of two numbers.
*
* @param multiplicand - The number to multiply.
* @param multiplier - The number to multiply with.
*
* @returns The product of the two numbers.
*/
const multiply$2 = (multiplicand, multiplier) => multiplicand * multiplier;

//#endregion
//#region src/calculator-number/api/power.ts
/**
* Returns an number to the power of an exponent.
*
* @param base - The base number.
* @param exponent - The exponent to raise the base to.
*
* @returns The base to the power of the exponent.
*/
const power = (base, exponent) => base ** exponent;

//#endregion
//#region src/calculator-number/api/subtract.ts
/**
* Returns the difference between two numbers.
*
* @param minuend - The number to subtract from.
* @param subtrahend - The number to subtract.
*
* @returns The difference of the two numbers.
*/
const subtract$1 = (minuend, subtrahend) => minuend - subtrahend;

//#endregion
//#region src/calculator-number/api/zero.ts
/**
* Return zero as a number.
*
* @returns Zero as a number.
*/
function zero() {
	return 0;
}

//#endregion
//#region src/calculator-number/calculator.ts
const calculator$2 = {
	add: add$1,
	compare: compare$2,
	decrement,
	increment,
	integerDivide,
	modulo,
	multiply: multiply$2,
	power,
	subtract: subtract$1,
	zero
};

//#endregion
//#region src/helpers/get-calculator.ts
/**
* Infers the appropriate calculator based on the amount type.
*
* @param amount - The amount to infer the calculator from
* @returns The appropriate calculator for the amount type
*/
function getCalculator(amount) {
	if (typeof amount === "number") return calculator$2;
	if (typeof amount === "bigint") return calculator;
	if (amount && typeof amount === "object") {
		if ("constructor" in amount && amount.constructor && "name" in amount.constructor) {
			const constructorName = amount.constructor.name;
			if (constructorName === "Big") return calculator$1;
		}
	}
	throw new Error(`Cannot infer calculator for amount type: ${typeof amount}`);
}

//#endregion
//#region src/helpers/get-formatter.ts
/**
* Infers the appropriate formatter based on the amount type.
*
* @param amount - The amount to infer the formatter from
* @returns The appropriate formatter for the amount type
*/
function getFormatter(amount) {
	if (typeof amount === "number" || typeof amount === "bigint") return {
		toNumber: Number,
		toString: String
	};
	if (amount && typeof amount === "object") {
		if ("constructor" in amount && amount.constructor && "name" in amount.constructor) {
			const constructorName = amount.constructor.name;
			if (constructorName === "Big") {
				if ("toNumber" in amount && "toString" in amount) return {
					toNumber: (value) => value.toNumber(),
					toString: (value) => value.toString()
				};
			}
		}
	}
	return {
		toNumber: Number,
		toString: String
	};
}

//#endregion
//#region src/utils/equal.ts
/**
* Returns an equal function.
*
* @param calculator - The calculator to use.
*
* @returns The equal function.
*/
function equal$2(calculator$3) {
	return (subject, comparator) => calculator$3.compare(subject, comparator) === ComparisonOperator.EQ;
}

//#endregion
//#region src/utils/less-than.ts
/**
* Returns a lessThan function.
*
* @param calculator - The calculator to use.
*
* @returns The lessThan function.
*/
function lessThan$1(calculator$3) {
	return (subject, comparator) => calculator$3.compare(subject, comparator) === ComparisonOperator.LT;
}

//#endregion
//#region src/utils/absolute.ts
function absolute(calculator$3) {
	const equalFn = equal$2(calculator$3);
	const lessThanFn = lessThan$1(calculator$3);
	const zero$3 = calculator$3.zero();
	return (input) => {
		if (equalFn(input, zero$3)) return zero$3;
		if (lessThanFn(input, zero$3)) {
			const minusOne = calculator$3.decrement(zero$3);
			return calculator$3.multiply(minusOne, input);
		}
		return input;
	};
}

//#endregion
//#region src/utils/compare.ts
/**
* Returns a compare function.
*
* @param calculator - The calculator to use.
*
* @returns The compare function.
*/
function compare$1(calculator$3) {
	return (subject, comparator) => calculator$3.compare(subject, comparator);
}

//#endregion
//#region src/utils/is-array.ts
function isArray(maybeArray) {
	return Array.isArray(maybeArray);
}

//#endregion
//#region src/utils/compute-base.ts
function computeBase(calculator$3) {
	return (base) => {
		if (isArray(base)) return base.reduce((acc, curr) => calculator$3.multiply(acc, curr));
		return base;
	};
}

//#endregion
//#region src/utils/count-trailing-zeros.ts
function countTrailingZeros(calculator$3) {
	const equalFn = equal$2(calculator$3);
	return (input, base) => {
		const zero$3 = calculator$3.zero();
		if (equalFn(zero$3, input)) return calculator$3.zero();
		let i = zero$3;
		let temp = input;
		while (equalFn(calculator$3.modulo(temp, base), zero$3)) {
			temp = calculator$3.integerDivide(temp, base);
			i = calculator$3.increment(i);
		}
		return i;
	};
}

//#endregion
//#region src/utils/greater-than.ts
/**
* Returns a greaterThan function.
*
* @param calculator - The calculator to use.
*
* @returns The greaterThan function.
*/
function greaterThan$1(calculator$3) {
	return (subject, comparator) => calculator$3.compare(subject, comparator) === ComparisonOperator.GT;
}

//#endregion
//#region src/utils/greater-than-or-equal.ts
/**
* Returns a greaterThanOrEqual function.
*
* @param calculator - The calculator to use.
*
* @returns The greaterThanOrEqual function.
*/
function greaterThanOrEqual$1(calculator$3) {
	return (subject, comparator) => greaterThan$1(calculator$3)(subject, comparator) || equal$2(calculator$3)(subject, comparator);
}

//#endregion
//#region src/utils/distribute.ts
/**
* Returns a distribute function.
*
* @param calculator - The calculator to use.
*
* @returns The distribute function.
*/
function distribute(calculator$3) {
	return (value, ratios) => {
		const equalFn = equal$2(calculator$3);
		const greaterThanFn = greaterThan$1(calculator$3);
		const lessThanFn = lessThan$1(calculator$3);
		const greaterThanOrEqualFn = greaterThanOrEqual$1(calculator$3);
		const zero$3 = calculator$3.zero();
		const one = calculator$3.increment(zero$3);
		const total = ratios.reduce((a, b) => calculator$3.add(a, b), zero$3);
		if (equalFn(total, zero$3)) return ratios;
		let remainder = value;
		const shares = ratios.map((ratio) => {
			const share = calculator$3.integerDivide(calculator$3.multiply(value, ratio), total) || zero$3;
			remainder = calculator$3.subtract(remainder, share);
			return share;
		});
		const isPositive$2 = greaterThanOrEqualFn(value, zero$3);
		const compare$5 = isPositive$2 ? greaterThanFn : lessThanFn;
		const amount = isPositive$2 ? one : calculator$3.decrement(zero$3);
		let i = 0;
		const maxIterations = ratios.length * 1e3;
		while (compare$5(remainder, zero$3)) {
			if (i >= maxIterations) throw new Error("[Monetary] distribute: exceeded max iterations");
			const idx = i % ratios.length;
			const ratio = ratios[idx];
			const share = shares[idx];
			if (ratio !== void 0 && share !== void 0 && !equalFn(ratio, zero$3)) {
				shares[idx] = calculator$3.add(share, amount);
				remainder = calculator$3.subtract(remainder, amount);
			}
			i++;
		}
		return shares;
	};
}

//#endregion
//#region src/utils/is-scaled-amount.ts
function isScaledAmount(amount) {
	return amount != null && typeof amount === "object" && "amount" in amount;
}

//#endregion
//#region src/utils/get-amount-and-scale.ts
function getAmountAndScale(value, zero$3) {
	if (isScaledAmount(value)) return {
		amount: value.amount,
		scale: value.scale ?? zero$3
	};
	return {
		amount: value,
		scale: zero$3
	};
}

//#endregion
//#region src/utils/get-divisors.ts
function getDivisors(calculator$3) {
	const { multiply: multiply$5 } = calculator$3;
	return (bases) => {
		const result = [];
		for (let i = 0; i < bases.length; i++) {
			const divisor = bases.slice(i).reduce((acc, curr) => multiply$5(acc, curr));
			result.push(divisor);
		}
		return result;
	};
}

//#endregion
//#region src/utils/is-even.ts
function isEven(calculator$3) {
	const equalFn = equal$2(calculator$3);
	const zero$3 = calculator$3.zero();
	const two = calculator$3.increment(calculator$3.increment(zero$3));
	return (input) => equalFn(calculator$3.modulo(input, two), zero$3);
}

//#endregion
//#region src/utils/is-half.ts
function isHalf(calculator$3) {
	const equalFn = equal$2(calculator$3);
	const absoluteFn = absolute(calculator$3);
	return (input, total) => {
		const remainder = absoluteFn(calculator$3.modulo(input, total));
		const difference = calculator$3.subtract(total, remainder);
		return equalFn(difference, remainder);
	};
}

//#endregion
//#region src/utils/less-than-or-equal.ts
/**
* Returns a lessThanOrEqual function.
*
* @param calculator - The calculator to use.
*
* @returns The lessThanOrEqual function.
*/
function lessThanOrEqual$1(calculator$3) {
	return (subject, comparator) => lessThan$1(calculator$3)(subject, comparator) || equal$2(calculator$3)(subject, comparator);
}

//#endregion
//#region src/utils/maximum.ts
/**
* Returns a maximum function.
*
* @param calculator - The calculator to use.
*
* @returns The maximum function.
*/
function maximum$1(calculator$3) {
	const lessThanFn = lessThan$1(calculator$3);
	return (values) => values.reduce((acc, curr) => lessThanFn(acc, curr) ? curr : acc);
}

//#endregion
//#region src/utils/minimum.ts
/**
* Returns a minimum function.
*
* @param calculator - The calculator to use.
*
* @returns The minimum function.
*/
function minimum$1(calculator$3) {
	const greaterThanFn = greaterThan$1(calculator$3);
	return (values) => values.reduce((acc, curr) => greaterThanFn(acc, curr) ? curr : acc);
}

//#endregion
//#region src/utils/sign.ts
function sign(calculator$3) {
	const equalFn = equal$2(calculator$3);
	const lessThanFn = lessThan$1(calculator$3);
	const zero$3 = calculator$3.zero();
	return (input) => {
		if (equalFn(input, zero$3)) return zero$3;
		const one = calculator$3.increment(zero$3);
		const minusOne = calculator$3.decrement(zero$3);
		return lessThanFn(input, zero$3) ? minusOne : one;
	};
}

//#endregion
//#region src/api/have-same-currency.ts
function haveSameCurrency$1(monetaryObjects) {
	assertNonEmpty(monetaryObjects, "haveSameCurrency");
	const [firstMonetary, ...otherMonetaries] = monetaryObjects;
	const calculator$3 = getCalculator(firstMonetary.amount);
	const computeBaseFn = computeBase(calculator$3);
	const { currency: comparator } = firstMonetary;
	const equalFn = equal$2(calculator$3);
	const comparatorBase = computeBaseFn(comparator.base);
	return otherMonetaries.every((d) => {
		const { currency: subject } = d;
		const subjectBase = computeBaseFn(subject.base);
		return subject.code === comparator.code && equalFn(subjectBase, comparatorBase) && equalFn(subject.exponent, comparator.exponent);
	});
}

//#endregion
//#region src/divide/down.ts
/**
* Divide and round down.
*
* Rounding down happens whenever the quotient is not an integer.
*
* @param amount - The amount to divide.
* @param factor - The factor to divide by.
* @param calculator - The calculator to use.
*
* @returns The rounded amount.
*/
const down = (amount, factor, calculator$3) => {
	const greaterThanFn = greaterThan$1(calculator$3);
	const equalFn = equal$2(calculator$3);
	const zero$3 = calculator$3.zero();
	const isPositive$2 = greaterThanFn(amount, zero$3);
	const quotient = calculator$3.integerDivide(amount, factor);
	const remainder = calculator$3.modulo(amount, factor);
	const isInteger = equalFn(remainder, zero$3);
	if (isPositive$2 || isInteger) return quotient;
	return calculator$3.decrement(quotient);
};

//#endregion
//#region src/divide/half-away-from-zero.ts
/**
* Divide and round towards "nearest neighbor" unless both neighbors are
* equidistant, in which case round away from zero.
*
* @param amount - The amount to divide.
* @param factor - The factor to divide by.
* @param calculator - The calculator to use.
*
* @returns The rounded amount.
*/
const halfAwayFromZero = (amount, factor, calculator$3) => {
	const signFn = sign(calculator$3);
	const isHalfFn = isHalf(calculator$3);
	const absoluteFn = absolute(calculator$3);
	if (!isHalfFn(amount, factor)) return halfUp(amount, factor, calculator$3);
	return calculator$3.multiply(signFn(amount), up(absoluteFn(amount), factor, calculator$3));
};

//#endregion
//#region src/divide/half-down.ts
/**
* Divide and round towards "nearest neighbor" unless both neighbors are
* equidistant, in which case round down.
*
* Rounding down happens when:
* - The quotient is half (e.g., -1.5, 1.5).
* - The quotient is positive and less than half (e.g., 1.4).
* - The quotient is negative and greater than half (e.g., -1.6).
*
* @param amount - The amount to divide.
* @param factor - The factor to divide by.
* @param calculator - The calculator to use.
*
* @returns The rounded amount.
*/
const halfDown = (amount, factor, calculator$3) => {
	const isHalfFn = isHalf(calculator$3);
	if (isHalfFn(amount, factor)) return down(amount, factor, calculator$3);
	return halfUp(amount, factor, calculator$3);
};

//#endregion
//#region src/divide/half-even.ts
/**
* Divide and round towards "nearest neighbor" unless both neighbors are
* equidistant, in which case round to the nearest even integer.
*
* @param amount - The amount to divide.
* @param factor - The factor to divide by.
* @param calculator - The calculator to use.
*
* @returns The rounded amount.
*/
const halfEven = (amount, factor, calculator$3) => {
	const isEvenFn = isEven(calculator$3);
	const isHalfFn = isHalf(calculator$3);
	const rounded = halfUp(amount, factor, calculator$3);
	if (!isHalfFn(amount, factor)) return rounded;
	return isEvenFn(rounded) ? rounded : calculator$3.decrement(rounded);
};

//#endregion
//#region src/divide/half-odd.ts
/**
* Divide and round towards "nearest neighbor" unless both neighbors are
* equidistant, in which case round to the nearest odd integer.
*
* @param amount - The amount to divide.
* @param factor - The factor to divide by.
* @param calculator - The calculator to use.
*
* @returns The rounded amount.
*/
const halfOdd = (amount, factor, calculator$3) => {
	const isEvenFn = isEven(calculator$3);
	const isHalfFn = isHalf(calculator$3);
	const rounded = halfUp(amount, factor, calculator$3);
	if (!isHalfFn(amount, factor)) return rounded;
	return isEvenFn(rounded) ? calculator$3.decrement(rounded) : rounded;
};

//#endregion
//#region src/divide/half-towards-zero.ts
/**
* Divide and round towards "nearest neighbor" unless both neighbors are
* equidistant, in which case round towards zero.
*
* @param amount - The amount to divide.
* @param factor - The factor to divide by.
* @param calculator - The calculator to use.
*
* @returns The rounded amount.
*/
const halfTowardsZero = (amount, factor, calculator$3) => {
	const signFn = sign(calculator$3);
	const isHalfFn = isHalf(calculator$3);
	const absoluteFn = absolute(calculator$3);
	if (!isHalfFn(amount, factor)) return halfUp(amount, factor, calculator$3);
	return calculator$3.multiply(signFn(amount), down(absoluteFn(amount), factor, calculator$3));
};

//#endregion
//#region src/divide/half-up.ts
/**
* Divide and round towards "nearest neighbor" unless both neighbors are
* equidistant, in which case round up.
*
* Rounding up happens when:
* - The quotient is half (e.g., -1.5, 1.5).
* - The quotient is positive and greater than half (e.g., 1.6).
* - The quotient is negative and less than half (e.g., -1.4).
*
* @param amount - The amount to divide.
* @param factor - The factor to divide by.
* @param calculator - The calculator to use.
*
* @returns The rounded amount.
*/
const halfUp = (amount, factor, calculator$3) => {
	const greaterThanFn = greaterThan$1(calculator$3);
	const isHalfFn = isHalf(calculator$3);
	const absoluteFn = absolute(calculator$3);
	const zero$3 = calculator$3.zero();
	const remainder = absoluteFn(calculator$3.modulo(amount, factor));
	const difference = calculator$3.subtract(factor, remainder);
	const isLessThanHalf = greaterThanFn(difference, remainder);
	const isPositive$2 = greaterThanFn(amount, zero$3);
	if (isHalfFn(amount, factor) || isPositive$2 && !isLessThanHalf || !isPositive$2 && isLessThanHalf) return up(amount, factor, calculator$3);
	return down(amount, factor, calculator$3);
};

//#endregion
//#region src/divide/up.ts
/**
* Divide and round up.
*
* Rounding up happens whenever the quotient is not an integer.
*
* @param amount - The amount to divide.
* @param factor - The factor to divide by.
* @param calculator - The calculator to use.
*
* @returns The rounded amount.
*/
const up = (amount, factor, calculator$3) => {
	const greaterThanFn = greaterThan$1(calculator$3);
	const equalFn = equal$2(calculator$3);
	const zero$3 = calculator$3.zero();
	const isPositive$2 = greaterThanFn(amount, zero$3);
	const quotient = calculator$3.integerDivide(amount, factor);
	const remainder = calculator$3.modulo(amount, factor);
	const isInteger = equalFn(remainder, zero$3);
	if (!isInteger && isPositive$2) return calculator$3.increment(quotient);
	return quotient;
};

//#endregion
//#region src/api/transform-scale.ts
function transformScale$1(calculator$3) {
	const greaterThanFn = greaterThan$1(calculator$3);
	const computeBaseFn = computeBase(calculator$3);
	return function transformScaleFn(...[monetaryObject, newScale, divide = down]) {
		const { amount, currency, scale } = monetaryObject;
		const isLarger = greaterThanFn(newScale, scale);
		const operation = isLarger ? calculator$3.multiply : divide;
		const [a, b] = isLarger ? [newScale, scale] : [scale, newScale];
		const base = computeBaseFn(currency.base);
		const factor = calculator$3.power(base, calculator$3.subtract(a, b));
		return {
			amount: operation(amount, factor, calculator$3),
			currency,
			scale: newScale
		};
	};
}

//#endregion
//#region src/api/normalize-scale.ts
function normalizeScale$1(calculator$3) {
	const maximumFn = maximum$1(calculator$3);
	const convertScaleFn = transformScale$1(calculator$3);
	const equalFn = equal$2(calculator$3);
	return function _normalizeScale(...[monetaryObjects]) {
		const highestScale = monetaryObjects.reduce((highest, current) => {
			const { scale } = current;
			return maximumFn([highest, scale]);
		}, calculator$3.zero());
		return monetaryObjects.map((d) => {
			const { scale } = d;
			return equalFn(scale, highestScale) ? d : convertScaleFn(d, highestScale);
		});
	};
}

//#endregion
//#region src/api/add.ts
function unsafeAdd(calculator$3) {
	return function add$4(...[augend, addend]) {
		const { amount: augendAmount, currency, scale } = augend;
		const { amount: addendAmount } = addend;
		const amount = calculator$3.add(augendAmount, addendAmount);
		return {
			amount,
			currency,
			scale
		};
	};
}
function safeAdd(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const addFn = unsafeAdd(calculator$3);
	return function add$4(...[augend, addend]) {
		const condition = haveSameCurrency$1([augend, addend]);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalized = normalizeFn([augend, addend]);
		assertPair(normalized, "add");
		const [newAugend, newAddend] = normalized;
		return addFn(newAugend, newAddend);
	};
}

//#endregion
//#region src/api/allocate.ts
function unsafeAllocate(calculator$3) {
	return function allocate$1(...[monetaryObject, ratios]) {
		const { amount, currency, scale } = monetaryObject;
		const distributeFn = distribute(calculator$3);
		const shares = distributeFn(amount, ratios.map((ratio) => ratio.amount));
		return shares.map((share) => ({
			amount: share,
			currency,
			scale
		}));
	};
}
function safeAllocate(calculator$3) {
	const allocateFn = unsafeAllocate(calculator$3);
	const greaterThanOrEqualFn = greaterThanOrEqual$1(calculator$3);
	const greaterThanFn = greaterThan$1(calculator$3);
	const convertScaleFn = transformScale$1(calculator$3);
	const maximumFn = maximum$1(calculator$3);
	const equalFn = equal$2(calculator$3);
	const zero$3 = calculator$3.zero();
	const ten = new Array(10).fill(null).reduce(calculator$3.increment, zero$3);
	return function allocate$1(...[monetaryObject, ratios]) {
		const hasRatios = ratios.length > 0;
		const scaledRatios = ratios.map((ratio) => getAmountAndScale(ratio, zero$3));
		const highestRatioScale = hasRatios ? maximumFn(scaledRatios.map(({ scale: s }) => s)) : zero$3;
		const normalizedRatios = scaledRatios.map(({ amount: amt, scale: scl }) => {
			const factor = equalFn(scl, highestRatioScale) ? zero$3 : calculator$3.subtract(highestRatioScale, scl);
			return {
				amount: calculator$3.multiply(amt, calculator$3.power(ten, factor)),
				scale: scl
			};
		});
		const hasOnlyPositiveRatios = normalizedRatios.every(({ amount: a }) => greaterThanOrEqualFn(a, zero$3));
		const hasOneNonZeroRatio = normalizedRatios.some(({ amount: a }) => greaterThanFn(a, zero$3));
		const condition = hasRatios && hasOnlyPositiveRatios && hasOneNonZeroRatio;
		assert(condition, INVALID_RATIOS_MESSAGE);
		const { scale } = monetaryObject;
		const newScale = calculator$3.add(scale, highestRatioScale);
		return allocateFn(convertScaleFn(monetaryObject, newScale), normalizedRatios);
	};
}

//#endregion
//#region src/api/compare.ts
function unsafeCompare(calculator$3) {
	const compareFn = compare$1(calculator$3);
	return function compare$5(...[monetaryObject, comparator]) {
		return compareFn(monetaryObject.amount, comparator.amount);
	};
}
function safeCompare(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const compareFn = unsafeCompare(calculator$3);
	return function compare$5(...[monetaryObject, comparator]) {
		const condition = haveSameCurrency$1([monetaryObject, comparator]);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalized = normalizeFn([monetaryObject, comparator]);
		assertPair(normalized, "compare");
		const [normalizedSubject, normalizedComparator] = normalized;
		return compareFn(normalizedSubject, normalizedComparator);
	};
}

//#endregion
//#region src/api/convert.ts
function convert$1(calculator$3) {
	const convertScaleFn = transformScale$1(calculator$3);
	const maximumFn = maximum$1(calculator$3);
	const zero$3 = calculator$3.zero();
	return function convertFn(...[monetaryObject, newCurrency, rates]) {
		const rate = rates[newCurrency.code];
		assertDefined(rate, `convert: missing rate for ${newCurrency.code}`);
		const { amount, scale } = monetaryObject;
		const { amount: rateAmount, scale: rateScale } = getAmountAndScale(rate, zero$3);
		const newScale = calculator$3.add(scale, rateScale);
		return convertScaleFn({
			amount: calculator$3.multiply(amount, rateAmount),
			currency: newCurrency,
			scale: newScale
		}, maximumFn([newScale, newCurrency.exponent]));
	};
}

//#endregion
//#region src/api/have-same-amount.ts
function haveSameAmount$1(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const equalFn = equal$2(calculator$3);
	return function _haveSameAmount(...[monetaryObjects]) {
		assertNonEmpty(monetaryObjects, "haveSameAmount");
		const normalized = normalizeFn(monetaryObjects);
		assertNonEmpty(normalized, "haveSameAmount");
		const [firstMonetary, ...otherMonetaries] = normalized;
		const { amount: comparatorAmount } = firstMonetary;
		return otherMonetaries.every((d) => {
			const { amount: subjectAmount } = d;
			return equalFn(subjectAmount, comparatorAmount);
		});
	};
}

//#endregion
//#region src/api/equal.ts
function equal$1(calculator$3) {
	return function _equal(...[monetaryObject, comparator]) {
		return haveSameAmount$1(calculator$3)([monetaryObject, comparator]) && haveSameCurrency$1([monetaryObject, comparator]);
	};
}

//#endregion
//#region src/api/greater-than.ts
function unsafeGreaterThan(calculator$3) {
	const greaterThanFn = greaterThan$1(calculator$3);
	return function greaterThan$2(...[monetaryObject, comparator]) {
		return greaterThanFn(monetaryObject.amount, comparator.amount);
	};
}
function safeGreaterThan(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const greaterThanFn = unsafeGreaterThan(calculator$3);
	return function greaterThan$2(...[monetaryObject, comparator]) {
		const condition = haveSameCurrency$1([monetaryObject, comparator]);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalized = normalizeFn([monetaryObject, comparator]);
		assertPair(normalized, "greaterThan");
		const [normalizedSubject, normalizedComparator] = normalized;
		return greaterThanFn(normalizedSubject, normalizedComparator);
	};
}

//#endregion
//#region src/api/greater-than-or-equal.ts
function unsafeGreaterThanOrEqual(calculator$3) {
	const greaterThanOrEqualFn = greaterThanOrEqual$1(calculator$3);
	return function greaterThanOrEqual$2(...[monetaryObject, comparator]) {
		return greaterThanOrEqualFn(monetaryObject.amount, comparator.amount);
	};
}
function safeGreaterThanOrEqual(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const greaterThanOrEqualFn = unsafeGreaterThanOrEqual(calculator$3);
	return function greaterThanOrEqual$2(...[monetaryObject, comparator]) {
		const condition = haveSameCurrency$1([monetaryObject, comparator]);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalized = normalizeFn([monetaryObject, comparator]);
		assertPair(normalized, "greaterThanOrEqual");
		const [normalizedSubject, normalizedComparator] = normalized;
		return greaterThanOrEqualFn(normalizedSubject, normalizedComparator);
	};
}

//#endregion
//#region src/api/has-sub-units.ts
function hasSubUnits$1(calculator$3) {
	const equalFn = equal$2(calculator$3);
	const computeBaseFn = computeBase(calculator$3);
	return function _hasSubUnits(...[monetaryObject]) {
		const { amount, currency, scale } = monetaryObject;
		const base = computeBaseFn(currency.base);
		return !equalFn(calculator$3.modulo(amount, calculator$3.power(base, scale)), calculator$3.zero());
	};
}

//#endregion
//#region src/api/is-negative.ts
function isNegative$1(calculator$3) {
	const lessThanFn = lessThan$1(calculator$3);
	return function _isNegative(...[monetaryObject]) {
		const { amount } = monetaryObject;
		return lessThanFn(amount, calculator$3.zero());
	};
}

//#endregion
//#region src/api/is-positive.ts
function isPositive$1(calculator$3) {
	const greaterThanFn = greaterThan$1(calculator$3);
	return function _isPositive(...[monetaryObject]) {
		const { amount } = monetaryObject;
		return greaterThanFn(amount, calculator$3.zero());
	};
}

//#endregion
//#region src/api/is-zero.ts
function isZero$1(calculator$3) {
	const equalFn = equal$2(calculator$3);
	return function _isZero(...[monetaryObject]) {
		const { amount } = monetaryObject;
		return equalFn(amount, calculator$3.zero());
	};
}

//#endregion
//#region src/api/less-than.ts
function unsafeLessThan(calculator$3) {
	const lessThanFn = lessThan$1(calculator$3);
	return function lessThan$2(...[monetaryObject, comparator]) {
		return lessThanFn(monetaryObject.amount, comparator.amount);
	};
}
function safeLessThan(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const lessThanFn = unsafeLessThan(calculator$3);
	return function lessThan$2(...[monetaryObject, comparator]) {
		const condition = haveSameCurrency$1([monetaryObject, comparator]);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalized = normalizeFn([monetaryObject, comparator]);
		assertPair(normalized, "lessThan");
		const [normalizedSubject, normalizedComparator] = normalized;
		return lessThanFn(normalizedSubject, normalizedComparator);
	};
}

//#endregion
//#region src/api/less-than-or-equal.ts
function unsafeLessThanOrEqual(calculator$3) {
	const lessThanOrEqualFn = lessThanOrEqual$1(calculator$3);
	return function lessThanOrEqual$2(...[monetaryObject, comparator]) {
		return lessThanOrEqualFn(monetaryObject.amount, comparator.amount);
	};
}
function safeLessThanOrEqual(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const lessThanOrEqualFn = unsafeLessThanOrEqual(calculator$3);
	return function lessThanOrEqual$2(...[monetaryObject, comparator]) {
		const condition = haveSameCurrency$1([monetaryObject, comparator]);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalized = normalizeFn([monetaryObject, comparator]);
		assertPair(normalized, "lessThanOrEqual");
		const [normalizedSubject, normalizedComparator] = normalized;
		return lessThanOrEqualFn(normalizedSubject, normalizedComparator);
	};
}

//#endregion
//#region src/api/maximum.ts
function unsafeMaximum(calculator$3) {
	const maxFn = maximum$1(calculator$3);
	return function maximum$2(...[monetaryObjects]) {
		assertNonEmpty(monetaryObjects, "maximum");
		const firstMonetary = monetaryObjects[0];
		const { currency, scale } = firstMonetary;
		const amount = maxFn(monetaryObjects.map((subject) => subject.amount));
		return {
			amount,
			currency,
			scale
		};
	};
}
function safeMaximum(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const maxFn = unsafeMaximum(calculator$3);
	return function maximum$2(...[monetaryObjects]) {
		const condition = haveSameCurrency$1(monetaryObjects);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalizedMonetaryObjects = normalizeFn(monetaryObjects);
		return maxFn(normalizedMonetaryObjects);
	};
}

//#endregion
//#region src/api/minimum.ts
function unsafeMinimum(calculator$3) {
	const minFn = minimum$1(calculator$3);
	return function minimum$2(...[monetaryObjects]) {
		assertNonEmpty(monetaryObjects, "minimum");
		const firstMonetary = monetaryObjects[0];
		const { currency, scale } = firstMonetary;
		const amount = minFn(monetaryObjects.map((subject) => subject.amount));
		return {
			amount,
			currency,
			scale
		};
	};
}
function safeMinimum(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const minFn = unsafeMinimum(calculator$3);
	return function maximum$2(...[monetaryObjects]) {
		const condition = haveSameCurrency$1(monetaryObjects);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalizedMonetaryObjects = normalizeFn(monetaryObjects);
		return minFn(normalizedMonetaryObjects);
	};
}

//#endregion
//#region src/api/multiply.ts
function multiply$1(calculator$3) {
	const convertScaleFn = transformScale$1(calculator$3);
	const zero$3 = calculator$3.zero();
	return function multiplyFn(...[multiplicand, multiplier]) {
		const { amount, currency, scale } = multiplicand;
		const { amount: multiplierAmount, scale: multiplierScale } = getAmountAndScale(multiplier, zero$3);
		const newScale = calculator$3.add(scale, multiplierScale);
		return convertScaleFn({
			amount: calculator$3.multiply(amount, multiplierAmount),
			currency,
			scale: newScale
		}, newScale);
	};
}

//#endregion
//#region src/api/subtract.ts
function unsafeSubtract(calculator$3) {
	return function subtract$4(...[minuend, subtrahend]) {
		const { amount: minuendAmount, currency, scale } = minuend;
		const { amount: subtrahendAmount } = subtrahend;
		const amount = calculator$3.subtract(minuendAmount, subtrahendAmount);
		return {
			amount,
			currency,
			scale
		};
	};
}
function safeSubtract(calculator$3) {
	const normalizeFn = normalizeScale$1(calculator$3);
	const subtractFn = unsafeSubtract(calculator$3);
	return function subtract$4(...[minuend, subtrahend]) {
		const condition = haveSameCurrency$1([minuend, subtrahend]);
		assert(condition, UNEQUAL_CURRENCIES_MESSAGE);
		const normalized = normalizeFn([minuend, subtrahend]);
		assertPair(normalized, "subtract");
		const [newMinuend, newSubtrahend] = normalized;
		return subtractFn(newMinuend, newSubtrahend);
	};
}

//#endregion
//#region src/api/to-units.ts
function toUnits$1(calculator$3) {
	const getDivisorsFn = getDivisors(calculator$3);
	return function toUnitsFn(...[monetaryObject, transformer]) {
		const { amount, currency, scale } = monetaryObject;
		const { power: power$3, integerDivide: integerDivide$3, modulo: modulo$3 } = calculator$3;
		const bases = isArray(currency.base) ? currency.base : [currency.base];
		const divisors = getDivisorsFn(bases.map((base) => power$3(base, scale)));
		const value = divisors.reduce((amounts, divisor, index) => {
			const amountLeft = amounts[index];
			assertDefined(amountLeft, `toUnits: missing amount at index ${index}`);
			const quotient = integerDivide$3(amountLeft, divisor);
			const remainder = modulo$3(amountLeft, divisor);
			return [
				...amounts.filter((_, i) => i !== index),
				quotient,
				remainder
			];
		}, [amount]);
		if (!transformer) return value;
		return transformer({
			value,
			currency
		});
	};
}

//#endregion
//#region src/api/to-decimal.ts
function toDecimal$1(calculator$3) {
	const toUnitsFn = toUnits$1(calculator$3);
	const computeBaseFn = computeBase(calculator$3);
	const equalFn = equal$2(calculator$3);
	return function toDecimalFn(...[monetaryObject, transformer]) {
		const { currency, scale } = monetaryObject;
		const base = computeBaseFn(currency.base);
		const zero$3 = calculator$3.zero();
		const ten = new Array(10).fill(null).reduce(calculator$3.increment, zero$3);
		const isMultiBase = isArray(currency.base);
		const isBaseTen = equalFn(calculator$3.modulo(base, ten), zero$3);
		const isDecimal = !isMultiBase && isBaseTen;
		assert(isDecimal, NON_DECIMAL_CURRENCY_MESSAGE);
		const units = toUnitsFn(monetaryObject);
		const formatter = getFormatter(monetaryObject.amount);
		const getDecimalFn = getDecimal(calculator$3, formatter);
		const value = getDecimalFn(units, scale);
		if (!transformer) return value;
		return transformer({
			value,
			currency
		});
	};
}
function getDecimal(calculator$3, formatter) {
	const absoluteFn = absolute(calculator$3);
	const equalFn = equal$2(calculator$3);
	const lessThanFn = lessThan$1(calculator$3);
	const zero$3 = calculator$3.zero();
	return (units, scale) => {
		assertPair(units, "toDecimal");
		const [wholeUnit, fractionalUnit] = units;
		const whole = formatter.toString(wholeUnit);
		const fractional = formatter.toString(absoluteFn(fractionalUnit));
		const scaleNumber = formatter.toNumber(scale);
		const decimal = `${whole}.${fractional.padStart(scaleNumber, "0")}`;
		const leadsWithZero = equalFn(wholeUnit, zero$3);
		const isNegative$2 = lessThanFn(fractionalUnit, zero$3);
		return leadsWithZero && isNegative$2 ? `-${decimal}` : decimal;
	};
}

//#endregion
//#region src/api/to-snapshot.ts
function toSnapshot$1(monetaryObject) {
	return monetaryObject;
}

//#endregion
//#region src/api/trim-scale.ts
function trimScale$1(calculator$3) {
	const countTrailingZerosFn = countTrailingZeros(calculator$3);
	const equalFn = equal$2(calculator$3);
	const maximumFn = maximum$1(calculator$3);
	const transformScaleFn = transformScale$1(calculator$3);
	const computeBaseFn = computeBase(calculator$3);
	return function trimScaleFn(...[monetaryObject]) {
		const { amount, currency, scale } = monetaryObject;
		const base = computeBaseFn(currency.base);
		const trailingZerosLength = countTrailingZerosFn(amount, base);
		const difference = calculator$3.subtract(scale, trailingZerosLength);
		const newScale = maximumFn([difference, currency.exponent]);
		if (equalFn(newScale, scale)) return monetaryObject;
		return transformScaleFn(monetaryObject, newScale);
	};
}

//#endregion
//#region src/api-overrides/add.ts
/**
* Add up the passed Monetary objects.
*
* @param augend - The Monetary object to add to.
* @param addend - The Monetary object to add.
*
* @returns A new Monetary object.
*
* @public
*/
function add(...[augend, addend]) {
	const calculator$3 = getCalculator(augend.amount);
	const addFn = safeAdd(calculator$3);
	return addFn(augend, addend);
}

//#endregion
//#region src/api-overrides/allocate.ts
/**
* Distribute the amount of a Monetary object across a list of ratios.
*
* @param monetaryObject - The Monetary object to allocate from.
* @param ratios - The ratios to allocate the amount to.
*
* @returns A new Monetary object.
*
* @public
*/
function allocate(...[monetaryObject, ratios]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const allocateFn = safeAllocate(calculator$3);
	return allocateFn(monetaryObject, ratios);
}

//#endregion
//#region src/api-overrides/compare.ts
/**
* Compare the value of a Monetary object relative to another.
*
* @param monetaryObject - The Monetary object to compare.
* @param comparator - The Monetary object to compare to.
*
* @returns One of -1, 0, or 1 depending on whether the first Monetary object is less than, equal to, or greater than the other.
*
* @public
*/
function compare(...[monetaryObject, comparator]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const compareFn = safeCompare(calculator$3);
	return compareFn(monetaryObject, comparator);
}

//#endregion
//#region src/api-overrides/convert.ts
/**
* Convert a Monetary object to another currency.
*
* @param monetaryObject - The Monetary object to format.
* @param newCurrency - The currency to convert to.
* @param rates - The rates to convert with.
*
* @returns A converted Monetary object.
*
* @public
*/
function convert(...[monetaryObject, newCurrency, rates]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const converter = convert$1(calculator$3);
	return converter(monetaryObject, newCurrency, rates);
}

//#endregion
//#region src/api-overrides/equal.ts
/**
* Check whether the value of a Monetary object is equal to another.
*
* @param monetaryObject - The first Monetary object to compare.
* @param comparator - The second Monetary object to compare.
*
* @returns Whether the Monetary objects are equal.
*
* @public
*/
function equal(...[monetaryObject, comparator]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const equalFn = equal$1(calculator$3);
	return equalFn(monetaryObject, comparator);
}

//#endregion
//#region src/api-overrides/greater-than.ts
/**
* Check whether the value of a Monetary object is greater than another.
*
* @param monetaryObject - The Monetary object to compare.
* @param comparator - The Monetary object to compare to.
*
* @returns Whether the Monetary to compare is greater than the other.
*
* @public
*/
function greaterThan(...[monetaryObject, comparator]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const greaterThanFn = safeGreaterThan(calculator$3);
	return greaterThanFn(monetaryObject, comparator);
}

//#endregion
//#region src/api-overrides/greater-than-or-equal.ts
/**
* Check whether the value of a Monetary object is greater than or equal another.
*
* @param monetaryObject - The Monetary object to compare.
* @param comparator - The Monetary object to compare to.
*
* @returns Whether the Monetary to compare is greater than or equal the other.
*
* @public
*/
function greaterThanOrEqual(...[monetaryObject, comparator]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const greaterThanOrEqualFn = safeGreaterThanOrEqual(calculator$3);
	return greaterThanOrEqualFn(monetaryObject, comparator);
}

//#endregion
//#region src/api-overrides/has-sub-units.ts
/**
* Check whether a Monetary object has minor currency units.
*
* @param monetaryObject - The Monetary object to check.
*
* @returns Whether the Monetary object has minor currency units.
*
* @public
*/
function hasSubUnits(...[monetaryObject]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const hasSubUnitsFn = hasSubUnits$1(calculator$3);
	return hasSubUnitsFn(monetaryObject);
}

//#endregion
//#region src/api-overrides/have-same-amount.ts
/**
* Check whether a set of Monetary objects have the same amount.
*
* @param monetaryObjects - The Monetary objects to compare.
*
* @returns Whether the Monetary objects have the same amount.
*
* @public
*/
function haveSameAmount(...[monetaryObjects]) {
	assertNonEmpty(monetaryObjects, "haveSameAmount");
	const calculator$3 = getCalculator(monetaryObjects[0].amount);
	const haveSameAmountFn = haveSameAmount$1(calculator$3);
	return haveSameAmountFn(monetaryObjects);
}

//#endregion
//#region src/api-overrides/have-same-currency.ts
/**
* Check whether a set of Monetary objects have the same currency.
*
* @param monetaryObjects - The Monetary objects to compare.
*
* @returns Whether the Monetary objects have the same currency.
*
* @public
*/
const haveSameCurrency = haveSameCurrency$1;

//#endregion
//#region src/api-overrides/is-negative.ts
/**
* Check whether a Monetary object is negative.
*
* @param monetaryObject - The Monetary object to check.
*
* @returns Whether the Monetary object is negative.
*
* @public
*/
function isNegative(...[monetaryObject]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const isNegativeFn = isNegative$1(calculator$3);
	return isNegativeFn(monetaryObject);
}

//#endregion
//#region src/api-overrides/is-positive.ts
/**
* Check whether a Monetary object is positive.
*
* @param monetaryObject - The Monetary object to check.
*
* @returns Whether the Monetary object is positive.
*
* @public
*/
function isPositive(...[monetaryObject]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const isPositiveFn = isPositive$1(calculator$3);
	return isPositiveFn(monetaryObject);
}

//#endregion
//#region src/api-overrides/is-zero.ts
/**
* Check whether the value of a Monetary object is zero.
*
* @param monetaryObject - The Monetary object to check.
*
* @returns Whether the value of a Monetary object is zero.
*
* @public
*/
function isZero(...[monetaryObject]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const isZeroFn = isZero$1(calculator$3);
	return isZeroFn(monetaryObject);
}

//#endregion
//#region src/api-overrides/less-than.ts
/**
* Check whether the value of a Monetary object is lesser than another.
*
* @param monetaryObject - The Monetary object to compare.
* @param comparator - The Monetary object to compare to.
*
* @returns Whether the Monetary to compare is lesser than the other.
*
* @public
*/
function lessThan(...[monetaryObject, comparator]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const lessThanFn = safeLessThan(calculator$3);
	return lessThanFn(monetaryObject, comparator);
}

//#endregion
//#region src/api-overrides/less-than-or-equal.ts
/**
* Check whether the value of a Monetary object is lesser than or equal to another.
*
* @param monetaryObject - The Monetary object to compare.
* @param comparator - The Monetary object to compare to.
*
* @returns Whether the Monetary to compare is lesser than or equal to the other.
*
* @public
*/
function lessThanOrEqual(...[monetaryObject, comparator]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const lessThanOrEqualFn = safeLessThanOrEqual(calculator$3);
	return lessThanOrEqualFn(monetaryObject, comparator);
}

//#endregion
//#region src/api-overrides/maximum.ts
/**
* Get the greatest of the passed Monetary objects.
*
* @param monetaryObjects - The Monetary objects to maximum.
*
* @returns A new Monetary object.
*
* @public
*/
function maximum(...[monetaryObjects]) {
	assertNonEmpty(monetaryObjects, "maximum");
	const calculator$3 = getCalculator(monetaryObjects[0].amount);
	const maximumFn = safeMaximum(calculator$3);
	return maximumFn(monetaryObjects);
}

//#endregion
//#region src/api-overrides/minimum.ts
/**
* Get the lowest of the passed Monetary objects.
*
* @param monetaryObjects - The Monetary objects to minimum.
*
* @returns A new Monetary object.
*
* @public
*/
function minimum(...[monetaryObjects]) {
	assertNonEmpty(monetaryObjects, "minimum");
	const calculator$3 = getCalculator(monetaryObjects[0].amount);
	const minimumFn = safeMinimum(calculator$3);
	return minimumFn(monetaryObjects);
}

//#endregion
//#region src/api-overrides/multiply.ts
/**
* Multiply the passed Monetary object.
*
* @param multiplicand - The Monetary object to multiply.
* @param multiplier - The number to multiply with.
*
* @returns A new Monetary object.
*
* @public
*/
function multiply(...[multiplicand, multiplier]) {
	const calculator$3 = getCalculator(multiplicand.amount);
	const multiplyFn = multiply$1(calculator$3);
	return multiplyFn(multiplicand, multiplier);
}

//#endregion
//#region src/api-overrides/normalize-scale.ts
/**
* Normalize a set of Monetary objects to the highest scale of the set.
*
* @param monetaryObjects - The Monetary objects to normalize.
*
* @returns A new set of Monetary objects.
*
* @public
*/
function normalizeScale(...[monetaryObjects]) {
	assertNonEmpty(monetaryObjects, "normalizeScale");
	const calculator$3 = getCalculator(monetaryObjects[0].amount);
	const normalizeScaleFn = normalizeScale$1(calculator$3);
	return normalizeScaleFn(monetaryObjects);
}

//#endregion
//#region src/api-overrides/subtract.ts
/**
* Subtract the passed Monetary objects.
*
* @param minuend - The Monetary object to subtract from.
* @param subtrahend - The Monetary object to subtract.
*
* @returns A new Monetary object.
*
* @public
*/
function subtract(...[minuend, subtrahend]) {
	const calculator$3 = getCalculator(minuend.amount);
	const subtractFn = safeSubtract(calculator$3);
	return subtractFn(minuend, subtrahend);
}

//#endregion
//#region src/api-overrides/to-decimal.ts
/**
* Get the amount of a Monetary object in decimal form.
*
* @param monetaryObject - The Monetary object to format.
* @param transformer - A transformer function.
*
* @returns The amount in decimal form.
*
* @public
*/
function toDecimal(...[monetaryObject, transformer]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const toDecimalFn = toDecimal$1(calculator$3);
	return toDecimalFn(monetaryObject, transformer);
}

//#endregion
//#region src/api-overrides/to-snapshot.ts
/**
* Get a snapshot of a Monetary object.
*
* @param monetaryObject - The Monetary object to format.
* @param transformer - A transformer function.
*
* @returns A snapshot of the object.
*
* @public
*/
const toSnapshot = toSnapshot$1;

//#endregion
//#region src/api-overrides/to-units.ts
/**
* Get the amount of a Monetary object in units.
*
* @param monetaryObject - The Monetary object to format.
* @param transformer - A transformer function.
*
* @returns The amount in units.
*
* @public
*/
function toUnits(...[monetaryObject, transformer]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const toUnitsFn = toUnits$1(calculator$3);
	return toUnitsFn(monetaryObject, transformer);
}

//#endregion
//#region src/api-overrides/transform-scale.ts
/**
* Transform a Monetary object to a new scale.
*
* @param monetaryObject - The Monetary object to transform.
* @param newScale - The new scale.
* @param divide - A custom divide function.
*
* @returns A new Monetary object.
*
* @public
*/
function transformScale(...[monetaryObject, newScale, divide]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const transformScaleFn = transformScale$1(calculator$3);
	return transformScaleFn(monetaryObject, newScale, divide);
}

//#endregion
//#region src/api-overrides/trim-scale.ts
/**
* Trim a Monetary object's scale as much as possible, down to the currency exponent.
*
* @param monetaryObject - The Monetary object which scale to trim.
*
* @returns A new Monetary object.
*
* @public
*/
function trimScale(...[monetaryObject]) {
	const calculator$3 = getCalculator(monetaryObject.amount);
	const trimScaleFn = trimScale$1(calculator$3);
	return trimScaleFn(monetaryObject);
}

//#endregion
//#region src/currencies/iso4217/amendments/168/aed.ts
/**
* United Arab Emirates dirham.
*/
const AED = {
	code: "AED",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/afn.ts
/**
* Afghan afghani.
*/
const AFN = {
	code: "AFN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/all.ts
/**
* Albanian lek.
*/
const ALL = {
	code: "ALL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/amd.ts
/**
* Armenian dram.
*/
const AMD = {
	code: "AMD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ang.ts
/**
* Netherlands Antillean guilder.
*/
const ANG = {
	code: "ANG",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/aoa.ts
/**
* Angolan kwanza.
*/
const AOA = {
	code: "AOA",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ars.ts
/**
* Argentine peso.
*/
const ARS = {
	code: "ARS",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/aud.ts
/**
* Australian dollar.
*/
const AUD = {
	code: "AUD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/awg.ts
/**
* Aruban florin.
*/
const AWG = {
	code: "AWG",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/azn.ts
/**
* Azerbaijani manat.
*/
const AZN = {
	code: "AZN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bam.ts
/**
* Bosnia and Herzegovina convertible mark.
*/
const BAM = {
	code: "BAM",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bbd.ts
/**
* Barbados dollar.
*/
const BBD = {
	code: "BBD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bdt.ts
/**
* Bangladeshi taka.
*/
const BDT = {
	code: "BDT",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bgn.ts
/**
* Bulgarian lev.
*/
const BGN = {
	code: "BGN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bhd.ts
/**
* Bahraini dinar.
*/
const BHD = {
	code: "BHD",
	base: 10,
	exponent: 3
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bif.ts
/**
* Burundian franc.
*/
const BIF = {
	code: "BIF",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bmd.ts
/**
* Bermudian dollar.
*/
const BMD = {
	code: "BMD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bnd.ts
/**
* Brunei dollar.
*/
const BND = {
	code: "BND",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bob.ts
/**
* Bolivian boliviano.
*/
const BOB = {
	code: "BOB",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bov.ts
/**
* Bolivian Mvdol.
*/
const BOV = {
	code: "BOV",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/brl.ts
/**
* Brazilian real.
*/
const BRL = {
	code: "BRL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bsd.ts
/**
* Bahamian dollar.
*/
const BSD = {
	code: "BSD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/btn.ts
/**
* Bhutanese ngultrum.
*/
const BTN = {
	code: "BTN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bwp.ts
/**
* Botswana pula.
*/
const BWP = {
	code: "BWP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/byn.ts
/**
* Belarusian ruble.
*/
const BYN = {
	code: "BYN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/bzd.ts
/**
* Belize dollar.
*/
const BZD = {
	code: "BZD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/cad.ts
/**
* Canadian dollar.
*/
const CAD = {
	code: "CAD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/cdf.ts
/**
* Congolese franc.
*/
const CDF = {
	code: "CDF",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/che.ts
/**
* WIR Euro.
*/
const CHE = {
	code: "CHE",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/chf.ts
/**
* Swiss franc.
*/
const CHF = {
	code: "CHF",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/chw.ts
/**
* WIR Franc.
*/
const CHW = {
	code: "CHW",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/clf.ts
/**
* Unidad de Fomento.
*/
const CLF = {
	code: "CLF",
	base: 10,
	exponent: 4
};

//#endregion
//#region src/currencies/iso4217/amendments/168/clp.ts
/**
* Chilean peso.
*/
const CLP = {
	code: "CLP",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/cny.ts
/**
* Renminbi (Chinese) yuan.
*/
const CNY = {
	code: "CNY",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/cop.ts
/**
* Colombian peso.
*/
const COP = {
	code: "COP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/cou.ts
/**
* Unidad de Valor Real.
*/
const COU = {
	code: "COU",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/crc.ts
/**
* Costa Rican colón.
*/
const CRC = {
	code: "CRC",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/cuc.ts
/**
* Cuban convertible peso.
*/
const CUC = {
	code: "CUC",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/cup.ts
/**
* Cuban peso.
*/
const CUP = {
	code: "CUP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/cve.ts
/**
* Cape Verdean escudo.
*/
const CVE = {
	code: "CVE",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/czk.ts
/**
* Czech koruna.
*/
const CZK = {
	code: "CZK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/djf.ts
/**
* Djiboutian franc.
*/
const DJF = {
	code: "DJF",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/dkk.ts
/**
* Danish krone.
*/
const DKK = {
	code: "DKK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/dop.ts
/**
* Dominican peso.
*/
const DOP = {
	code: "DOP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/dzd.ts
/**
* Algerian dinar.
*/
const DZD = {
	code: "DZD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/egp.ts
/**
* Egyptian pound.
*/
const EGP = {
	code: "EGP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ern.ts
/**
* Eritrean nakfa.
*/
const ERN = {
	code: "ERN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/etb.ts
/**
* Ethiopian birr.
*/
const ETB = {
	code: "ETB",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/eur.ts
/**
* Euro.
*/
const EUR = {
	code: "EUR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/fjd.ts
/**
* Fiji dollar.
*/
const FJD = {
	code: "FJD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/fkp.ts
/**
* Falkland Islands pound.
*/
const FKP = {
	code: "FKP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/gbp.ts
/**
* Pound sterling.
*/
const GBP = {
	code: "GBP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/gel.ts
/**
* Georgian lari.
*/
const GEL = {
	code: "GEL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ghs.ts
/**
* Ghanaian cedi.
*/
const GHS = {
	code: "GHS",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/gip.ts
/**
* Gibraltar pound.
*/
const GIP = {
	code: "GIP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/gmd.ts
/**
* Gambian dalasi.
*/
const GMD = {
	code: "GMD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/gnf.ts
/**
* Guinean franc.
*/
const GNF = {
	code: "GNF",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/gtq.ts
/**
* Guatemalan quetzal.
*/
const GTQ = {
	code: "GTQ",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/gyd.ts
/**
* Guyanese dollar.
*/
const GYD = {
	code: "GYD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/hkd.ts
/**
* Hong Kong dollar.
*/
const HKD = {
	code: "HKD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/hnl.ts
/**
* Honduran lempira.
*/
const HNL = {
	code: "HNL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/hrk.ts
/**
* Croatian kuna.
*/
const HRK = {
	code: "HRK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/htg.ts
/**
* Haitian gourde.
*/
const HTG = {
	code: "HTG",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/huf.ts
/**
* Hungarian forint.
*/
const HUF = {
	code: "HUF",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/idr.ts
/**
* Indonesian rupiah.
*/
const IDR = {
	code: "IDR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ils.ts
/**
* Israeli new shekel.
*/
const ILS = {
	code: "ILS",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/inr.ts
/**
* Indian rupee.
*/
const INR = {
	code: "INR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/iqd.ts
/**
* Iraqi dinar.
*/
const IQD = {
	code: "IQD",
	base: 10,
	exponent: 3
};

//#endregion
//#region src/currencies/iso4217/amendments/168/irr.ts
/**
* Iranian rial.
*/
const IRR = {
	code: "IRR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/isk.ts
/**
* Icelandic króna.
*/
const ISK = {
	code: "ISK",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/jmd.ts
/**
* Jamaican dollar.
*/
const JMD = {
	code: "JMD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/jod.ts
/**
* Jordanian dinar.
*/
const JOD = {
	code: "JOD",
	base: 10,
	exponent: 3
};

//#endregion
//#region src/currencies/iso4217/amendments/168/jpy.ts
/**
* Japanese yen.
*/
const JPY = {
	code: "JPY",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/kes.ts
/**
* Kenyan shilling.
*/
const KES = {
	code: "KES",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/kgs.ts
/**
* Kyrgyzstani som.
*/
const KGS = {
	code: "KGS",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/khr.ts
/**
* Cambodian riel.
*/
const KHR = {
	code: "KHR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/kmf.ts
/**
* Comoro franc.
*/
const KMF = {
	code: "KMF",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/kpw.ts
/**
* North Korean won.
*/
const KPW = {
	code: "KPW",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/krw.ts
/**
* South Korean won.
*/
const KRW = {
	code: "KRW",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/kwd.ts
/**
* Kuwaiti dinar.
*/
const KWD = {
	code: "KWD",
	base: 10,
	exponent: 3
};

//#endregion
//#region src/currencies/iso4217/amendments/168/kyd.ts
/**
* Cayman Islands dollar.
*/
const KYD = {
	code: "KYD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/kzt.ts
/**
* Kazakhstani tenge.
*/
const KZT = {
	code: "KZT",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/lak.ts
/**
* Lao kip.
*/
const LAK = {
	code: "LAK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/lbp.ts
/**
* Lebanese pound.
*/
const LBP = {
	code: "LBP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/lkr.ts
/**
* Sri Lankan rupee.
*/
const LKR = {
	code: "LKR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/lrd.ts
/**
* Liberian dollar.
*/
const LRD = {
	code: "LRD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/lsl.ts
/**
* Lesotho loti.
*/
const LSL = {
	code: "LSL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/lyd.ts
/**
* Libyan dinar.
*/
const LYD = {
	code: "LYD",
	base: 10,
	exponent: 3
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mad.ts
/**
* Moroccan dirham.
*/
const MAD = {
	code: "MAD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mdl.ts
/**
* Moldovan leu.
*/
const MDL = {
	code: "MDL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mga.ts
/**
* Malagasy ariary.
*/
const MGA = {
	code: "MGA",
	base: 5,
	exponent: 1
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mkd.ts
/**
* Macedonian denar.
*/
const MKD = {
	code: "MKD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mmk.ts
/**
* Myanmar kyat.
*/
const MMK = {
	code: "MMK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mnt.ts
/**
* Mongolian tögrög.
*/
const MNT = {
	code: "MNT",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mop.ts
/**
* Macanese pataca.
*/
const MOP = {
	code: "MOP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mru.ts
/**
* Mauritanian ouguiya.
*/
const MRU = {
	code: "MRU",
	base: 5,
	exponent: 1
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mur.ts
/**
* Mauritian rupee.
*/
const MUR = {
	code: "MUR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mvr.ts
/**
* Maldivian rufiyaa.
*/
const MVR = {
	code: "MVR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mwk.ts
/**
* Malawian kwacha.
*/
const MWK = {
	code: "MWK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mxn.ts
/**
* Mexican peso.
*/
const MXN = {
	code: "MXN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mxv.ts
/**
* Mexican Unidad de Inversion.
*/
const MXV = {
	code: "MXV",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/myr.ts
/**
* Malaysian ringgit.
*/
const MYR = {
	code: "MYR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/mzn.ts
/**
* Mozambican metical.
*/
const MZN = {
	code: "MZN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/nad.ts
/**
* Namibian dollar.
*/
const NAD = {
	code: "NAD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ngn.ts
/**
* Nigerian naira.
*/
const NGN = {
	code: "NGN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/nio.ts
/**
* Nicaraguan córdoba.
*/
const NIO = {
	code: "NIO",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/nok.ts
/**
* Norwegian krone.
*/
const NOK = {
	code: "NOK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/npr.ts
/**
* Nepalese rupee.
*/
const NPR = {
	code: "NPR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/nzd.ts
/**
* New Zealand dollar.
*/
const NZD = {
	code: "NZD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/omr.ts
/**
* Omani rial.
*/
const OMR = {
	code: "OMR",
	base: 10,
	exponent: 3
};

//#endregion
//#region src/currencies/iso4217/amendments/168/pab.ts
/**
* Panamanian balboa.
*/
const PAB = {
	code: "PAB",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/pen.ts
/**
* Peruvian sol.
*/
const PEN = {
	code: "PEN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/pgk.ts
/**
* Papua New Guinean kina.
*/
const PGK = {
	code: "PGK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/php.ts
/**
* Philippine peso.
*/
const PHP = {
	code: "PHP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/pkr.ts
/**
* Pakistani rupee.
*/
const PKR = {
	code: "PKR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/pln.ts
/**
* Polish złoty.
*/
const PLN = {
	code: "PLN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/pyg.ts
/**
* Paraguayan guaraní.
*/
const PYG = {
	code: "PYG",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/qar.ts
/**
* Qatari riyal.
*/
const QAR = {
	code: "QAR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ron.ts
/**
* Romanian leu.
*/
const RON = {
	code: "RON",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/rsd.ts
/**
* Serbian dinar.
*/
const RSD = {
	code: "RSD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/rub.ts
/**
* Russian ruble.
*/
const RUB = {
	code: "RUB",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/rwf.ts
/**
* Rwandan franc.
*/
const RWF = {
	code: "RWF",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/sar.ts
/**
* Saudi riyal.
*/
const SAR = {
	code: "SAR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/sbd.ts
/**
* Solomon Islands dollar.
*/
const SBD = {
	code: "SBD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/scr.ts
/**
* Seychelles rupee.
*/
const SCR = {
	code: "SCR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/sdg.ts
/**
* Sudanese pound.
*/
const SDG = {
	code: "SDG",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/sek.ts
/**
* Swedish krona.
*/
const SEK = {
	code: "SEK",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/sgd.ts
/**
* Singapore dollar.
*/
const SGD = {
	code: "SGD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/shp.ts
/**
* Saint Helena pound.
*/
const SHP = {
	code: "SHP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/sll.ts
/**
* Sierra Leonean leone.
*/
const SLL = {
	code: "SLL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/sos.ts
/**
* Somali shilling.
*/
const SOS = {
	code: "SOS",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/srd.ts
/**
* Surinamese dollar.
*/
const SRD = {
	code: "SRD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ssp.ts
/**
* South Sudanese pound.
*/
const SSP = {
	code: "SSP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/stn.ts
/**
* São Tomé and Príncipe dobra.
*/
const STN = {
	code: "STN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/svc.ts
/**
* Salvadoran colón.
*/
const SVC = {
	code: "SVC",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/syp.ts
/**
* Syrian pound.
*/
const SYP = {
	code: "SYP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/szl.ts
/**
* Swazi lilangeni.
*/
const SZL = {
	code: "SZL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/thb.ts
/**
* Thai baht.
*/
const THB = {
	code: "THB",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/tjs.ts
/**
* Tajikistani somoni.
*/
const TJS = {
	code: "TJS",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/tmt.ts
/**
* Turkmenistan manat.
*/
const TMT = {
	code: "TMT",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/tnd.ts
/**
* Tunisian dinar.
*/
const TND = {
	code: "TND",
	base: 10,
	exponent: 3
};

//#endregion
//#region src/currencies/iso4217/amendments/168/top.ts
/**
* Tongan paʻanga.
*/
const TOP = {
	code: "TOP",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/try.ts
/**
* Turkish lira.
*/
const TRY = {
	code: "TRY",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ttd.ts
/**
* Trinidad and Tobago dollar.
*/
const TTD = {
	code: "TTD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/twd.ts
/**
* New Taiwan dollar.
*/
const TWD = {
	code: "TWD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/tzs.ts
/**
* Tanzanian shilling.
*/
const TZS = {
	code: "TZS",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/uah.ts
/**
* Ukrainian hryvnia.
*/
const UAH = {
	code: "UAH",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ugx.ts
/**
* Ugandan shilling.
*/
const UGX = {
	code: "UGX",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/usd.ts
/**
* United States dollar.
*/
const USD = {
	code: "USD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/usn.ts
/**
* United States dollar (next day).
*/
const USN = {
	code: "USN",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/uyi.ts
/**
* Uruguay Peso en Unidades Indexadas.
*/
const UYI = {
	code: "UYI",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/uyu.ts
/**
* Uruguayan peso.
*/
const UYU = {
	code: "UYU",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/uyw.ts
/**
* Unidad previsional.
*/
const UYW = {
	code: "UYW",
	base: 10,
	exponent: 4
};

//#endregion
//#region src/currencies/iso4217/amendments/168/uzs.ts
/**
* Uzbekistani soʻm.
*/
const UZS = {
	code: "UZS",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/ves.ts
/**
* Venezuelan bolívar.
*/
const VES = {
	code: "VES",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/vnd.ts
/**
* Vietnamese đồng.
*/
const VND = {
	code: "VND",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/vuv.ts
/**
* Vanuatu vatu.
*/
const VUV = {
	code: "VUV",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/wst.ts
/**
* Samoan tālā.
*/
const WST = {
	code: "WST",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/xaf.ts
/**
* Central African CFA franc.
*/
const XAF = {
	code: "XAF",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/xcd.ts
/**
* East Caribbean dollar.
*/
const XCD = {
	code: "XCD",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/xof.ts
/**
* West African CFA franc.
*/
const XOF = {
	code: "XOF",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/xpf.ts
/**
* CFP franc.
*/
const XPF = {
	code: "XPF",
	base: 10,
	exponent: 0
};

//#endregion
//#region src/currencies/iso4217/amendments/168/yer.ts
/**
* Yemeni rial.
*/
const YER = {
	code: "YER",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/zar.ts
/**
* South African rand.
*/
const ZAR = {
	code: "ZAR",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/zmw.ts
/**
* Zambian kwacha.
*/
const ZMW = {
	code: "ZMW",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/currencies/iso4217/amendments/168/zwl.ts
/**
* Zimbabwean dollar.
*/
const ZWL = {
	code: "ZWL",
	base: 10,
	exponent: 2
};

//#endregion
//#region src/monetary.ts
/**
* Create a Monetary object (serializable POJO).
*
* @param options.amount - The amount in minor currency units.
* @param options.currency - The currency.
* @param options.scale - The number of decimal places to represent.
*
* @returns The created Monetary object (plain data, fully serializable).
*
* @public
*/
function monetary(options) {
	const { amount, currency, scale = currency.exponent } = options;
	if (typeof amount === "number") {
		assert(Number.isInteger(amount), INVALID_AMOUNT_MESSAGE);
		assert(Number.isInteger(scale), INVALID_SCALE_MESSAGE);
	}
	return {
		amount,
		currency,
		scale
	};
}

//#endregion
export { AED, AFN, ALL, AMD, ANG, AOA, ARS, AUD, AWG, AZN, BAM, BBD, BDT, BGN, BHD, BIF, BMD, BND, BOB, BOV, BRL, BSD, BTN, BWP, BYN, BZD, CAD, CDF, CHE, CHF, CHW, CLF, CLP, CNY, COP, COU, CRC, CUC, CUP, CVE, CZK, DJF, DKK, DOP, DZD, EGP, ERN, ETB, EUR, FJD, FKP, GBP, GEL, GHS, GIP, GMD, GNF, GTQ, GYD, HKD, HNL, HRK, HTG, HUF, IDR, ILS, INR, IQD, IRR, ISK, JMD, JOD, JPY, KES, KGS, KHR, KMF, KPW, KRW, KWD, KYD, KZT, LAK, LBP, LKR, LRD, LSL, LYD, MAD, MDL, MGA, MKD, MMK, MNT, MOP, MRU, MUR, MVR, MWK, MXN, MXV, MYR, MZN, NAD, NGN, NIO, NOK, NPR, NZD, OMR, PAB, PEN, PGK, PHP, PKR, PLN, PYG, QAR, RON, RSD, RUB, RWF, SAR, SBD, SCR, SDG, SEK, SGD, SHP, SLL, SOS, SRD, SSP, STN, SVC, SYP, SZL, THB, TJS, TMT, TND, TOP, TRY, TTD, TWD, TZS, UAH, UGX, USD, USN, UYI, UYU, UYW, UZS, VES, VND, VUV, WST, XAF, XCD, XOF, XPF, YER, ZAR, ZMW, ZWL, add, allocate, calculator as bigintCalculator, calculator$1 as bigjsCalculator, compare, convert, createMonetary, down, equal, greaterThan, greaterThanOrEqual, halfAwayFromZero, halfDown, halfEven, halfOdd, halfTowardsZero, halfUp, hasSubUnits, haveSameAmount, haveSameCurrency, isNegative, isPositive, isZero, lessThan, lessThanOrEqual, maximum, minimum, monetary, multiply, normalizeScale, calculator$2 as numberCalculator, subtract, toDecimal, toSnapshot, toUnits, transformScale, trimScale, up };