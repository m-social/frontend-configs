# @m-social/eslint-config-svelte

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/eslint-config-svelte)](https://npmx.dev/package/@m-social/eslint-config-svelte)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/eslint-config-svelte)](https://npmx.dev/package/@m-social/eslint-config-svelte)

> A shareable ESLint configuration for Svelte projects used at [M-Social](https://msocialproduction.com)

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

## 📄 License

MIT © M-Social
