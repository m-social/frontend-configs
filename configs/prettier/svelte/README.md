# @m-social/prettier-config-svelte

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/prettier-config-svelte)](https://npmx.dev/package/@m-social/prettier-config-svelte)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/prettier-config-svelte)](https://npmx.dev/package/@m-social/prettier-config-svelte)

> A shareable Prettier configuration for Svelte projects used at [M-Social](https://msocialproduction.com)

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D prettier @m-social/prettier-config-svelte
```

Or with other package managers:

```bash
# npm
npm install --save-dev prettier @m-social/prettier-config-svelte

# yarn
yarn add -D prettier @m-social/prettier-config-svelte
```

## 🚀 Usage

There are three ways to use this configuration:

### package.json (Recommended)

Add the following to your `package.json`:

```json
{
	"prettier": "@m-social/prettier-config-svelte"
}
```

### .prettierrc.json

Create a `.prettierrc.json` file with:

```json
"@m-social/prettier-config-svelte"
```

### .prettierrc.mjs

Create a `.prettierrc.mjs` file and re-export the config:

```js
import config from "@m-social/prettier-config-svelte";

export default config;
```

For more information about using Prettier configurations, see the [official documentation](https://prettier.io/docs/sharing-configurations#using-a-shareable-config).

## 📄 License

MIT © M-Social
