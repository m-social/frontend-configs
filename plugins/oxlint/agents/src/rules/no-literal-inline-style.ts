import type { Node, Rule } from "@oxlint/plugins";

import { asNodeLike, asReportNode, childNodes, docsUrl, type NodeLike } from "../utils.ts";

const TYPE_WRAPPERS = new Set([
	"TSAsExpression",
	"TSNonNullExpression",
	"TSSatisfiesExpression",
	"TSTypeAssertion",
]);

/** `value as T`, `value satisfies T`, `value!` → `value`: type syntax does not change what is written. */
function withoutTypeSyntax(value: unknown): NodeLike | undefined {
	let node = asNodeLike(value);

	while (node !== undefined && TYPE_WRAPPERS.has(node.type)) {
		node = asNodeLike(node["expression"]);
	}

	return node;
}

/** A value known before the code runs: `8`, `"red"`, `-1` or a template without `${}`. */
function isStaticValue(value: unknown): boolean {
	const node = withoutTypeSyntax(value);

	if (node === undefined) {
		return false;
	}

	if (node.type === "Literal") {
		// `null` switches a property off, it is not a value to move to a stylesheet
		return node["raw"] !== "null";
	}

	if (node.type === "TemplateLiteral") {
		return childNodes(node, "expressions").length === 0;
	}

	if (node.type === "UnaryExpression") {
		return isStaticValue(node["argument"]);
	}

	return false;
}

/**
 * Object literals the `style` prop can evaluate to: the object itself or the branches of
 * `a ? {…} : {…}` and `a && {…}`.
 */
function styleObjects(value: unknown): NodeLike[] {
	const node = withoutTypeSyntax(value);

	if (node === undefined) {
		return [];
	}

	if (node.type === "ObjectExpression") {
		return [node];
	}

	if (node.type === "ConditionalExpression") {
		return [...styleObjects(node["consequent"]), ...styleObjects(node["alternate"])];
	}

	if (node.type === "LogicalExpression") {
		return [...styleObjects(node["left"]), ...styleObjects(node["right"])];
	}

	return [];
}

export const noLiteralInlineStyle: Rule = {
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
	createOnce(context) {
		return {
			"JSXAttribute[name.name='style'] > JSXExpressionContainer"(node: Node) {
				for (const object of styleObjects(asNodeLike(node)?.["expression"])) {
					for (const property of childNodes(object, "properties")) {
						const value = asNodeLike(property["value"]);

						if (property.type === "Property" && value !== undefined && isStaticValue(value)) {
							context.report({ node: asReportNode(value), messageId: "literalStyle" });
						}
					}
				}
			},
		};
	},
};
