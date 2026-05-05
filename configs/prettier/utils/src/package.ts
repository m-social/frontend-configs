import { escapeRegex } from "./escape.ts";
import type { Packages } from "./types.ts";
import { union } from "./union.ts";

export const packageSorter = /* @__NO_SIDE_EFFECTS__ */ (packages: Packages) => {
	const packagesArray = Array.isArray(packages) ? packages : [packages];

	return `^${union(packagesArray.map((pkg) => escapeRegex(pkg)))}($|/)`;
};
