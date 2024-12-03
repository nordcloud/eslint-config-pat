const { commons } = require("./_common");

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      ...commons,

      parserOptions: {
        graphQLConfig: {
          documents: "./src/**/*.graphql",
        },
      },

      rules: {
        /**
         * A GraphQL document is only valid for execution if all definitions are either operation or fragment definitions.
         * @see https://the-guild.dev/graphql/eslint/rules/executable-definitions
         */
        "@graphql-eslint/executable-definitions": "error",

        /**
         * A GraphQL document is only valid if all fields selected are defined by the parent type, or are an allowed meta field such as __typename.
         * @see https://the-guild.dev/graphql/eslint/rules/fields-on-correct-type
         */
        "@graphql-eslint/fields-on-correct-type": "error",

        /**
         * Fragments use a type condition to determine if they apply,
         * since fragments can only be spread into a composite type (object, interface, or union), the type condition must also be a composite type.
         * @see https://the-guild.dev/graphql/eslint/rules/fragments-on-composite-type
         */
        "@graphql-eslint/fragments-on-composite-type": "error",

        /**
         * A GraphQL field is only valid if all supplied arguments are defined by that field.
         * @see https://the-guild.dev/graphql/eslint/rules/known-argument-names
         */
        "@graphql-eslint/known-argument-names": "error",

        /**
         * A GraphQL document is only valid if all @directives are known by the schema and legally positioned.
         * @see https://the-guild.dev/graphql/eslint/rules/known-directives
         */
        "@graphql-eslint/known-directives": "error",

        /**
         * A GraphQL document is only valid if all ...Fragment fragment spreads refer to fragments defined in the same document.
         * DISABLED - does not work for GraphQL codegen
         * @see https://the-guild.dev/graphql/eslint/rules/known-fragment-names
         */
        "@graphql-eslint/known-fragment-names": "off",

        /**
         * A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.
         * @see https://the-guild.dev/graphql/eslint/rules/known-type-names
         */
        "@graphql-eslint/known-type-names": "error",

        /**
         * A GraphQL document is only valid if when it contains an anonymous operation (the query short-hand) that it contains only that one operation definition.
         * @see https://the-guild.dev/graphql/eslint/rules/lone-anonymous-operation
         */
        "@graphql-eslint/lone-anonymous-operation": "error",

        /**
         * Require names to follow specified conventions.
         * @see https://the-guild.dev/graphql/eslint/rules/naming-convention
         */
        "@graphql-eslint/naming-convention": [
          "error",
          {
            VariableDefinition: "camelCase",
            OperationDefinition: {
              style: "PascalCase",
              forbiddenPrefixes: [
                "Query",
                "Mutation",
                "Subscription",
                "Get",
                "List",
              ],
              forbiddenSuffixes: ["Query", "Mutation", "Subscription"],
            },
            FragmentDefinition: {
              style: "PascalCase",
              forbiddenPrefixes: ["Fragment"],
              forbiddenSuffixes: ["Fragment"],
            },
          },
        ],

        /**
         * Require name for your GraphQL operations. This is useful since most GraphQL client libraries are using the operation name for caching purposes.
         * @see https://the-guild.dev/graphql/eslint/rules/no-anonymous-operations
         */
        "@graphql-eslint/no-anonymous-operations": "error",

        /**
         * Enforce that deprecated fields or enum values are not in use by operations.
         * @see https://the-guild.dev/graphql/eslint/rules/no-deprecated
         */
        "@graphql-eslint/no-deprecated": "error",

        /**
         * Checks for duplicate fields in selection set, variables in operation definition, or in arguments set of a field.
         * @see https://the-guild.dev/graphql/eslint/rules/no-duplicate-fields
         */
        "@graphql-eslint/no-duplicate-fields": "error",

        /**
         * A GraphQL fragment is only valid when it does not have cycles in fragments usage.
         * @see https://the-guild.dev/graphql/eslint/rules/no-fragment-cycles
         */
        "@graphql-eslint/no-fragment-cycles": "error",

        /**
         * A GraphQL operation is only valid if all variables encountered, both directly and via fragment spreads, are defined by that operation.
         * @see https://the-guild.dev/graphql/eslint/rules/no-undefined-variables
         */
        "@graphql-eslint/no-undefined-variables": "error",

        /**
         * A GraphQL document is only valid if all fragment definitions are spread within operations, or spread within other fragments spread within operations.
         * @see https://the-guild.dev/graphql/eslint/rules/no-unused-fragments
         */
        "@graphql-eslint/no-unused-fragments": "error",

        /**
         * A GraphQL operation is only valid if all variables defined by an operation are used, either directly or within a spread fragment.
         * @see https://the-guild.dev/graphql/eslint/rules/no-unused-variables
         */
        "@graphql-eslint/no-unused-variables": "error",

        /**
         * A GraphQL subscription is valid only if it contains a single root field.
         * @see https://the-guild.dev/graphql/eslint/rules/one-field-subscriptions
         */
        "@graphql-eslint/one-field-subscriptions": "error",

        /**
         * A selection set is only valid if all fields (including spreading any fragments) either correspond to distinct response names or can be merged without ambiguity.
         * @see https://the-guild.dev/graphql/eslint/rules/overlapping-fields-can-be-merged
         */
        "@graphql-eslint/overlapping-fields-can-be-merged": "error",

        /**
         * A fragment spread is only valid if the type condition could ever possibly be true:
         * if there is a non-empty intersection of the possible parent types, and possible types which pass the type condition.
         * @see https://the-guild.dev/graphql/eslint/rules/possible-fragment-spread
         */
        "@graphql-eslint/possible-fragment-spread": "error",

        /**
         * A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.
         * @see https://the-guild.dev/graphql/eslint/rules/provided-required-arguments
         */
        "@graphql-eslint/provided-required-arguments": "error",

        /**
         * Enforce selecting specific fields when they are available on the GraphQL type.
         * @see https://the-guild.dev/graphql/eslint/rules/require-selections
         */
        "@graphql-eslint/require-selections": "error",

        /**
         * A GraphQL document is valid only if all leaf fields (fields without sub selections) are of scalar or enum types.
         * @see https://the-guild.dev/graphql/eslint/rules/scalar-leafs
         */
        "@graphql-eslint/scalar-leafs": "error",

        /**
         * Limit the complexity of the GraphQL operations solely by their depth. Based on graphql-depth-limit.
         * @see https://the-guild.dev/graphql/eslint/rules/selection-set-depth
         */
        "@graphql-eslint/selection-set-depth": ["error", { maxDepth: 7 }],

        /**
         * A GraphQL field or directive is only valid if all supplied arguments are uniquely named.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-argument-names
         */
        "@graphql-eslint/unique-argument-names": "error",

        /**
         * A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-directive-names-per-location
         */
        "@graphql-eslint/unique-directive-names-per-location": "error",

        /**
         * A GraphQL input object value is only valid if all supplied fields are uniquely named.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-input-field-names
         */
        "@graphql-eslint/unique-input-field-names": "error",

        /**
         * A GraphQL operation is only valid if all its variables are uniquely named.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-variable-names
         */
        "@graphql-eslint/unique-variable-names": "error",

        /**
         * A GraphQL document is only valid if all value literals are of the type expected at their position.
         * @see https://the-guild.dev/graphql/eslint/rules/value-literals-of-correct-type
         */
        "@graphql-eslint/value-literals-of-correct-type": "error",

        /**
         * A GraphQL operation is only valid if all the variables it defines are of input types (scalar, enum, or input object).
         * @see https://the-guild.dev/graphql/eslint/rules/variables-are-input-types
         */
        "@graphql-eslint/variables-are-input-types": "error",

        /**
         * Variables passed to field arguments conform to type.
         * @see https://the-guild.dev/graphql/eslint/rules/variables-in-allowed-position
         */
        "@graphql-eslint/variables-in-allowed-position": "error",
      },
    },
  ],
};
