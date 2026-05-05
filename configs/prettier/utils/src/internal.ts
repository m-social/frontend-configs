import { escapeRegex } from "./escape.ts";
import { union } from "./union.ts";

const trimTrailingSlash = /* @__NO_SIDE_EFFECTS__ */ (str: string) => str.replace(/\/+$/, "");

const prepareRootInternalAlias = /* @__NO_SIDE_EFFECTS__ */ (alias: string) =>
	escapeRegex(trimTrailingSlash(alias));

export const internalImportSorter = /* @__NO_SIDE_EFFECTS__ */ (aliases: string[]) => {
	const aliasesString = union(aliases.map((alias) => prepareRootInternalAlias(alias)));

	return `^${aliasesString}/`;
};
