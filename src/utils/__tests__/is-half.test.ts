import { calculator } from "../../calculator-number";

import { isHalf } from "../is-half";

const isHalfFn = isHalf(calculator);

describe("isHalf", () => {
  it("returns true with a half number", () => {
    expect(isHalfFn(5, 10)).toBe(true);
  });
  it("returns true with a negative half number", () => {
    expect(isHalfFn(-5, 10)).toBe(true);
  });
  it("returns false with a non-half number", () => {
    expect(isHalfFn(2, 10)).toBe(false);
  });
});
