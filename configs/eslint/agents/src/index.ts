import comments from "@eslint-community/eslint-plugin-eslint-comments";
import type { ESLint, Linter } from "eslint";

import { noLiteralInlineStyle } from "./rules/no-literal-inline-style.ts";
import { noManualMemoization } from "./rules/no-manual-memoization.ts";
import { noRestrictedImportMetaEnv } from "./rules/no-restricted-import-meta-env.ts";
import { noTemplateLiteralClassName } from "./rules/no-template-literal-class-name.ts";

const NAMESPACE = "@m-social/agents";

const rules = {
	"no-literal-inline-style": noLiteralInlineStyle,
	"no-manual-memoization": noManualMemoization,
	"no-restricted-import-meta-env": noRestrictedImportMetaEnv,
	"no-template-literal-class-name": noTemplateLiteralClassName,
} satisfies ESLint.Plugin["rules"];

const plugin = {
	meta: {
		name: "@m-social/eslint-plugin-agents",
	},
	rules,
} satisfies ESLint.Plugin;

const plugins = { [NAMESPACE]: plugin };

/**
 * Ready-made flat configs. Each one is a single config object, so it can be listed as is:
 *
 * @example
 * import agents from "@m-social/eslint-plugin-agents";
 *
 * export default [
 * 	agents.configs.recommended,
 * 	agents.configs.reactCompiler,
 * 	agents.configs.vite,
 * 	agents.configs.directiveComments,
 * ];
 */
const configs = {
	/** Conventions that hold for every React project. */
	recommended: {
		name: "m-social/agents/recommended",
		plugins,
		rules: {
			[`${NAMESPACE}/no-literal-inline-style`]: "error",
			[`${NAMESPACE}/no-template-literal-class-name`]: "error",
		},
	},
	/** For projects built with React Compiler, where manual memoization is redundant. */
	reactCompiler: {
		name: "m-social/agents/react-compiler",
		plugins,
		rules: {
			[`${NAMESPACE}/no-manual-memoization`]: "error",
		},
	},
	/** For Vite projects that read their own variables through a typed env module. */
	vite: {
		name: "m-social/agents/vite",
		plugins,
		rules: {
			[`${NAMESPACE}/no-restricted-import-meta-env`]: "error",
		},
	},
	/**
	 * Keeps `eslint-disable` comments honest: each one names its rules, says why it is there
	 * and is reported once it no longer suppresses anything.
	 */
	directiveComments: {
		name: "m-social/agents/directive-comments",
		plugins: {
			"@eslint-community/eslint-comments": comments,
		},
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
		rules: {
			"@eslint-community/eslint-comments/no-unlimited-disable": "error",
			"@eslint-community/eslint-comments/require-description": [
				"error",
				{ ignore: ["eslint-enable"] },
			],
		},
	},
} satisfies Record<string, Linter.Config>;

export default { ...plugin, configs };
