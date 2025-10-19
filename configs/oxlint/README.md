# @m-social/oxlint-config

[![npm version](https://img.shields.io/npm/v/@m-social/oxlint-config)](https://www.npmjs.com/package/@m-social/oxlint-config)
[![downloads](https://img.shields.io/npm/dm/@m-social/oxlint-config)](https://www.npmjs.com/package/@m-social/oxlint-config)

> A shareable oxlint configuration used at M-Social

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D oxlint oxlint-tsgolint @m-social/oxlint-config
```

Or with other package managers:

```bash
# npm
npm install --save-dev oxlint oxlint-tsgolint @m-social/oxlint-config

# yarn
yarn add -D oxlint oxlint-tsgolint @m-social/oxlint-config
```

## 🚀 Usage

Create a `.oxlintrc.json` file in your project root and extend the appropriate configuration:

### Base Configuration

```json
{
	"extends": ["./node_modules/@m-social/oxlint-config/typescript.json"],
	"env": {
		"builtin": true,
		"es2026": true
	}
}
```

### React Configuration

```json
{
	"extends": [
		"./node_modules/@m-social/oxlint-config/typescript.json",
		"./node_modules/@m-social/oxlint-config/react.json"
	],
	"env": {
		"builtin": true,
		"es2026": true,
		"browser": true,
		"shared-node-browser": true
	}
}
```

### Next.js Configuration

```json
{
	"extends": [
		"./node_modules/@m-social/oxlint-config/typescript.json",
		"./node_modules/@m-social/oxlint-config/react.json",
		"./node_modules/@m-social/oxlint-config/next.json"
	],
	"env": {
		"builtin": true,
		"es2026": true,
		"browser": true,
		"shared-node-browser": true,
		"commonjs": true,
		"node": true
	},
	"ignorePatterns": ["**/.next/", "**/out/", "**/build/", "**/next-env.d.ts"]
}
```

## 🔧 Using oxlint with ESLint

To integrate oxlint with ESLint and avoid duplicate rules, install `eslint-plugin-oxlint`:

```bash
pnpm add -D eslint-plugin-oxlint
```

Then configure ESLint to automatically disable rules that oxlint handles:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import oxlint from "eslint-plugin-oxlint";

export default defineConfig(
	// other plugins
	oxlint.buildFromOxlintConfigFile("./.oxlintrc.json")
);
```

### React and Next.js Projects

For React or Next.js configurations, you also need to add rules from `@m-social/oxlint-config/react` to properly ignore rules from `@eslint-react` and `@stylistic` plugins, as oxlint doesn't support them yet:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import oxlint from "eslint-plugin-oxlint";
import oxlintReactRules from "@m-social/oxlint-config/react";

export default defineConfig(
	// other plugins
	oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
	oxlintReactRules
);
```

### Type-aware linting

When using type-aware linting (like `oxlint --type-aware`), you also need to add rules from `@m-social/oxlint-config/type-aware` to properly ignore rules from `@typescript-eslint` plugin, as oxlint doesn't support it yet:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import oxlint from "eslint-plugin-oxlint";
import oxlintTypeAwareRules from "@m-social/oxlint-config/type-aware";

export default defineConfig(
	// other plugins
	oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
	oxlintTypeAwareRules
);
```

## 📄 License

MIT © M-Social
