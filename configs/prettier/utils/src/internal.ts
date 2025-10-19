import { escapeRegex } from "./escape";
import type { Aliases } from "./types";
import { union } from "./union";

const trimTrailingSlash = /* @__NO_SIDE_EFFECTS__ */ (str: string) =>
	str.replace(/\/+$/, "");

const prepareRootInternalAlias = /* @__NO_SIDE_EFFECTS__ */ (alias: string) =>
	escapeRegex(trimTrailingSlash(alias));

export const internalImportSorter = /* @__NO_SIDE_EFFECTS__ */ (
	aliases: Aliases
) => {
	const aliasesString = union(
		aliases.map((alias) => prepareRootInternalAlias(alias))
	);

	return `^${aliasesString}/`;
};
