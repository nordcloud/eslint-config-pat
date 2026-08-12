# Changelog

## [11.2.0](https://github.com/nordcloud/eslint-config-pat/compare/v11.1.1...v11.2.0) (2026-08-12)

### Features

* improve release workflow ([#87](https://github.com/nordcloud/eslint-config-pat/issues/87)) ([90f4e1b](https://github.com/nordcloud/eslint-config-pat/commit/90f4e1b0d2f433cae567879a0ab80f26ab072eb5))

## [11.1.0](https://github.com/nordcloud/eslint-config-pat/compare/v11.0.1...v11.1.0) (2026-08-11)

### Features

* upgrade stylelint to v14 ([#84](https://github.com/nordcloud/eslint-config-pat/issues/84)) ([4b687e9](https://github.com/nordcloud/eslint-config-pat/commit/4b687e99962b1cbb08f21841cce4780a9a2dd219))

### Bug Fixes

* add Node 24 to supported engines ([a53bf48](https://github.com/nordcloud/eslint-config-pat/commit/a53bf48b0190fbd3f9b660f85858b98e56193b3f))
* add skipChecks for OIDC (preflight checks fail without token) ([f4e6b03](https://github.com/nordcloud/eslint-config-pat/commit/f4e6b033a108f7c4a8076ea76886480f4dfdc615))
* switch release workflow to npm trusted publishing (OIDC) ([0551a8d](https://github.com/nordcloud/eslint-config-pat/commit/0551a8d4a807ebd175fe7097ee969b36435a7269))
* update lodash & npm audit fix ([898fec6](https://github.com/nordcloud/eslint-config-pat/commit/898fec6176c28398a390bc1296b6d5b2a1be15b5))
* use Node 24 (npm 11.x) for OIDC trusted publishing support ([580e6c4](https://github.com/nordcloud/eslint-config-pat/commit/580e6c4304cc3a025f7d85cf34956711803f884c))

## [11.0.0](https://github.com/nordcloud/eslint-config-pat/compare/v10.0.0...v11.0.0) (2025-04-28)

### ⚠ BREAKING CHANGES

- Add support for Node 22 (#80)

### Features

- Add support for Node 22 ([#80](https://github.com/nordcloud/eslint-config-pat/issues/80)) ([c3b8c38](https://github.com/nordcloud/eslint-config-pat/pull/80/commits/c3b8c389773d677a8e8ff30398e71b12ba2d0097))

## [10.0.0](https://github.com/nordcloud/eslint-config-pat/compare/v9.5.2...v10.0.0) (2024-12-03)

### ⚠ BREAKING CHANGES

- Upgrade eslint from v8 to v9 (#77)

### Features

- Upgrade eslint from v8 to v9 ([#77](https://github.com/nordcloud/eslint-config-pat/issues/77)) ([78b3d38](https://github.com/nordcloud/eslint-config-pat/commit/78b3d38045cf613ccbe4e773943cfb0760353568))

## [9.5.2](https://github.com/nordcloud/eslint-config-pat/compare/v9.4.0...v9.5.2) (2024-11-28)

## [9.4.0](https://github.com/nordcloud/eslint-config-pat/compare/v9.3.0...v9.4.0) (2024-11-27)

## [9.3.0](https://github.com/nordcloud/eslint-config-pat/compare/v9.2.0...v9.3.0) (2023-12-18)

### Features

- automate github release ([#66](https://github.com/nordcloud/eslint-config-pat/issues/66)) ([93e75a6](https://github.com/nordcloud/eslint-config-pat/commit/93e75a6c0a91d1d09ca52c2c55e009f52f98b717))

## [9.2.0](https://github.com/nordcloud/eslint-config-pat/compare/v9.1.0...v9.2.0) (2023-12-18)

### Features

- publish new version ([#65](https://github.com/nordcloud/eslint-config-pat/issues/65)) ([6d897c7](https://github.com/nordcloud/eslint-config-pat/commit/6d897c78b1f3d41a67d8a460801e19ed681cf264))

## [9.0.1](https://github.com/nordcloud/eslint-config-pat/compare/v9.0.0...v9.0.1) (2023-11-13)

### Bug Fixes

- fix vitest config ([#59](https://github.com/nordcloud/eslint-config-pat/issues/59)) ([735ae8f](https://github.com/nordcloud/eslint-config-pat/commit/735ae8fadb516c9ebdeb5034c8ef08fb6a5ce893))

## [9.0.0](https://github.com/nordcloud/eslint-config-pat/compare/v8.1.0...v9.0.0) (2023-11-13)

### ⚠ BREAKING CHANGES

- requires migration to vitest

### Features

- replace eslint-plugin-jest with eslint-plugin-vitest ([#58](https://github.com/nordcloud/eslint-config-pat/issues/58)) ([100be5c](https://github.com/nordcloud/eslint-config-pat/commit/100be5c1f19d480bc9c817d28fd6cd67f7ae764a))

## [8.1.0](https://github.com/nordcloud/eslint-config-pat/compare/v8.0.0...v8.1.0) (2023-09-22)

### Features

- allow object type ([#57](https://github.com/nordcloud/eslint-config-pat/issues/57)) ([06f33ab](https://github.com/nordcloud/eslint-config-pat/commit/06f33ab5a54d301ac21d0f20256edd44b6d5b428))

## [8.0.0](https://github.com/nordcloud/eslint-config-pat/compare/v7.0.0...v8.0.0) (2023-09-12)

### ⚠ BREAKING CHANGES

- minimal required version of eslint has been increased

### Features

- major update to support TypeScript 5 ([#56](https://github.com/nordcloud/eslint-config-pat/issues/56)) ([1fd4ad3](https://github.com/nordcloud/eslint-config-pat/commit/1fd4ad375cd0fec4ee140cde124e8dd154d306d1))

## [7.0.0](https://github.com/nordcloud/eslint-config-pat/compare/v6.0.0...v7.0.0) (2023-09-08)

### ⚠ BREAKING CHANGES

- new rules with "error" status have been added, they can cause new linting errors than need to be fixed

### Features

- add rules for promises, create release setup ([#55](https://github.com/nordcloud/eslint-config-pat/issues/55)) ([e61e3aa](https://github.com/nordcloud/eslint-config-pat/commit/e61e3aa8fb776f015f4cb9045aed5275f3bfdbcc))
