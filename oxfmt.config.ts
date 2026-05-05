import { defineConfig } from "oxfmt";

import typescriptConfig from "./configs/oxfmt/src/base.ts";

export default defineConfig({
	...typescriptConfig,
	ignorePatterns: [".changeset/*.json", "**/pnpm-lock.yaml"],
});
