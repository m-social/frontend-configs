# @m-social/eslint-config-next

[![npm version](https://img.shields.io/npm/v/@m-social/eslint-config-next)](https://www.npmjs.com/package/@m-social/eslint-config-next)
[![downloads](https://img.shields.io/npm/dm/@m-social/eslint-config-next)](https://www.npmjs.com/package/@m-social/eslint-config-next)

> A shareable ESLint configuration for Next.js projects used at [M-Social](https://msocialproduction.com)

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D eslint @m-social/eslint-config-next
```

Or with other package managers:

```bash
# npm
npm install --save-dev eslint @m-social/eslint-config-next

# yarn
yarn add -D eslint @m-social/eslint-config-next
```

## 🚀 Usage

Create an `eslint.config.js` (or `eslint.config.mjs`) file in your project root with the following content:

```js
import nextConfig from "@m-social/eslint-config-next";

export default nextConfig({
	tsconfigRootDir: import.meta.dirname,
	reactCompiler: true,
});
```

## 📄 License

MIT © M-Social
