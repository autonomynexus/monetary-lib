import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { USD } from "@/currencies/iso4217/amendments/168";

import { multiply, toSnapshot } from "../..";

describe("multiply", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    it("multiplies positive Monetary objects", () => {
      const d = monetary({ amount: 400, currency: USD });

      expect(toSnapshot(multiply(d, 4))).toEqual({
        amount: 1600,
        scale: 2,
        currency: USD,
      });
      expect(toSnapshot(multiply(d, -1))).toEqual({
        amount: -400,
        scale: 2,
        currency: USD,
      });
    });
    it("multiplies negative Monetary objects", () => {
      const d = monetary({ amount: -400, currency: USD });

      expect(toSnapshot(multiply(d, 4))).toEqual({
        amount: -1600,
        scale: 2,
        currency: USD,
      });
      expect(toSnapshot(multiply(d, 1))).toEqual({
        amount: -400,
        scale: 2,
        currency: USD,
      });
    });
    it("converts the multiplied amount to the safest scale", () => {
      const d = monetary({ amount: 401, currency: USD });

      const snapshot = toSnapshot(multiply(d, { amount: 2001, scale: 3 }));

      expect(snapshot).toEqual({
        amount: 802_401,
        scale: 5,
        currency: USD,
      });
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);

    it("multiplies positive Monetary objects", () => {
      const d = monetary({ amount: 400n, currency: bigintUSD });

      expect(toSnapshot(multiply(d, 4n))).toEqual({
        amount: 1600n,
        scale: 2n,
        currency: bigintUSD,
      });
      expect(toSnapshot(multiply(d, -1n))).toEqual({
        amount: -400n,
        scale: 2n,
        currency: bigintUSD,
      });
    });
    it("multiplies negative Monetary objects", () => {
      const d = monetary({ amount: -400n, currency: bigintUSD });

      expect(toSnapshot(multiply(d, 4n))).toEqual({
        amount: -1600n,
        scale: 2n,
        currency: bigintUSD,
      });
      expect(toSnapshot(multiply(d, 1n))).toEqual({
        amount: -400n,
        scale: 2n,
        currency: bigintUSD,
      });
    });
    it("converts the multiplied amount to the safest scale", () => {
      const d = monetary({ amount: 401n, currency: bigintUSD });

      const snapshot = toSnapshot(multiply(d, { amount: 2001n, scale: 3n }));

      expect(snapshot).toEqual({
        amount: 802401n,
        scale: 5n,
        currency: bigintUSD,
      });
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("multiplies positive Monetary objects", () => {
      const d = monetary({ amount: new Big(400), currency: bigjsUSD });

      expect(toSnapshot(multiply(d, new Big(4)))).toEqual({
        amount: new Big(1600),
        scale: new Big(2),
        currency: bigjsUSD,
      });
      expect(toSnapshot(multiply(d, new Big(-1)))).toEqual({
        amount: new Big(-400),
        scale: new Big(2),
        currency: bigjsUSD,
      });
    });
    it("multiplies negative Monetary objects", () => {
      const d = monetary({ amount: new Big(-400), currency: bigjsUSD });

      expect(toSnapshot(multiply(d, new Big(4)))).toEqual({
        amount: new Big(-1600),
        scale: new Big(2),
        currency: bigjsUSD,
      });
      expect(toSnapshot(multiply(d, new Big(1)))).toEqual({
        amount: new Big(-400),
        scale: new Big(2),
        currency: bigjsUSD,
      });
    });
    it("converts the multiplied amount to the safest scale", () => {
      const d = monetary({ amount: new Big(401), currency: bigjsUSD });

      const snapshot = toSnapshot(
        multiply(d, { amount: new Big(2001), scale: new Big(3) })
      );

      expect(snapshot).toEqual({
        amount: new Big(802_401),
        scale: new Big(5),
        currency: bigjsUSD,
      });
    });
  });
});
