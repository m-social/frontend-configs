# @m-social/prettier-config-react

[![npm version](https://img.shields.io/npm/v/@m-social/prettier-config-react)](https://www.npmjs.com/package/@m-social/prettier-config-react)
[![downloads](https://img.shields.io/npm/dm/@m-social/prettier-config-react)](https://www.npmjs.com/package/@m-social/prettier-config-react)

> A shareable Prettier configuration for React projects used at [M-Social](https://msocialproduction.com)

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D prettier @m-social/prettier-config-react
```

Or with other package managers:

```bash
# npm
npm install --save-dev prettier @m-social/prettier-config-react

# yarn
yarn add -D prettier @m-social/prettier-config-react
```

## 🚀 Usage

There are three ways to use this configuration:

### package.json (Recommended)

Add the following to your `package.json`:

```json
{
	"prettier": "@m-social/prettier-config-react"
}
```

### .prettierrc.json

Create a `.prettierrc.json` file with:

```json
"@m-social/prettier-config-react"
```

### .prettierrc.mjs

Create a `.prettierrc.mjs` file and re-export the config:

```js
import config from "@m-social/prettier-config-react";

export default config;
```

For more information about using Prettier configurations, see the [official documentation](https://prettier.io/docs/sharing-configurations#using-a-shareable-config).

## 📄 License

MIT © M-Social
