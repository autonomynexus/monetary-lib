import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { USD } from "@/currencies/iso4217/amendments/168";

import { toSnapshot } from "../..";

describe("toSnapshot", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    it("returns an object literal with the right data", () => {
      const d = monetary({ amount: 500, currency: USD });

      expect(toSnapshot(d)).toEqual({
        amount: 500,
        currency: {
          code: "USD",
          base: 10,
          exponent: 2,
        },
        scale: 2,
      });
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);

    it("returns an object literal with the right data", () => {
      const d = monetary({ amount: 500n, currency: bigintUSD });

      expect(toSnapshot(d)).toEqual({
        amount: 500n,
        currency: {
          code: "USD",
          base: 10n,
          exponent: 2n,
        },
        scale: 2n,
      });
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);

    it("returns an object literal with the right data", () => {
      const d = monetary({ amount: new Big(500), currency: bigjsUSD });

      expect(toSnapshot(d)).toEqual({
        amount: new Big(500),
        currency: {
          code: "USD",
          base: new Big(10),
          exponent: new Big(2),
        },
        scale: new Big(2),
      });
    });
  });
});
