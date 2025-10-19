import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export interface TypescriptConfigSettings {
	/**
	 * The `tsconfigRootDir` option is used by the typescript-eslint plugin
	 *
	 * @see https://typescript-eslint.io/packages/parser#tsconfigrootdir
	 *
	 * @example
	 * import config from '@m-social/eslint-config-typescript';
	 *
	 * export default config({
	 * 	tsconfigRootDir: import.meta.dirname
	 * })
	 */
	tsconfigRootDir: string;
}

export default function typescriptConfig({
	tsconfigRootDir,
}: TypescriptConfigSettings) {
	return defineConfig(
		eslint.configs.recommended,
		// @ts-expect-error
		tseslint.configs.recommendedTypeChecked,
		{
			name: "m-social/typescript",
			languageOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				parserOptions: {
					projectService: true,
					tsconfigRootDir,
				},
			},
			rules: {
				"no-undef": "off",

				"@typescript-eslint/consistent-type-imports": [
					"error",
					{
						prefer: "type-imports",
						fixStyle: "inline-type-imports",
					},
				],
				"@typescript-eslint/ban-ts-comment": "warn",
				"@typescript-eslint/no-explicit-any": "warn",
				"@typescript-eslint/no-unused-vars": [
					"error",
					{
						argsIgnorePattern: "^_",
						ignoreRestSiblings: true,
					},
				],
			},
		}
	);
}
