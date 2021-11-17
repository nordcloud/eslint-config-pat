# eslint-config-pat

Shareable ESLint config for PAT projects

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```bash
npm install -D @nordcloud/eslint-config-pat
```

This library has a required `peerDependencies` listing for [`eslint`][eslint]

## Usage

Then add the extends to your `.eslintrc.js`:

```javascript
module.exports = {
  extends: "@nordcloud/eslint-config-pat",
  rules: {
    // your overrides
  },
};
```
