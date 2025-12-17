import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { USD } from "@/currencies/iso4217/amendments/168";

import { normalizeScale, toSnapshot } from "../..";

describe("normalizeScale", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    it("returns an array of Monetary objects with normalized scale and converted amount", () => {
      const d1 = monetary({ amount: 100, currency: USD, scale: 2 });
      const d2 = monetary({ amount: 1000, currency: USD, scale: 3 });

      const [firstMonetaryObject, secondMonetaryObject] = normalizeScale([
        d1,
        d2,
      ]);

      expect(toSnapshot(firstMonetaryObject)).toEqual({
        amount: 1000,
        currency: USD,
        scale: 3,
      });
      expect(toSnapshot(secondMonetaryObject)).toEqual({
        amount: 1000,
        currency: USD,
        scale: 3,
      });
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns an array of Monetary objects with normalized scale and converted amount", () => {
      const d1 = monetary({ amount: 100n, currency: bigintUSD, scale: 2n });
      const d2 = monetary({ amount: 1000n, currency: bigintUSD, scale: 3n });

      const [firstMonetaryObject, secondMonetaryObject] = normalizeScale([
        d1,
        d2,
      ]);

      expect(toSnapshot(firstMonetaryObject)).toEqual({
        amount: 1000n,
        currency: bigintUSD,
        scale: 3n,
      });
      expect(toSnapshot(secondMonetaryObject)).toEqual({
        amount: 1000n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns an array of Monetary objects with normalized scale and converted amount", () => {
      const d1 = monetary({
        amount: new Big(100),
        currency: bigjsUSD,
        scale: new Big(2),
      });
      const d2 = monetary({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      const [firstMonetaryObject, secondMonetaryObject] = normalizeScale([
        d1,
        d2,
      ]);

      expect(toSnapshot(firstMonetaryObject)).toEqual({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
      expect(toSnapshot(secondMonetaryObject)).toEqual({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
  });
});
