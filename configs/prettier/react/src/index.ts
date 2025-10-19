/// <reference types="@ianvs/prettier-plugin-sort-imports" />

import { createRequire } from "node:module";

import baseConfig from "@m-social/prettier-config";
import {
	fsdImportSorters,
	internalImportSorter,
	packageSorter,
} from "@m-social/prettier-config-utils";
import type { Config } from "prettier";

const SUPPORTED_ALIASES = ["$", "@/", "#"] as const;

const linkedStyle = "/[^/]+[.]s?css([?].*)?$";

const require = createRequire(import.meta.url);

const reactConfig = {
	...baseConfig,
	plugins: [
		...baseConfig.plugins,
		require.resolve("@ianvs/prettier-plugin-sort-imports"),
	],
	importOrder: [
		// #region react & frameworks
		packageSorter("react"),
		packageSorter(["react-native", "next"]),
		// #endregion
		"",
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
		`^[.](?!${linkedStyle})`, // relative imports (excluding linked style)
		"",
		`^[.]${linkedStyle}`, // linked style
		"",
	],
	importOrderTypeScriptVersion: "5.0.0",
} satisfies Config;

export default reactConfig;
