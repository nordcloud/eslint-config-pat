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
          "plugin:@typescript-eslint/eslint-recommended",
          "plugin:@typescript-eslint/recommended",
          "prettier",
        ],

        plugins: ["promise", "import", "sonarjs", "unicorn"],

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
          // eslint-plugin-unicorn
          // ====================================================================================================
          /**
           * Improve regexes by making them shorter, consistent, and safer.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/better-regex.md
           */
          "unicorn/better-regex": "error",

          /**
           * Enforce a specific parameter name in catch clauses to keep consistency.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md
           */
          "unicorn/catch-error-name": [
            "error",
            {
              ignore: [/^err$/i],
            },
          ],

          /**
           * Previous destructurings are easily missed which leads to an inconsistent code style.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-destructuring.md
           */
          "unicorn/consistent-destructuring": "error",

          /**
           * Improves readability, directly improves performance and allows JavaScript engines to better optimize performance.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/consistent-function-scoping.md
           */
          "unicorn/consistent-function-scoping": "error",

          /**
           * Enforces the only valid way of Error subclassing.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/custom-error-definition.md
           */
          "unicorn/custom-error-definition": "off",

          /**
           * This rule enforces a message value to be passed in when creating an instance of a built-in Error object, which leads to more readable and debuggable code.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/error-message.md
           */
          "unicorn/error-message": "error",

          /**
           * Enforces defining escape sequence values with uppercase characters rather than lowercase ones. This promotes readability by making the escaped value more distinguishable from the identifier.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/escape-case.md
           */
          "unicorn/escape-case": "error",

          /**
           * `TODO` comments are useful when a piece of code needs some work. Unfortunately these can be easily forgotten as it's common to forget to track them, leaving dangling tasks to be found at later random moments, or never at all.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/expiring-todo-comments.md
           */
          "unicorn/expiring-todo-comments": "error",

          /**
           * Enforce explicitly checking the length of an object and enforce the comparison style.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
           */
          "unicorn/explicit-length-check": "warn",

          /**
           * Enforces all linted files to have their names in a certain case style and lowercase file extension.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
           */
          "unicorn/filename-case": [
            "warn",
            {
              cases: {
                camelCase: true,
                pascalCase: true,
              },
            },
          ],

          /**
           * Ensure consistency.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md
           */
          "unicorn/new-for-builtins": "warn",

          /**
           * Prevent hiding useful eslint errors unintentionally.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-abusive-eslint-disable.md
           */
          "unicorn/no-abusive-eslint-disable": "error",

          /**
           * The rule disallows using the thisArg argument in array methods.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-method-this-argument.md
           */
          "unicorn/no-array-method-this-argument": "error",

          /**
           * Simplify code, improve readability.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-array-push-push.md
           */
          "unicorn/no-array-push-push": "error",

          /**
           * When accessing a member from an await expression, the await expression has to be parenthesized, which is not readable.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-await-expression-member.md
           */
          "unicorn/no-await-expression-member": "error",

          /**
           * The console.log() method and similar methods joins the parameters with a space, so adding a leading/trailing space to a parameter, results in two spaces being added.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-console-spaces.md
           */
          "unicorn/no-console-spaces": "error",

          /**
           * It's not recommended to use document.cookie directly as it's easy to get the string wrong.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-document-cookie.md
           */
          "unicorn/no-document-cookie": "error",

          /**
           * Prevent off-by-one errors that are one of the most common bugs in software.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-for-loop.md
           */
          "unicorn/no-for-loop": "error",

          /**
           * Enforces a convention of using Unicode escapes instead of hexadecimal escapes for consistency and clarity.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-hex-escape.md
           */
          "unicorn/no-hex-escape": "error",

          /**
           * The instanceof Array check doesn't work across realms/contexts, for example, frames/windows in browsers or the vm module in Node.js.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-instanceof-array.md
           */
          "unicorn/no-instanceof-array": "error",

          /**
           * Calling removeEventListener with an inline function or the result of an inline .bind() call is indicative of an error, and won't actually remove the listener.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-invalid-remove-event-listener.md
           */
          "unicorn/no-invalid-remove-event-listener": "error",

          /**
           * Simplify code, improve readability.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-lonely-if.md
           */
          "no-lonely-if": "error",
          "unicorn/no-lonely-if": "error",

          /**
           * Negated conditions are more difficult to understand. Code can be made more readable by inverting the condition.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-negated-condition.md
           */
          "no-negated-condition": "off",
          "unicorn/no-negated-condition": "warn",

          /**
           * Keep code simple, improve readability.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-nested-ternary.md
           */
          "no-nested-ternary": "off",
          "unicorn/no-nested-ternary": "error",

          /**
           * When using the Array constructor with one argument, it's not clear whether the argument is meant to be the length of the array or the only element.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-array.md
           */
          "unicorn/no-new-array": "error",

          /**
           * Enforces the use of Buffer.from and Buffer.alloc() instead of new Buffer(), which has been deprecated since Node.js 4.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md
           */
          "unicorn/no-new-buffer": "error",

          /**
           * As soon as additional options are added, you risk replacing the whole foo = {a: false, b: true} object when passing only one option: {a: true}
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-object-as-default-parameter.md
           */
          "unicorn/no-object-as-default-parameter": "error",

          /**
           * Smart handling of process.exit(), allows usage in certain cases.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-process-exit.md
           */
          "unicorn/no-process-exit": "error",

          /**
           * A class with only static members could just be an object instead.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-static-only-class.md
           */
          "unicorn/no-static-only-class": "error",

          /**
           * If an object is defined as "thenable", once it's accidentally used in an await expression, it may cause problems.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-thenable.md
           */
          "unicorn/no-thenable": "error",

          /**
           * `this` should be used directly. If you want a reference to this from a higher scope, consider using arrow function expression or Function#bind().
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-this-assignment.md
           */
          "unicorn/no-this-assignment": "error",

          /**
           * The await operator should only be used on Promise values.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unnecessary-await.md
           */
          "unicorn/no-unnecessary-await": "error",

          /**
           * Destructuring is very useful, but it can also make some code harder to read. This rule prevents ignoring consecutive values when destructuring from an array.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-array-destructuring.md
           */
          "unicorn/no-unreadable-array-destructuring": "error",

          /**
           * IIFE with parenthesized arrow function body is considered unreadable.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unreadable-iife.md
           */
          "unicorn/no-unreadable-iife": "error",

          /**
           * Uses safe-regex to disallow potentially catastrophic exponential-time regular expressions.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unsafe-regex.md
           */
          "unicorn/no-unsafe-regex": "warn",

          /**
           * Unused properties, much like unused variables, are often a result of incomplete refactoring and may confuse readers.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-unused-properties.md
           */
          "unicorn/no-unused-properties": "warn",

          /**
           * Spreading falsy values in object literals won't add any unexpected properties, so it's unnecessary to add an empty object as fallback.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-fallback-in-spread.md
           */
          "unicorn/no-useless-fallback-in-spread": "error",

          /**
           * Simplify code, avoid unecessary noise.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-length-check.md
           */
          "unicorn/no-useless-length-check": "error",

          /**
           * Wrapping a return value in Promise.resolve in an async function or a Promise#then/catch/finally callback is unnecessary as all return values in async functions and promise callback functions are already wrapped in a Promise.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-promise-resolve-reject.md
           */
          "unicorn/no-useless-promise-resolve-reject": "error",

          /**
           * Remove unecessary code that might confuse readers.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-spread.md
           */
          "unicorn/no-useless-spread": "error",

          /**
           * An empty case before the last default case is useless.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-switch-case.md
           */
          "unicorn/no-useless-switch-case": "error",

          /**
           * Simplify code, avoid unecessary noise.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-useless-undefined.md
           */
          "unicorn/no-useless-undefined": "error",

          /**
           * There is no difference in JavaScript between, for example, 1, 1.0 and 1., so prefer the former for consistency.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-zero-fractions.md
           */
          "unicorn/no-zero-fractions": "error",

          /**
           * Differentiating the casing of the identifier and value clearly separates them and makes your code more readable.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/number-literal-case.md
           */
          "unicorn/number-literal-case": "error",

          /**
           * Long numbers can become really hard to read, so cutting it into groups of digits, separated with a _, is important to keep your code clear.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/numeric-separators-style.md
           */
          "unicorn/numeric-separators-style": "error",

          /**
           * There are numerous advantages of using addEventListener.
           * Some of these advantages include registering unlimited event handlers and optionally having the event handler invoked only once.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md
           */
          "unicorn/prefer-add-event-listener": "error",

          /**
           * Array#find() and Array#findLast() breaks the loop as soon as it finds a match and doesn't create a new array.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-find.md
           */
          "unicorn/prefer-array-find": "error",

          /**
           * Prefer the best suited built-in array method Array#flat() for flattening arrays.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat.md
           */
          "unicorn/prefer-array-flat": "error",

          /**
           * Array#flatMap performs Array#map and Array#flat in one step.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-flat-map.md
           */
          "unicorn/prefer-array-flat-map": "error",

          /**
           * Simplify code.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-index-of.md
           */
          "unicorn/prefer-array-index-of": "error",

          /**
           * Simplify code.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-array-some.md
           */
          "unicorn/prefer-array-some": "error",

          /**
           * Simplify code.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-at.md
           */
          "unicorn/prefer-at": "warn",

          /**
           * Unicode is better supported in String#codePointAt() and String.fromCodePoint().
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-code-point.md
           */
          "unicorn/prefer-code-point": "error",

          /**
           * Date.now() is shorter and nicer than new Date().getTime(), and avoids unnecessary instantiation of Date objects.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-date-now.md
           */
          "unicorn/prefer-date-now": "error",

          /**
           * Instead of reassigning a function parameter, default parameters should be used for simplicity and to avoid errors.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-default-parameters.md
           */
          "unicorn/prefer-default-parameters": "error",

          /**
           * There are some advantages of using Node#append(), like the ability to append multiple nodes and to append both DOMString and DOM node objects.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md
           */
          "unicorn/prefer-dom-node-append": "error",

          /**
           * The DOM function Node#remove() is preferred over the indirect removal of an object with Node#removeChild().
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-remove.md
           */
          "unicorn/prefer-dom-node-remove": "error",

          /**
           * There are some advantages of using .textContent, like performance and more predictable behavior when updating it.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-text-content.md
           */
          "unicorn/prefer-dom-node-text-content": "error",

          /**
           * When re-exporting from a module, it's unnecessary to import and then export. It can be done in a single export…from declaration.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-export-from.md
           */
          "unicorn/prefer-export-from": "error",

          /**
           * Array#some() is intended for more complex needs. If you are just looking for the index where the given item is present, the code can be simplified to use Array#includes().
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-includes.md
           */
          "unicorn/prefer-includes": "error",

          /**
           * When reading and parsing a JSON file, it's unnecessary to read it as a string, because JSON.parse() can also parse Buffer.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-json-parse-buffer.md
           */
          "unicorn/prefer-json-parse-buffer": "off",

          /**
           * Enforces the use of KeyboardEvent#key over KeyboardEvent#keyCode which is deprecated. The .key property is also more semantic and readable.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-keyboard-event-key.md
           */
          "unicorn/prefer-keyboard-event-key": "error",

          /**
           * Disallow ternary operators when simpler logical operator alternatives exist.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-logical-operator-over-ternary.md
           */
          "unicorn/prefer-logical-operator-over-ternary": "error",

          /**
           * Enforces a convention of using Math.trunc() instead of bitwise operations for clarity and more reliable results.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-math-trunc.md
           */
          "unicorn/prefer-math-trunc": "error",

          /**
           * Use more modern APIs that are more feature-rich.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-dom-apis.md
           */
          "unicorn/prefer-modern-dom-apis": "error",

          /**
           * Use more modern APIs that are more readable and easier to use.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-modern-math-apis.md
           */
          "unicorn/prefer-modern-math-apis": "error",

          /**
           * Prefer using the JavaScript module format over the legacy CommonJS module format.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-module.md
           */
          "unicorn/prefer-module": isWebAppProfile ? "error" : "off",

          /**
           * If a function is equivalent to String, Number, BigInt, Boolean, or Symbol, you should use the built-in one directly.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-native-coercion-functions.md
           */
          "unicorn/prefer-native-coercion-functions": "error",

          /**
           * If a function is equivalent to String, Number, BigInt, Boolean, or Symbol, you should use the built-in one directly.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-negative-index.md
           */
          "unicorn/prefer-negative-index": "error",

          /**
           * When importing builtin modules, it's better to use the node: protocol as it makes it perfectly clear that the package is a Node.js builtin module.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-node-protocol.md
           */
          "unicorn/prefer-node-protocol": isWebAppProfile ? "error" : "off",

          /**
           * Prefer Number static properties over global ones
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-number-properties.md
           */
          "unicorn/prefer-number-properties": [
            "error",
            { checkInfinity: false },
          ],

          /**
           * When transforming a list of key-value pairs into an object, Object.fromEntries(…) should be preferred to reduce complexity.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-object-from-entries.md
           */
          "unicorn/prefer-object-from-entries": "error",

          /**
           * If the catch binding parameter is not used, it should be omitted.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-optional-catch-binding.md
           */
          "unicorn/prefer-optional-catch-binding": "error",

          /**
           * When “borrowing” a method from Array or Object, it's clearer to get it from the prototype than from an instance.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-prototype-methods.md
           */
          "unicorn/prefer-prototype-methods": "error",

          /**
           * Reflect.apply() is arguably less verbose and easier to understand.
           * In addition, when you accept arbitrary methods, it's not safe to assume .apply() exists or is not overridden.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-reflect-apply.md
           */
          "unicorn/prefer-reflect-apply": "error",

          /**
           * Use one API to introduce consistency.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-regexp-test.md
           */
          "unicorn/prefer-regexp-test": "warn",

          /**
           * Enforce usage of spread operator, it's more readable and straightforward.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-spread.md
           */
          "unicorn/prefer-spread": "warn",

          /**
           * The String#replaceAll() method is both faster and safer as you don't have to use a regex and remember to escape it if the string is not a literal.
           * And when used with a regex, it makes the intent clearer.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-replace-all.md
           */
          "unicorn/prefer-string-replace-all": "error",

          /**
           * String#substr() and String#substring() are the two lesser known legacy ways to slice a string.
           * It's better to use String#slice() as it's a more popular option with clearer behavior that has a consistent Array counterpart.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-slice.md
           */
          "unicorn/prefer-string-slice": "error",

          /**
           * Prefer String#startsWith() and String#endsWith() over using a regex with /^foo/ or /foo$/.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-starts-ends-with.md
           */
          "unicorn/prefer-string-starts-ends-with": "error",

          /**
           * String#trimLeft() and String#trimRight() are aliases of String#trimStart() and String#trimEnd().
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-string-trim-start-end.md
           */
          "unicorn/prefer-string-trim-start-end": "error",

          /**
           * A switch statement is easier to read than multiple if statements with simple equality comparisons.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-switch.md
           */
          "unicorn/prefer-switch": "error",

          /**
           * Using an if-else statement typically results in more lines of code than a single-line ternary expression, which leads to an unnecessarily larger codebase that is more difficult to maintain.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-ternary.md
           */
          "unicorn/prefer-ternary": "error",

          /**
           * This rule enforces you to throw a TypeError after a type checking if-statement, instead of a generic Error.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-type-error.md
           */
          "unicorn/prefer-type-error": "error",

          /**
           * Using complete words results in more readable code. Not everyone knows all your abbreviations. Code is written only once, but read many times.
           * TODO: add config
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prevent-abbreviations.md
           */
          "unicorn/prevent-abbreviations": "error",

          /**
           * When using a relative URL in new URL(), the URL should either never or always use the ./ prefix consistently.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/relative-url-style.md
           */
          "unicorn/relative-url-style": "error",

          /**
           * It's better to make it clear what the separator is when calling Array#join(), instead of relying on the default comma (',') separator.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-array-join-separator.md
           */
          "unicorn/require-array-join-separator": "error",

          /**
           * It's better to make it clear what the value of the digits argument is when calling Number#toFixed(), instead of relying on the default value of 0.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/require-number-to-fixed-digits-argument.md
           */
          "unicorn/require-number-to-fixed-digits-argument": "error",

          // Turned off because we can't distinguish `widow.postMessage` and `{Worker,MessagePort,Client,BroadcastChannel}#postMessage()`
          // See #1396
          "unicorn/require-post-message-target-origin": "off",

          /**
           * Enforce consistent switch case definition.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/switch-case-braces.md
           */
          "unicorn/switch-case-braces": ["error", "avoid"],

          /**
           * This rule will automatically fix the indentation of multiline string templates, to keep them in alignment with the code they are found in.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/template-indent.md
           */
          "unicorn/template-indent": "error",

          /**
           * Enforce consistent case for text encoding identifiers.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/text-encoding-identifier-case.md
           */
          "unicorn/text-encoding-identifier-case": "error",

          /**
           * While it's possible to create a new error without using the new keyword, it's better to be explicit.
           * @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md
           */
          "unicorn/throw-new-error": "error",

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
