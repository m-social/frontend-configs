# @m-social/eslint-config-typescript

[![npm version](https://img.shields.io/npm/v/@m-social/eslint-config-typescript)](https://www.npmjs.com/package/@m-social/eslint-config-typescript)
[![downloads](https://img.shields.io/npm/dm/@m-social/eslint-config-typescript)](https://www.npmjs.com/package/@m-social/eslint-config-typescript)

> A shareable ESLint configuration for TypeScript projects used at [M-Social](https://msocialproduction.com)

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D eslint @m-social/eslint-config-typescript
```

Or with other package managers:

```bash
# npm
npm install --save-dev eslint @m-social/eslint-config-typescript

# yarn
yarn add -D eslint @m-social/eslint-config-typescript
```

## 🚀 Usage

Create an `eslint.config.js` (or `eslint.config.mjs`) file in your project root with the following content:

```js
import typescriptConfig from "@m-social/eslint-config-typescript";

export default typescriptConfig({
	tsconfigRootDir: import.meta.dirname,
});
```

## 📄 License

MIT © M-Social
