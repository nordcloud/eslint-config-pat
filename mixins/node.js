// This mixin applies some additional checks for servers based on Node.js.
// For more information, please see the README.md for "@nordcloud/eslint-config-pat".

const globals = require("globals");

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      files: ["**/*.js", "**/*.mjs", "**/*.ts"],
      plugins: ["node"],
      globals: {
        ...globals.node,
        ...globals.commonjs,
      },

      rules: {
        // ====================================================================================================
        // eslint
        // ====================================================================================================
        /**
         * This rule aims to prevent a likely common performance hazard due to a lack of understanding of the semantics of async function.
         * @see https://eslint.org/docs/latest/rules/no-return-await
         */
        "no-return-await": "error",

        // ====================================================================================================
        // typescript-eslint
        // ====================================================================================================
        /**
         * Allow the use of forms such as var foo = require("foo") since CommonJS is used in Node.
         * @see https://typescript-eslint.io/rules/no-var-requires/
         */
        "@typescript-eslint/no-var-requires": "off",

        // ====================================================================================================
        // eslint-plugin-node
        // ====================================================================================================
        /**
         * Prevent assignment to `exports` variable, it would not work as expected.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-exports-assign.md
         */
        "node/no-exports-assign": "error",

        /**
         * If an import declaration's source is extraneous (it's not written in package.json), the program works in local, but will not work after dependencies are re-installed.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-extraneous-import.md
         */
        "node/no-extraneous-import": "error",

        /**
         * If a require()'s target is extraneous (it's not written in package.json), the program works in local, but will not work after dependencies are re-installed.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-extraneous-require.md
         */
        "node/no-extraneous-require": "error",

        /**
         * Disallow import declarations which import non-existence modules.
         * DISABLED - reports false-positives
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-missing-import.md
         */
        "node/no-missing-import": "off",

        /**
         * Disallow require() expressions which import non-existence modules
         * DISABLED - reports false-positives
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-missing-require.md
         */
        "node/no-missing-require": "off",

        /**
         * Disallow new operators with calls to require, they might be confusing.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-new-require.md
         */
        "node/no-new-require": "error",

        /**
         * Both path.join() and path.resolve() are suitable replacements for string concatenation wherever file or directory paths are being created.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-path-concat.md
         */
        "node/no-path-concat": "error",

        /**
         * Prevents install failure of a published package.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-unpublished-bin.md
         */
        "node/no-unpublished-bin": "error",

        /**
         * Prevents install failure of a published package.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-unpublished-import.md
         */
        "node/no-unpublished-import": "error",

        /**
         * Prevents install failure of a published package.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-unpublished-require.md
         */
        "node/no-unpublished-require": "error",

        /**
         * Prevents using unsupported features.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-unsupported-features/es-builtins.md
         */
        "node/no-unsupported-features/es-builtins": "error",

        /**
         * Prevents using unsupported features.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-unsupported-features/es-syntax.md
         */
        "node/no-unsupported-features/es-syntax": [
          "error",
          {
            ignores: ["modules"],
          },
        ],

        /**
         * Prevents using unsupported features.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-unsupported-features/node-builtins.md
         */
        "node/no-unsupported-features/node-builtins": "error",

        /**
         * Make process.exit() expressions the same code path as throw for eslint.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/process-exit-as-throw.md
         */
        "node/process-exit-as-throw": "error",

        /**
         * When we make a CLI tool with Node.js, we add bin field to package.json, then we add a shebang the entry file. This rule suggests correct usage of shebang.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/shebang.md
         */
        "node/shebang": "error",

        /**
         * Prevent using deprecated APIs that might get removed in future versions of Node.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-deprecated-api.md
         */
        "node/no-deprecated-api": "error",

        /**
         * To prevent calling the callback multiple times it is important to return anytime the callback is triggered outside of the main function body.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/callback-return.md
         */
        "node/callback-return": "error",

        /**
         * Enforce export style to achieve consistency within codebase.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/exports-style.md
         */
        "node/exports-style": ["error", "module.exports"],

        /**
         * While require() may be called anywhere in code, some style guides prescribe that it should be called only in the top level of a module to make it easier to identify dependencies.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/global-require.md
         */
        "node/global-require": "error",

        /**
         * In the Node.js community it is often customary to separate initializations with calls to require modules from other variable declarations, sometimes also grouping them by the type of module.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/no-mixed-requires.md
         */
        "node/no-mixed-requires": "error",

        /**
         * Force usage of global variable for consistency.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/prefer-global/buffer.md
         */
        "node/prefer-global/buffer": ["error", "always"],

        /**
         * Force usage of global variable for consistency.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/prefer-global/console.md
         */
        "node/prefer-global/console": ["error", "always"],

        /**
         * Force usage of global variable for consistency.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/prefer-global/console.md
         */
        "node/prefer-global/console": ["error", "always"],

        /**
         * Force usage of global variable for consistency.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/prefer-global/process.md
         */
        "node/prefer-global/process": ["error", "always"],

        /**
         * Force usage of global variable for consistency.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/prefer-global/url-search-params.md
         */
        "node/prefer-global/url-search-params": ["error", "always"],

        /**
         * Force usage of global variable for consistency.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/prefer-global/url.md
         */
        "node/prefer-global/url": ["error", "always"],

        /**
         * Promise API and async/await syntax will make code more readable than callback API.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/prefer-promises/dns.md
         */
        "node/prefer-promises/dns": "error",

        /**
         * Promise API and async/await syntax will make code more readable than callback API.
         * @see https://github.com/mysticatea/eslint-plugin-node/blob/f45c6149be7235c0f7422d1179c25726afeecd83/docs/rules/prefer-promises/fs.md
         */
        "node/prefer-promises/fs": "error",
      },
    },
  ],
};
