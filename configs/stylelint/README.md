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

### Disable comments

The config sets `reportDescriptionlessDisables` and `reportNeedlessDisables`: a `stylelint-disable` comment has to say why after `--`, and it is reported once it no longer suppresses anything.

```scss
/* stylelint-disable-next-line selector-max-id -- the id comes from a third-party widget */
```

## 🤖 Rules for AI agents

The base config covers syntax, ordering and empty lines. `agentsConfig()` adds the M-Social style conventions on top: colors, font styles, transitions, states, breakpoints and layers come from shared modules instead of being written by hand in each component. It is meant for AI coding agents: an agent can skip a convention from the docs, but not a failing lint check, and every message says what to do instead.

```js
import { agentsConfig } from "@m-social/stylelint-config/agents";

/** @type {import('stylelint').Config} */
export default {
	extends: [
		"@m-social/stylelint-config",
		agentsConfig({
			globalStyles: ["src/app/styles/**"],
			sharedStyles: ["src/shared/ui/styles/**"],
			colorTokens: ["src/shared/ui/styles/_colors.scss"],
			typography: ["src/shared/ui/typography/**"],
		}),
	],
};
```

The four options are the files that _define_ what the conventions point to, so the rules are relaxed there. They are globs relative to your config file and depend on the project layout — for example `src/_app/styles/**` in a Next.js project.

`agentsConfig()` returns a config object with `plugins`, `rules` and `overrides`. Your own `rules` and `overrides` go next to `extends` as usual and are applied on top of it.

What each rule checks and why: [docs/agents.md](./docs/agents.md).

## 📄 License

MIT © M-Social
