import {
  castToBigintCurrency,
  castToBigjsCurrency,
  createBigintMonetary,
  createBigjsMonetary,
  createNumberMonetary,
} from "@test-utils";
import Big from "big.js";
import { EUR, MGA, USD } from "@/currencies/iso4217/amendments/168";

import { equal } from "../..";

describe("equal", () => {
  describe("number", () => {
    const monetary = createNumberMonetary;

    describe("decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = monetary({ amount: 500, currency: USD });
        const d2 = monetary({ amount: 500, currency: USD });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = monetary({ amount: 500, currency: USD });
        const d2 = monetary({ amount: 800, currency: USD });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = monetary({ amount: 500, currency: USD });
        const d2 = monetary({ amount: 500, currency: EUR });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = monetary({ amount: 500, currency: USD });
        const d2 = monetary({ amount: 800, currency: EUR });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = monetary({ amount: 500, currency: USD });
        const d2 = monetary({ amount: 5000, currency: USD, scale: 3 });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal after normalization", () => {
        const d1 = monetary({ amount: 500, currency: USD });
        const d2 = monetary({ amount: 500, currency: USD, scale: 3 });

        expect(equal(d1, d2)).toBe(false);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = monetary({ amount: 5, currency: MGA });
        const d2 = monetary({ amount: 5, currency: MGA });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = monetary({ amount: 5, currency: MGA });
        const d2 = monetary({ amount: 8, currency: MGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = monetary({ amount: 500, currency: USD });
        const d2 = monetary({ amount: 500, currency: MGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = monetary({ amount: 500, currency: USD });
        const d2 = monetary({ amount: 8, currency: MGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = monetary({ amount: 5, currency: MGA });
        const d2 = monetary({ amount: 25, currency: MGA, scale: 2 });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal after normalization", () => {
        const d1 = monetary({ amount: 25, currency: MGA });
        const d2 = monetary({ amount: 25, currency: MGA, scale: 2 });

        expect(equal(d1, d2)).toBe(false);
      });
    });
  });
  describe("bigint", () => {
    const monetary = createBigintMonetary;
    const bigintUSD = castToBigintCurrency(USD);
    const bigintEUR = castToBigintCurrency(EUR);
    const bigintMGA = castToBigintCurrency(MGA);

    describe("decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = monetary({ amount: 500n, currency: bigintUSD });
        const d2 = monetary({ amount: 500n, currency: bigintUSD });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = monetary({ amount: 500n, currency: bigintUSD });
        const d2 = monetary({ amount: 800n, currency: bigintUSD });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = monetary({ amount: 500n, currency: bigintUSD });
        const d2 = monetary({ amount: 500n, currency: bigintEUR });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = monetary({ amount: 500n, currency: bigintUSD });
        const d2 = monetary({ amount: 800n, currency: bigintEUR });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = monetary({ amount: 500n, currency: bigintUSD });
        const d2 = monetary({ amount: 5000n, currency: bigintUSD, scale: 3n });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal after normalization", () => {
        const d1 = monetary({ amount: 500n, currency: bigintUSD });
        const d2 = monetary({ amount: 500n, currency: bigintUSD, scale: 3n });

        expect(equal(d1, d2)).toBe(false);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = monetary({ amount: 5n, currency: bigintMGA });
        const d2 = monetary({ amount: 5n, currency: bigintMGA });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = monetary({ amount: 5n, currency: bigintMGA });
        const d2 = monetary({ amount: 8n, currency: bigintMGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = monetary({ amount: 500n, currency: bigintUSD });
        const d2 = monetary({ amount: 500n, currency: bigintMGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = monetary({ amount: 500n, currency: bigintUSD });
        const d2 = monetary({ amount: 8n, currency: bigintMGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = monetary({ amount: 5n, currency: bigintMGA });
        const d2 = monetary({ amount: 25n, currency: bigintMGA, scale: 2n });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal after normalization", () => {
        const d1 = monetary({ amount: 25n, currency: bigintMGA });
        const d2 = monetary({ amount: 25n, currency: bigintMGA, scale: 2n });

        expect(equal(d1, d2)).toBe(false);
      });
    });
  });
  describe("Big.js", () => {
    const monetary = createBigjsMonetary;
    const bigjsUSD = castToBigjsCurrency(USD);
    const bigjsEUR = castToBigjsCurrency(EUR);
    const bigjsMGA = castToBigjsCurrency(MGA);

    describe("decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
        const d2 = monetary({ amount: new Big(500), currency: bigjsUSD });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
        const d2 = monetary({ amount: new Big(800), currency: bigjsUSD });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
        const d2 = monetary({ amount: new Big(500), currency: bigjsEUR });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
        const d2 = monetary({ amount: new Big(800), currency: bigjsEUR });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
        const d2 = monetary({
          amount: new Big(5000),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal after normalization", () => {
        const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
        const d2 = monetary({
          amount: new Big(500),
          currency: bigjsUSD,
          scale: new Big(3),
        });

        expect(equal(d1, d2)).toBe(false);
      });
    });
    describe("non-decimal currencies", () => {
      it("returns true when amounts and currencies are equal", () => {
        const d1 = monetary({ amount: new Big(5), currency: bigjsMGA });
        const d2 = monetary({ amount: new Big(5), currency: bigjsMGA });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal", () => {
        const d1 = monetary({ amount: new Big(5), currency: bigjsMGA });
        const d2 = monetary({ amount: new Big(8), currency: bigjsMGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when currencies are not equal", () => {
        const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
        const d2 = monetary({ amount: new Big(500), currency: bigjsMGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns false when amounts and currencies are not equal", () => {
        const d1 = monetary({ amount: new Big(500), currency: bigjsUSD });
        const d2 = monetary({ amount: new Big(8), currency: bigjsMGA });

        expect(equal(d1, d2)).toBe(false);
      });
      it("returns true when amounts are equal after normalization", () => {
        const d1 = monetary({ amount: new Big(5), currency: bigjsMGA });
        const d2 = monetary({
          amount: new Big(25),
          currency: bigjsMGA,
          scale: new Big(2),
        });

        expect(equal(d1, d2)).toBe(true);
      });
      it("returns false when amounts are not equal after normalization", () => {
        const d1 = monetary({ amount: new Big(25), currency: bigjsMGA });
        const d2 = monetary({
          amount: new Big(25),
          currency: bigjsMGA,
          scale: new Big(2),
        });

        expect(equal(d1, d2)).toBe(false);
      });
    });
  });
});
