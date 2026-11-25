# @m-social/oxlint-plugin-agents

[![npm version](https://npmx.dev/api/registry/badge/version/@m-social/oxlint-plugin-agents)](https://npmx.dev/package/@m-social/oxlint-plugin-agents)
[![downloads](https://npmx.dev/api/registry/badge/downloads/@m-social/oxlint-plugin-agents)](https://npmx.dev/package/@m-social/oxlint-plugin-agents)

> Oxlint and ESLint rules that keep AI coding agents within the code conventions used at [M-Social](https://msocialproduction.com)

An agent can skip a convention that lives only in project documentation; it cannot skip a failing lint check. This plugin turns such conventions into rules. Each message says what to do instead, so the agent can fix the code without reading the docs.

The rules are meant for agents, but they hold for code written by people just as well. They use oxlint's `createOnce` API and are also compatible with ESLint through `eslintCompatPlugin`.

## Installation

For oxlint:

```bash
pnpm add -D oxlint @m-social/oxlint-plugin-agents
```

For ESLint:

```bash
pnpm add -D eslint @m-social/oxlint-plugin-agents
```

## Usage

The package has two entry points: the root one holds the rules that do not depend on a UI framework, `/react` holds the React ones. The `vite` and `recommended` configs are for oxlint; use `vite/eslint` and `recommended/eslint` with ESLint.

### Oxlint

Add the configs you need to `oxlint.config.ts`:

```ts
import agents from "@m-social/oxlint-plugin-agents";
import agentsReact from "@m-social/oxlint-plugin-agents/react";
import { defineConfig } from "oxlint";

export default defineConfig({
	extends: [agentsReact.configs.recommended, agents.configs.vite],
});
```

### ESLint

Add the ESLint variants to `eslint.config.js`, after [`@m-social/eslint-config-react`](../../../configs/eslint/react):

```js
import reactConfig from "@m-social/eslint-config-react";
import agents from "@m-social/oxlint-plugin-agents";
import agentsReact from "@m-social/oxlint-plugin-agents/react";
import { defineConfig } from "eslint/config";

export default defineConfig(
	reactConfig({ tsconfigRootDir: import.meta.dirname }),
	agentsReact.configs["recommended/eslint"],
	agents.configs["vite/eslint"],
);
```

| Entry point                            | Oxlint config | ESLint config        | Use it when                                                   |
| -------------------------------------- | ------------- | -------------------- | ------------------------------------------------------------- |
| `@m-social/oxlint-plugin-agents/react` | `recommended` | `recommended/eslint` | the project is written in React                               |
| `@m-social/oxlint-plugin-agents`       | `vite`        | `vite/eslint`        | a Vite project reads its variables through a typed env module |

The ESLint configs are flat-config objects without `files`, so they apply to whatever the rest of your config lints. To limit one, list it in `extends` of an object that has `files`:

```js
export default defineConfig({
	files: ["src/**"],
	extends: [agents.configs["vite/eslint"]],
});
```

## Rules

| Rule                                                                               | What it reports                                  | Configs                             |
| ---------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------- |
| [`no-literal-inline-style`](./docs/rules/no-literal-inline-style.md)               | hardcoded values in the JSX `style` prop         | `recommended`, `recommended/eslint` |
| [`no-template-literal-class-name`](./docs/rules/no-template-literal-class-name.md) | `className` built with a template literal        | `recommended`, `recommended/eslint` |
| [`no-manual-memoization`](./docs/rules/no-manual-memoization.md)                   | `useMemo`, `useCallback` and `memo` from `react` | `recommended`, `recommended/eslint` |
| [`no-restricted-import-meta-env`](./docs/rules/no-restricted-import-meta-env.md)   | project variables read from `import.meta.env`    | `vite`, `vite/eslint`               |

The React rules are prefixed with `@m-social/agents-react/`, the rest with `@m-social/agents/` — for example `@m-social/agents-react/no-manual-memoization` and `@m-social/agents/no-restricted-import-meta-env`.

`no-manual-memoization` is part of both recommended configs because M-Social React projects are built with React Compiler. In a project without it, switch the rule off.

For oxlint:

```ts
export default defineConfig({
	extends: [agentsReact.configs.recommended],
	rules: { "@m-social/agents-react/no-manual-memoization": "off" },
});
```

For ESLint:

```js
export default defineConfig(agentsReact.configs["recommended/eslint"], {
	rules: { "@m-social/agents-react/no-manual-memoization": "off" },
});
```

## License

MIT © M-Social
