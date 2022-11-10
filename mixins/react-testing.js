// This mixin applies some additional checks for projects using the Jest library.  For more information,
// please see the README.md for "@nordcloud/eslint-config-pat".

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx", "*.spec.ts", "*.spec.tsx"],
      plugins: ["jest-dom", "testing-library"],
      rules: {
        // ====================================================================================================
        // eslint-plugin-jest-dom
        // ====================================================================================================
        /**
         * Prevent false positives and improve readability.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-checked.md
         */
        "jest-dom/prefer-checked": "error",

        /**
         * Ensure people will use toBeEmptyDOMElement() rather than checking dom nodes/properties.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-empty.md
         */
        "jest-dom/prefer-empty": "error",

        /**
         * Prevent false positives and improve readability, avoid double negatives and confusing syntax.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-enabled-disabled.md
         */
        "jest-dom/prefer-enabled-disabled": "error",

        /**
         * Aim to improve readability & consistency of tests with the use of the jest-dom matcher toHaveFocus rather than checking document.activeElement.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-focus.md
         */
        "jest-dom/prefer-focus": "error",

        /**
         * Enforce checking existance of DOM nodes using .toBeInTheDocument().
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-in-document.md
         */
        "jest-dom/prefer-in-document": "error",

        /**
         * Aim to prevent false positives and improve readability.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-required.md
         */
        "jest-dom/prefer-required": "error",

        /**
         * Improve readability by using proper API.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-to-have-attribute.md
         */
        "jest-dom/prefer-to-have-attribute": "error",

        /**
         * Improve readability by using proper API.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-to-have-class.md
         */
        "jest-dom/prefer-to-have-class": "error",

        /**
         * Improve readability by using proper API.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-to-have-style.md
         */
        "jest-dom/prefer-to-have-style": "error",

        /**
         * Improve readability by using proper API.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-to-have-text-content.md
         */
        "jest-dom/prefer-to-have-text-content": "error",

        /**
         * Improve readability by using proper API.
         * @see https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/docs/rules/prefer-to-have-value.md
         */
        "jest-dom/prefer-to-have-value": "error",

        // ====================================================================================================
        // eslint-plugin-testing-library
        // ====================================================================================================
        /**
         * Ensure that promises returned by async queries are handled properly.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-query.md
         */
        "testing-library/await-async-query": "error",

        /**
         * Ensure that promises returned by async utils are handled properly.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/await-async-utils.md
         */
        "testing-library/await-async-utils": "error",

        /**
         * Ensure that sync queries are not awaited unnecessarily.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-await-sync-query.md
         */
        "testing-library/no-await-sync-query": "error",

        /**
         * Assures confidence that the user can really interact with UI. Also, tests becomes easier to read, and it will break less frequently.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-container.md
         */
        "testing-library/no-container": "error",

        /**
         * Prevent polluting test output.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-debugging-utils.md
         */
        "testing-library/no-debugging-utils": "error",

        /**
         * Ensure that there are no direct imports from @testing-library/dom or dom-testing-library when using some testing library framework wrapper.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-dom-import.md
         */
        "testing-library/no-dom-import": "error",

        /**
         * A RegExp instance that's using the global flag /g holds state and this might cause false-positives while querying for elements.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-global-regexp-flag-in-query.md
         */
        "testing-library/no-global-regexp-flag-in-query": "warn",

        /**
         * It's unnecessary to do manual cleanups after each test unless you skip the auto-cleanup with environment variables such as RTL_SKIP_AUTO_CLEANUP for React.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-manual-cleanup.md
         */
        "testing-library/no-manual-cleanup": "error",

        /**
         * The Testing Library already provides methods for querying DOM elements.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-node-access.md
         */
        "testing-library/no-node-access": "error",

        /**
         * Methods from fireEvent expect to receive a DOM element. Passing a promise will end up in an error, so it must be prevented.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-promise-in-fire-event.md
         */
        "testing-library/no-promise-in-fire-event": "error",

        /**
         * Move render closer to test assertions.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-setup.md
         */
        "testing-library/no-render-in-setup": "warn",

        /**
         * Move render closer to test assertions.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-setup.md
         */
        "testing-library/no-render-in-setup": "warn",

        /**
         * All Testing Library utils are already wrapped in act. Most of the time, if you're seeing an act warning, it's not just something to be silenced, but it's actually telling you that something unexpected is happening in your test.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md
         */
        "testing-library/no-unnecessary-act": "error",

        /**
         * This rule aims to ensure the correct usage of waitFor and waitForElementToBeRemoved, in the way that they're intended to be used.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-empty-callback.md
         */
        "testing-library/no-wait-for-empty-callback": "error",

        /**
         * This rule aims to ensure the correct usage of expect inside waitFor, in the way that they're intended to be used.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-multiple-assertions.md
         */
        "testing-library/no-wait-for-multiple-assertions": "error",

        /**
         * Prevent making side-effect run multiple times.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-side-effects.md
         */
        "testing-library/no-wait-for-side-effects": "error",

        /**
         * Ensure that no calls to toMatchSnapshot or toMatchInlineSnapshot are made from within a waitFor method (or any of the other async utility methods).
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-snapshot.md
         */
        "testing-library/no-wait-for-snapshot": "error",

        /**
         * Improve readability by being more explicit.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-explicit-assert.md
         */
        "testing-library/prefer-explicit-assert": [
          "warn",
          { assertion: "toBeInTheDocument", includeFindQueries: false },
        ],

        /**
         * Prefer usage of recommended and simpler API.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-find-by.md
         */
        "testing-library/prefer-find-by": "error",

        /**
         * Ensure the correct API is used for assertions.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-presence-queries.md
         */
        "testing-library/prefer-presence-queries": "error",

        /**
         * Using queryBy* queries in a waitForElementToBeRemoved yields more descriptive error messages and helps to achieve more consistency in a codebase.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-query-by-disappearance.md
         */
        "testing-library/prefer-query-by-disappearance": "error",

        /**
         * Improve autocomplete and make each test a little simpler to write and maintain.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-screen-queries.md
         */
        "testing-library/prefer-screen-queries": "warn",

        /**
         * userEvent adds related event calls from browsers to make tests more realistic than its counterpart fireEvent.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-user-event.md
         */
        "testing-library/prefer-user-event": "error",

        /**
         * This rule aims to use waitFor async util rather than previous deprecated ones.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-wait-for.md
         */
        "testing-library/prefer-wait-for": "error",

        /**
         * This rule aims to ensure the return value from render is named properly.
         * @see https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/render-result-naming-convention.md
         */
        "testing-library/render-result-naming-convention": "error",
      },
    },
  ],
};
