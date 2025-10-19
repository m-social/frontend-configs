# @m-social/eslint-config-svelte

[![npm version](https://img.shields.io/npm/v/@m-social/eslint-config-svelte)](https://www.npmjs.com/package/@m-social/eslint-config-svelte)
[![downloads](https://img.shields.io/npm/dm/@m-social/eslint-config-svelte)](https://www.npmjs.com/package/@m-social/eslint-config-svelte)

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
