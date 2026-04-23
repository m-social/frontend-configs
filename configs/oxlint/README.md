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

Create a `oxlint.config.ts` file in your project root and extend the appropriate configuration:

### Base Configuration

```typescript
import typescriptConfig from "@m-social/oxlint-config/typescript";

export default typescriptConfig;
```

### React Configuration

```typescript
import reactConfig from "@m-social/oxlint-config/react";
import { mergeConfigs } from "@m-social/oxlint-config/utils";

export default mergeConfigs([
	reactConfig,
	{
		settings: {
			react: {
				version: "19.2",
			},
		},
	},
]);
```

### Next.js Configuration

```typescript
import nextConfig from "@m-social/oxlint-config/next";
import { mergeConfigs } from "@m-social/oxlint-config/utils";

export default mergeConfigs([
	nextConfig,
	{
		settings: {
			react: {
				version: "19.2",
			},
		},
	},
]);
```

## 🧩 Extending the Config

To customize any of the provided configurations, use the `mergeConfigs` utility from `@m-social/oxlint-config/utils`. It deep-merges an array of config objects, so your overrides are applied on top of the base config without losing any of its defaults.

```typescript
import typescriptConfig from "@m-social/oxlint-config/typescript";
import { mergeConfigs } from "@m-social/oxlint-config/utils";

export default mergeConfigs([
	typescriptConfig,
	{
		rules: {
			// override or add rules here
			"no-console": "warn",
		},
	},
]);
```

The same pattern works with any of the provided configs (`/typescript`, `/react`, `/next`). Simply pass your partial config object as the last element of the array and it will be merged with the base.

## 🔍 Type-aware Linting

To enable type-aware linting, set `options: { typeAware: true }` in your `oxlint.config.ts` via `mergeConfigs`:

```typescript
import typescriptConfig from "@m-social/oxlint-config/typescript";
import { mergeConfigs } from "@m-social/oxlint-config/utils";

export default mergeConfigs([
	typescriptConfig,
	{
		options: {
			typeAware: true,
		},
	},
]);
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
	oxlint.buildFromOxlintConfigFile("./oxlint.config.ts")
);
```

### Type-aware linting

When `typeAware: true` is set in your `oxlint.config.ts` (see [Type-aware Linting](#-type-aware-linting)), `eslint-plugin-oxlint` will automatically detect it and disable the corresponding `@typescript-eslint` type-aware rules. No additional configuration in `eslint.config.js` is needed.

### React and Next.js Projects

For React or Next.js configurations, you also need to add rules from `@m-social/oxlint-config/eslint/react` to properly ignore rules from `@eslint-react` and `@stylistic` plugins, as oxlint doesn't support them yet:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import oxlint from "eslint-plugin-oxlint";
import oxlintReactRules from "@m-social/oxlint-config/eslint/react";

export default defineConfig(
	// other plugins
	oxlint.buildFromOxlintConfigFile("./oxlint.config.ts"),
	oxlintReactRules
);
```

## 📄 License

MIT © M-Social
