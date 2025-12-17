import { add } from "../api-overrides";
import { USD } from "../currencies/iso4217/amendments/168";
import { monetary } from "../monetary";

describe("Next.js Serialization", () => {
  it("should fail to serialize Monetary objects with JSON.stringify", () => {
    const money = monetary({ amount: 1000, currency: USD });

    // This is what Next.js does when passing props from server to client
    const serialized = JSON.stringify(money);
    const deserialized = JSON.parse(serialized);

    // The deserialized object loses all methods and calculator/formatter
    expect(deserialized.calculator).toBeUndefined();
    expect(deserialized.formatter).toBeUndefined();
    expect(deserialized.create).toBeUndefined();
    expect(deserialized.toJSON).toBeUndefined();

    // Only the data from toJSON() is preserved
    expect(deserialized.amount).toBe(1000);
    expect(deserialized.currency).toEqual({
      code: "USD",
      base: 10,
      exponent: 2,
    });
    expect(deserialized.scale).toBe(2);
  });

  it("should demonstrate the Next.js getServerSideProps serialization issue", () => {
    const money = monetary({ amount: 1000, currency: USD });

    // Simulate Next.js getServerSideProps
    const props = {
      price: money,
      title: "Product",
    };

    // Next.js will do this internally
    const serialized = JSON.parse(JSON.stringify(props));

    // The price is no longer a Monetary object
    expect(typeof serialized.price.calculator).toBe("undefined");

    // We can't use Monetary methods on it anymore
    // The 'create' method doesn't exist on the deserialized object
    expect(serialized.price.create).toBeUndefined();
  });

  it("should show that operations on deserialized objects now work", () => {
    const money = monetary({ amount: 1000, currency: USD });
    const serialized = JSON.parse(JSON.stringify(money));

    // This now works because serialized is a POJO that operations can handle
    const result = add(serialized, monetary({ amount: 500, currency: USD }));
    expect(result.amount).toBe(1500);
  });
});
