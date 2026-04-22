# @m-social/biome-config

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/biome-config)](https://npmx.dev/package/@m-social/biome-config)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/biome-config)](https://npmx.dev/package/@m-social/biome-config)

> A shareable Biome configuration used at M-Social

## ⚠️ Current Status

This configuration currently supports **formatting only**. Linting rules may be added in future releases.

For linting, we currently recommend using our ESLint configurations:

- [`@m-social/eslint-config-typescript`](https://npmx.dev/package/@m-social/eslint-config-typescript)
- [`@m-social/eslint-config-react`](https://npmx.dev/package/@m-social/eslint-config-react)
- [`@m-social/eslint-config-svelte`](https://npmx.dev/package/@m-social/eslint-config-svelte)
- [`@m-social/eslint-config-next`](https://npmx.dev/package/@m-social/eslint-config-next)

For improved performance, you can optionally use [`@m-social/oxlint-config`](https://npmx.dev/package/@m-social/oxlint-config) alongside ESLint.

## 📦 Installation

Install the package using pnpm (recommended):

```bash
pnpm add -D @biomejs/biome @m-social/biome-config
```

Or with other package managers:

```bash
# npm
npm install --save-dev @biomejs/biome @m-social/biome-config

# yarn
yarn add -D @biomejs/biome @m-social/biome-config
```

## 🚀 Usage

Create a `biome.json` or `biome.jsonc` file in your project root and extend the appropriate configuration:

### Base Configuration

```json
{
	"extends": ["@m-social/biome-config"]
}
```

### React Configuration

```json
{
	"extends": ["@m-social/biome-config/react"]
}
```

### Svelte Configuration

```json
{
	"extends": ["@m-social/biome-config/svelte"]
}
```

## 📄 License

MIT © M-Social
