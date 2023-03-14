/** @type {import("@types/prettier").Config} */
module.exports = {
  arrowParens: "always",
  bracketSpacing: true,
  embeddedLanguageFormatting: "auto",
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "preserve",
  quoteProps: "as-needed",
  requirePragma: false,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
  vueIndentScriptAndStyle: false,
  overrides: [
    {
      files: "*.yml",
      options: {
        singleQuote: true,
      },
    },
    {
      files: "*.json5",
      options: {
        singleQuote: false,
        parser: "json5",
        quoteProps: "preserve",
        trailingComma: "none",
      },
    },
  ],
};
