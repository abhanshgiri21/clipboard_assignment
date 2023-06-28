const { deterministicPartitionKey } = require("./dpk");
const partitionKey =
  "5bd53fc8483e0b0f8b8dfdbe61b5fbb74a32195b470069f382daea748a3721b9f2356c75247932436a98d399507b72d56026a8ebd64421ec0b6ba9bf443f0f1a12";

console.log(deterministicPartitionKey({ partitionKey }));
