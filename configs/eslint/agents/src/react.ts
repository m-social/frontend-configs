import type { ESLint, Linter } from "eslint";

import { noLiteralInlineStyle } from "./rules/no-literal-inline-style.ts";
import { noManualMemoization } from "./rules/no-manual-memoization.ts";
import { noTemplateLiteralClassName } from "./rules/no-template-literal-class-name.ts";
import { PACKAGE_NAME, PACKAGE_VERSION } from "./utils.ts";

const NAMESPACE = "@m-social/agents-react";

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
} satisfies ESLint.Plugin;

const plugins = { [NAMESPACE]: plugin };

/**
 * Rules for React projects.
 *
 * @example
 * import agentsReact from "@m-social/eslint-plugin-agents/react";
 *
 * export default [agentsReact.configs.recommended];
 */
const configs = {
	/**
	 * Conventions of M-Social React projects. They are built with React Compiler, so manual
	 * memoization is reported too; a project without the compiler switches that rule off.
	 */
	recommended: {
		name: "m-social/agents/react/recommended",
		plugins,
		rules: {
			[`${NAMESPACE}/no-literal-inline-style`]: "error",
			[`${NAMESPACE}/no-manual-memoization`]: "error",
			[`${NAMESPACE}/no-template-literal-class-name`]: "error",
		},
	},
} satisfies Record<string, Linter.Config>;

export default { ...plugin, configs };
