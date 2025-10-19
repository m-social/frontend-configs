import reactConfig, {
	type ReactConfigSettings,
} from "@m-social/eslint-config-react";
// @ts-expect-error
import next from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";

export type NextConfigSettings = ReactConfigSettings;

export default function nextConfig(settings: NextConfigSettings) {
	return defineConfig(
		globalIgnores(
			["**/.next/", "**/out/", "**/build/", "**/next-env.d.ts"],
			"m-social/next/ignore"
		),
		reactConfig(settings),
		{
			name: "m-social/next/next",
			plugins: {
				"@next/next": next,
			},
			rules: {
				...next.configs.recommended.rules,
				...next.configs["core-web-vitals"].rules,
			},
		},
		{
			name: "m-social/next",
			languageOptions: {
				// https://github.com/vercel/next.js/blob/09f115d1879c3bce76c513ee568d7d6aa9046d37/packages/eslint-config-next/index.js#L125
				globals: globals.node,
			},
			rules: {
				"@eslint-react/dom/no-unsafe-target-blank": "off",
				"jsx-a11y/alt-text": [
					"warn",
					{
						elements: ["img"],
						img: ["Image"],
					},
				],
			},
		}
	);
}
