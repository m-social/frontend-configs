import type { ESLint, Linter } from "eslint";

import { noRestrictedImportMetaEnv } from "./rules/no-restricted-import-meta-env.ts";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./utils.ts";

const NAMESPACE = "@m-social/agents";

// A type alias, not an interface: ESLint expects `configs` to be indexable by any string
type Configs = {
	/** For Vite projects that read their own variables through a typed env module. */
	vite: Linter.Config;
};

/**
 * Rules that do not depend on a UI framework. The React ones are a separate entry point:
 * `@m-social/eslint-plugin-agents/react`.
 *
 * @example
 * import agents from "@m-social/eslint-plugin-agents";
 *
 * export default [agents.configs.vite];
 */
const plugin = {
	meta: {
		name: PACKAGE_NAME,
		version: PACKAGE_VERSION,
	},
	rules: {
		"no-restricted-import-meta-env": noRestrictedImportMetaEnv,
	},
	configs: {} as Configs,
} satisfies ESLint.Plugin;

plugin.configs.vite = {
	name: "m-social/agents/vite",
	plugins: { [NAMESPACE]: plugin },
	rules: {
		[`${NAMESPACE}/no-restricted-import-meta-env`]: "error",
	},
};

export default plugin;
