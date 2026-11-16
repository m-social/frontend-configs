import type { Rule } from "eslint";

import { asNodeLike, asReportNode, childNodes, docsUrl } from "../utils.ts";

/** A value known before the code runs: `8`, `"red"`, `-1` or a template without `${}`. */
function isStaticValue(value: unknown): boolean {
	const node = asNodeLike(value);

	if (node === undefined) {
		return false;
	}

	if (node.type === "Literal") {
		return true;
	}

	if (node.type === "TemplateLiteral") {
		return childNodes(node, "expressions").length === 0;
	}

	if (node.type === "UnaryExpression") {
		return isStaticValue(node["argument"]);
	}

	return false;
}

export const noLiteralInlineStyle: Rule.RuleModule = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Disallow hardcoded values in the JSX `style` prop",
			url: docsUrl("no-literal-inline-style"),
		},
		schema: [],
		messages: {
			literalStyle:
				"Move this hardcoded value to a stylesheet. The `style` prop is only for values computed at runtime.",
		},
	},
	create(context) {
		return {
			"JSXAttribute[name.name='style'] > JSXExpressionContainer > ObjectExpression"(
				node: Rule.Node,
			) {
				const object = asNodeLike(node);

				if (object === undefined) {
					return;
				}

				for (const property of childNodes(object, "properties")) {
					const value = asNodeLike(property["value"]);

					if (property.type === "Property" && value !== undefined && isStaticValue(value)) {
						context.report({ node: asReportNode(value), messageId: "literalStyle" });
					}
				}
			},
		};
	},
};
