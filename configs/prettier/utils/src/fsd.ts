import { escapeRegex } from "./escape.ts";
import { union } from "./union.ts";

type FsdLayer = "app" | "pages" | "widgets" | "features" | "entities" | "shared";

const createFsdImportSorter = /* @__NO_SIDE_EFFECTS__ */ (aliases: string[]) => {
	const aliasesString = union(aliases.map((alias) => escapeRegex(alias)));
	const prefix = `^${aliasesString}`;

	return /* @__NO_SIDE_EFFECTS__ */ (layer: FsdLayer) => `${prefix}${layer}/`;
};

export const fsdImportSorters = /* @__NO_SIDE_EFFECTS__ */ (aliases: string[]) => {
	const sorter = createFsdImportSorter(aliases);

	return [
		sorter("shared"),
		sorter("entities"),
		sorter("features"),
		sorter("widgets"),
		sorter("pages"),
		sorter("app"),
	];
};
