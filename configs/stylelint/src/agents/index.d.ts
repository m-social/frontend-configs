import type { Config } from "stylelint";

/** Every option is optional: leave out the ones the project has no files for. */
export interface AgentsConfigOptions {
	/**
	 * Global styles and resets, where tag selectors, font properties, raw colors and
	 * `!important` are expected.
	 *
	 * @example ["src/app/styles/**"]
	 */
	globalStyles?: string[];
	/**
	 * Shared style modules that implement the mixins and variables the conventions point to:
	 * transitions, interaction states, breakpoints, fonts.
	 *
	 * @example ["src/shared/ui/styles/**"]
	 */
	sharedStyles?: string[];
	/**
	 * Files that map color custom properties to variables, where `var(--color-*)` is allowed.
	 *
	 * @example ["src/shared/ui/styles/_colors.scss"]
	 */
	colorTokens?: string[];
	/**
	 * Styles of the typography system, where font properties are defined.
	 *
	 * @example ["src/shared/ui/typography/**"]
	 */
	typography?: string[];
}

/**
 * M-Social style conventions as Stylelint rules. List the result in `extends` after
 * `"@m-social/stylelint-config"`: the globs are resolved against the config that extends it.
 */
export declare function agentsConfig(options?: AgentsConfigOptions): Config;
