import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { USD } from "@/currencies/iso4217/amendments/168";

import { isPositive } from "../..";

describe("isPositive", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    it("returns false when amount is less than 0", () => {
      const d = monetary({ amount: -100, currency: USD });

      expect(isPositive(d)).toBe(false);
    });
    it("returns true when amount is greater than 0", () => {
      const d = monetary({ amount: 100, currency: USD });

      expect(isPositive(d)).toBe(true);
    });
    it("returns false when amount is equal to 0", () => {
      const d1 = monetary({ amount: 0, currency: USD });
      const d2 = monetary({ amount: -0, currency: USD });

      expect(isPositive(d1)).toBe(false);
      expect(isPositive(d2)).toBe(false);
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns false when amount is less than 0", () => {
      const d = monetary({ amount: -100n, currency: bigintUSD });

      expect(isPositive(d)).toBe(false);
    });
    it("returns true when amount is greater than 0", () => {
      const d = monetary({ amount: 100n, currency: bigintUSD });

      expect(isPositive(d)).toBe(true);
    });
    it("returns false when amount is equal to 0", () => {
      const d1 = monetary({ amount: 0n, currency: bigintUSD });
      const d2 = monetary({ amount: -0n, currency: bigintUSD });

      expect(isPositive(d1)).toBe(false);
      expect(isPositive(d2)).toBe(false);
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns false when amount is less than 0", () => {
      const d = monetary({ amount: new Big(-100), currency: bigjsUSD });

      expect(isPositive(d)).toBe(false);
    });
    it("returns true when amount is greater than 0", () => {
      const d = monetary({ amount: new Big(100), currency: bigjsUSD });

      expect(isPositive(d)).toBe(true);
    });
    it("returns false when amount is equal to 0", () => {
      const d1 = monetary({ amount: new Big(0), currency: bigjsUSD });
      const d2 = monetary({ amount: new Big(-0), currency: bigjsUSD });

      expect(isPositive(d1)).toBe(false);
      expect(isPositive(d2)).toBe(false);
    });
  });
});
