import typescriptConfig, {
	type TypescriptConfigSettings,
} from "@m-social/eslint-config-typescript";
import { defineConfig, globalIgnores } from "eslint/config";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

export interface SvelteConfigSettings extends TypescriptConfigSettings {
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

export default function svelteConfig({
	svelteConfig,
	...tsconfig
}: SvelteConfigSettings) {
	return defineConfig(
		globalIgnores(["**/.svelte-kit/**", "**/build/**"], "m-social/svelte/ignore"),
		typescriptConfig(tsconfig),
		svelte.configs["flat/recommended"],
		{
			name: "m-social/svelte",
			languageOptions: {
				globals: {
					...globals.browser,
					...globals.node,
				},
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
		}
	);
}
