import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/*.js"],
  },
  ...compat.extends("./profile/web-app", "./mixins/react").map((config) => ({
    ...config,
    files: ["src/**/*.ts", "src/**/*.tsx"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  })),
  ...compat
    .extends("./profile/node", "./mixins/vitest", "./mixins/node")
    .map((config) => ({
      ...config,
      files: ["src/node.ts"],
    })),
  {
    files: ["src/node.ts"],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
  },
  ...compat.extends("./mixins/graphql/operations").map((config) => ({
    ...config,
    files: ["src/example.graphql"],
  })),
  {
    files: ["src/example.graphql"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        graphQLConfig: {
          schema: "./src/schema.graphql",
        },
      },
    },
  },
  ...compat.extends("./mixins/graphql/schema").map((config) => ({
    ...config,
    files: ["src/schema.graphql"],
  })),
  {
    files: ["src/schema.graphql"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        graphQLConfig: {
          schema: "./src/schema.graphql",
        },
      },
    },
  },
  ...compat.extends("./mixins/react-testing").map((config) => ({
    ...config,
    files: ["src/**/*.spec.ts", "src/**/*.spec.tsx"],
  })),
  ...compat.extends("./mixins/playwright").map((config) => ({
    ...config,
    files: ["src/playwright.ts"],
  })),
];
