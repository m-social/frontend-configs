import { eslintCompatPlugin } from "@oxlint/plugins";
import type { ESLint, Linter, Rule } from "eslint";
import type { OxlintConfig } from "oxlint";

import { noLiteralInlineStyle } from "./rules/no-literal-inline-style.ts";
import { noManualMemoization } from "./rules/no-manual-memoization.ts";
import { noTemplateLiteralClassName } from "./rules/no-template-literal-class-name.ts";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./utils.ts";

const NAMESPACE = "@m-social/agents-react";

type Configs = {
	/**
	 * Conventions of M-Social React projects. They are built with React Compiler, so manual
	 * memoization is reported too; a project without the compiler switches that rule off.
	 */
	recommended: OxlintConfig;
	"recommended/eslint": Linter.Config;
};

type Plugin = {
	meta: { name: string; version: string };
	rules: Record<string, Rule.RuleModule>;
	configs: Configs;
};

const meta = { name: `${PACKAGE_NAME}/react`, version: PACKAGE_VERSION };

/**
 * Rules for React projects.
 *
 * @example
 * import agentsReact from "@m-social/oxlint-plugin-agents/react";
 *
 * export default defineConfig({ extends: [agentsReact.configs.recommended] });
 */
const plugin = Object.assign(
	eslintCompatPlugin({
		meta,
		rules: {
			"no-literal-inline-style": noLiteralInlineStyle,
			"no-manual-memoization": noManualMemoization,
			"no-template-literal-class-name": noTemplateLiteralClassName,
		},
	}),
	{ configs: {} as Configs },
) as unknown as Plugin;

plugin.configs.recommended = {
	jsPlugins: [{ name: NAMESPACE, specifier: `${PACKAGE_NAME}/react` }],
	rules: {
		[`${NAMESPACE}/no-literal-inline-style`]: "error",
		[`${NAMESPACE}/no-manual-memoization`]: "error",
		[`${NAMESPACE}/no-template-literal-class-name`]: "error",
	},
};

plugin.configs["recommended/eslint"] = {
	name: "m-social/agents/react/recommended/eslint",
	plugins: { [NAMESPACE]: plugin as unknown as ESLint.Plugin },
	rules: {
		[`${NAMESPACE}/no-literal-inline-style`]: "error",
		[`${NAMESPACE}/no-manual-memoization`]: "error",
		[`${NAMESPACE}/no-template-literal-class-name`]: "error",
	},
};

export default plugin;
