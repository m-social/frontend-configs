import baseConfig from "@m-social/prettier-config";
import {
	fsdImportSorters,
	internalImportSorter,
	packageSorter,
} from "@m-social/prettier-config-utils";
import type { Config } from "prettier";

const SUPPORTED_ALIASES = ["$", "@/", "#"];

const linkedStyle = "/[^/]+[.]s?css([?].*)?$";

const reactConfig = {
	...baseConfig,
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
} satisfies Config;

export default reactConfig;
