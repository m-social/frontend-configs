import react from "@eslint-react/eslint-plugin";
import * as parserBase from "@typescript-eslint/parser";
import type { TSESLint } from "@typescript-eslint/utils";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";
import globals from "globals";

// https://github.com/typescript-eslint/typescript-eslint/blob/48e13c0261e3cb1bf4f4dfaa462cdb3a56ef7383/packages/eslint-plugin/src/raw-plugin.ts#L34
const parser: TSESLint.FlatConfig.Parser = {
	meta: parserBase.meta,
	parseForESLint: parserBase.parseForESLint,
};

export interface ReactConfigSettings {
	/**
	 * The `tsconfigRootDir` option is used by the typescript-eslint plugin
	 *
	 * @see https://typescript-eslint.io/packages/parser#tsconfigrootdir
	 *
	 * @example
	 * import config from '@m-social/eslint-config-react';
	 *
	 * export default config({
	 * 	tsconfigRootDir: import.meta.dirname
	 * })
	 */
	tsconfigRootDir: string;

	/**
	 * Whether you are using React Compiler in your project or not
	 */
	reactCompiler: boolean;

	/**
	 * Uses `recommended-latest` config for `eslint-plugin-react-hooks` instead of `recommended`
	 *
	 * @default false
	 */
	reactHooksLatest?: boolean;
}

export default function reactConfig({
	tsconfigRootDir,
	reactHooksLatest = false,
}: ReactConfigSettings) {
	return defineConfig(
		{
			files: ["**/*.ts", "**/*.tsx", "**/*.cts", "**/*.mts", "**/*.jsx"],
		},
		react.configs["recommended-type-checked"] as never,
		{
			name: "m-social/react/disable-conflicting-eslint-react-rules",
			rules: {
				"@eslint-react/exhaustive-deps": "off",
				"@eslint-react/rules-of-hooks": "off",
				"@eslint-react/error-boundaries": "off",
				"@eslint-react/globals": "off",
				"@eslint-react/immutability": "off",
				"@eslint-react/purity": "off",
				"@eslint-react/refs": "off",
				"@eslint-react/set-state-in-effect": "off",
				"@eslint-react/set-state-in-render": "off",
				"@eslint-react/unsupported-syntax": "off",
				"@eslint-react/use-memo": "off",
			},
		},
		reactHooks.configs.flat[reactHooksLatest ? "recommended-latest" : "recommended"],
		{
			name: "m-social/react/handled-by-oxlint",
			rules: {
				// #region react-hooks
				// react/exhaustive-deps
				"react-hooks/exhaustive-deps": "off",

				// react/rules-of-hooks
				"react-hooks/rules-of-hooks": "off",
				// #endregion

				// #region @eslint-react
				// react/jsx-no-comment-textnodes
				"@eslint-react/jsx-no-comment-textnodes": "off",

				// react/no-array-index-key
				"@eslint-react/no-array-index-key": "off",

				// react/no-direct-mutation-state
				"@eslint-react/no-direct-mutation-state": "off",

				// react/no-did-mount-set-state
				"@eslint-react/no-set-state-in-component-did-mount": "off",

				// react/jsx-key
				"@eslint-react/no-missing-key": "off",

				// react/no-unsafe
				"@eslint-react/no-unsafe-component-will-mount": "warn",
				"@eslint-react/no-unsafe-component-will-receive-props": "warn",
				"@eslint-react/no-unsafe-component-will-update": "warn",

				// react/forward-ref-uses-ref
				"@eslint-react/no-forward-ref": "off",

				// react/no-danger
				"@eslint-react/dom-no-dangerously-set-innerhtml": "off",

				// react/no-danger-with-children
				"@eslint-react/dom-no-dangerously-set-innerhtml-with-children": "off",

				// react/no-find-dom-node
				"@eslint-react/dom-no-find-dom-node": "off",

				// react/no-render-return-value
				"@eslint-react/dom-no-render-return-value": "off",

				// react/no-script-url
				"@eslint-react/dom-no-script-url": "off",

				// react/void-dom-elements-no-children
				"@eslint-react/dom-no-void-elements-with-children": "off",
				// #endregion
			},
		},
		{
			name: "m-social/react",
			languageOptions: {
				globals: {
					...globals.es2022,
					...globals.browser,
				},
				ecmaVersion: "latest",
				sourceType: "module",
				parser,
				parserOptions: {
					projectService: true,
					tsconfigRootDir,
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			settings: {
				react: {
					version: "detect",
				},
			},
			rules: {
				"@eslint-react/jsx-no-useless-fragment": [
					"warn",
					{
						allowExpressions: false,
					},
				],
			},
		},
	);
}
