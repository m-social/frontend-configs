import { defineConfig } from "oxlint";

import reactConfig from "./react";

export default defineConfig({
	...reactConfig,
	plugins: [...reactConfig.plugins, "nextjs"],
	env: {
		...reactConfig.env,
		node: true,
	},
	rules: {
		...reactConfig.rules,

		// #region nextjs
		"nextjs/google-font-display": "warn",
		"nextjs/google-font-preconnect": "warn",
		"nextjs/next-script-for-ga": "warn",
		"nextjs/no-async-client-component": "warn",
		"nextjs/no-before-interactive-script-outside-document": "warn",
		"nextjs/no-css-tags": "warn",
		"nextjs/no-head-element": "warn",
		"nextjs/no-img-element": "warn",
		"nextjs/no-page-custom-font": "warn",
		"nextjs/no-styled-jsx-in-document": "warn",
		"nextjs/no-title-in-document-head": "warn",
		"nextjs/no-typos": "warn",
		"nextjs/no-unwanted-polyfillio": "warn",

		"jsx-a11y/alt-text": [
			"warn",
			{
				elements: ["img"],
				img: ["Image"],
			},
		],
		// #endregion
	},
	ignorePatterns: ["**/.next/", "**/out/", "**/build/", "**/next-env.d.ts"],
});
