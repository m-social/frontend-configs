import { defineConfig } from "tsdown/config";

export default defineConfig({
	entry: ["src/typescript.ts", "src/react.ts", "src/svelte.ts"],
	format: ["esm"],
	dts: true,
	attw: {
		profile: "esm-only",
	},
	publint: true,
});
