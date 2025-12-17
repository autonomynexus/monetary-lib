import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { USD } from "@/currencies/iso4217/amendments/168";

import { haveSameAmount } from "../..";

describe("haveSameAmount", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    it("returns true when amounts are equal", () => {
      const d1 = monetary({ amount: 1000, currency: USD });
      const d2 = monetary({ amount: 1000, currency: USD });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it("returns false when amounts are not equal", () => {
      const d1 = monetary({ amount: 1000, currency: USD });
      const d2 = monetary({ amount: 2000, currency: USD });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
    it("returns true when amounts are equal once normalized", () => {
      const d1 = monetary({ amount: 1000, currency: USD });
      const d2 = monetary({ amount: 10_000, currency: USD, scale: 3 });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it("returns false when amounts are not equal once normalized", () => {
      const d1 = monetary({ amount: 10_000, currency: USD });
      const d2 = monetary({ amount: 10_000, currency: USD, scale: 3 });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns true when amounts are equal", () => {
      const d1 = monetary({ amount: 1000n, currency: bigintUSD });
      const d2 = monetary({ amount: 1000n, currency: bigintUSD });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it("returns false when amounts are not equal", () => {
      const d1 = monetary({ amount: 1000n, currency: bigintUSD });
      const d2 = monetary({ amount: 2000n, currency: bigintUSD });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
    it("returns true when amounts are equal once normalized", () => {
      const d1 = monetary({ amount: 1000n, currency: bigintUSD });
      const d2 = monetary({ amount: 10000n, currency: bigintUSD, scale: 3n });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it("returns false when amounts are not equal once normalized", () => {
      const d1 = monetary({ amount: 10000n, currency: bigintUSD });
      const d2 = monetary({ amount: 10000n, currency: bigintUSD, scale: 3n });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns true when amounts are equal", () => {
      const d1 = monetary({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = monetary({ amount: new Big(1000), currency: bigjsUSD });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it("returns false when amounts are not equal", () => {
      const d1 = monetary({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = monetary({ amount: new Big(2000), currency: bigjsUSD });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
    it("returns true when amounts are equal once normalized", () => {
      const d1 = monetary({ amount: new Big(1000), currency: bigjsUSD });
      const d2 = monetary({
        amount: new Big(10_000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(haveSameAmount([d1, d2])).toBe(true);
    });
    it("returns false when amounts are not equal once normalized", () => {
      const d1 = monetary({ amount: new Big(10_000), currency: bigjsUSD });
      const d2 = monetary({
        amount: new Big(10_000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      expect(haveSameAmount([d1, d2])).toBe(false);
    });
  });
});
