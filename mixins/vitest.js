// This mixin applies some additional checks for projects using the Vitest library.
// For more information, please see the README.md for "@nordcloud/eslint-config-pat".

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
      plugins: ["vitest"],
      rules: {
        /**
         * Ensure that there is at least one expect call made in a test.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/expect-expect.md
         */
        "vitest/expect-expect": "warn",

        /**
         * Makes it easier to search for all occurrences of the method within code, and it ensures consistency among the method names used.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-alias-methods.md
         */
        "vitest/no-alias-methods": "error",

        /**
         * Warn about commented out tests, they should be fixed or removed completely.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-commented-out-tests.md
         */
        "vitest/no-commented-out-tests": "warn",

        /**
         * Vitest only considers a test to have failed if it throws an error, meaning if calls to assertion functions like expect occur in conditional code such as a catch statement, tests can end up passing but not actually test anything.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-expect.md
         */
        "vitest/no-conditional-expect": "error",

        /**
         * Vitest only considers a test to have failed if it throws an error, meaning if calls to assertion functions like expect occur in conditional code such as a catch statement, tests can end up passing but not actually test anything.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-conditional-tests.md
         */
        "vitest/no-conditional-tests": "warn",

        /**
         * Assure before commit/merge that all tests are running.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-disabled-tests.md
         */
        "vitest/no-disabled-tests": "warn",

        /**
         * Using callback inside tests is error-prone, promises should be used instead.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-done-callback.md
         */
        "vitest/no-done-callback": "warn",

        /**
         * This rule aims to prevent duplicate hooks and teardown hooks.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-duplicate-hooks.md
         */
        "vitest/no-duplicate-hooks": "warn",

        /**
         * This rule aims to eliminate duplicate runs of tests by exporting things from test files.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-export.md
         */
        "vitest/no-export": "error",

        /**
         * Ensure all tests are executed on your build system.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-focused-tests.md
         */
        "vitest/no-focused-tests": "error",

        /**
         * Having identical titles for two different tests or test suites may create confusion.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-identical-title.md
         */
        "vitest/no-identical-title": "error",

        /**
         * Interpolation prevents snapshots from being updated. Instead, properties should be overloaded with a matcher by using property matchers.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-interpolation-in-snapshots.md
         */
        "vitest/no-interpolation-in-snapshots": "error",

        /**
         * Most functionality offered by Jasmine has been ported to Vitest, and the Jasmine globals will stop working in the future.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-jasmine-globals.md
         */
        "vitest/no-jasmine-globals": "error",

        /**
         * Prevent having multiple instances of the mocked module.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-mocks-import.md
         */
        "vitest/no-mocks-import": "error",

        /**
         * This rule aims to eliminate expect statements that will not be executed.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-standalone-expect.md
         */
        "vitest/no-standalone-expect": "error",

        /**
         * This rule enforces usages from the only & skip list, it improves readability.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-test-prefixes.md
         */
        "vitest/no-test-prefixes": "error",

        /**
         * When test cases are empty then it is better to mark them as test.todo as it will be highlighted in the summary output.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-todo.md
         */
        "vitest/prefer-todo": "error",

        /**
         * Using an improper describe() callback function can lead to unexpected test errors.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/valid-describe-callback.md
         */
        "vitest/valid-describe-callback": "error",

        /**
         * Ensure expect() is called with a single argument and there is an actual expectation made.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/valid-expect.md
         */
        "vitest/valid-expect": "error",

        /**
         * Ensure promises that include expectations are returned or awaited.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/valid-expect-in-promise.md
         */
        "vitest/valid-expect-in-promise": "error",

        /**
         * Ensure that the titles of Vitest blocks are valid.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/valid-title.md
         */
        "vitest/valid-title": "error",

        /**
         * Ensure that it's ok to pass an unbound method to expect calls.
         * DISABLED - false-positives with react packages
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/unbound-method.md
         */
        "vitest/unbound-method": "off",

        /**
         * Make defining tests consistent across codebase.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/unbound-method.md
         */
        "vitest/consistent-test-it": [
          "warn",
          { fn: "test", withinDescribe: "it" },
        ],

        /**
         * Tests in Vitest should be void and not return values, using `return` is useless overhead.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/no-test-return-statement.md
         */
        "vitest/no-test-return-statement": "error",

        /**
         * Make assertions more strict, this might prevent tests being unreliable.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-called-with.md
         */
        "vitest/prefer-called-with": "error",

        /**
         * Ensure more readable tests and error messages if an expectation fails.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-comparison-matcher.md
         */
        "vitest/prefer-comparison-matcher": "error",

        /**
         * Reports where you might be able to use .each instead of native loops, gives better output and makes it easier to run specific cases.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-each.md
         */
        "vitest/prefer-each": "error",

        /**
         * Vitest has built-in matchers for expecting equality, which allow for more readable tests and error messages if an expectation fails.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-equality-matcher.md
         */
        "vitest/prefer-equality-matcher": "error",

        /**
         * Improves error details, ensures consistency.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-expect-resolves.md
         */
        "vitest/prefer-expect-resolves": "warn",

        /**
         * Improves error details, ensures consistency.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-expect-resolves.md
         */
        "vitest/prefer-expect-resolves": "warn",

        /**
         * This rule aims to make more obvious the order of calling hooks be Vitest, by enforcing grouped hooks be setup in correct order within tests.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-in-order.md
         */
        "vitest/prefer-hooks-in-order": "error",

        /**
         * This rule helps to ensure that hooks are always defined before test cases.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-on-top.md
         */
        "vitest/prefer-hooks-on-top": "error",

        /**
         * This provides more readable test failures.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-lowercase-title.md
         */
        "vitest/prefer-lowercase-title": "warn",

        /**
         * Reduce the amount of boilerplate that needs to be written.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-mock-promise-shorthand.md
         */
        "vitest/prefer-mock-promise-shorthand": "warn",

        /**
         * Mocks can be easily restored by Vitest.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-spy-on.md
         */
        "vitest/prefer-spy-on": "warn",

        /**
         * Prefer stricter equality check.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-strict-equal.md
         */
        "vitest/prefer-strict-equal": "error",

        /**
         * Improves readability, displays better error messages.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be.md
         */
        "vitest/prefer-to-be": "warn",

        /**
         * Improves readability, displays better error messages.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-contain.md
         */
        "vitest/prefer-to-contain": "warn",

        /**
         * Improves readability, displays better error messages.
         * @see https://github.com/veritem/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-have-length.md
         */
        "vitest/prefer-to-have-length": "warn",
      },
    },
  ],
};
