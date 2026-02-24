import { defineConfig } from "tsdown/config";

export default defineConfig({
	entry: ["src/typescript.ts", "src/react.ts", "src/next.ts", "src/eslint/react.ts"],
	format: ["esm"],
	dts: true,
	attw: {
		profile: "esmOnly",
	},
	publint: true,
});
