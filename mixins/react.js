// This mixin applies some additional checks for projects using the React library.
// For more information, please see the README.md for "@nordcloud/eslint-config-pat".

const globals = require("globals");

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  globals: {
    ...globals.serviceworker,
    ...globals.browser,
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

      plugins: ["react-hooks", "jsx-a11y", "react", "import"],

      rules: {
        // ====================================================================================================
        // eslint-plugin-import
        // ====================================================================================================
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

        // ====================================================================================================
        // eslint-plugin-react
        // ====================================================================================================
        /**
         * This name is used by React in debugging messages, it's easier to navigate cause of errors.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
         */
        "react/display-name": "error",

        /**
         * Enforce adding keys to elements inside lists.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-key.md
         */
        "react/jsx-key": "error",

        /**
         * This rule prevents comment strings (e.g. beginning with // or /*) from being accidentally injected as a text node in JSX statements.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-comment-textnodes.md
         */
        "react/jsx-no-comment-textnodes": "error",

        /**
         * Creating JSX elements with duplicate props can cause unexpected behavior in your application.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-duplicate-props.md
         */
        "react/jsx-no-duplicate-props": "error",

        /**
         * This rule aims to prevent user generated link hrefs and form actions from creating security vulnerabilities by requiring rel='noreferrer' for external link hrefs and form actions
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md
         */
        "react/jsx-no-target-blank": "error",

        /**
         * This rule helps locate potential ReferenceErrors resulting from misspellings or missing components.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md
         */
        "react/jsx-no-undef": "error",

        /**
         * JSX expands to a call to React.createElement, a file which includes React but only uses JSX should consider the React variable as used.
         * Disabled since using JSX runtime is preferred
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-react.md
         */
        "react/jsx-uses-react": "off",

        /**
         * When using JSX, <a /> expands to React.createElement("a"). Therefore the React variable must be in scope.
         * Disabled since using JSX runtime is preferred
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/react-in-jsx-scope.md
         */
        "react/react-in-jsx-scope": "off",

        /**
         * Since 0.17.0 the eslint no-unused-vars rule does not detect variables used in JSX (see details). This rule will find variables used in JSX and mark them as used.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-uses-vars.md
         */
        "react/jsx-uses-vars": "error",

        /**
         * Children should always be actual children, not passed in as a prop.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-children-prop.md
         */
        "react/no-children-prop": "error",

        /**
         * This rule helps prevent problems caused by using children and the dangerouslySetInnerHTML prop at the same time.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-danger-with-children.md
         */
        "react/no-danger-with-children": "error",

        /**
         * Several methods are deprecated between React versions. This rule will warn you if you try to use a deprecated method.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
         */
        "react/no-deprecated": "error",

        /**
         * NEVER mutate this.state directly.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-direct-mutation-state.md
         */
        "react/no-direct-mutation-state": "error",

        /**
         * Meta will eventually deprecate findDOMNode as it blocks certain improvements in React in the future.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-find-dom-node.md
         */
        "react/no-find-dom-node": "error",

        /**
         * isMounted is an anti-pattern, is not available when using ES6 classes, and it is on its way to being officially deprecated.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-is-mounted.md
         */
        "react/no-is-mounted": "error",

        /**
         * ReactDOM.render() currently returns a reference to the root ReactComponent instance. However, using this return value is legacy and should be avoided because future versions of React may render components asynchronously in some cases.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-render-return-value.md
         */
        "react/no-render-return-value": "error",

        /**
         * Prevent usage of deprecated api.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
         */
        "react/no-string-refs": "error",

        /**
         * This rule prevents characters that you may have meant as JSX escape characters from being accidentally injected as a text node in JSX statements.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
         */
        "react/no-unescaped-entities": "error",

        /**
         * In JSX most DOM properties and attributes should be camelCased to be consistent with standard JavaScript style.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
         */
        "react/no-unknown-property": ["error", { ignore: ["css"] }],

        /**
         * Certain legacy lifecycle methods are unsafe for use in async React applications and cause warnings in strict mode.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unsafe.md
         */
        "react/no-unsafe": "warn",

        /**
         * Disabled due to the usage of TypeScript.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unsafe.md
         */
        "react/prop-types": "off",

        /**
         * When writing the render method in a component it is easy to forget to return the JSX content.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-render-return.md
         */
        "react/require-render-return": "error",

        /**
         * Disabled, sometimes it's required to make TypeScript happy.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-useless-fragment.md
         */
        "react/jsx-no-useless-fragment": "off",

        /**
         * This name is used by React in debugging messages.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/display-name.md
         */
        "react/display-name": "off",

        /**
         * This rule is aimed to enforce consistent function types for function components.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
         */
        "react/function-component-definition": [
          "warn",
          {
            namedComponents: "function-declaration",
            unnamedComponents: "arrow-function",
          },
        ],

        /**
         * Enforces coding style that user-defined JSX components are defined and referenced in PascalCase.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
         */
        "react/jsx-pascal-case": ["error", { allowNamespace: true }],

        /**
         * Keep consistency in the code.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
         */
        "react/jsx-boolean-value": ["error", "never"],

        /**
         * Components without children can be self-closed to avoid unnecessary extra closing tag.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
         */
        "react/self-closing-comp": [
          "error",
          {
            component: true,
            html: true,
          },
        ],

        /**
         * The default value of type attribute for button HTML element is "submit" which is often not the desired behavior and may lead to unexpected page reloads.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/button-has-type.md
         */
        "react/button-has-type": "warn",

        /**
         * Assure constant naming of state and state update function.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/hook-use-state.md
         */
        "react/hook-use-state": "warn",

        /**
         * Helps with maintaining consistency regarding the use of curly braces in JSX props and/or children as well as the use of unnecessary JSX expressions.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-brace-presence.md
         */
        "react/jsx-curly-brace-presence": "error",

        // Disabled due to potential conflicts with prettier
        /**
         * Keep code formatting consistent.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-tag-location.md
         */
        // "react/jsx-closing-tag-location": "off",

        /**
         * Keep code formatting consistent.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-closing-bracket-location.md
         */
        // "react/jsx-closing-bracket-location": "off",

        /**
         * Keep code formatting consistent.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-newline.md
         */
        // "react/jsx-curly-newline": "off",

        /**
         * Keep code formatting consistent.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md
         */
        // "react/jsx-curly-spacing": "off",

        /**
         * Keep code formatting consistent.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md
         */
        // "react/jsx-equals-spacing": "off",

        /**
         * Keep file extensions consistent.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
         */
        "react/jsx-filename-extension": [
          "warn",
          { extensions: [".jsx", ".tsx"] },
        ],

        /**
         * Keep naming consistent.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
         */
        "react/jsx-handler-names": [
          "warn",
          {
            eventHandlerPrefix: "handle",
            eventHandlerPropPrefix: "on",
            checkLocalVariables: true,
            checkInlineFunction: false,
          },
        ],

        /**
         * Improve readability of JSX.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-max-depth.md
         */
        "react/jsx-max-depth": ["warn", { max: 6 }],

        /**
         * Warn about potential performance problem.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
         */
        "react/jsx-no-constructed-context-values": "warn",

        /**
         * Improve security.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-script-url.md
         */
        "react/jsx-no-script-url": "error",

        /**
         * Improve consistency and readability.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
         */
        "react/jsx-sort-props": [
          "warn",
          {
            callbacksLast: true,
            shorthandFirst: true,
            shorthandLast: false,
            multiline: "last",
            ignoreCase: true,
            noSortAlphabetically: true,
            reservedFirst: [
              "key",
              "ref",
              "dangerouslySetInnerHTML",
              "children",
            ],
            locale: "en-US",
          },
        ],

        /**
         * It's a bad idea to use the array index since it doesn't uniquely identify your elements. In cases where the array is sorted or an element is added to the beginning of the array, the index will be changed even though the element representing that index may be the same. This results in unnecessary renders.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
         */
        "react/no-array-index-key": "warn",

        /**
         * Helps with minimizing confusion while reading code.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-invalid-html-attribute.md
         */
        "react/no-invalid-html-attribute": "error",

        /**
         * Namespaces in React elements, such as with svg:circle, are not supported in React.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-namespace.md
         */
        "react/no-namespace": "error",

        /**
         * Prevent potential unnecessary rerenders, and performance regressions.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-object-type-as-default-prop.md
         */
        // TODO enable after plugin release
        // "react/no-object-type-as-default-prop": "warn",

        /**
         *  Prevent errors caused by unfamiliarity with the differences between the two styles of components, or a missed reference when converting a class component to an SFC.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-this-in-sfc.md
         */
        "react/no-this-in-sfc": "error",

        /**
         * Prevent virtual DOM to do extra unnecessary work and possible bugs.
         * @see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unstable-nested-components.md
         */
        "react/no-unstable-nested-components": "warn",

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
