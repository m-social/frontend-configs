import { defineConfig } from "oxfmt";

import baseConfig from "./base.ts";
import { BUILTIN_EXTERNAL_GROUPS, FSD_GROUPS, RELATIVE_GROUP } from "./import-groups.ts";

export default defineConfig({
	...baseConfig,
	svelte: true,
	sortImports: {
		...baseConfig.sortImports,
		groups: [
			"svelte",
			"svelte-org",
			{ newlinesBetween: true },
			...BUILTIN_EXTERNAL_GROUPS,
			{ newlinesBetween: true },
			"sveltekit-aliases",
			"sveltekit-page-types",
			{ newlinesBetween: true },
			...FSD_GROUPS,
			{ newlinesBetween: true },
			"sveltekit-lib",
			{ newlinesBetween: true },
			RELATIVE_GROUP,
		],
		customGroups: [
			{
				groupName: "svelte",
				elementNamePattern: ["svelte", "svelte/**"],
			},
			{
				groupName: "svelte-org",
				elementNamePattern: ["@sveltejs/**"],
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
			// NOTE: `sveltekit-lib` group must appear before `sveltekit-aliases` to prevent the $lib alias from being included in the `sveltekit-aliases` group
			{
				groupName: "sveltekit-lib",
				elementNamePattern: ["$lib", "$lib/**"],
			},
			{
				groupName: "sveltekit-aliases",
				elementNamePattern: ["$*", "$*/**"],
			},
			{
				groupName: "sveltekit-page-types",
				elementNamePattern: ["./$types"],
			},
		],
		internalPattern: ["$lib/**"],
	},
});
