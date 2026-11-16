import type { Config } from "stylelint";

export interface AgentsConfigOptions {
	/**
	 * Global styles and resets, where tag selectors, font properties, raw colors and
	 * `!important` are expected.
	 *
	 * @example ["src/app/styles/**"]
	 */
	globalStyles: string[];
	/**
	 * Shared style modules that implement the mixins and variables the conventions point to:
	 * transitions, interaction states, breakpoints, fonts.
	 *
	 * @example ["src/shared/ui/styles/**"]
	 */
	sharedStyles: string[];
	/**
	 * Files that map color custom properties to variables, where `var(--color-*)` is allowed.
	 *
	 * @example ["src/shared/ui/styles/_colors.scss"]
	 */
	colorTokens: string[];
	/**
	 * Styles of the typography system, where font properties are defined.
	 *
	 * @example ["src/shared/ui/typography/**"]
	 */
	typography: string[];
}

/**
 * M-Social style conventions as Stylelint rules. Spread the result into the config next to
 * `extends: ["@m-social/stylelint-config"]`.
 */
export declare function agentsConfig(options: AgentsConfigOptions): Config;
