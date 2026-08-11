/** @type {import("@types/stylelint").Configuration} */
module.exports = {
  customSyntax: "@stylelint/postcss-css-in-js",
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-styled-components",
    "stylelint-config-prettier",
  ],
};
