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

- **Minimal configuration:** To use this ruleset, your eslint configuration file (**.eslintrc.js** or **eslint.config.mjs**) will need to choose one **"profile"**
  and possibly one or two **"mixins"** that cover special cases

## Getting started

Applying the ruleset to your project is quick and easy. You install the package, then create an eslint configuration file
and select an appropriate project profile. Optionally you can also add some "mixins" to enable additional rules.
Let's walk through those steps in more detail.

### 1. Install the package

To install the package, do this:

```sh
cd your-project-folder
npm install -D eslint typescript prettier @nordcloud/eslint-config-pat
```

### 2. Choose one profile

The ruleset currently supports two different "profile" strings, which select lint rules applicable for
your project:

- `@nordcloud/eslint-config-pat/profile/node` - This profile enables lint rules intended for a general Node.js project,
  typically a web service.

- `@nordcloud/eslint-config-pat/profile/web-app` - This profile enables lint rules intended for a web application, for
  example security rules that are relevant to web browser APIs such as DOM.
  _Also use this profile if you are creating a library that can be consumed by both Node.js and web applications._

After choosing a profile, create an **.eslintrc.js** (eslint before v9) or **eslint.config.mjs** (eslint after v9) config file that provides the Node.js `__dirname` context
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

**eslint.config.mjs**

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/*.js"], // <---- ignore files
  },
  ...compat.extends("@nordcloud/eslint-config-pat/profile/web-app"), // <---- put your profile
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      react: {
        version: "18.13.0", // <---- Your React version
      },
    },

    rules: {
      "unicorn/expiring-todo-comments": "off", // <---- overwrite rules
    },
  },
];
```

### 3. Add any relevant mixins

Optionally, you can add some "mixins" to your `extends` array to opt-in to some extra behaviors.

Important: Your **.eslintrc.js** `"extends"` field must load mixins after the profile entry.

#### `@nordcloud/eslint-config-pat/mixins/react`

For projects using the [React](https://reactjs.org/) library, the `@nordcloud/eslint-config-pat/mixins/react` mixin
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
      version: "16.13.0", // <---- Your React version
    },
  },
};
```

**eslint.config.mjs**

```ts
export default [
  // Other configurations
  ...compat
    .extends("@nordcloud/eslint-config-pat/mixins/react") // <----
    .map((config) => ({
      ...config,
      files: ["src/**/*.ts", "src/**/*.tsx"],
    })),
];
```

#### `@nordcloud/eslint-config-pat/mixins/vitest`

For projects using [Vitest](https://vitest.dev/) testing framework, the `@nordcloud/eslint-config-pat/mixins/vitest` mixin enables some recommended rules. In order to apply it:

- Configure your `settings.env` as shown below.

Add the mixin to your `"extends"` field like this:

**.eslintrc.js**

```ts
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@nordcloud/eslint-config-pat/patch/modern-module-resolution");

module.exports = {
  extends: ["@nordcloud/eslint-config-pat/mixins/vitest"], // <----
  parserOptions: { tsconfigRootDir: __dirname },
};
```

**eslint.config.mjs**

```ts
export default [
  ...compat.extends("@nordcloud/eslint-config-pat/mixins/vitest"),
];
```

#### `@nordcloud/eslint-config-pat/mixins/cypress`

If you are using [Cypress](https://www.cypress.io/) testing framework, the `@nordcloud/eslint-config-pat/mixins/cypress` mixin
enables some specific rules.

Add the mixin to your `"extends"` field like this:

**.eslintrc.js**

```ts
// This is a workaround for https://github.com/eslint/eslint/issues/3458
require("@nordcloud/eslint-config-pat/patch/modern-module-resolution");

module.exports = {
  extends: [
    "@nordcloud/eslint-config-pat/mixins/cypress", // <----
  ],
  parserOptions: { tsconfigRootDir: __dirname },
};
```

**eslint.config.mjs**

```ts
export default [
  ...compat.extends("@nordcloud/eslint-config-pat/mixins/cypress"), // <----
];
```

#### `@nordcloud/eslint-config-pat/mixins/node`

Mixin dedicated for Node.js servers.

#### `@nordcloud/eslint-config-pat/mixins/react-testing`

Enables rules for [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

#### `@nordcloud/eslint-config-pat/mixins/playwright`

Enables rules from [Playwright ESLint plugin](https://github.com/playwright-community/eslint-plugin-playwright).

#### `@nordcloud/eslint-config-pat/mixins/graphql`

Enables rules for GraphQL schema and operation files.

**server**

**.eslintrc.js**

```ts
module.exports = {
  extends: ["@nordcloud/eslint-config-pat/mixins/graphql/schema"], // <----
};
```

**eslint.config.mjs**

```ts
export default [
  ...compat.extends("@nordcloud/eslint-config-pat/mixins/graphql/schema"), // <----
];
```

**client**

**.eslintrc.js**

```ts
module.exports = {
  extends: [
    "@nordcloud/eslint-config-pat/mixins/graphql/operations", // <----
  ],
};
```

**eslint.config.mjs**

```ts
export default [
  ...compat.extends("@nordcloud/eslint-config-pat/mixins/graphql/operations"), // <----
];
```

### 4. Prettier

The `@nordcloud/eslint-config-pat` ruleset is intended to be used with the Prettier code formatter. For general
instructions on setting that up, please refer to the [Prettier docs](https://prettier.io/docs/en/index.html).

```sh
cd your-project-folder
npm install -D prettier
```

Add the prettier config file in the root directory:

**prettier.config.js**

```ts
module.exports = {
  ...require("@nordcloud/eslint-config-pat/prettier.config.js"), // <----
  // Your overrides
};
```

### 5. Stylelint

It's possible to use common [Stylelint](https://stylelint.io/) config from this package, you must setup stylelint first:

```sh
cd your-project-folder
npm install -D stylelint stylelint-config-recommended stylelint-config-styled-components @stylelint/postcss-css-in-js
```

In v12, Stylelint was upgraded from v13 to v14, which is a breaking change. If you are upgrading from v11 or earlier, remove the legacy processor setup.

```js
// remove this from your stylelint config
processors: ["stylelint-processor-styled-components"];
```

Also remove `stylelint-processor-styled-components` from your dependencies.

Add the stylelint config file in the root directory:

**stylelint.config.js**

```ts
module.exports = {
  extends: "@nordcloud/eslint-config-pat/stylelint.config.js", // <----
  rules: {
    // Your overrides
  },
};
```

## Release Process

Releases are automated using a **Release PR** pattern, split across two GitHub Actions workflows. Neither workflow needs to bypass branch protection on `master` — the version bump goes through a normal, reviewed PR, and publishing is triggered by merging that PR.

```
Prepare Release (manual)              Publish Release (automatic)
      │                                        │
      ▼                                        │
Compute next version                           │
Update CHANGELOG.md                            │
      │                                        │
      ▼                                        │
Open PR: release/vX.Y.Z → master               │
      │                                        │
      ▼                                        │
   Review & merge ─────────────────────────────▶
                                                │
                                                ▼
                                        Tag vX.Y.Z
                                        Create GitHub Release
                                        Publish to npm
                                        Comment on linked issues/PRs
```

### Workflow A: `prepare-release.yml`

**Trigger:** Manual — go to **Actions → Prepare Release → Run workflow**.

**What it does:**

1. Checks that no release PR is currently open (to avoid duplicate/conflicting releases).
2. Runs `release-it` to compute the next version from [Conventional Commits](https://www.conventionalcommits.org/) since the last tag, and updates `CHANGELOG.md`. It does **not** commit, tag, publish, or create a GitHub Release — it only computes and edits files.
3. If there's nothing worth releasing (no `feat`/`fix`/breaking-change commits since the last tag), the workflow stops here with a notice — no PR is opened.
4. Otherwise, opens a PR (`release/vX.Y.Z` → `master`) containing the version bump and changelog update, authored as whoever triggered the run.

**Manual version override:** if you need to force a specific bump regardless of commit history, select `patch`, `minor`, or `major` in the workflow's input dropdown instead of leaving it on auto-detect.

### Workflow B: `release.yml`

**Trigger:** Automatic — fires when a PR whose branch starts with `release/` is merged into `master`.

**What it does:**

1. Reads the version already committed to `package.json` on `master`.
2. Creates and pushes the git tag `vX.Y.Z`.
3. Creates the GitHub Release, using the latest section of `CHANGELOG.md` as the release notes.
4. Publishes to npm using [Trusted Publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) — no npm token/secret required.
5. Comments on the issues/PRs included in the release.

### How to cut a release

1. Merge whatever feature/fix work you want included into `master` as usual, using Conventional Commit prefixes (`feat:`, `fix:`, `chore:`, etc.) — this is what determines the next version number.
2. Go to **Actions → Prepare Release → Run workflow**.
3. Review the resulting `release/vX.Y.Z` PR — check the version bump and the generated changelog entry look right.
4. Merge the PR. Publishing to npm and GitHub happens automatically from there — no further action needed.

### Notes for maintainers

- Only one release PR can be open at a time; merge or close the existing one before starting a new one.
- If `Prepare Release` reports nothing to release, it means no commits since the last tag are `feat`/`fix`/breaking-change type — this is expected behavior, not a bug. Use the manual version dropdown if you need to force a release anyway.
- npm's Trusted Publisher configuration must point to the exact workflow filename `release.yml`. If you rename this file, update the Trusted Publisher setting on npmjs.com to match, or publishing will fail.
- If branch protection on `master` requires signed commits, make sure that's compatible with the commits these workflows produce, or publishing/PR creation may be rejected.

## Credits

- Based on [@rushstack/eslint-config](https://github.dev/microsoft/rushstack/tree/master/stack/eslint-config)
- Migration guide for Eslint configuration: [Migrate to ESLint 9.x](https://tduyng.com/blog/migrating-to-eslint9x/)
