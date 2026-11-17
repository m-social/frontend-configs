# @m-social/eslint-config-svelte

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/eslint-config-svelte)](https://npmx.dev/package/@m-social/eslint-config-svelte)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/eslint-config-svelte)](https://npmx.dev/package/@m-social/eslint-config-svelte)

> A shareable ESLint configuration for Svelte projects used at [M-Social](https://msocialproduction.com)

> **Note:** This configuration is designed to be used alongside [@m-social/oxlint-config](https://npmx.dev/package/@m-social/oxlint-config). ESLint handles rules not yet supported by oxlint, while oxlint handles the rest for improved linting performance.

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D eslint @m-social/eslint-config-svelte
```

Or with other package managers:

```bash
# npm
npm install --save-dev eslint @m-social/eslint-config-svelte

# yarn
yarn add -D eslint @m-social/eslint-config-svelte
```

## 🚀 Usage

Create an `eslint.config.js` (or `eslint.config.mjs`) file in your project root with the following content:

```js
import config from "@m-social/eslint-config-svelte";
import svelteConfig from "./svelte.config.js";

export default config({
	tsconfigRootDir: import.meta.dirname,
	svelteConfig,
});
```

## 💬 Directive comments

The config uses [`@eslint-community/eslint-plugin-eslint-comments`](https://eslint-community.github.io/eslint-plugin-eslint-comments/) and ESLint's own options to require that an `eslint-disable` comment in a `<script>` block:

- names the rules it disables — no bare `eslint-disable`;
- says why, after `--`;
- is removed once it no longer suppresses anything.

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- the payload shape is not known here
```

Comments in the template (`<!-- eslint-disable-next-line … -->`) are handled by the Svelte plugin. There only the last check applies: a comment that suppresses nothing is reported, a missing rule name or description is not.

For a rule that only oxlint runs, write `oxlint-disable`: ESLint reports an `eslint-disable` comment that suppresses none of its own rules.

## 📄 License

MIT © M-Social
