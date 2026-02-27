# @m-social/stylelint-config

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/stylelint-config)](https://npmx.dev/package/@m-social/stylelint-config)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/stylelint-config)](https://npmx.dev/package/@m-social/stylelint-config)

> A shareable Stylelint configuration for TypeScript projects used at [M-Social](https://msocialproduction.com)

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D stylelint @m-social/stylelint-config
```

Or with other package managers:

```bash
# npm
npm install --save-dev stylelint @m-social/stylelint-config

# yarn
yarn add -D stylelint @m-social/stylelint-config
```

## 🚀 Usage

Create a `stylelint.config.js` file in your project root with the following content:

```js
/** @type {import('stylelint').Config} */
export default {
	extends: ["@m-social/stylelint-config"],
};
```

## 📄 License

MIT © M-Social
