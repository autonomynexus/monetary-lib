import type { Monetary, MonetaryOptions } from ".";

export type MonetaryFactory<TAmount> = ({
  amount,
  currency,
  scale,
}: MonetaryOptions<TAmount>) => Monetary<TAmount>;
