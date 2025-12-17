import { calculator as bigintCalculator } from "../calculator-bigint";
import { calculator as bigjsCalculator } from "../calculator-bigjs";
import { calculator as numberCalculator } from "../calculator-number";
import type { Calculator } from "../types";

/**
 * Infers the appropriate calculator based on the amount type.
 *
 * @param amount - The amount to infer the calculator from
 * @returns The appropriate calculator for the amount type
 */
export function getCalculator<TAmount>(amount: TAmount): Calculator<TAmount> {
  // Fast typeof checks for primitive types
  if (typeof amount === "number") {
    return numberCalculator as unknown as Calculator<TAmount>;
  }

  if (typeof amount === "bigint") {
    return bigintCalculator as unknown as Calculator<TAmount>;
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

      if (constructorName === "Big") {
        return bigjsCalculator as unknown as Calculator<TAmount>;
      }

      // Could add more library support here in the future
    }
  }

  throw new Error(`Cannot infer calculator for amount type: ${typeof amount}`);
}
