import { eslintCompatPlugin } from "@oxlint/plugins";
import type { ESLint, Linter, Rule } from "eslint";
import type { OxlintConfig } from "oxlint";

import { noRestrictedImportMetaEnv } from "./rules/no-restricted-import-meta-env.ts";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./utils.ts";

const NAMESPACE = "@m-social/agents";

// A type alias, not an interface: ESLint expects `configs` to be indexable by any string
type Configs = {
	/** For Vite projects that read their own variables through a typed env module. */
	vite: OxlintConfig;
	"vite/eslint": Linter.Config;
};

type Plugin = {
	meta: { name: string; version: string };
	rules: Record<string, Rule.RuleModule>;
	configs: Configs;
};

const meta = { name: PACKAGE_NAME, version: PACKAGE_VERSION };

/**
 * Rules that do not depend on a UI framework. The React ones are a separate entry point:
 * `@m-social/oxlint-plugin-agents/react`.
 *
 * @example
 * import agents from "@m-social/oxlint-plugin-agents";
 *
 * export default defineConfig({ extends: [agents.configs.vite] });
 */
const plugin = Object.assign(
	eslintCompatPlugin({
		meta,
		rules: {
			"no-restricted-import-meta-env": noRestrictedImportMetaEnv,
		},
	}),
	{ configs: {} as Configs },
) as unknown as Plugin;

plugin.configs.vite = {
	jsPlugins: [{ name: NAMESPACE, specifier: PACKAGE_NAME }],
	rules: {
		[`${NAMESPACE}/no-restricted-import-meta-env`]: "error",
	},
};

plugin.configs["vite/eslint"] = {
	name: "m-social/agents/vite/eslint",
	plugins: { [NAMESPACE]: plugin as unknown as ESLint.Plugin },
	rules: {
		[`${NAMESPACE}/no-restricted-import-meta-env`]: "error",
	},
};

export default plugin;
