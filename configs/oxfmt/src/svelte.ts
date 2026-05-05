import { defineConfig } from "oxfmt";

import baseConfig from "./base.ts";
import { BUILTIN_EXTERNAL_GROUPS, FSD_GROUPS, INTERNAL_RELATIVE_GROUPS } from "./import-groups.ts";

export default defineConfig({
	...baseConfig,
	sortImports: {
		...baseConfig.sortImports,
		groups: [
			"svelte",
			...BUILTIN_EXTERNAL_GROUPS,
			{ newlinesBetween: true },
			"$*/**",
			"./$types",
			{ newlinesBetween: true },
			...FSD_GROUPS,
			{ newlinesBetween: true },
			...INTERNAL_RELATIVE_GROUPS,
		],
		customGroups: [
			{
				groupName: "svelte",
				elementNamePattern: ["svelte", "svelte/**"],
			},
			{
				groupName: "fsd-shared",
				elementNamePattern: ["$lib/shared/**"],
			},
			{
				groupName: "fsd-entities",
				elementNamePattern: ["$lib/entities/**"],
			},
			{
				groupName: "fsd-features",
				elementNamePattern: ["$lib/features/**"],
			},
			{
				groupName: "fsd-widgets",
				elementNamePattern: ["$lib/widgets/**"],
			},
			{
				groupName: "fsd-pages",
				elementNamePattern: ["$lib/pages/**"],
			},
			{
				groupName: "fsd-app",
				elementNamePattern: ["$lib/app/**"],
			},
		],
		internalPattern: ["$lib/**"],
	},
});
