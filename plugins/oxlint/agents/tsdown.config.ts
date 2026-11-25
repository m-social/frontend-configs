import { defineConfig } from "tsdown/config";

export default defineConfig({
	entry: ["src/index.ts", "src/react.ts"],
	format: ["esm", "cjs"],
	dts: true,
	attw: {
		// The `/react` entry point exists only in `exports`, which node10 resolution does not read;
		// ESLint 10 itself needs a Node version that does
		profile: "node16",
	},
	publint: true,
});
