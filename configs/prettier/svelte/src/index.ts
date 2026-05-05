import { createRequire } from "node:module";

import baseConfig from "@m-social/prettier-config";
import {
	fsdImportSorters,
	internalImportSorter,
	packageSorter,
} from "@m-social/prettier-config-utils";
import type { Config } from "prettier";

const SUPPORTED_ALIASES = ["$lib/", "@/", "#"];

const require = createRequire(import.meta.url);

const svelteConfig = {
	...baseConfig,
	plugins: [...baseConfig.plugins, require.resolve("prettier-plugin-svelte")],
	importOrder: [
		packageSorter("svelte"),
		"",
		"<BUILTIN_MODULES>",
		"",
		"<THIRD_PARTY_MODULES>",
		"",
		"^[$](?!=lib/)", // SvelteKit imports like `$app/navigation` (excluding `$lib/...`)
		"^[.]/[$]types$", // SvelteKit generated types
		"",
		// #region internal imports
		...fsdImportSorters(SUPPORTED_ALIASES),
		"",
		internalImportSorter(SUPPORTED_ALIASES),
		// #endregion
		"",
		"^[.]", // relative imports
		"",
	],
	overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
} satisfies Config;

export default svelteConfig;
