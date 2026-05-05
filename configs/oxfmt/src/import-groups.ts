import type { CustomGroupItemConfig, SortGroupItemConfig } from "oxfmt";

export const BUILTIN_EXTERNAL_GROUPS = [
	"builtin",
	{ newlinesBetween: true },
	"external",
] satisfies SortGroupItemConfig[];

export const FSD_GROUPS = [
	"fsd-shared",
	"fsd-entities",
	"fsd-features",
	"fsd-widgets",
	"fsd-pages",
	"fsd-app",
] satisfies SortGroupItemConfig[];

export const FSD_DEFINITION = [
	{
		groupName: "fsd-shared",
		elementNamePattern: ["#shared/**", "$shared/**", "@/shared/**"],
	},
	{
		groupName: "fsd-entities",
		elementNamePattern: ["#entities/**", "$entities/**", "@/entities/**"],
	},
	{
		groupName: "fsd-features",
		elementNamePattern: ["#features/**", "$features/**", "@/features/**"],
	},
	{
		groupName: "fsd-widgets",
		elementNamePattern: ["#widgets/**", "$widgets/**", "@/widgets/**"],
	},
	{
		groupName: "fsd-pages",
		elementNamePattern: ["#pages/**", "$pages/**", "@/pages/**"],
	},
	{
		groupName: "fsd-app",
		elementNamePattern: ["#app/**", "$app/**", "@/app/**"],
	},
] satisfies CustomGroupItemConfig[];

export const INTERNAL_RELATIVE_GROUPS = [
	"internal",
	{ newlinesBetween: true },
	["parent", "sibling", "index"],
] satisfies SortGroupItemConfig[];

export const STYLE_GROUPS = [
	"style",
	{ newlinesBetween: true },
	"component-styles",
] satisfies SortGroupItemConfig[];

export const STYLE_DEFINITION = [
	{
		groupName: "component-styles",
		elementNamePattern: ["./*.module.css", "./*.module.scss", "./*.css", "./*.css.ts"],
	},
] satisfies CustomGroupItemConfig[];
