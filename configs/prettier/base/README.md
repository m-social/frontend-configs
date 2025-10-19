# @m-social/prettier-config

[![npm version](https://img.shields.io/npm/v/@m-social/prettier-config)](https://www.npmjs.com/package/@m-social/prettier-config)
[![downloads](https://img.shields.io/npm/dm/@m-social/prettier-config)](https://www.npmjs.com/package/@m-social/prettier-config)

> A shareable Prettier configuration used at [M-Social](https://msocialproduction.com)

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D prettier @m-social/prettier-config
```

Or with other package managers:

```bash
# npm
npm install --save-dev prettier @m-social/prettier-config

# yarn
yarn add -D prettier @m-social/prettier-config
```

## 🚀 Usage

Often this config should not be used directly. Instead, more specific configs should be used:

- [`@m-social/prettier-config-svelte`](https://www.npmjs.com/package/@m-social/prettier-config-svelte) for Svelte projects
- [`@m-social/prettier-config-react`](https://www.npmjs.com/package/@m-social/prettier-config-react) for React projects

If you still need to use this config, there are three ways to do it:

### package.json (Recommended)

Add the following to your `package.json`:

```json
{
	"prettier": "@m-social/prettier-config"
}
```

### .prettierrc.json

Create a `.prettierrc.json` file with:

```json
"@m-social/prettier-config"
```

### .prettierrc.mjs

Create a `.prettierrc.mjs` file and re-export the config:

```js
import config from "@m-social/prettier-config";

export default config;
```

For more information about using Prettier configurations, see the [official documentation](https://prettier.io/docs/sharing-configurations#using-a-shareable-config).

## 📄 License

MIT © M-Social
