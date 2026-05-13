import { defineConfig } from "oxfmt";

import baseConfig from "./base.ts";
import {
	BUILTIN_EXTERNAL_GROUPS,
	FSD_DEFINITION,
	FSD_GROUPS,
	INTERNAL_RELATIVE_GROUPS,
	STYLE_DEFINITION,
	STYLE_GROUPS,
} from "./import-groups.ts";

export default defineConfig({
	...baseConfig,
	sortImports: {
		...baseConfig.sortImports,
		groups: [
			"react",
			"react-meta",
			{ newlinesBetween: true },
			...BUILTIN_EXTERNAL_GROUPS,
			{ newlinesBetween: true },
			...FSD_GROUPS,
			{ newlinesBetween: true },
			...INTERNAL_RELATIVE_GROUPS,
			{ newlinesBetween: true },
			...STYLE_GROUPS,
		],
		customGroups: [
			...FSD_DEFINITION,
			...STYLE_DEFINITION,
			{
				groupName: "react",
				elementNamePattern: ["react"],
			},
			{
				groupName: "react-meta",
				elementNamePattern: ["react-native", "next", "next/**"],
			},
		],
	},
});
