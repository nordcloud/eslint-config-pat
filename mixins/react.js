// This mixin applies some additional checks for projects using the React library.  For more information,
// please see the README.md for "@nordcloud/eslint-config-pat".
module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],

  settings: {
    // Link component used by React Router and Next.js
    linkComponents: ["Hyperlink", { name: "Link", linkAttribute: "to" }],
    react: {
      // The default value is "detect".  Automatic detection works by loading the entire React library
      // into the linter's process, which is inefficient.  It is recommended to specify the version
      // explicity.  For details, see README.md for "@nordcloud/eslint-config-pat".
      version: "detect",
    },
  },

  overrides: [
    {
      // Declare an override that applies to TypeScript files only
      files: ["*.ts", "*.tsx"],

      rules: {
        "fp/no-mutation": [
          "warn",
          {
            commonjs: true,
            exceptions: [
              { object: "window", property: "location" },
              // Usage with React refs
              { property: "current" },
            ],
          },
        ],

        // avoid false-positives for module bundlers resolution
        "import/no-unresolved": "off",

        "import/no-internal-modules": [
          "off",
          {
            allow: ["@testing-library/**"],
          },
        ],
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
              // Nordcloud's React component library
              {
                pattern: "@nordcloud/gnui",
                group: "external",
                position: "after",
              },
              {
                pattern: "react",
                group: "external",
                position: "before",
              },
            ],
            pathGroupsExcludedImportTypes: [
              "react",
              "~/generated/**",
              "@nordcloud/gnui",
            ],
          },
        ],

        // eslint-plugin-react-hooks
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "error",
        // eslint-plugin-react
        "react/jsx-no-useless-fragment": "off",
        "react/prop-types": "off",
        "react/display-name": "off",
        "react/function-component-definition": [
          "warn",
          {
            namedComponents: "function-declaration",
            unnamedComponents: "arrow-function",
          },
        ],
        "react/jsx-pascal-case": ["error", { allowNamespace: true }],
        "react/jsx-boolean-value": ["error", "never"],
        "react/jsx-key": "error",
        "react/self-closing-comp": [
          "error",
          {
            component: true,
            html: true,
          },
        ],
      },
    },
    {
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
      extends: [
        "plugin:jest/all",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/react",
      ],
      rules: {
        // eslint-plugin-jest-dom
        "jest-dom/prefer-in-document": "off",
        // eslint-plugin-testing-library
        "testing-library/prefer-screen-queries": "warn",

        // eslint-plugin-fp
        // for...of loops are useful for awaiting multiple testing library queries
        "fp/no-loops": "off",
      },
    },
  ],
};
