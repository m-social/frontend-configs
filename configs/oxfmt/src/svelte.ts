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
			["internal", "subpath", "sveltekit-lib"],
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
				elementNamePattern: ["#shared/**", "$lib/shared/**"],
			},
			{
				groupName: "fsd-entities",
				elementNamePattern: ["#entities/**", "$lib/entities/**"],
			},
			{
				groupName: "fsd-features",
				elementNamePattern: ["#features/**", "$lib/features/**"],
			},
			{
				groupName: "fsd-widgets",
				elementNamePattern: ["#widgets/**", "$lib/widgets/**"],
			},
			{
				groupName: "fsd-pages",
				elementNamePattern: ["#pages/**", "$lib/pages/**"],
			},
			{
				groupName: "fsd-app",
				elementNamePattern: ["#app/**", "$lib/app/**"],
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
		internalPattern: ["#", "$lib/"],
	},
});
