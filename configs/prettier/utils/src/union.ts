export const union = /* @__NO_SIDE_EFFECTS__ */ (values: string[]) => {
	if (values.length === 0) {
		return "";
	}

	if (values.length === 1) {
		return values[0];
	}

	return `(${values.join("|")})`;
};
