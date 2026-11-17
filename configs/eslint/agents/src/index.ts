import type { ESLint, Linter } from "eslint";

import { noRestrictedImportMetaEnv } from "./rules/no-restricted-import-meta-env.ts";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./utils.ts";

const NAMESPACE = "@m-social/agents";

const plugin = {
	meta: {
		name: PACKAGE_NAME,
		version: PACKAGE_VERSION,
	},
	rules: {
		"no-restricted-import-meta-env": noRestrictedImportMetaEnv,
	},
} satisfies ESLint.Plugin;

const plugins = { [NAMESPACE]: plugin };

/**
 * Rules that do not depend on a UI framework. The React ones are a separate entry point:
 * `@m-social/eslint-plugin-agents/react`.
 *
 * @example
 * import agents from "@m-social/eslint-plugin-agents";
 *
 * export default [agents.configs.vite];
 */
const configs = {
	/** For Vite projects that read their own variables through a typed env module. */
	vite: {
		name: "m-social/agents/vite",
		plugins,
		rules: {
			[`${NAMESPACE}/no-restricted-import-meta-env`]: "error",
		},
	},
} satisfies Record<string, Linter.Config>;

export default { ...plugin, configs };
