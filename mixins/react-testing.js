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
      },
    },
  ],
};
