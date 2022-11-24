// This mixin applies some additional checks for projects using Cypress framework.
// For more information, please see the README.md for "@nordcloud/eslint-config-pat".

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      files: ["cypress/**/*.ts"],

      env: {
        jest: false,
        "cypress/globals": true,
      },

      plugins: ["cypress", "promise"],

      rules: {
        // Disable false-positives
        "promise/catch-or-return": "off",
        "promise/no-nesting": "off",
        "promise/always-return": "off",

        /**
         * @see https://docs.cypress.io/guides/references/best-practices#Assigning-Return-Values
         */
        "cypress/no-assigning-return-values": "error",

        /**
         * @see https://on.cypress.io/best-practices#Unnecessary-Waiting
         */
        "cypress/no-unnecessary-waiting": "error",

        /**
         * @see https://on.cypress.io/best-practices#Unnecessary-Waiting
         */
        "cypress/no-unnecessary-waiting": "error",

        /**
         * Using force: true on inputs appears to be confusing rather than helpful. It usually silences the actual problem instead of providing a way to overcome it.
         * @see https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/no-force.md
         */
        "cypress/no-force": "warn",

        /**
         * Use data-* attributes to provide context to your selectors and isolate them from CSS or JS changes.
         * @see https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/require-data-selectors.md
         */
        "cypress/require-data-selectors": "warn",

        /**
         * Remove cy.pause command before committing the specs to avoid other developers getting unexpected results.
         * @see https://github.com/cypress-io/eslint-plugin-cypress/blob/master/docs/rules/no-pause.md
         */
        "cypress/no-pause": "error",
      },
    },
  ],
};
