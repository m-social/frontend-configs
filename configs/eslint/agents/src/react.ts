import type { ESLint, Linter } from "eslint";

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
	recommended: Linter.Config;
};

/**
 * Rules for React projects.
 *
 * @example
 * import agentsReact from "@m-social/eslint-plugin-agents/react";
 *
 * export default [agentsReact.configs.recommended];
 */
const plugin = {
	meta: {
		name: `${PACKAGE_NAME}/react`,
		version: PACKAGE_VERSION,
	},
	rules: {
		"no-literal-inline-style": noLiteralInlineStyle,
		"no-manual-memoization": noManualMemoization,
		"no-template-literal-class-name": noTemplateLiteralClassName,
	},
	configs: {} as Configs,
} satisfies ESLint.Plugin;

plugin.configs.recommended = {
	name: "m-social/agents/react/recommended",
	plugins: { [NAMESPACE]: plugin },
	rules: {
		[`${NAMESPACE}/no-literal-inline-style`]: "error",
		[`${NAMESPACE}/no-manual-memoization`]: "error",
		[`${NAMESPACE}/no-template-literal-class-name`]: "error",
	},
};

export default plugin;
