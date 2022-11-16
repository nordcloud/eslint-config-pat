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

/**
 * @returns {import("@types/eslint").Linter.BaseConfig}
 */
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

    // Manually authored .d.ts files are generally used to describe external APIs that are  not expected
    // to follow our coding conventions.  Linting those files tends to produce a lot of spurious suppressions,
    // so we simply ignore them.
    ignorePatterns: ["*.d.ts"],

    env: {
      es2022: true,
      browser: isWebAppProfile,
      node: true,
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
          ecmaVersion: "latest",

          sourceType: "module",
        },

        extends: [
          "plugin:sonarjs/recommended",
          "plugin:unicorn/recommended",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "plugin:promise/recommended",
          "plugin:import/errors",
          "plugin:import/warnings",
          "plugin:import/typescript",
          "prettier",
        ],

        plugins: ["promise", "import"],

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
          "no-unused-expressions": ["warn", { allowShortCircuit: true }],
          "no-extra-boolean-cast": "error",
          "nonblock-statement-body-position": ["error", "beside"],
          "no-nested-ternary": "error",
          complexity: ["error", 15],
          "max-params": ["error", 3],
          eqeqeq: ["error", "smart"],

          // ====================================================================================================
          // eslint-plugin-promise
          // ====================================================================================================

          /**
           * Prevent errors.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/always-return.md
           */
          "promise/always-return": ["error", { ignoreLastCallback: true }],

          /**
           * Error handling is not needed every time.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/catch-or-return.md
           */
          "promise/catch-or-return": "off",

          /**
           * Callback may be unintentionally be invoked twice.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-callback-in-promise.md
           */
          "promise/no-callback-in-promise": "warn",

          /**
           * Improve readability.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-nesting.md
           */
          "promise/no-nesting": "warn",

          /**
           * Calling a Promise static method with new is invalid, resulting in a TypeError at runtime.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-new-statics.md
           */
          "promise/no-new-statics": "warn",

          /**
           * Prevent unexpected behavior.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-promise-in-callback.md
           */
          "promise/no-promise-in-callback": "warn",

          /**
           * Disallow return statements inside a callback passed to finally(), since nothing would consume what's returned.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-return-in-finally.md
           */
          "promise/no-return-in-finally": "warn",

          /**
           * Prevent errors.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/no-return-wrap.md
           */
          "promise/no-return-wrap": "warn",

          /**
           * Ensures that new Promise() is instantiated with the parameter names resolve, reject to avoid confusion with order such as reject, resolve.
           * Using the same parameter names as the language specification makes code more uniform and easier to understand.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/param-names.md
           */
          "promise/param-names": "error",

          /**
           * Calling a Promise function with the incorrect number of arguments can lead to unexpected behavior or hard to spot bugs.
           * @see https://github.com/eslint-community/eslint-plugin-promise/blob/main/docs/rules/valid-params.md
           */
          "promise/valid-params": "warn",

          // ====================================================================================================
          // eslint-plugin-import
          // ====================================================================================================
          /**
           * Reports mistakes with exports, like repeated exports of names or defaults.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/export.md
           */
          "import/export": "error",

          /**
           * Prevent using deprecated APIs.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-deprecated.md
           */
          "import/no-deprecated": "warn",

          /**
           * Prevent mistakes when writing imports.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-empty-named-blocks.md
           */
          "import/no-empty-named-blocks": "warn",

          /**
           * Forbids the use of mutable exports with var or let.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-mutable-exports.md
           */
          "import/no-mutable-exports": "error",

          /**
           * Forbids using an exported name as the name of the default export is misleading or a mistake.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default.md
           */
          "import/no-named-as-default": "warn",

          /**
           * Accessing a property that has a name that is shared by an exported name from the same module is likely to be a mistake.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-named-as-default-member.md
           */
          "import/no-named-as-default-member": "warn",

          /**
           * If a default import is requested, this rule will report if there is no default export in the imported module.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/default.md
           */
          "import/default": "error",

          /**
           * Verifies that all named imports are part of the set of named exports in the referenced module.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md
           */
          "import/named": "error",

          /**
           * Enforces names exist at the time they are dereferenced, when imported as a full namespace (i.e. import * as foo from './foo'; foo.bar(); will report if bar is not exported by ./foo.).
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/namespace.md
           */
          "import/namespace": "error",

          /**
           * Import of modules using an absolute path is a bad practice as it ties the code using it to your computer, and therefore makes it unusable in packages distributed on npm for instance.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-absolute-path.md
           */
          "import/no-absolute-path": "warn",

          /**
           * Ensures that there is no resolvable path back to this module via its dependencies, prevents circular dependencies that can cause issues.
           * maxDepth: 1 is used to improve performance, additional tool should be used to detect circular dependencies globally (e.g. `madge`).
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-cycle.md
           */
          "import/no-cycle": ["error", { ignoreExternal: true, maxDepth: 1 }],

          /**
           * Using expressions (for instance, concatenating a path and variable) as the argument makes it harder for tools to do static code analysis, or to find where in the codebase a module is used.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-dynamic-require.md
           */
          "import/no-dynamic-require": "warn",

          /**
           * Forbid a module from importing itself. This can sometimes happen during refactoring.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md
           */
          "import/no-self-import": "error",

          /**
           * Ensures an imported module can be resolved to a module on the local filesystem, as defined by standard Node require.resolve behavior.
           * Disabled - avoid false-positives for module bundlers resolution
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-unresolved.md
           */
          "import/no-unresolved": "off",

          /**
           * Make import paths shorter and more readable.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
           */
          "import/no-useless-path-segments": [
            "warn",
            {
              noUselessIndex: true,
            },
          ],

          /**
           * Forbid a module from importing itself. This can sometimes happen during refactoring.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-self-import.md
           */
          "import/no-self-import": "error",

          /**
           * Forbid a module from importing itself. This can sometimes happen during refactoring.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/consistent-type-specifier-style.md
           */
          "import/consistent-type-specifier-style": [
            "error",
            "prefer-top-level",
          ],

          /**
           * Forbid modules with too many dependencies - this is considered a code smell, and usually indicates the module is doing too much and/or should be broken up into smaller modules.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/max-dependencies.md
           */
          "import/max-dependencies": [
            "warn",
            {
              max: 10,
              ignoreTypeImports: true,
            },
          ],

          /**
           * Enforces having one or more empty lines after the last top-level import statement or require call.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/newline-after-import.md#importnewline-after-import
           */
          "import/newline-after-import": "error",

          /**
           * Ensuring that default exports are named helps improve the grepability of the codebase by encouraging the re-use of the same identifier for the module's default export at its declaration site and at its import sites.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-anonymous-default-export.md
           */
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

          /**
           * Reports if a resolved path is imported more than once.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md
           */
          "import/no-duplicates": "error",

          /**
           * Enforce a convention in the order of require() / import statements.
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
           */
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

          // ====================================================================================================
          // eslint-plugin-sonarjs
          // ====================================================================================================
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
              format: ["camelCase", "PascalCase", "snake_case", "UPPER_CASE"],
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
            { varsIgnorePattern: "[iI]gnored|^_", argsIgnorePattern: "^_" },
          ],
          "@typescript-eslint/no-shadow": "error",
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
