# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

1. There are four different scenarios for the given function to test.

   - When event object is empty, the function is expected to return predefined TRIVIAL_PARTITION_KEY.
   - When event object is not empty, but partition key is not present in event object, the function is expected to return a crypto hash for stringified event object.
   - When event object contains partitionKey, and partitionKey length is less than 256 characters, the partitionKey is returned.
   - When event object contains partitionKey, and partitionKey length is more than 256 characters, a crypto hash key of 128 characters is returned.

2. To refactor the code, the first thing I kept in mind is early return principle. So I went through the code and mapped out couple of conditions where we don't need to proceed further and can instantly return a value, namely when event object is absent, or partitionKey is absent.
3. When partition key is present inside event object, we need to return it if it's less than 256 characters, and hash it again in case it is more than 256 characters.

4. What makes the refactored code more readable are the following points.
   - There are no nested if conditions, which makes the logic simpler to follow.
   - There are early returns which clearly indicate what values are returned if a certain condition is met, which makes it easier to understand the function.
   - Using Inline if conditions to make the code look cleaner.
