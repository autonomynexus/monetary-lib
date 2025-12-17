import { add, monetary, toDecimal } from "../../src";
import { USD } from "../../src/currencies/iso4217/amendments/168";

describe("Next.js Serialization Compatibility", () => {
  it("should create serializable objects", () => {
    const price = monetary({ amount: 1000, currency: USD });

    // Should be a plain object
    expect(price).toEqual({
      amount: 1000,
      currency: { code: "USD", base: 10, exponent: 2 },
      scale: 2,
    });

    // No functions attached (use type guards to check)
    expect("calculator" in price).toBe(false);
    expect("formatter" in price).toBe(false);
    expect("create" in price).toBe(false);
    expect("toJSON" in price).toBe(false);
  });

  it("should survive JSON.stringify/parse", () => {
    const price = monetary({ amount: 1000, currency: USD });
    const tax = monetary({ amount: 100, currency: USD });

    // Simulate Next.js serialization
    const serialized = JSON.stringify({ price, tax });
    const deserialized = JSON.parse(serialized);

    // Objects should be identical
    expect(deserialized.price).toEqual(price);
    expect(deserialized.tax).toEqual(tax);

    // Operations should still work
    const total = add(deserialized.price, deserialized.tax);
    expect(total.amount).toBe(1100);
  });

  it("should work in getServerSideProps pattern", () => {
    // Simulate server-side
    const getServerSideProps = () => {
      const price = monetary({ amount: 5000, currency: USD });
      const discount = monetary({ amount: 500, currency: USD });

      return {
        props: {
          price,
          discount,
        },
      };
    };

    // Get props
    const { props } = getServerSideProps();

    // Simulate Next.js serialization
    const serialized = JSON.parse(JSON.stringify(props));

    // Use in component
    const finalPrice = add(
      serialized.price,
      monetary({ amount: -serialized.discount.amount, currency: USD })
    );
    expect(finalPrice.amount).toBe(4500);

    // Format for display
    const formatted = toDecimal(finalPrice);
    expect(formatted).toBe("45.00");
  });

  it("should handle complex operations after serialization", () => {
    const items = [
      monetary({ amount: 1000, currency: USD }),
      monetary({ amount: 2000, currency: USD }),
      monetary({ amount: 1500, currency: USD }),
    ];

    // Serialize array of Monetary objects
    const serialized = JSON.parse(JSON.stringify(items));

    // Calculate total
    const total = serialized.reduce(
      (sum: ReturnType<typeof monetary>, item: ReturnType<typeof monetary>) =>
        add(sum, item),
      monetary({ amount: 0, currency: USD })
    );

    expect(total.amount).toBe(4500);
    expect(toDecimal(total)).toBe("45.00");
  });
});
