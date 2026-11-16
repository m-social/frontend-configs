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

## 🤖 Rules for AI agents

The base config covers syntax, ordering and empty lines. `agentsConfig()` adds the M-Social style conventions on top: colors, font styles, transitions, states, breakpoints and layers come from shared modules instead of being written by hand in each component. It is meant for AI coding agents: an agent can skip a convention from the docs, but not a failing lint check, and every message says what to do instead.

```js
import { agentsConfig } from "@m-social/stylelint-config/agents";

/** @type {import('stylelint').Config} */
export default {
	extends: ["@m-social/stylelint-config"],
	...agentsConfig({
		globalStyles: ["src/app/styles/**"],
		sharedStyles: ["src/shared/ui/styles/**"],
		colorTokens: ["src/shared/ui/styles/_colors.scss"],
		typography: ["src/shared/ui/typography/**"],
	}),
};
```

The four options are the files that _define_ what the conventions point to, so the rules are relaxed there. They are globs relative to the config file and depend on the project layout — for example `src/_app/styles/**` in a Next.js project.

`agentsConfig()` returns `plugins`, `rules`, `overrides` and two options that keep `stylelint-disable` comments honest. It is spread into the config rather than listed in `extends`, so that its globs are resolved against your project. If your config has its own `rules` or `overrides`, merge them:

```js
const agentConventions = agentsConfig({/* … */});

export default {
	extends: ["@m-social/stylelint-config"],
	...agentConventions,
	rules: { ...agentConventions.rules, "selector-max-id": 0 },
	overrides: [...(agentConventions.overrides ?? []), { files: ["legacy/**"], rules: {} }],
};
```

What each rule checks and why: [docs/agents.md](./docs/agents.md).

## 📄 License

MIT © M-Social
