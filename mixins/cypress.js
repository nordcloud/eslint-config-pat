// This mixin applies some additional checks for projects using Cypress framework.  For more information,
// please see the README.md for "@nordcloud/eslint-config-pat".

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      files: ["cypress/**/*.ts"],
      env: {
        jest: false,
        "cypress/globals": true,
      },
      extends: ["plugin:cypress/recommended"],
      rules: {
        "promise/catch-or-return": "off",
        "promise/no-nesting": "off",
        "promise/always-return": "off",
      },
    },
  ],
};
