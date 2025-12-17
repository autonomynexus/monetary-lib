import { USD } from "../currencies/iso4217/amendments/168";
import { add, monetary } from "../index";

describe("Serializable Monetary", () => {
  it("should create plain objects that are fully serializable", () => {
    const money = monetary({ amount: 1000, currency: USD });

    // Should be a plain object
    expect(money).toEqual({
      amount: 1000,
      currency: { code: "USD", base: 10, exponent: 2 },
      scale: 2,
    });

    // Should not have any methods (use type guards to check)
    expect("calculator" in money).toBe(false);
    expect("formatter" in money).toBe(false);
    expect("create" in money).toBe(false);
    expect("toJSON" in money).toBe(false);
  });

  it("should survive JSON serialization perfectly", () => {
    const money = monetary({ amount: 1000, currency: USD });
    const serialized = JSON.stringify(money);
    const deserialized = JSON.parse(serialized);

    // Should be exactly the same
    expect(deserialized).toEqual(money);
    // Verify it's a plain object (not a class instance)
    expect(Object.getPrototypeOf(deserialized)).toBe(Object.prototype);
  });

  it("should work in Next.js-like scenarios", () => {
    // Simulate getServerSideProps
    const getServerSideProps = () => {
      const price = monetary({ amount: 1000, currency: USD });
      const tax = monetary({ amount: 100, currency: USD });

      return {
        props: {
          price,
          tax,
          title: "Product",
        },
      };
    };

    // Get props from server
    const { props } = getServerSideProps();

    // Simulate Next.js serialization
    const serialized = JSON.parse(JSON.stringify(props));

    // Should still be valid Monetary objects after serialization
    expect(serialized.price).toHaveProperty("amount");
    expect(serialized.price).toHaveProperty("currency");
    expect(serialized.price).toHaveProperty("scale");
    expect(serialized.tax).toHaveProperty("amount");
    expect(serialized.tax).toHaveProperty("currency");
    expect(serialized.tax).toHaveProperty("scale");

    // Should be able to perform operations
    const total = add(serialized.price, serialized.tax);
    expect(total.amount).toBe(1100);
  });

  it("should work with the add function", () => {
    const money1 = monetary({ amount: 1000, currency: USD });
    const money2 = monetary({ amount: 500, currency: USD });

    const result = add(money1, money2);

    expect(result.amount).toBe(1500);
    expect(result.currency).toEqual(USD);
    expect(result.scale).toBe(2);
  });

  it("should handle different scales in add", () => {
    const money1 = monetary({
      amount: 1000,
      currency: USD,
      scale: 2,
    });
    const money2 = monetary({
      amount: 5000,
      currency: USD,
      scale: 3,
    });

    const result = add(money1, money2);

    expect(result.amount).toBe(15_000); // 10.00 + 5.000 = 15.000
    expect(result.scale).toBe(3);
  });
});
