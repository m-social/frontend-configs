import { defineConfig } from "oxlint";

export default defineConfig({
	plugins: ["typescript"],
	categories: {
		correctness: "error",
	},
	env: {
		builtin: true,
		es2026: true,
	},
	rules: {
		// #region eslint
		"no-case-declarations": "error",
		"no-empty": "error",
		"no-fallthrough": "error",
		"no-prototype-builtins": "error",
		"no-redeclare": "error",
		"no-regex-spaces": "error",
		"no-unexpected-multiline": "error",
		"no-array-constructor": "error",
		// #endregion

		// #region eslint>nursery
		"getter-return": "error",
		"no-unreachable": "error",
		// #endregion

		// #region typescript-eslint
		"@typescript-eslint/no-empty-object-type": "error",
		"@typescript-eslint/no-misused-promises": "error",
		"@typescript-eslint/no-namespace": "error",
		"@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/no-unnecessary-type-assertion": "error",
		"@typescript-eslint/no-unnecessary-type-constraint": "error",
		"@typescript-eslint/no-unsafe-argument": "error",
		"@typescript-eslint/no-unsafe-assignment": "error",
		"@typescript-eslint/no-unsafe-call": "error",
		"@typescript-eslint/no-unsafe-enum-comparison": "error",
		"@typescript-eslint/no-unsafe-function-type": "error",
		"@typescript-eslint/no-unsafe-member-access": "error",
		"@typescript-eslint/no-unsafe-return": "error",
		"@typescript-eslint/only-throw-error": "error",
		"@typescript-eslint/prefer-promise-reject-errors": "error",
		"@typescript-eslint/require-await": "error",
		"@typescript-eslint/restrict-plus-operands": "error",
		// #endregion

		// #region overrides
		curly: "warn",
		"no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				ignoreRestSiblings: true,
			},
		],
		"@typescript-eslint/ban-ts-comment": "warn",
		"@typescript-eslint/consistent-type-imports": [
			"error",
			{
				prefer: "type-imports",
				fixStyle: "inline-type-imports",
			},
		],
		"@typescript-eslint/no-explicit-any": "warn",
		// #endregion
	},
	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
			rules: {
				// #region typescript-eslint
				"no-class-assign": "off",
				"no-const-assign": "off",
				"no-dupe-class-members": "off",
				"no-dupe-keys": "off",
				"no-func-assign": "off",
				"no-import-assign": "off",
				"no-new-native-nonconstructor": "off",
				"no-obj-calls": "off",
				"no-redeclare": "off",
				"no-setter-return": "off",
				"no-this-before-super": "off",
				"no-unsafe-negation": "off",
				"no-var": "error",
				"no-with": "off",
				"prefer-rest-params": "error",
				"prefer-spread": "error",
				// #endregion
			},
		},
	],
});
