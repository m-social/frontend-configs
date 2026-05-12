import { defineConfig } from "tsdown/config";

export default defineConfig({
	entry: ["src/typescript.ts", "src/react.ts", "src/next.ts", "src/utils.ts"],
	format: ["esm"],
	dts: true,
	attw: {
		profile: "esm-only",
	},
	publint: true,
});
