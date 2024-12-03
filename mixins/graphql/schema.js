const { commons } = require("./_common");

/** @type {import("@types/eslint").Linter.BaseConfig} */
module.exports = {
  overrides: [
    {
      ...commons,

      rules: {
        /**
         * Enforce arrange in alphabetical order for type fields, enum values.
         * @see https://the-guild.dev/graphql/eslint/rules/alphabetize
         */
        "@graphql-eslint/alphabetize": ["error", { values: true }],

        /**
         * Require all comments to follow the same style.
         * @see https://the-guild.dev/graphql/eslint/rules/description-style
         */
        "@graphql-eslint/description-style": "error",

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
         * A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.
         * @see https://the-guild.dev/graphql/eslint/rules/known-type-names
         */
        "@graphql-eslint/known-type-names": "error",

        /**
         * A GraphQL document is only valid if it contains only one schema definition.
         * @see https://the-guild.dev/graphql/eslint/rules/lone-schema-definition
         */
        "@graphql-eslint/lone-schema-definition": "error",

        /**
         * Require names to follow specified conventions.
         * @see https://the-guild.dev/graphql/eslint/rules/naming-convention
         */
        "@graphql-eslint/naming-convention": [
          "error",
          {
            types: "PascalCase",
            FieldDefinition: "camelCase",
            InputValueDefinition: "camelCase",
            Argument: "camelCase",
            DirectiveDefinition: "camelCase",
            EnumValueDefinition: "UPPER_CASE",
            "FieldDefinition[parent.name.value=Query]": {
              forbiddenPrefixes: ["query", "get"],
              forbiddenSuffixes: ["Query"],
            },
            "FieldDefinition[parent.name.value=Mutation]": {
              forbiddenPrefixes: ["mutation"],
              forbiddenSuffixes: ["Mutation"],
            },
            "FieldDefinition[parent.name.value=Subscription]": {
              forbiddenPrefixes: ["subscription"],
              forbiddenSuffixes: ["Subscription"],
            },
          },
        ],

        /**
         * Disallow case-insensitive enum values duplicates.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-enum-value-names
         */
        "@graphql-eslint/unique-enum-value-names": "error",

        /**
         * Requires to use """ or " for adding a GraphQL description instead of #. Allows to use hashtag for comments, as long as it's not attached to an AST definition.
         * @see https://the-guild.dev/graphql/eslint/rules/no-hashtag-description
         */
        "@graphql-eslint/no-hashtag-description": "error",

        /**
         * Enforces users to avoid using the type name in a field name while defining your schema.
         * @see https://the-guild.dev/graphql/eslint/rules/no-typename-prefix
         */
        "@graphql-eslint/no-typename-prefix": "error",

        /**
         * Requires all types to be reachable at some level by root level fields.
         * @see https://the-guild.dev/graphql/eslint/rules/no-unreachable-types
         */
        "@graphql-eslint/no-unreachable-types": "error",

        /**
         * A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.
         * @see https://the-guild.dev/graphql/eslint/rules/provided-required-arguments
         */
        "@graphql-eslint/provided-required-arguments": "error",

        /**
         * Require all deprecation directives to specify a reason.
         * @see https://the-guild.dev/graphql/eslint/rules/require-deprecation-reason
         */
        "@graphql-eslint/require-deprecation-reason": "error",

        /**
         * Enforce descriptions in type definitions and operations.
         * @see https://the-guild.dev/graphql/eslint/rules/require-description
         */
        "@graphql-eslint/require-description": [
          "warn",
          {
            rootField: true,
            DirectiveDefinition: true,
            InputValueDefinition: true,
            EnumValueDefinition: false,
          },
        ],

        /**
         * Requires output types to have one unique identifier unless they do not have a logical one.
         * Exceptions can be used to ignore output types that do not have unique identifiers.
         * DISABLED - reports false-positives in modularized schemas
         * @see https://the-guild.dev/graphql/eslint/rules/strict-id-in-types
         */
        "@graphql-eslint/strict-id-in-types": [
          "off",
          {
            acceptedIdNames: ["id", "nid"],
            acceptedIdTypes: ["ID"],
            exceptions: {
              types: ["Error"],
              suffixes: ["Payload", "Response", "Data", "Error"],
            },
          },
        ],

        /**
         * A GraphQL document is only valid if all defined directives have unique names.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-directive-names
         */
        "@graphql-eslint/unique-directive-names": "error",

        /**
         * A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-directive-names-per-location
         */
        "@graphql-eslint/unique-directive-names-per-location": "error",

        /**
         * A GraphQL complex type is only valid if all its fields are uniquely named.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-field-definition-names
         */
        "@graphql-eslint/unique-field-definition-names": "error",

        /**
         * A GraphQL document is only valid if it has only one type per operation.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-operation-types
         */
        "@graphql-eslint/unique-operation-types": "error",

        /**
         * A GraphQL document is only valid if all defined types have unique names.
         * @see https://the-guild.dev/graphql/eslint/rules/unique-type-names
         */
        "@graphql-eslint/unique-type-names": "error",
      },
    },
  ],
};
