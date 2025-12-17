import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { EUR, USD } from "@/currencies/iso4217/amendments/168";

import { maximum, toSnapshot } from "../..";

describe("maximum", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    it("returns the greatest from a set of Monetary objects", () => {
      const d1 = monetary({ amount: 150, currency: USD });
      const d2 = monetary({ amount: 50, currency: USD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: 150,
        currency: USD,
        scale: 2,
      });
    });
    it("returns the greatest from a set of Monetary objects after normalization", () => {
      const d1 = monetary({ amount: 500, currency: USD });
      const d2 = monetary({ amount: 1000, currency: USD, scale: 3 });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: 5000,
        currency: USD,
        scale: 3,
      });
    });
    it("throws when using different currencies", () => {
      const d1 = monetary({ amount: 150, currency: USD });
      const d2 = monetary({ amount: 50, currency: EUR });

      expect(() => {
        maximum([d1, d2]);
      }).toThrowErrorMatchingInlineSnapshot(
        "[Error: [Monetary] Objects must have the same currency.]"
      );
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it("returns the greatest from a set of Monetary objects", () => {
      const d1 = monetary({ amount: 150n, currency: bigintUSD });
      const d2 = monetary({ amount: 50n, currency: bigintUSD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: 150n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it("returns the greatest from a set of Monetary objects after normalization", () => {
      const d1 = monetary({ amount: 500n, currency: bigintUSD });
      const d2 = monetary({ amount: 1000n, currency: bigintUSD, scale: 3n });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: 5000n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
    it("throws when using different currencies", () => {
      const d1 = monetary({ amount: 150n, currency: bigintUSD });
      const d2 = monetary({ amount: 50n, currency: bigintEUR });

      expect(() => {
        maximum([d1, d2]);
      }).toThrowErrorMatchingInlineSnapshot(
        "[Error: [Monetary] Objects must have the same currency.]"
      );
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it("returns the greatest from a set of Monetary objects", () => {
      const d1 = monetary({ amount: new Big(150), currency: bigjsUSD });
      const d2 = monetary({ amount: new Big(50), currency: bigjsUSD });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: new Big(150),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it("returns the greatest from a set of Monetary objects after normalization", () => {
      const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
      const d2 = monetary({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      const snapshot = toSnapshot(maximum([d1, d2]));

      expect(snapshot).toEqual({
        amount: new Big(5000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
    it("throws when using different currencies", () => {
      const d1 = monetary({ amount: new Big(150), currency: bigjsUSD });
      const d2 = monetary({ amount: new Big(50), currency: bigjsEUR });

      expect(() => {
        maximum([d1, d2]);
      }).toThrowErrorMatchingInlineSnapshot(
        "[Error: [Monetary] Objects must have the same currency.]"
      );
    });
  });
});
