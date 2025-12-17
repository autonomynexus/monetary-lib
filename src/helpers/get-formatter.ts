import type { Formatter } from "../types";

/**
 * Infers the appropriate formatter based on the amount type.
 *
 * @param amount - The amount to infer the formatter from
 * @returns The appropriate formatter for the amount type
 */
export function getFormatter<TAmount>(amount: TAmount): Formatter<TAmount> {
  // For primitive types, use standard conversions
  if (typeof amount === "number" || typeof amount === "bigint") {
    return {
      toNumber: Number,
      toString: String,
    } as Formatter<TAmount>;
  }

  // For object types (Big.js, Decimal.js, etc.)
  if (amount && typeof amount === "object") {
    // Type guard for objects with constructor property
    if (
      "constructor" in amount &&
      amount.constructor &&
      "name" in amount.constructor
    ) {
      const constructorName = amount.constructor.name;

      // Check for Big.js
      if (constructorName === "Big") {
        // Type guard for Big.js objects with toNumber and toString methods
        if ("toNumber" in amount && "toString" in amount) {
          return {
            toNumber: (value: TAmount) =>
              (value as unknown as { toNumber(): number }).toNumber(),
            toString: (value: TAmount) =>
              (value as unknown as { toString(): string }).toString(),
          } as Formatter<TAmount>;
        }
      }

      // Could add more library support here in the future
    }
  }

  // Default fallback
  return {
    toNumber: Number,
    toString: String,
  } as Formatter<TAmount>;
}
