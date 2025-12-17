import { assert, integer, property } from "fast-check";
import { calculator } from "../../calculator-number";

import { halfAwayFromZero } from "../half-away-from-zero";

describe("halfAwayFromZero", () => {
  describe("decimal factors", () => {
    it("does not round with a positive integer quotient", () => {
      expect(halfAwayFromZero(20, 10, calculator)).toBe(2);
    });
    it("does not round with a negative integer quotient", () => {
      expect(halfAwayFromZero(-20, 10, calculator)).toBe(-2);
    });
    it("does not round with a zero quotient", () => {
      expect(halfAwayFromZero(0, 10, calculator)).toBe(0);
    });
    it("rounds to the nearest integer away from zero with a positive half quotient", () => {
      expect(halfAwayFromZero(15, 10, calculator)).toBe(2);
    });
    it("rounds to the nearest integer away from zero with a negative half quotient", () => {
      expect(halfAwayFromZero(-25, 10, calculator)).toBe(-3);
    });
    it("rounds up with any positive float quotient above half", () => {
      assert(
        property(integer({ min: 6, max: 9 }), (a) => {
          expect(halfAwayFromZero(a, 10, calculator)).toBe(1);
        })
      );
    });
    it("rounds down with any negative quotient above half", () => {
      assert(
        property(integer({ min: -9, max: -6 }), (a) => {
          expect(halfAwayFromZero(a, 10, calculator)).toBe(-1);
        })
      );
    });
    it("rounds down with any positive float quotient below half", () => {
      assert(
        property(integer({ min: 1, max: 4 }), (a) => {
          expect(halfAwayFromZero(a, 10, calculator)).toBe(0);
        })
      );
    });
    it("rounds up with any negative quotient below half", () => {
      assert(
        property(integer({ min: -4, max: -1 }), (a) => {
          expect(halfAwayFromZero(a, 10, calculator)).toBe(-0);
        })
      );
    });
  });
  describe("non-decimal factors", () => {
    it("does not round with a positive integer quotient", () => {
      expect(halfAwayFromZero(20, 5, calculator)).toBe(4);
    });
    it("does not round with a negative integer quotient", () => {
      expect(halfAwayFromZero(-20, 5, calculator)).toBe(-4);
    });
    it("does not round with a zero quotient", () => {
      expect(halfAwayFromZero(0, 5, calculator)).toBe(0);
    });
    it("rounds to the nearest integer away from zero with a positive half quotient", () => {
      expect(halfAwayFromZero(3, 2, calculator)).toBe(2);
    });
    it("rounds to the nearest integer away from zero with a negative half quotient", () => {
      expect(halfAwayFromZero(-5, 2, calculator)).toBe(-3);
    });
    it("rounds up with any positive float quotient above half", () => {
      assert(
        property(integer({ min: 3, max: 4 }), (a) => {
          expect(halfAwayFromZero(a, 5, calculator)).toBe(1);
        })
      );
    });
    it("rounds down with any negative quotient above half", () => {
      assert(
        property(integer({ min: -4, max: -3 }), (a) => {
          expect(halfAwayFromZero(a, 5, calculator)).toBe(-1);
        })
      );
    });
    it("rounds down with any positive float quotient below half", () => {
      assert(
        property(integer({ min: 1, max: 2 }), (a) => {
          expect(halfAwayFromZero(a, 5, calculator)).toBe(0);
        })
      );
    });
    it("rounds up with any negative quotient below half", () => {
      assert(
        property(integer({ min: -2, max: -1 }), (a) => {
          expect(halfAwayFromZero(a, 5, calculator)).toBe(-0);
        })
      );
    });
  });
});
