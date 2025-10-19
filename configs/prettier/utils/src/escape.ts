export const escapeRegex = /* @__NO_SIDE_EFFECTS__ */ (str: string) =>
	str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
