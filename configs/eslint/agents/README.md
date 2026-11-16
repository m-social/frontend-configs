# @m-social/eslint-plugin-agents

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/eslint-plugin-agents)](https://npmx.dev/package/@m-social/eslint-plugin-agents)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/eslint-plugin-agents)](https://npmx.dev/package/@m-social/eslint-plugin-agents)

> ESLint rules that keep AI coding agents within the code conventions used at [M-Social](https://msocialproduction.com)

An agent can skip a convention that lives only in project documentation; it cannot skip a failing lint check. This plugin turns such conventions into rules. Each message says what to do instead, so the agent can fix the code without reading the docs, and the `directiveComments` config keeps it from switching a rule off silently.

The rules are meant for agents, but they hold for code written by people just as well.

## 📦 Installation

```bash
pnpm add -D eslint @m-social/eslint-plugin-agents
```

## 🚀 Usage

Add the configs you need to `eslint.config.js`, after [`@m-social/eslint-config-react`](../react):

```js
import reactConfig from "@m-social/eslint-config-react";
import agents from "@m-social/eslint-plugin-agents";
import { defineConfig } from "eslint/config";

export default defineConfig(
	reactConfig({ tsconfigRootDir: import.meta.dirname }),
	agents.configs.recommended,
	agents.configs.reactCompiler,
	agents.configs.vite,
	agents.configs.directiveComments,
);
```

Each config is one flat-config object without `files`, so it applies to whatever the rest of your config lints. To limit it, spread it: `{ ...agents.configs.vite, files: ["src/**"] }`.

| Config              | Use it when                                                    |
| ------------------- | -------------------------------------------------------------- |
| `recommended`       | always — conventions that hold for every React project         |
| `reactCompiler`     | the project is built with React Compiler                       |
| `vite`              | a Vite project reads its variables through a typed env module  |
| `directiveComments` | `eslint-disable` comments should be explained and kept minimal |

## 📏 Rules

| Rule                                                                               | What it reports                                  | Config          |
| ---------------------------------------------------------------------------------- | ------------------------------------------------ | --------------- |
| [`no-literal-inline-style`](./docs/rules/no-literal-inline-style.md)               | hardcoded values in the JSX `style` prop         | `recommended`   |
| [`no-template-literal-class-name`](./docs/rules/no-template-literal-class-name.md) | `className` built with a template literal        | `recommended`   |
| [`no-manual-memoization`](./docs/rules/no-manual-memoization.md)                   | `useMemo`, `useCallback` and `memo` from `react` | `reactCompiler` |
| [`no-restricted-import-meta-env`](./docs/rules/no-restricted-import-meta-env.md)   | project variables read from `import.meta.env`    | `vite`          |

Rule names are prefixed with `@m-social/`, for example `@m-social/agents/no-manual-memoization`.

## 💬 Directive comments

A lint rule only helps while it cannot be switched off silently. `directiveComments` uses [`@eslint-community/eslint-plugin-eslint-comments`](https://eslint-community.github.io/eslint-plugin-eslint-comments/) and ESLint's own options to require that every `eslint-disable` comment:

- names the rules it disables — no bare `eslint-disable`;
- says why, after `--`;
- is removed once it no longer suppresses anything.

```ts
// eslint-disable-next-line @m-social/agents/no-literal-inline-style -- the map library reads this value from the style attribute
```

## 📄 License

MIT © M-Social
