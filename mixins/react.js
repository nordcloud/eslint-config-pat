// This mixin applies some additional checks for projects using the React library.  For more information,
// please see the README.md for "@nordcloud/eslint-config-pat".

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

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

      extends: ["plugin:react/recommended"],

      plugins: ["react-hooks", "jsx-a11y"],

      rules: {
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

        // ====================================================================================================
        // eslint-plugin-react-hooks
        // ====================================================================================================
        /**
         * Enforces {@link https://reactjs.org/docs/hooks-rules.html}
         * @see https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks
         */
        "react-hooks/exhaustive-deps": "warn",
        "react-hooks/rules-of-hooks": "error",

        // ====================================================================================================
        // eslint-plugin-jsx-a11y
        // ====================================================================================================
        /**
         * Enforce that all elements that require alternative text have meaningful information to relay back to the end user.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/alt-text.md
         */
        "jsx-a11y/alt-text": "error",

        /**
         * Enforce that anchors have content and that the content is accessible to screen readers.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-has-content.md
         */
        "jsx-a11y/anchor-has-content": [
          "error",
          {
            components: ["Link"],
          },
        ],

        /**
         * The native user agent implementations of HTML elements are to be preferred over custom ARIA solutions.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md
         */
        "jsx-a11y/anchor-is-valid": "warn",

        /**
         * Because an element with aria-activedescendant must be tabbable, it must either have an inherent tabIndex of zero or declare a tabIndex of zero with the tabIndex attribute.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-activedescendant-has-tabindex.md
         */
        "jsx-a11y/aria-activedescendant-has-tabindex": "error",

        /**
         * Elements cannot use an invalid ARIA attribute. This will fail if it finds an aria-* property that is not listed in WAI-ARIA States and Properties spec.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-props.md
         */
        "jsx-a11y/aria-props": "error",

        /**
         * ARIA state and property values must be valid.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-proptypes.md
         */
        "jsx-a11y/aria-proptypes": "error",

        /**
         * Elements with ARIA roles must use a valid, non-abstract ARIA role.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-role.md
         */
        "jsx-a11y/aria-role": "error",

        /**
         * This rule enforces that certain reserved DOM elements that do not support ARIA roles, states and properties do not contain the role and/or aria-* props.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/aria-unsupported-elements.md
         */
        "jsx-a11y/aria-unsupported-elements": "error",

        /**
         * Ensure the autocomplete attribute is correct and suitable for the form field it is used with.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/autocomplete-valid.md
         */
        "jsx-a11y/autocomplete-valid": "error",

        /**
         * Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/click-events-have-key-events.md
         */
        "jsx-a11y/click-events-have-key-events": "error",

        /**
         * Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/heading-has-content.md
         */
        "jsx-a11y/heading-has-content": "error",

        /**
         * Always declare the language of the text in a page using a language attribute on the html tag.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/html-has-lang.md
         */
        "jsx-a11y/html-has-lang": "error",

        /**
         * <iframe> elements must have a unique title property to indicate its content to the user.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/iframe-has-title.md
         */
        "jsx-a11y/iframe-has-title": "error",

        /**
         * Screenreaders already announce img elements as an image. There is no need to use words such as image, photo, and/or picture.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/img-redundant-alt.md
         */
        "jsx-a11y/img-redundant-alt": "error",

        /**
         * Elements with an interactive role and interaction handlers (mouse or key press) must be focusable.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/interactive-supports-focus.md
         */
        "jsx-a11y/interactive-supports-focus": "error",

        /**
         * Enforce that a label tag has a text label and an associated control.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/label-has-associated-control.md
         */
        "jsx-a11y/label-has-associated-control": "error",

        /**
         * Providing captions for media is essential for deaf users to follow along.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/media-has-caption.md
         */
        "jsx-a11y/media-has-caption": "error",

        /**
         * Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/mouse-events-have-key-events.md
         */
        "jsx-a11y/mouse-events-have-key-events": "error",

        /**
         * Inconsistencies between keyboard shortcuts and keyboard commands used by screenreaders and keyboard-only users create accessibility complications so to avoid complications, access keys should not be used.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-access-key.md
         */
        "jsx-a11y/no-access-key": "error",

        /**
         * Autofocusing elements can cause usability issues for sighted and non-sighted users, alike.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-autofocus.md
         */
        "jsx-a11y/no-autofocus": "warn",

        /**
         * Elements that can be visually distracting can cause accessibility issues with visually impaired users.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-distracting-elements.md
         */
        "jsx-a11y/no-distracting-elements": "error",

        /**
         * WAI-ARIA roles should not be used to convert an interactive element to a non-interactive element.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-interactive-element-to-noninteractive-role.md
         */
        "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",

        /**
         * A non-interactive element does not support event handlers (mouse and key handlers).
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-interactions.md
         */
        "jsx-a11y/no-noninteractive-element-interactions": "error",

        /**
         * WAI-ARIA roles should not be used to convert a non-interactive element to an interactive element.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-element-to-interactive-role.md
         */
        "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",

        /**
         * Tab key navigation should be limited to elements on the page that can be interacted with.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-noninteractive-tabindex.md
         */
        "jsx-a11y/no-noninteractive-tabindex": "error",

        /**
         * Setting an ARIA role that matches its default/implicit role is redundant since it is already set by the browser.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-redundant-roles.md
         */
        "jsx-a11y/no-redundant-roles": "error",

        /**
         * In order to add interactivity such as a mouse or key event listener to a static element, that element must be given a role value as well.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/no-static-element-interactions.md
         */
        "jsx-a11y/no-static-element-interactions": "error",

        /**
         * Elements with ARIA roles must have all required attributes for that role.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-has-required-aria-props.md
         */
        "jsx-a11y/role-has-required-aria-props": "error",

        /**
         * Enforce that elements with explicit or implicit roles defined contain only aria-* properties supported by that role.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/role-supports-aria-props.md
         */
        "jsx-a11y/role-supports-aria-props": "error",

        /**
         * The scope prop should be used only on <th> elements.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/scope.md
         */
        "jsx-a11y/scope": "error",

        /**
         * Avoid positive tabIndex property values to synchronize the flow of the page with keyboard tab order.
         * @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/tabindex-no-positive.md
         */
        "jsx-a11y/tabindex-no-positive": "error",
      },
    },
  ],
};
