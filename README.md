# @nordcloud/eslint-config-pat

A TypeScript ESLint ruleset designed for Nordcloud's Platform & Tools

## Implementation

- **Monorepo friendly:** The `@nordcloud/eslint-config-pat` package has direct dependencies on all the ESLint plugins
  that it needs. This avoids encumbering each consuming project with the obligation to satisfy a peer dependencies.
  It also ensures that the installed plugin versions were tested for compatibility together.

- **Designed for Prettier:** The `@nordcloud/eslint-config-pat` ruleset is designed to be used together with
  the [Prettier](https://prettier.io/) code formatter.
  Prettier avoids frivolous debates: its defaults have already been debated
  at length and adopted by a sizeable community.

- **Minimal configuration:** To use this ruleset, your **.eslintrc.js** will need to choose one **"profile"**
  and possibly one or two **"mixins"** that cover special cases

## Getting started in 3 steps

Applying the ruleset to your project is quick and easy. You install the package, then create an **.eslintrc.js** file
and select an appropriate project profile. Optionally you can also add some "mixins" to enable additional rules.
Let's walk through those three steps in more detail.

### 1. Install the package

To install the package, do this:

```sh
cd your-project-folder
npm install -D eslint typescript prettier @nordcloud/eslint-config-pat
```

### 2. Choose one profile

The ruleset currently supports three different "profile" strings, which select lint rules applicable for
your project:

- `@nordcloud/eslint-config-pat/profile/node` - This profile enables lint rules intended for a general Node.js project,
  typically a web service.

- `@nordcloud/eslint-config-pat/profile/web-app` - This profile enables lint rules intended for a web application, for
  example security rules that are relevant to web browser APIs such as DOM.
  _Also use this profile if you are creating a library that can be consumed by both Node.js and web applications._

After choosing a profile, create an **.eslintrc.js** config file that provides the Node.js `__dirname` context
for TypeScript. Add your profile string in the `extends` field, as shown below:

**.eslintrc.js**

```ts
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@nordcloud/eslint-config-pat/patch/modern-module-resolution");

module.exports = {
  extends: ["@nordcloud/eslint-config-pat/profile/node"], // <---- put your profile string here
  parserOptions: { tsconfigRootDir: __dirname },
};
```

The `"@nordcloud/eslint-config-pat` ruleset is intended to be used with the Prettier code formatter. For general
instructions on setting that up, please refer to the [Prettier docs](https://prettier.io/docs/en/index.html).

### 3. Add any relevant mixins

Optionally, you can add some "mixins" to your `extends` array to opt-in to some extra behaviors.

Important: Your **.eslintrc.js** `"extends"` field must load mixins after the profile entry.

#### `@nordcloud/eslint-config-pat/mixins/react`

For projects using the [React](https://reactjs.org/) library, the `"@nordcloud/eslint-config-pat/mixins/react"` mixin
enables some recommended additional rules. These rules are selected via a mixin because they require you to:

- Add `"jsx": "react"` to your **tsconfig.json**
- Configure your `settings.react.version` as shown below. This determines which React APIs will be considered
  to be deprecated. (If you omit this, the React version will be detected automatically by
  [loading the entire React library](https://github.com/yannickcr/eslint-plugin-react/blob/4da74518bd78f11c9c6875a159ffbae7d26be693/lib/util/version.js#L23)
  into the linter's process, which is costly.)

Add the mixin to your `"extends"` field like this:

**.eslintrc.js**

```ts
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@nordcloud/eslint-config-pat/patch/modern-module-resolution");

module.exports = {
  extends: [
    "@nordcloud/eslint-config-pat/profile/web-app",
    "@nordcloud/eslint-config-pat/mixins/react", // <----
  ],
  parserOptions: { tsconfigRootDir: __dirname },

  settings: {
    react: {
      version: "16.9", // <----
    },
  },
};
```

## Credits

- Based on [@rushstack/eslint-config](https://github.dev/microsoft/rushstack/tree/master/stack/eslint-config)
