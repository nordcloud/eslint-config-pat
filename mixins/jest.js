// This mixin applies some additional checks for projects using the Jest library.
// For more information, please see the README.md for "@nordcloud/eslint-config-pat".

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  settings: {
    jest: {
      /**
       * @see {@link https://github.com/jest-community/eslint-plugin-jest#jest-version-setting}
       * For details, see README.md for "@nordcloud/eslint-config-pat".
       */
      version: require("jest/package.json").version,
    },
  },

  env: {
    jest: true,
  },

  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx"],
      plugins: ["@typescript-eslint", "jest"],
      rules: {
        /**
         * Jest's mocking API is designed in a way that produces compositional data types that often have no concise description.
         * Since test code does not ship, and typically does not introduce new concepts or algorithms,
         * the usual arguments for prioritizing readability over writability can be relaxed in this case.
         */
        "@typescript-eslint/typedef": [
          "warn",
          {
            arrayDestructuring: false,
            arrowParameter: false,
            memberVariableDeclaration: true,
            objectDestructuring: false,
            parameter: true,
            propertyDeclaration: true,
            variableDeclaration: false, // <--- special case for test files
            variableDeclarationIgnoreFunction: true,
          },
        ],

        /**
         * Ensure that there is at least one expect call made in a test.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/expect-expect.md
         */
        "jest/expect-expect": "warn",

        /**
         * Makes it easier to search for all occurrences of the method within code, and it ensures consistency among the method names used.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-alias-methods.md
         */
        "jest/no-alias-methods": "error",

        /**
         * Warn about commented out tests, they should be fixed or removed completely.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-commented-out-tests.md
         */
        "jest/no-commented-out-tests": "warn",

        /**
         * Jest only considers a test to have failed if it throws an error, meaning if calls to assertion functions like expect occur in conditional code such as a catch statement, tests can end up passing but not actually test anything.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-conditional-expect.md
         */
        "jest/no-conditional-expect": "error",

        /**
         * This rule warns about calls to deprecated functions, and provides details on what to replace them with, based on the version of Jest that is installed.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-deprecated-functions.md
         */
        "jest/no-deprecated-functions": "error",

        /**
         * Assure before commit/merge that all tests are running.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-disabled-tests.md
         */
        "jest/no-disabled-tests": "warn",

        /**
         * Using callback inside tests is error-prone, promises should be used instead.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-done-callback.md
         */
        "jest/no-done-callback": "warn",

        /**
         * This rule aims to eliminate duplicate runs of tests by exporting things from test files.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-export.md
         */
        "jest/no-export": "error",

        /**
         * Ensure all tests are executed on your build system.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-focused-tests.md
         */
        "jest/no-focused-tests": "error",

        /**
         * Having identical titles for two different tests or test suites may create confusion.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-identical-title.md
         */
        "jest/no-identical-title": "error",

        /**
         * Interpolation prevents snapshots from being updated. Instead, properties should be overloaded with a matcher by using property matchers.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-interpolation-in-snapshots.md
         */
        "jest/no-interpolation-in-snapshots": "error",

        /**
         * Most functionality offered by Jasmine has been ported to Jest, and the Jasmine globals will stop working in the future.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-jasmine-globals.md
         */
        "jest/no-jasmine-globals": "error",

        /**
         * Prevent having multiple instances of the mocked module.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-mocks-import.md
         */
        "jest/no-mocks-import": "error",

        /**
         * This rule aims to eliminate expect statements that will not be executed.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-standalone-expect.md
         */
        "jest/no-standalone-expect": "error",

        /**
         * This rule enforces usages from the only & skip list, it improves readability.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-test-prefixes.md
         */
        "jest/no-test-prefixes": "error",

        /**
         * When test cases are empty then it is better to mark them as test.todo as it will be highlighted in the summary output.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-todo.md
         */
        "jest/prefer-todo": "error",

        /**
         * Using an improper describe() callback function can lead to unexpected test errors.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-describe-callback.md
         */
        "jest/valid-describe-callback": "error",

        /**
         * Ensure expect() is called with a single argument and there is an actual expectation made.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect.md
         */
        "jest/valid-expect": "error",

        /**
         * Ensure promises that include expectations are returned or awaited.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-expect-in-promise.md
         */
        "jest/valid-expect-in-promise": "error",

        /**
         * Ensure that the titles of Jest blocks are valid.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/valid-title.md
         */
        "jest/valid-title": "error",

        /**
         * Ensure that it's ok to pass an unbound method to expect calls.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
         */
        "jest/unbound-method": "error",
        "@typescript-eslint/unbound-method": "off",

        /**
         * Make defining tests consistent across codebase.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md
         */
        "jest/consistent-test-it": [
          "warn",
          { fn: "test", withinDescribe: "it" },
        ],

        /**
         * Tests in Jest should be void and not return values, using `return` is useless overhead.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/no-test-return-statement.md
         */
        "jest/no-test-return-statement": "error",

        /**
         * Make assertions more strict, this might prevent tests being unreliable.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-called-with.md
         */
        "jest/prefer-called-with": "error",

        /**
         * Ensure more readable tests and error messages if an expectation fails.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-comparison-matcher.md
         */
        "jest/prefer-comparison-matcher": "error",

        /**
         * Reports where you might be able to use .each instead of native loops, gives better output and makes it easier to run specific cases.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-each.md
         */
        "jest/prefer-each": "error",

        /**
         * Jest has built-in matchers for expecting equality, which allow for more readable tests and error messages if an expectation fails.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-equality-matcher.md
         */
        "jest/prefer-equality-matcher": "error",

        /**
         * Improves error details, ensures consistency.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-resolves.md
         */
        "jest/prefer-expect-resolves": "warn",

        /**
         * Improves error details, ensures consistency.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-expect-resolves.md
         */
        "jest/prefer-expect-resolves": "warn",

        /**
         * This rule aims to make more obvious the order of calling hooks be Jest, by enforcing grouped hooks be setup in correct order within tests.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-in-order.md
         */
        "jest/prefer-hooks-in-order": "error",

        /**
         * This rule helps to ensure that hooks are always defined before test cases.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-hooks-on-top.md
         */
        "jest/prefer-hooks-on-top": "error",

        /**
         * This provides more readable test failures.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-lowercase-title.md
         */
        "jest/prefer-lowercase-title": "warn",

        /**
         * Reduce the amount of boilerplate that needs to be written.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-mock-promise-shorthand.md
         */
        "jest/prefer-mock-promise-shorthand": "warn",

        /**
         * Mocks can be easily restored by Jest.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-spy-on.md
         */
        "jest/prefer-spy-on": "warn",

        /**
         * Prefer stricter equality check.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-strict-equal.md
         */
        "jest/prefer-strict-equal": "error",

        /**
         * Improves readability, displays better error messages.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-be.md
         */
        "jest/prefer-to-be": "warn",

        /**
         * Improves readability, displays better error messages.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-contain.md
         */
        "jest/prefer-to-contain": "warn",

        /**
         * Improves readability, displays better error messages.
         * @see https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/prefer-to-have-length.md
         */
        "jest/prefer-to-have-length": "warn",
      },
    },
  ],
};
