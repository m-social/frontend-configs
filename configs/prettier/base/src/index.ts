/// <reference types="@ianvs/prettier-plugin-sort-imports" />

import { createRequire } from "node:module";

import { fsdImportSorters, internalImportSorter } from "@m-social/prettier-config-utils";
import type { Config } from "prettier";

const SUPPORTED_ALIASES = ["$", "@/", "#"];

const require = createRequire(import.meta.url);

const baseConfig = {
	printWidth: 100,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: false,
	quoteProps: "as-needed",
	jsxSingleQuote: false,
	trailingComma: "es5",
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: "always",
	endOfLine: "lf",
	singleAttributePerLine: false,
	plugins: [
		require.resolve("@prettier/plugin-oxc"),
		require.resolve("@ianvs/prettier-plugin-sort-imports"),
	],
	importOrder: [
		"<BUILTIN_MODULES>",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		// #region internal imports
		...fsdImportSorters(SUPPORTED_ALIASES),
		"",
		internalImportSorter(SUPPORTED_ALIASES),
		// #endregion
		"",
		`^[.]`, // relative imports
		"",
	],
	importOrderTypeScriptVersion: "5.0.0",
} satisfies Config;

export default baseConfig;
