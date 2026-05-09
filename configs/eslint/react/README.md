# @m-social/eslint-config-react

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/eslint-config-react)](https://npmx.dev/package/@m-social/eslint-config-react)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/eslint-config-react)](https://npmx.dev/package/@m-social/eslint-config-react)

> A shareable ESLint configuration for React projects used at [M-Social](https://msocialproduction.com)

> **Note:** This configuration is designed to be used alongside [@m-social/oxlint-config](https://npmx.dev/package/@m-social/oxlint-config). ESLint handles rules not yet supported by oxlint, while oxlint handles the rest for improved linting performance.

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D eslint @m-social/eslint-config-react
```

Or with other package managers:

```bash
# npm
npm install --save-dev eslint @m-social/eslint-config-react

# yarn
yarn add -D eslint @m-social/eslint-config-react
```

## 🚀 Usage

Create an `eslint.config.js` (or `eslint.config.mjs`) file in your project root with the following content:

```js
import reactConfig from "@m-social/eslint-config-react";

export default reactConfig({
	tsconfigRootDir: import.meta.dirname,
	reactCompiler: true,
});
```

## 📄 License

MIT © M-Social
