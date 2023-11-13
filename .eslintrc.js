/* Copyright (c) 2021-2023 Nordcloud Oy or its affiliates. All Rights Reserved. */

require("./patch/modern-module-resolution");

/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["**/*.js"],

  overrides: [
    {
      files: ["src/**/*.ts", "src/**/*.tsx"],
      extends: ["./profile/web-app", "./mixins/react"],
      parserOptions: { tsconfigRootDir: __dirname },
    },
    {
      files: ["src/node.ts"],
      extends: ["./profile/node", "./mixins/vitest", "./mixins/node"],
      parserOptions: { tsconfigRootDir: __dirname },
    },
    {
      files: ["src/example.graphql"],
      extends: ["./mixins/graphql/operations"],
      parserOptions: { schema: "./src/schema.graphql" },
    },
    {
      files: ["src/schema.graphql"],
      extends: ["./mixins/graphql/schema"],
    },
    {
      files: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
      extends: ["./mixins/react-testing"],
    },
    {
      files: ["src/playwright.ts"],
      extends: ["./mixins/playwright"],
    },
  ],
};
