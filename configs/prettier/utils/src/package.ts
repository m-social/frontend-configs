import { escapeRegex } from "./escape.ts";
import { union } from "./union.ts";

export const packageSorter = /* @__NO_SIDE_EFFECTS__ */ (packages: string[] | string) => {
	const packagesArray = Array.isArray(packages) ? packages : [packages];

	return `^${union(packagesArray.map((pkg) => escapeRegex(pkg)))}($|/)`;
};
