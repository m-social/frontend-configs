import { defineConfig } from "tsdown/config";

export default defineConfig({
	entry: "src/index.ts",
	format: ["esm", "cjs"],
	outputOptions: {
		exports: "named",
	},
	dts: true,
	attw: true,
	publint: true,
});
