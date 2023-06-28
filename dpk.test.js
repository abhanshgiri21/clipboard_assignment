const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns partition key when partition key is shorter than 256 characters", () => {
    const partitionKey = "testKey";
    const response = deterministicPartitionKey({ partitionKey });
    expect(response).toBe(partitionKey);
  });

  it("Returns crypto hash when partition key is longer than 256 characters", () => {
    const partitionKey =
      "5bd53fc8483e0b0f8b8dfdbe61b5fbb74a32195b470069f382daea748a3721b9f2356c75247932436a98d399507b72d56026a8ebd64421ec0b6ba9bf443f0f1a5bd53fc8483e0b0f8b8dfdbe61b5fbb74a32195b470069f382daea748a3721b9f2356c75247932436a98d399507b72d56026a8ebd64421ec0b6ba9bf443f0f1a12";
    const response = deterministicPartitionKey({ partitionKey });
    expect(response.length).toBe(128);
  });

  it("Returns crypto hash when partition key is not present in event object", () => {
    const event = { test: "object" };
    const response = deterministicPartitionKey(event);
    expect(response.length).toBe(128);
  });
});
