import { defineConfig } from "oxlint";

import typescriptConfig from "./typescript";

export default defineConfig({
	...typescriptConfig,
	plugins: [...typescriptConfig.plugins, "react", "jsx-a11y"],
	env: {
		...typescriptConfig.env,
		browser: true,
	},
	rules: {
		...typescriptConfig.rules,

		// #region react-hooks
		"react/exhaustive-deps": "warn",
		"react/rules-of-hooks": "error",
		// #endregion

		// #region @eslint-react
		"react/jsx-no-comment-textnodes": "warn",
		"react/jsx-no-script-url": "warn",
		"react/no-array-index-key": "warn",
		"react/no-danger": "warn",
		"react/no-redundant-should-component-update": "error",
		"react/no-unsafe": "warn",
		// #endregion

		// #region jsx-a11y
		"jsx-a11y/no-noninteractive-tabindex": [
			"error",
			{
				tags: [],
				roles: ["tabpanel"],
				allowExpressionValues: true,
			},
		],
		// #endregion

		// #region overrides
		"@typescript-eslint/no-namespace": [
			"error",
			{
				allowDeclarations: true,
				allowDefinitionFiles: true,
			},
		],
		"react/self-closing-comp": "error",
		"jsx-a11y/aria-props": "warn",
		"jsx-a11y/aria-unsupported-elements": "warn",
		"jsx-a11y/role-has-required-aria-props": "warn",
		"jsx-a11y/role-supports-aria-props": "warn",
		// #endregion
	},
});
