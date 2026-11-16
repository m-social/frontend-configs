import {
	docsUrl,
	FLAT_MODIFIER,
	FONT_PROPERTY,
	IMPORTANT,
	RAW_COLOR,
	STATE_SELECTOR,
	TAG_SELECTOR,
	TRANSITION_PROPERTY,
	Z_INDEX,
} from "./messages.js";
import plugins, { NO_USE_ALIAS, NO_WIDTH_MEDIA_QUERY } from "./plugins.js";

const FONT_PROPERTIES = [
	"font",
	"font-family",
	"font-size",
	"font-weight",
	"line-height",
	"letter-spacing",
];
const TRANSITION_PROPERTIES = [
	"transition",
	"transition-property",
	"transition-duration",
	"transition-timing-function",
	"transition-delay",
];
const STATE_PSEUDO_CLASSES = ["hover", "active", "disabled", "focus", "focus-visible"];

/**
 * @param {string} property
 */
function propertyMessage(property) {
	return TRANSITION_PROPERTIES.includes(property) ? TRANSITION_PROPERTY : FONT_PROPERTY;
}

/**
 * @param {string} property
 */
function valueMessage(property) {
	return property === "z-index" ? Z_INDEX : RAW_COLOR;
}

/**
 * M-Social style conventions as Stylelint rules.
 *
 * The conventions tell component styles to take colors, font styles, transitions, states and
 * breakpoints from shared modules. The files that _define_ those things have to be exempt, and
 * where they live differs between projects, so their locations are passed in.
 *
 * @param {import('./index.d.ts').AgentsConfigOptions} options
 * @returns {import('stylelint').Config}
 */
export function agentsConfig({ globalStyles, sharedStyles, colorTokens, typography }) {
	return {
		plugins,
		// A `stylelint-disable` comment has to say why, and is reported once it is no longer needed.
		reportDescriptionlessDisables: true,
		reportNeedlessDisables: true,
		rules: {
			"color-no-hex": [true, { message: RAW_COLOR, url: docsUrl("colors") }],
			"color-named": ["never", { message: RAW_COLOR, url: docsUrl("colors") }],
			"function-disallowed-list": [
				["rgb", "rgba", "hsl", "hsla"],
				{ message: RAW_COLOR, url: docsUrl("colors") },
			],
			"declaration-property-value-disallowed-list": [
				{ "/.*/": ["/var\\(--color-/"], "z-index": ["/^-?\\d+$/"] },
				{ message: valueMessage },
			],
			"property-disallowed-list": [
				[...FONT_PROPERTIES, ...TRANSITION_PROPERTIES],
				{ message: propertyMessage },
			],
			"selector-max-type": [0, { message: TAG_SELECTOR, url: docsUrl("selectors") }],
			"selector-pseudo-class-disallowed-list": [
				STATE_PSEUDO_CLASSES,
				{ message: STATE_SELECTOR, url: docsUrl("states") },
			],
			"selector-class-pattern": [
				// Only the documented rule: no `_` in a class written out in full. `&_name` is not checked.
				"^[^_]+$",
				{ message: FLAT_MODIFIER, resolveNestedSelectors: false, url: docsUrl("modifiers") },
			],
			"declaration-no-important": [true, { message: IMPORTANT, url: docsUrl("important") }],
			[NO_USE_ALIAS]: true,
			[NO_WIDTH_MEDIA_QUERY]: true,
		},
		overrides: [
			{
				// Global styles and resets: tags, fonts and raw colors are their job.
				files: globalStyles,
				rules: {
					"color-no-hex": null,
					"color-named": null,
					"function-disallowed-list": null,
					"declaration-property-value-disallowed-list": null,
					"property-disallowed-list": null,
					"selector-max-type": null,
					"declaration-no-important": null,
					"selector-pseudo-class-disallowed-list": null,
				},
			},
			{
				// The shared modules implement what the rules tell everyone else to use.
				files: sharedStyles,
				rules: {
					"property-disallowed-list": null,
					"selector-pseudo-class-disallowed-list": null,
					[NO_WIDTH_MEDIA_QUERY]: null,
				},
			},
			{
				// Variables that wrap the color custom properties.
				files: colorTokens,
				rules: {
					"declaration-property-value-disallowed-list": null,
				},
			},
			{
				// The typography system is where font styles are defined.
				files: typography,
				rules: {
					"property-disallowed-list": [TRANSITION_PROPERTIES, { message: TRANSITION_PROPERTY }],
				},
			},
		],
	};
}
