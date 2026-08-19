import { defineConfig } from "oxfmt";

import typescriptConfig from "./configs/oxfmt/src/base.ts";

export default defineConfig({
	...typescriptConfig,
	ignorePatterns: ["**/pnpm-lock.yaml"],
});
