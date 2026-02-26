# @m-social/oxlint-config

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/oxlint-config)](https://npmx.dev/package/@m-social/oxlint-config)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/oxlint-config)](https://npmx.dev/package/@m-social/oxlint-config)

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
	"extends": ["./node_modules/@m-social/oxlint-config/typescript.jsonc"],
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
		"./node_modules/@m-social/oxlint-config/typescript.jsonc",
		"./node_modules/@m-social/oxlint-config/react.jsonc"
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
		"./node_modules/@m-social/oxlint-config/typescript.jsonc",
		"./node_modules/@m-social/oxlint-config/react.jsonc",
		"./node_modules/@m-social/oxlint-config/next.jsonc"
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

### Type-aware linting

When using type-aware linting (like `oxlint --type-aware`), pass `{ typeAware: true }` as the second argument to `buildFromOxlintConfigFile`. This tells `eslint-plugin-oxlint` to disable the corresponding `@typescript-eslint` rules that oxlint now handles natively:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import oxlint from "eslint-plugin-oxlint";

export default defineConfig(
	// other plugins
	oxlint.buildFromOxlintConfigFile("./.oxlintrc.json", { typeAware: true })
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

## 📄 License

MIT © M-Social
