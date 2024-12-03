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
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/description-style.md
         */
        "@graphql-eslint/description-style": "error",

        /**
         * A GraphQL field is only valid if all supplied arguments are defined by that field.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/known-argument-names.md
         */
        "@graphql-eslint/known-argument-names": "error",

        /**
         * A GraphQL document is only valid if all @directives are known by the schema and legally positioned.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/known-directives.md
         */
        "@graphql-eslint/known-directives": "error",

        /**
         * A GraphQL document is only valid if referenced types (specifically variable definitions and fragment conditions) are defined by the type schema.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/known-type-names.md
         */
        "@graphql-eslint/known-type-names": "error",

        /**
         * A GraphQL document is only valid if it contains only one schema definition.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/lone-schema-definition.md
         */
        "@graphql-eslint/lone-schema-definition": "error",

        /**
         * Require names to follow specified conventions.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/naming-convention.md
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
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/no-hashtag-description.md
         */
        "@graphql-eslint/no-hashtag-description": "error",

        /**
         * Enforces users to avoid using the type name in a field name while defining your schema.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/no-typename-prefix.md
         */
        "@graphql-eslint/no-typename-prefix": "error",

        /**
         * Requires all types to be reachable at some level by root level fields.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/no-unreachable-types.md
         */
        "@graphql-eslint/no-unreachable-types": "error",

        /**
         * A field or directive is only valid if all required (non-null without a default value) field arguments have been provided.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/provided-required-arguments.md
         */
        "@graphql-eslint/provided-required-arguments": "error",

        /**
         * Require all deprecation directives to specify a reason.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/require-deprecation-reason.md
         */
        "@graphql-eslint/require-deprecation-reason": "error",

        /**
         * Enforce descriptions in type definitions and operations.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/require-description.md
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
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/strict-id-in-types.md
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
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/unique-directive-names.md
         */
        "@graphql-eslint/unique-directive-names": "error",

        /**
         * A GraphQL document is only valid if all non-repeatable directives at a given location are uniquely named.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/unique-directive-names-per-location.md
         */
        "@graphql-eslint/unique-directive-names-per-location": "error",

        /**
         * A GraphQL complex type is only valid if all its fields are uniquely named.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/unique-field-definition-names.md
         */
        "@graphql-eslint/unique-field-definition-names": "error",

        /**
         * A GraphQL document is only valid if it has only one type per operation.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/unique-operation-types.md
         */
        "@graphql-eslint/unique-operation-types": "error",

        /**
         * A GraphQL document is only valid if all defined types have unique names.
         * @see https://github.com/B2o5T/graphql-eslint/blob/master/docs/rules/unique-type-names.md
         */
        "@graphql-eslint/unique-type-names": "error",
      },
    },
  ],
};
