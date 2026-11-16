// Messages of the convention rules. Each one says what to do instead, so the fix does not need
// a trip to the docs; the `url` of the rule points at the full explanation.

const DOCS_URL =
	"https://github.com/m-social/frontend-configs/blob/main/configs/stylelint/docs/agents.md";

/**
 * @param {string} anchor
 */
export function docsUrl(anchor) {
	return `${DOCS_URL}#${anchor}`;
}

export const RAW_COLOR =
	"Raw color value. Use a variable from the shared colors module, for example `colors.$text`.";

export const FONT_PROPERTY =
	"Font properties do not belong in component styles. Use the project's typography helper.";

export const TRANSITION_PROPERTY =
	"Set transitions with `@include transition.create(...)`, not with the `transition` property.";

export const Z_INDEX =
	"Set `z-index` with a variable from the shared stacking module, not with a number.";

export const TAG_SELECTOR = "Do not style an element by its tag: give it a class of its own.";

export const IMPORTANT = "Use `@include override.override` instead of `!important`.";

export const STATE_SELECTOR =
	"Style states with `@include interaction.hover` / `active` / `disabled` / `keyboard-focus`, not with a hand-written selector.";

export const FLAT_MODIFIER =
	"Write a modifier inside its block as `&_name`, not as a separate class with an underscore.";

export const USE_ALIAS =
	"Do not rename a `@use` import with `as`: keep the module's default namespace.";

export const WIDTH_MEDIA_QUERY =
	"Set breakpoints with `@include breakpoints.tablet` / `breakpoints.desktop`, not with a width media query.";
