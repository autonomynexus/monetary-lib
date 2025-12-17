/* eslint-disable functional/no-throw-statement, valid-jsdoc */
/**
 * Assert a condition.
 *
 * @param condition - The condition to verify.
 * @param message - The error message to throw.
 *
 * @throws If the condition isn't met.
 */
export function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(`[Monetary] ${message}`);
  }
}

/**
 * Assert array is non-empty and return typed tuple with first element.
 *
 * @throws If array is empty.
 */
export function assertNonEmpty<T>(
  arr: readonly T[],
  context: string
): asserts arr is readonly [T, ...T[]] {
  if (arr.length === 0) {
    throw new Error(`[Monetary] ${context}: expected non-empty array`);
  }
}

/**
 * Assert value is defined.
 *
 * @throws If value is undefined.
 */
export function assertDefined<T>(
  value: T | undefined,
  context: string
): asserts value is T {
  if (value === undefined) {
    throw new Error(`[Monetary] ${context}: expected defined value`);
  }
}

/**
 * Assert array has exactly 2 elements (for binary operations).
 *
 * @throws If array length !== 2.
 */
export function assertPair<T>(
  arr: readonly T[],
  context: string
): asserts arr is readonly [T, T] {
  if (arr.length !== 2) {
    throw new Error(
      `[Monetary] ${context}: expected pair, got ${arr.length} elements`
    );
  }
}
