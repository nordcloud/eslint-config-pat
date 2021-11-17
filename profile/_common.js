// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

const macros = require("./_macros");

// Rule severity guidelines
// ------------------------
//
// Errors are generally printed in red, and may prevent other build tasks from running (e.g. unit tests).
// Developers should never ignore errors.  Warnings are generally printed in yellow, and do not block local
// development, although they must be fixed/suppressed before merging.  Developers will commonly ignore warnings
// until their feature is working.
//
// Rules that should be a WARNING:
// - An issue that is very common in partially implemented work (e.g. missing type declaration)
// - An issue that "keeps things nice" but otherwise doesn't affect the meaning of the code (e.g. naming convention)
// - Security rules -- developers may need to temporarily introduce "insecure" expressions while debugging;
//   if our policy forces them to suppress the lint rule, they may forget to reenable it later.
//
// Rules that should be an ERROR:
// - An issue that is very likely to be a typo (e.g. "x = x;")
// - An issue that catches code that is likely to malfunction (e.g. unterminated promise chain)
// - An obsolete language feature that nobody should be using for any good reason

function buildRules(profile) {
  const isWebAppProfile = profile === "web-app";

  return {
    // After an .eslintrc.js file is loaded, ESLint will normally continue visiting all parent folders
    // to look for other .eslintrc.js files, and also consult a personal file ~/.eslintrc.js.  If any files
    // are found, their options will be merged.  This is difficult for humans to understand, and it will cause
    // nondeterministic behavior if files are loaded from outside the Git working folder.
    //
    // Setting root=true causes ESLint to stop looking for other config files after the first .eslintrc.js
    // is loaded.
    root: true,

    // Disable the parser by default
    parser: "",

    extends: [
      "plugin:sonarjs/recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:promise/recommended",
      "plugin:fp/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "prettier",
    ],

    plugins: ["fp"],

    // Manually authored .d.ts files are generally used to describe external APIs that are  not expected
    // to follow our coding conventions.  Linting those files tends to produce a lot of spurious suppressions,
    // so we simply ignore them.
    ignorePatterns: ["*.d.ts"],

    env: {
      es2020: true,
      browser: isWebAppProfile,
      node: true,
      jest: true,
    },

    overrides: [
      {
        // Declare an override that applies to TypeScript files only
        files: ["*.ts", "*.tsx"],
        parser: "@typescript-eslint/parser",
        parserOptions: {
          // The "project" path is resolved relative to parserOptions.tsconfigRootDir.
          // Your local .eslintrc.js must specify that parserOptions.tsconfigRootDir=__dirname.
          project: "./tsconfig.json",

          // Allow parsing of newer ECMAScript constructs used in TypeScript source code.  Although tsconfig.json
          // may allow only a small subset of ES2018 features, this liberal setting ensures that ESLint will correctly
          // parse whatever is encountered.
          ecmaVersion: 2020,

          sourceType: "module",
        },

        rules: {
          // general
          "no-shadow": "off", // @typescript-eslint/no-shadow is used
          "consistent-return": "off",
          "prefer-const": "off",
          "no-underscore-dangle": "off",
          "no-prototype-builtins": "off",
          "no-console": "off",
          "require-await": "off",
          camelcase: "off", // @typescript-eslint/naming-convention is used
          curly: "warn",
          "nonblock-statement-body-position": ["error", "beside"],
          "no-nested-ternary": "error",
          complexity: ["error", 15],
          "max-params": ["error", 3],
          eqeqeq: ["error", "smart"],

          // eslint-plugin-promise
          "promise/catch-or-return": "off",
          "promise/always-return": "error",
          "no-unused-expressions": ["warn", { allowShortCircuit: true }],
          "no-extra-boolean-cast": "error",

          // eslint-plugin-fp
          "fp/no-unused-expression": "off",
          "fp/no-rest-parameters": "off",
          "fp/no-nil": "off",
          "fp/no-throw": "off",
          "fp/no-loops": "warn",
          "fp/no-let": "warn",
          "fp/no-mutating-methods": [
            "warn",
            {
              ...(isWebAppProfile && { allowedObjects: ["history"] }),
            },
          ],
          "fp/no-mutation": [
            "warn",
            {
              commonjs: true,
              exceptions: isWebAppProfile
                ? [{ object: "window", property: "location" }]
                : [],
            },
          ],

          // eslint-plugin-import
          "import/no-extraneous-dependencies": "off",
          "import/no-relative-parent-imports": "off",

          // avoid false-positives for module bundlers resolution
          "import/no-unresolved": "off",

          "import/no-internal-modules": ["off"],
          "import/order": [
            "error",
            {
              alphabetize: {
                order: "asc",
                caseInsensitive: true,
              },
              groups: [
                "builtin",
                "external",
                "internal",
                "parent",
                "sibling",
                "index",
              ],
              pathGroups: [
                // GraphQL Codegen output
                {
                  pattern: "~/generated/**",
                  group: "internal",
                  position: "before",
                },
                // Common aliased import pattern used in Nordcloud
                {
                  pattern: "~/**",
                  group: "internal",
                },
              ],
              pathGroupsExcludedImportTypes: ["~/generated/**"],
            },
          ],
          "import/no-anonymous-default-export": [
            "error",
            {
              allowArray: false,
              allowArrowFunction: false,
              allowAnonymousClass: false,
              allowAnonymousFunction: false,
              allowCallExpression: true, // The true value here is for backward compatibility
              allowLiteral: false,
              allowObject: false,
            },
          ],

          // eslint-plugin-sonarjs
          "sonarjs/cognitive-complexity": "off",
          "sonarjs/no-duplicate-string": "off",
          "sonarjs/no-nested-template-literals": "warn",
          "sonarjs/no-unused-collection": "warn",
          "sonarjs/no-collapsible-if": "warn",

          // @typescript-eslint/eslint-plugin
          "@typescript-eslint/no-use-before-define": "off",
          "@typescript-eslint/explicit-function-return-type": "off",
          "@typescript-eslint/explicit-module-boundary-types": "off",
          "@typescript-eslint/interface-name-prefix": "off",
          "@typescript-eslint/no-empty-function": "off",
          "@typescript-eslint/no-explicit-any": "error",
          "@typescript-eslint/naming-convention": [
            "error",
            {
              selector: "default",
              format: ["camelCase"],
              filter: {
                regex: "^(__typename|Component)$",
                match: false,
              },
            },
            {
              selector: "variable",
              format: ["camelCase", "UPPER_CASE", "PascalCase"],
              filter: {
                regex: "^(__typename)$",
                match: false,
              },
            },
            {
              selector: "parameter",
              format: ["camelCase", "PascalCase"],
              leadingUnderscore: "allow",
            },
            {
              selector: "memberLike",
              modifiers: ["private"],
              format: ["camelCase"],
              leadingUnderscore: "require",
            },
            {
              selector: "typeLike",
              format: ["PascalCase"],
            },
            {
              selector: ["function"],
              format: ["camelCase", "PascalCase"],
              leadingUnderscore: "forbid",
            },
            {
              selector: ["objectLiteralProperty", "objectLiteralMethod"],
              format: ["camelCase", "PascalCase", "snake_case"],
              leadingUnderscore: "allowDouble",
            },
            {
              selector: ["enumMember", "typeProperty"],
              format: ["camelCase", "snake_case", "UPPER_CASE"],
              leadingUnderscore: "allowDouble",
              filter: {
                regex: "^(Component)$",
                match: false,
              },
            },
            {
              selector: "enum",
              format: ["UPPER_CASE", "PascalCase"],
            },
          ],
          "@typescript-eslint/no-non-null-assertion": "error",
          "@typescript-eslint/consistent-type-definitions": ["error", "type"],
          "@typescript-eslint/no-unused-vars": [
            "error",
            { varsIgnorePattern: "[iI]gnored", argsIgnorePattern: "^_" },
          ],
          "@typescript-eslint/no-shadow": "error",
          "fp/no-loops": "warn",
        },
      },
      {
        // For unit tests, we can be a little bit less strict.  The settings below revise the
        // defaults specified above.
        files: [
          // Test files
          "*.test.ts",
          "*.test.tsx",
          "*.spec.ts",
          "*.spec.tsx",

          // Nordcloud convention
          "**/__mockups__/*.ts",
          "**/__mockups__/*.tsx",
          "**/__tests__/*.ts",
          "**/__tests__/*.tsx",
        ],
        extends: ["plugin:jest/all"],
        rules: {
          // Unit tests sometimes use a standalone statement like "new Thing(123);" to test a constructor.
          "no-new": "off",

          // Jest's mocking API is designed in a way that produces compositional data types that often have
          // no concise description.  Since test code does not ship, and typically does not introduce new
          // concepts or algorithms, the usual arguments for prioritizing readability over writability can be
          // relaxed in this case.
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

          // eslint-plugin-jest
          "jest/no-hooks": "off",
          "jest/require-top-level-describe": "off",
          "jest/prefer-expect-assertions": "off",
          "jest/expect-expect": "off",
          "jest/no-mocks-import": "off",
          "jest/prefer-expect-resolves": "off",
          "jest/prefer-called-with": "off",
          "jest/no-identical-title": "warn",
          "jest/valid-expect-in-promise": "warn",
          "jest/no-disabled-tests": "error",
          "jest/require-to-throw-message": "error",
          "jest/no-commented-out-tests": "error",
        },
      },
    ],
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts", ".tsx"],
        },
      },
      // Common aliased import pattern used in Nordcloud
      "import/internal-regex": "^~/",
    },
  };
}

exports.buildRules = buildRules;
