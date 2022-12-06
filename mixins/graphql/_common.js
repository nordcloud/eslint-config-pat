// The plugin documentation is here: https://github.com/B2o5T/graphql-eslint
/** @type {Linter.ConfigOverride<Linter.RulesRecord>} */
const commons = {
  files: ["*.graphql"],

  parser: "@graphql-eslint/eslint-plugin",

  extends: ["prettier"],
  plugins: ["@graphql-eslint"],
};

exports.commons = commons;
