// This mixin applies some additional checks for projects using Playwright framework.
// For more information, please see the README.md for "@nordcloud/eslint-config-pat".

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      files: ["playwright/**/*.ts"],

      env: {
        jest: false,
      },

      plugins: ["playwright"],

      rules: {
        /**
         * While it's useful to be able to group your tests together within the same file using describe(), having too many levels of nesting throughout your tests make them difficult to read.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/max-nested-describe.md
         */
        "playwright/max-nested-describe": "error",

        /**
         * Identify false positives when async Playwright APIs are not properly awaited.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/missing-playwright-await.md
         */
        "playwright/missing-playwright-await": "error",

        /**
         * Conditional logic in tests is usually an indication that a test is attempting to cover too much, and not testing the logic it intends to.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-conditional-in-test.md
         */
        "playwright/no-conditional-in-test": "error",

        /**
         * Disallow the creation of element handles with page.$ or page.$$.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-element-handle.md
         */
        "playwright/no-element-handle": "error",

        /**
         * Disallow usage of page.$eval and page.$$eval.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-eval.md
         */
        "playwright/no-eval": "error",

        /**
         * Disallow usage of .only annotation.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-focused-test.md
         */
        "playwright/no-focused-test": "error",

        /**
         * Disallow usage of the { force: true } option.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-force-option.md
         */
        "playwright/no-force-option": "error",

        /**
         * Nesting test.step() methods can make your tests difficult to read.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-nested-step.md
         */
        "playwright/no-nested-step": "error",

        /**
         * These methods can be prone to flakiness if the DOM structure changes.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-nth-methods.md
         */
        "playwright/no-nth-methods": "warn",

        /**
         * Prevent usage of page.pause().
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-page-pause.md
         */
        "playwright/no-page-pause": "error",

        /**
         * Disallow usage of the .skip annotation.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-skipped-test.md
         */
        "playwright/no-skipped-test": "error",

        /**
         * Some Playwright methods are frequently, yet incorrectly, awaited when the await expression has no effect.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-useless-await.md
         */
        "playwright/no-useless-await": "error",

        /**
         * Several Playwright matchers are complimentary such as toBeVisible/toBeHidden and toBeEnabled/toBeDisabled.
         * While the not variants of each of these matchers can be used, it's preferred to use the complimentary matcher instead.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-useless-not.md
         */
        "playwright/no-useless-not": "error",

        /**
         * Disallow usage of page.waitForTimeout.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/no-wait-for-timeout.md
         */
        "playwright/no-wait-for-timeout": "error",

        /**
         * `toStrictEqual` not only checks that two objects contain the same data but also that they have the same structure.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/prefer-strict-equal.md
         */
        "playwright/prefer-strict-equal": "warn",

        /**
         * Enforce test and test.describe to have descriptions that begin with a lowercase letter. This provides more readable test failures.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/prefer-lowercase-title.md
         */
        "playwright/prefer-lowercase-title": "warn",

        /**
         * When asserting against primitive literals such as numbers and strings, the equality matchers all operate the same, but read slightly differently in code.
         * This rule recommends using the toBe matcher in these situations, as it forms the most grammatically natural sentence.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/prefer-to-be.md
         */
        "playwright/prefer-to-be": "error",

        /**
         * In order to have a better failure message, toHaveLength() should be used upon asserting expectations on objects length property.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/prefer-to-have-length.md
         */
        "playwright/prefer-to-have-length": "error",

        /**
         * These assertions are preferred over instance methods as the web first assertions will automatically wait for the conditions to be fulfilled resulting in more resilient tests.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/prefer-web-first-assertions.md
         */
        "playwright/prefer-web-first-assertions": "error",

        /**
         * Ensure expect() is called with a matcher.
         * @see https://github.com/playwright-community/eslint-plugin-playwright/blob/main/docs/rules/valid-expect.md
         */
        "playwright/valid-expect": "error",
      },
    },
  ],
};
