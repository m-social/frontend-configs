import type { Node, Rule } from "@oxlint/plugins";

import { asNodeLike, asReportNode, childNodes, docsUrl } from "../utils.ts";

export const noTemplateLiteralClassName: Rule = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Disallow building `className` with a template literal",
			url: docsUrl("no-template-literal-class-name"),
		},
		schema: [],
		messages: {
			templateLiteral:
				"Compose class names with a helper such as `cx()` instead of a template literal.",
		},
	},
	createOnce(context) {
		return {
			"JSXAttribute[name.name='className'] > JSXExpressionContainer > TemplateLiteral"(node: Node) {
				const template = asNodeLike(node);

				// A template without `${}` is a plain string: nothing is being composed.
				if (template === undefined || childNodes(template, "expressions").length === 0) {
					return;
				}

				context.report({ node: asReportNode(template), messageId: "templateLiteral" });
			},
		};
	},
};
