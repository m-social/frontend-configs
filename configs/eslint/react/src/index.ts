import react from "@eslint-react/eslint-plugin";
import typescriptConfig, {
	type TypescriptConfigSettings,
} from "@m-social/eslint-config-typescript";
import stylistic from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";
// @ts-expect-error
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export interface ReactConfigSettings extends TypescriptConfigSettings {
	/**
	 * Whether you are using React Compiler in your project or not
	 *
	 * @default true
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
	reactCompiler = true,
	reactHooksLatest = false,
	...tsconfig
}: ReactConfigSettings) {
	const base = defineConfig(
		typescriptConfig(tsconfig),
		react.configs["recommended-type-checked"] as never,
		reactHooks.configs.flat[
			reactHooksLatest ? "recommended-latest" : "recommended"
		],
		jsxA11y.flatConfigs.recommended,
		{
			name: "m-social/react/stylistic-jsx",
			plugins: {
				"@stylistic": stylistic,
			},
			rules: {
				"@stylistic/jsx-self-closing-comp": "error",
			},
		},
		{
			name: "m-social/react",
			languageOptions: {
				globals: {
					...globals.es2022,
					...globals.browser,
				},
				parserOptions: {
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
				"@eslint-react/no-unknown-property": "off",
				"@eslint-react/no-useless-fragment": [
					"warn",
					{
						allowExpressions: false,
					},
				],

				"jsx-a11y/aria-props": "warn",
				"jsx-a11y/aria-unsupported-elements": "warn",
				"jsx-a11y/role-has-required-aria-props": "warn",
				"jsx-a11y/role-supports-aria-props": "warn",

				"@typescript-eslint/no-namespace": [
					"error",
					{
						allowDeclarations: true,
						allowDefinitionFiles: true,
					},
				],
			},
		}
	);

	if (!reactCompiler) {
		return base;
	}

	return defineConfig(base, {
		name: "m-social/react/compiler",
		rules: {
			"@eslint-react/no-unstable-context-value": "off",
		},
	});
}
