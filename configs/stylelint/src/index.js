// @ts-expect-error the package has no typings
import stylelintOrder from "stylelint-order";

/** @type {import('stylelint').Config} */
export default {
	extends: [import.meta.resolve("stylelint-config-recommended-scss")],
	plugins: [stylelintOrder],
	rules: {
		"declaration-empty-line-before": [
			"always",
			{
				except: ["first-nested"],
				ignore: ["after-declaration", "after-comment", "inside-single-line-block"],
				severity: "warning",
			},
		],
		"at-rule-empty-line-before": [
			"always",
			{
				ignore: ["first-nested", "blockless-after-same-name-blockless", "after-comment"],
				ignoreAtRules: ["else"],
				severity: "warning",
			},
		],
		"rule-empty-line-before": [
			"always",
			{
				ignore: ["after-comment", "first-nested"],
				severity: "warning",
			},
		],
		"order/order": [
			[
				{ type: "at-rule", name: "import" },
				{ type: "at-rule", name: "forward" },
				{ type: "at-rule", name: "use" },
				"dollar-variables",
				"at-variables",
				"custom-properties",
				{ type: "at-rule", name: "function" },
				{ type: "at-rule", name: "mixin" },
				{ type: "at-rule", name: "extend" },
				"declarations",
				{ type: "at-rule", name: "media", hasBlock: true },
				{ type: "at-rule", name: "include", hasBlock: true },
				{
					type: "rule",
					selector: /^&::[\w-]+/,
					hasBlock: true,
				},
				"rules",
			],
			{
				severity: "warning",
			},
		],
	},
	overrides: [
		{
			files: ["*.scss", "**/*.scss"],
			rules: {
				"at-rule-disallowed-list": [
					["import"],
					{
						message: "Use @use or @forward instead - https://sass-lang.com/d/import",
					},
				],
			},
		},
		{
			files: ["*.module.scss", "**/*.module.scss", "*.module.css", "**/*.module.css"],
			rules: {
				"selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
			},
		},
	],
};
