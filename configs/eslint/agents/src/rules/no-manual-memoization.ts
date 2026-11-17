import type { AST, Rule } from "eslint";

import { docsUrl } from "../utils.ts";

const MEMOIZATION_APIS = new Set(["useMemo", "useCallback", "memo"]);

/** `"use no memo"` at the top of a file switches React Compiler off for it. */
function optsOutOfCompiler(program: AST.Program): boolean {
	return program.body.some(
		(statement) =>
			statement.type === "ExpressionStatement" &&
			"directive" in statement &&
			statement.directive === "use no memo",
	);
}

export const noManualMemoization: Rule.RuleModule = {
	meta: {
		type: "suggestion",
		docs: {
			description: "Disallow manual memoization where React Compiler does it automatically",
			url: docsUrl("no-manual-memoization"),
		},
		schema: [],
		messages: {
			manualMemoization:
				"React Compiler memoizes values and components automatically. Remove the manual `{{name}}`.",
		},
	},
	create(context) {
		// Without the compiler nothing memoizes for the author, so doing it by hand is right there
		if (optsOutOfCompiler(context.sourceCode.ast)) {
			return {};
		}

		// Names bound to the whole React module: `import React from "react"`, `import * as R from "react"`.
		const reactNamespaces = new Set<string>();

		return {
			ImportDeclaration(node) {
				if (node.source.value !== "react") {
					return;
				}

				for (const specifier of node.specifiers) {
					if (specifier.type !== "ImportSpecifier") {
						reactNamespaces.add(specifier.local.name);
						continue;
					}

					const name =
						specifier.imported.type === "Identifier" ? specifier.imported.name : undefined;

					if (name !== undefined && MEMOIZATION_APIS.has(name)) {
						context.report({ node: specifier, messageId: "manualMemoization", data: { name } });
					}
				}
			},
			MemberExpression(node) {
				if (
					node.computed ||
					node.object.type !== "Identifier" ||
					node.property.type !== "Identifier" ||
					!reactNamespaces.has(node.object.name) ||
					!MEMOIZATION_APIS.has(node.property.name)
				) {
					return;
				}

				context.report({
					node,
					messageId: "manualMemoization",
					data: { name: `${node.object.name}.${node.property.name}` },
				});
			},
		};
	},
};
