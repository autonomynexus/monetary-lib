import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { EUR, USD } from "@/currencies/iso4217/amendments/168";

import { subtract, toSnapshot } from "../..";

describe("subtract", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    it("subtracts positive Monetary objects", () => {
      const d1 = monetary({ amount: 500, currency: USD });
      const d2 = monetary({ amount: 100, currency: USD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 400,
        currency: USD,
        scale: 2,
      });
    });
    it("subtracts negative Monetary objects", () => {
      const d1 = monetary({ amount: -500, currency: USD });
      const d2 = monetary({ amount: -100, currency: USD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: -400,
        currency: USD,
        scale: 2,
      });
    });
    it("normalizes the result to the highest scale", () => {
      const d1 = monetary({ amount: 500, currency: USD });
      const d2 = monetary({ amount: 1000, currency: USD, scale: 3 });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 4000,
        currency: USD,
        scale: 3,
      });
    });
    it("throws when using different currencies", () => {
      const d1 = monetary({ amount: 500, currency: USD });
      const d2 = monetary({ amount: 100, currency: EUR });

      expect(() => {
        subtract(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        "[Error: [Monetary] Objects must have the same currency.]"
      );
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);

    it("subtracts positive Monetary objects", () => {
      const d1 = monetary({ amount: 500n, currency: bigintUSD });
      const d2 = monetary({ amount: 100n, currency: bigintUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 400n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it("subtracts negative Monetary objects", () => {
      const d1 = monetary({ amount: -500n, currency: bigintUSD });
      const d2 = monetary({ amount: -100n, currency: bigintUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: -400n,
        currency: bigintUSD,
        scale: 2n,
      });
    });
    it("normalizes the result to the highest scale", () => {
      const d1 = monetary({ amount: 500n, currency: bigintUSD });
      const d2 = monetary({ amount: 1000n, currency: bigintUSD, scale: 3n });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: 4000n,
        currency: bigintUSD,
        scale: 3n,
      });
    });
    it("throws when using different currencies", () => {
      const d1 = monetary({ amount: 500n, currency: bigintUSD });
      const d2 = monetary({ amount: 100n, currency: bigintEUR });

      expect(() => {
        subtract(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        "[Error: [Monetary] Objects must have the same currency.]"
      );
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);

    it("subtracts positive Monetary objects", () => {
      const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
      const d2 = monetary({ amount: new Big(100), currency: bigjsUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(400),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it("subtracts negative Monetary objects", () => {
      const d1 = monetary({ amount: new Big(-500), currency: bigjsUSD });
      const d2 = monetary({ amount: new Big(-100), currency: bigjsUSD });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(-400),
        currency: bigjsUSD,
        scale: new Big(2),
      });
    });
    it("normalizes the result to the highest scale", () => {
      const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
      const d2 = monetary({
        amount: new Big(1000),
        currency: bigjsUSD,
        scale: new Big(3),
      });

      const snapshot = toSnapshot(subtract(d1, d2));

      expect(snapshot).toEqual({
        amount: new Big(4000),
        currency: bigjsUSD,
        scale: new Big(3),
      });
    });
    it("throws when using different currencies", () => {
      const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
      const d2 = monetary({ amount: new Big(100), currency: bigjsEUR });

      expect(() => {
        subtract(d1, d2);
      }).toThrowErrorMatchingInlineSnapshot(
        "[Error: [Monetary] Objects must have the same currency.]"
      );
    });
  });
});
