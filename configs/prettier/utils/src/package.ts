import { escapeRegex } from "./escape";
import type { Packages } from "./types";
import { union } from "./union";

export const packageSorter = /* @__NO_SIDE_EFFECTS__ */ (packages: Packages) => {
	const packagesArray = Array.isArray(packages) ? packages : [packages];

	// oxlint-disable-next-line typescript/no-unsafe-argument
	return `^${union(packagesArray.map((pkg) => escapeRegex(pkg)))}($|/)`;
};
