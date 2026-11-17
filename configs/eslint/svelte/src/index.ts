import comments from "@eslint-community/eslint-plugin-eslint-comments";
import eslint from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import ts from "typescript-eslint";

export interface SvelteConfigSettings {
	/**
	 * The `tsconfigRootDir` option is used by the typescript-eslint plugin
	 *
	 * @see https://typescript-eslint.io/packages/parser#tsconfigrootdir
	 *
	 * @example
	 * import config from '@m-social/eslint-config-svelte';
	 *
	 * export default config({
	 * 	tsconfigRootDir: import.meta.dirname
	 * })
	 */
	tsconfigRootDir: string;

	/**
	 * The `svelteConfig` option is used by the Svelte plugin
	 *
	 * @see https://github.com/sveltejs/eslint-plugin-svelte#typescript-project
	 *
	 * @example
	 * import config from '@m-social/eslint-config-svelte';
	 * import svelteConfig from './svelte.config.js';
	 *
	 * export default config({
	 * 	svelteConfig
	 * })
	 */
	svelteConfig: unknown;
}

export default function svelteConfig({ tsconfigRootDir, svelteConfig }: SvelteConfigSettings) {
	return defineConfig(
		globalIgnores(["**/.svelte-kit/**", "**/build/**"], "m-social/svelte/ignore"),
		{
			name: "m-social/svelte/rules",
			files: ["**/*.svelte"],
			extends: [eslint.configs.recommended, ts.configs.recommendedTypeChecked],
			rules: {
				"no-undef": "off",
				curly: "warn",

				"@typescript-eslint/consistent-type-imports": [
					"error",
					{
						prefer: "type-imports",
						fixStyle: "inline-type-imports",
					},
				],
				"@typescript-eslint/ban-ts-comment": "warn",
				"@typescript-eslint/no-empty-object-type": [
					"error",
					{ allowInterfaces: "with-single-extends" },
				],
				"@typescript-eslint/no-explicit-any": "warn",
				"@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
				"@typescript-eslint/no-unused-vars": [
					"error",
					{
						argsIgnorePattern: "^_",
						ignoreRestSiblings: true,
					},
				],
				"@typescript-eslint/no-unused-expressions": "error",
			},
		},
		svelte.configs.recommended,
		{
			name: "m-social/svelte",
			languageOptions: {
				globals: {
					...globals.browser,
					...globals.node,
				},
				parserOptions: {
					projectService: true,
					tsconfigRootDir,
				},
			},
		},
		{
			// Keeps `eslint-disable` comments honest: each one names its rules, says why it is there
			// and is reported once it no longer suppresses anything
			name: "m-social/svelte/directive-comments",
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
		{
			name: "m-social/svelte/template-directive-comments",
			files: ["**/*.svelte"],
			rules: {
				"svelte/comment-directive": ["error", { reportUnusedDisableDirectives: true }],
			},
		},
		{
			name: "m-social/svelte/ts",
			files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
			languageOptions: {
				parserOptions: {
					parser: ts.parser,
					extraFileExtensions: [".svelte"],
					svelteConfig,
				},
			},
		},
	);
}
