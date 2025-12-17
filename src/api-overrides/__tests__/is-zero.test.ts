import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { USD } from "@/currencies/iso4217/amendments/168";

import { isZero } from "../..";

describe("isZero", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    it("returns true when amount is equal to 0", () => {
      const d = monetary({ amount: 0, currency: USD });

      expect(isZero(d)).toBe(true);
    });
    it("returns false when amount is not equal to 0", () => {
      const d = monetary({ amount: 100, currency: USD });

      expect(isZero(d)).toBe(false);
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns true when amount is equal to 0", () => {
      const d = monetary({ amount: 0n, currency: bigintUSD });

      expect(isZero(d)).toBe(true);
    });
    it("returns false when amount is not equal to 0", () => {
      const d = monetary({ amount: 100n, currency: bigintUSD });

      expect(isZero(d)).toBe(false);
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns true when amount is equal to 0", () => {
      const d = monetary({ amount: new Big(0), currency: bigjsUSD });

      expect(isZero(d)).toBe(true);
    });
    it("returns false when amount is not equal to 0", () => {
      const d = monetary({ amount: new Big(100), currency: bigjsUSD });

      expect(isZero(d)).toBe(false);
    });
  });
});
