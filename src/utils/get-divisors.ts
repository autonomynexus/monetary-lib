import type { Calculator } from "../types";

export function getDivisors<TAmount>(calculator: Calculator<TAmount>) {
  const { multiply } = calculator;

  return (bases: readonly TAmount[]) => {
    const result: TAmount[] = [];
    for (let i = 0; i < bases.length; i++) {
      const divisor = bases.slice(i).reduce((acc, curr) => multiply(acc, curr));
      result.push(divisor);
    }
    return result;
  };
}
