import { defineConfig } from "oxlint";

import typescriptConfig from "./configs/oxlint/src/typescript.ts";

export default defineConfig({
	...typescriptConfig,
	options: {
		typeAware: true,
	},
});
