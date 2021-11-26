// This mixin applies some additional checks for projects using the Jest library.  For more information,
// please see the README.md for "@nordcloud/eslint-config-pat".
module.exports = {
  settings: {
    jest: {
      /**
       * @see {@link https://github.com/jest-community/eslint-plugin-jest#jest-version-setting}
       * For details, see README.md for "@nordcloud/eslint-config-pat".
       */
      version: require("jest/package.json").version,
    },
  },

  env: {
    jest: true,
  },

  overrides: [
    {
      files: [
        // Test files
        "*.test.ts",
        "*.test.tsx",
        "*.spec.ts",
        "*.spec.tsx",

        // Facebook convention
        "**/__mocks__/*.ts",
        "**/__mocks__/*.tsx",
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
};
