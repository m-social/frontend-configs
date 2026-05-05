# @m-social/oxfmt-config

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/oxfmt-config)](https://npmx.dev/package/@m-social/oxfmt-config)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/oxfmt-config)](https://npmx.dev/package/@m-social/oxfmt-config)

> A shareable oxfmt configuration used at M-Social

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D oxfmt @m-social/oxfmt-config
```

Or with other package managers:

```bash
# npm
npm install --save-dev oxfmt @m-social/oxfmt-config

# yarn
yarn add -D oxfmt @m-social/oxfmt-config
```

## 🚀 Usage

Create a `oxfmt.config.ts` file in your project root and extend the appropriate configuration:

### Base Configuration

```typescript
import baseConfig from "@m-social/oxfmt-config";

export default baseConfig;
```

### React Configuration

```typescript
import reactConfig from "@m-social/oxfmt-config/react";

export default reactConfig;
```

### Svelte Configuration

```typescript
import svelteConfig from "@m-social/oxfmt-config/svelte";

export default svelteConfig;
```

## 🧩 Extending the Config

To customize the configuration for your project, import `defineConfig` from `oxfmt` and spread the base config:

```typescript
import { defineConfig } from "oxfmt";
import baseConfig from "@m-social/oxfmt-config";

export default defineConfig({
	...baseConfig,
	// ... your override options
});
```

## 📄 License

MIT © M-Social
