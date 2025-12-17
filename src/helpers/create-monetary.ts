/* eslint-disable functional/no-mixed-type, functional/no-return-void, functional/no-expression-statement */
import type {
  Calculator,
  Formatter,
  Monetary,
  MonetaryOptions,
} from "../types";

export type CreateMonetaryOptions<TAmount> = {
  readonly calculator: Calculator<TAmount>;
  readonly formatter?: Formatter<TAmount>;
  readonly onCreate?: (options: MonetaryOptions<TAmount>) => void;
};

/**
 * Create a Monetary factory function.
 *
 * Note: The calculator and formatter are no longer attached to the returned objects.
 * They are inferred from the amount type at operation time.
 */
export function createMonetary<TAmount>({
  calculator: _calculator,
  onCreate,
  formatter: _formatter = {
    toNumber: Number,
    toString: String,
  },
}: CreateMonetaryOptions<TAmount>) {
  // Note: calculator and formatter are accepted for API compatibility
  // but not used in the returned objects (they're inferred at operation time)

  return function monetary({
    amount,
    currency: { code, base, exponent },
    scale = exponent,
  }: MonetaryOptions<TAmount>): Monetary<TAmount> {
    const currency = { code, base, exponent };

    onCreate?.({ amount, currency, scale });

    // Return plain object (fully serializable)
    return {
      amount,
      currency,
      scale,
    };
  };
}
