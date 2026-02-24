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

Create a `oxlint.config.ts` file in your project root and extend the appropriate configuration:

### Base Configuration

```typescript
import { defineConfig } from "oxlint";
import typescriptConfig from "@m-social/oxlint-config/typescript";

export default typescriptConfig;
```

### React Configuration

```typescript
import { defineConfig } from "oxlint";
import reactConfig from "@m-social/oxlint-config/react";

export default defineConfig({
	...reactConfig,
	settings: {
		react: {
			version: "19.2",
		},
	},
});
```

### Next.js Configuration

```typescript
import { defineConfig } from "oxlint";
import nextConfig from "@m-social/oxlint-config/next";

export default defineConfig({
	...nextConfig,
	settings: {
		react: {
			version: "19.2",
		},
	},
});
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

When using type-aware linting (like `oxlint --type-aware`), pass `{ typeAware: true }` as the second argument to `buildFromOxlintConfigFile`. This tells `eslint-plugin-oxlint` to disable the corresponding `@typescript-eslint` rules that oxlint now handles natively:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";
import oxlint from "eslint-plugin-oxlint";

export default defineConfig(
	// other plugins
	oxlint.buildFromOxlintConfigFile("./oxlint.config.ts", { typeAware: true })
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
	oxlint.buildFromOxlintConfigFile("./oxlint.config.ts"),
	oxlintReactRules
);
```

## 📄 License

MIT © M-Social
