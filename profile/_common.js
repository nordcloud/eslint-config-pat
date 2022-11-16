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

// Omit `.d.ts` because 1) TypeScript compilation already confirms that
// types are resolved, and 2) it would mask an unresolved
// `.ts`/`.tsx`/`.js`/`.jsx` implementation.
const allExtensions = [".ts", ".tsx", ".js", ".jsx"];

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
          "plugin:unicorn/recommended",
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "prettier",
        ],

        plugins: ["promise", "import", "sonarjs"],

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
           * TypeScript compilation already ensures that named imports exist in the referenced module
           * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/named.md
           */
          "import/named": "off",

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
          /**
           * Having all branches in a switch or if chain with the same implementation is an error.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-all-duplicated-branches.md
           */
          "sonarjs/no-all-duplicated-branches": "error",

          /**
           * When a collection is empty it makes no sense to access or iterate it.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-empty-collection.md
           */
          "sonarjs/no-empty-collection": "warn",

          /**
           * Remove additional overhead.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-extra-arguments.md
           */
          "sonarjs/no-extra-arguments": "warn",

          /**
           * Remove dead code, it could lead to unexpected behavior.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-identical-conditions.md
           */
          "sonarjs/no-identical-conditions": "error",

          /**
           * Using the same value on either side of a binary operator is almost always a mistake.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-identical-expressions.md
           */
          "sonarjs/no-identical-expressions": "error",

          /**
           * When the call to a function doesn’t have any side effects, there is no point of making the call if the results are ignored.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-ignored-return.md
           */
          "sonarjs/no-ignored-return": "error",

          /**
           * A loop with at most one iteration is equivalent to the use of an if statement to conditionally execute one piece of code.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-one-iteration-loop.md
           */
          "sonarjs/no-one-iteration-loop": "error",

          /**
           * If a function does not return anything, it makes no sense to use its output.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-use-of-empty-return-value.md
           */
          "sonarjs/no-use-of-empty-return-value": "error",

          /**
           * The use of operators pairs (=+, =- or =!) where the reversed, single operator was meant (+=, -= or !=) will compile and run, but not produce the expected results.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/non-existent-operator.md
           */
          "sonarjs/non-existent-operator": "error",

          /**
           * Cognitive Complexity is a measure of how hard the control flow of a function is to understand. Functions with high Cognitive Complexity will be difficult to maintain.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/cognitive-complexity.md
           */
          "sonarjs/cognitive-complexity": ["warn", 20],

          /**
           * The requirement for a final else statement is defensive programming. This is consistent with the requirement to have a final default clause in a switch statement.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/elseif-without-else.md
           */
          "sonarjs/elseif-without-else": "warn",

          /**
           * The requirement for a final else statement is defensive programming. This is consistent with the requirement to have a final default clause in a switch statement.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/max-switch-cases.md
           */
          "sonarjs/max-switch-cases": ["warn", 12],

          /**
           * Merging collapsible if statements increases the code's readability.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-collapsible-if.md
           */
          "sonarjs/no-collapsible-if": "warn",

          /**
           * The size of a collection and the length of an array are always greater than or equal to zero. So testing that a size or length is greater than or equal to zero doesn't make sense,
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-collection-size-mischeck.md
           */
          "sonarjs/no-collection-size-mischeck": "warn",

          /**
           * Having two cases in a switch statement or two branches in an if chain with the same implementation is at best duplicate code, and at worst a coding error.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-duplicated-branches.md
           */
          "sonarjs/no-duplicated-branches": "warn",

          /**
           * If a boolean expression doesn’t change the evaluation of the condition, then it is entirely unnecessary, and can be removed.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-gratuitous-expressions.md
           */
          "sonarjs/no-gratuitous-expressions": "warn",

          /**
           * When two functions have the same implementation, either it was a mistake - something else was intended - or the duplication was intentional, but may be confusing to maintainers.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-identical-functions.md
           */
          "sonarjs/no-identical-functions": "error",

          /**
           * It is needlessly complex to invert the result of a boolean comparison. The opposite comparison should be made instead.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-inverted-boolean-check.md
           */
          "sonarjs/no-inverted-boolean-check": "error",

          /**
           * Nested switch structures are difficult to understand because you can easily confuse the cases of an inner switch as belonging to an outer statement.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-nested-switch.md
           */
          "sonarjs/no-nested-switch": "error",

          /**
           * Redundant Boolean literals should be removed from expressions to improve readability.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-redundant-boolean.md
           */
          "sonarjs/no-redundant-boolean": "error",

          /**
           * Reduce overhead and amount of code.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-redundant-jump.md
           */
          "sonarjs/no-redundant-jump": "error",

          /**
           * Code is clearest when each statement has its own line.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-same-line-conditional.md
           */
          "sonarjs/no-same-line-conditional": "error",

          /**
           * When a collection is populated but its contents are never used, then it is surely some kind of mistake.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-unused-collection.md
           */
          "sonarjs/no-unused-collection": "warn",

          /**
           * A catch clause that only rethrows the caught exception has the same effect as omitting the catch altogether.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/no-useless-catch.md
           */
          "sonarjs/no-useless-catch": "warn",

          /**
           * Declaring a variable only to immediately return or throw it is a bad practice.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/prefer-immediate-return.md
           */
          "sonarjs/prefer-immediate-return": "error",

          /**
           * Object literal syntax, which initializes an object's properties inside the object declaration is cleaner and clearer than the alternative:
           * creating an empty object, and then giving it properties one by one.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/prefer-object-literal.md
           */
          "sonarjs/prefer-object-literal": "error",

          /**
           * Return of boolean literal statements wrapped into if-then-else flow should be simplified.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/prefer-single-boolean-return.md
           */
          "sonarjs/prefer-single-boolean-return": "error",

          /**
           * When only the condition expression is defined in a for loop, and the initialization and increment expressions are missing, a while loop should be used instead to increase readability.
           * @see https://github.com/SonarSource/eslint-plugin-sonarjs/blob/master/docs/rules/prefer-while.md
           */
          "sonarjs/prefer-while": "error",

          // ====================================================================================================
          // @typescript-eslint/eslint-plugin
          // ====================================================================================================
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
      "import/extensions": allExtensions,
      "import/external-module-folders": ["node_modules", "node_modules/@types"],
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        node: {
          extensions: allExtensions,
        },
      },
      // Common aliased import pattern used in Nordcloud
      "import/internal-regex": "^~/",
    },
  };
}

exports.buildRules = buildRules;
