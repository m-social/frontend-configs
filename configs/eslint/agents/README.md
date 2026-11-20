# @m-social/eslint-plugin-agents

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/eslint-plugin-agents)](https://npmx.dev/package/@m-social/eslint-plugin-agents)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/eslint-plugin-agents)](https://npmx.dev/package/@m-social/eslint-plugin-agents)

> ESLint rules that keep AI coding agents within the code conventions used at [M-Social](https://msocialproduction.com)

An agent can skip a convention that lives only in project documentation; it cannot skip a failing lint check. This plugin turns such conventions into rules. Each message says what to do instead, so the agent can fix the code without reading the docs.

The rules are meant for agents, but they hold for code written by people just as well.

## 📦 Installation

```bash
pnpm add -D eslint @m-social/eslint-plugin-agents
```

## 🚀 Usage

The package has two entry points: the root one holds the rules that do not depend on a UI framework, `/react` holds the React ones. Add the configs you need to `eslint.config.js`, after [`@m-social/eslint-config-react`](../react):

```js
import reactConfig from "@m-social/eslint-config-react";
import agents from "@m-social/eslint-plugin-agents";
import agentsReact from "@m-social/eslint-plugin-agents/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
	reactConfig({ tsconfigRootDir: import.meta.dirname }),
	agentsReact.configs.recommended,
	agents.configs.vite,
);
```

| Entry point                            | Config        | Use it when                                                   |
| -------------------------------------- | ------------- | ------------------------------------------------------------- |
| `@m-social/eslint-plugin-agents/react` | `recommended` | the project is written in React                               |
| `@m-social/eslint-plugin-agents`       | `vite`        | a Vite project reads its variables through a typed env module |

Each config is one flat-config object without `files`, so it applies to whatever the rest of your config lints. To limit it, list it in `extends` of an object that has `files`:

```js
export default defineConfig({
	files: ["src/**"],
	extends: [agents.configs.vite],
});
```

## 📏 Rules

| Rule                                                                               | What it reports                                  | Config                   |
| ---------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------ |
| [`no-literal-inline-style`](./docs/rules/no-literal-inline-style.md)               | hardcoded values in the JSX `style` prop         | `recommended` (`/react`) |
| [`no-template-literal-class-name`](./docs/rules/no-template-literal-class-name.md) | `className` built with a template literal        | `recommended` (`/react`) |
| [`no-manual-memoization`](./docs/rules/no-manual-memoization.md)                   | `useMemo`, `useCallback` and `memo` from `react` | `recommended` (`/react`) |
| [`no-restricted-import-meta-env`](./docs/rules/no-restricted-import-meta-env.md)   | project variables read from `import.meta.env`    | `vite`                   |

The React rules are prefixed with `@m-social/agents-react/`, the rest with `@m-social/agents/` — for example `@m-social/agents-react/no-manual-memoization` and `@m-social/agents/no-restricted-import-meta-env`.

`no-manual-memoization` is part of `recommended` because M-Social React projects are built with React Compiler. In a project without it, switch the rule off:

```js
export default defineConfig(agentsReact.configs.recommended, {
	rules: { "@m-social/agents-react/no-manual-memoization": "off" },
});
```

## 📄 License

MIT © M-Social
