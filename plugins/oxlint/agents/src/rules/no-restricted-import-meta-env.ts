import type { ESTree, Node, Rule } from "@oxlint/plugins";

import { asNodeLike, docsUrl } from "../utils.ts";

/** Variables Vite itself defines; everything else is declared by the project. */
const VITE_BUILT_INS = ["BASE_URL", "DEV", "MODE", "PROD", "SSR"];

interface Options {
	allow?: string[];
}

function isImportMetaEnv(value: unknown): boolean {
	const node = asNodeLike(value);

	if (node === undefined || node.type !== "MemberExpression" || node["computed"] === true) {
		return false;
	}

	const object = asNodeLike(node["object"]);
	const property = asNodeLike(node["property"]);

	return (
		object?.type === "MetaProperty" &&
		asNodeLike(object["meta"])?.["name"] === "import" &&
		asNodeLike(object["property"])?.["name"] === "meta" &&
		property?.type === "Identifier" &&
		property["name"] === "env"
	);
}

interface NamedRead {
	name: string;
	node: Node;
}

/**
 * The names read by `const { DEV, MODE } = import.meta.env`. `undefined` when the pattern takes
 * more than a fixed list of names: a rest element or a computed key.
 */
function destructuredNames(parent: ESTree.Node, env: ESTree.Node): NamedRead[] | undefined {
	if (
		parent.type !== "VariableDeclarator" ||
		parent.init !== env ||
		parent.id.type !== "ObjectPattern"
	) {
		return undefined;
	}

	const names: NamedRead[] = [];

	for (const property of parent.id.properties) {
		if (property.type !== "Property" || property.computed || property.key.type !== "Identifier") {
			return undefined;
		}

		names.push({ name: property.key.name, node: property });
	}

	return names;
}

export const noRestrictedImportMetaEnv: Rule = {
	meta: {
		type: "problem",
		docs: {
			description:
				"Disallow reading project variables from `import.meta.env` instead of the typed env module",
			url: docsUrl("no-restricted-import-meta-env"),
		},
		schema: [
			{
				type: "object",
				properties: {
					allow: {
						type: "array",
						items: { type: "string" },
						uniqueItems: true,
					},
				},
				additionalProperties: false,
			},
		],
		defaultOptions: [{ allow: VITE_BUILT_INS }],
		messages: {
			restrictedVariable:
				"Read `{{name}}` through the project's typed env module. Only {{allowed}} may be read from `import.meta.env`.",
			wholeObject:
				"Do not use `import.meta.env` as a whole. Read {{allowed}} by name and everything else through the project's typed env module.",
		},
	},
	createOnce(context) {
		let allow = new Set<string>();
		let allowed = "";

		return {
			before() {
				const options = context.options[0] as Options | undefined;
				allow = new Set(options?.allow ?? VITE_BUILT_INS);
				allowed = [...allow].map((name) => `\`${name}\``).join(", ");
			},
			MemberExpression(node) {
				if (!isImportMetaEnv(node)) {
					return;
				}

				const parent = node.parent;
				const destructured = destructuredNames(parent, node);

				if (destructured !== undefined) {
					for (const read of destructured) {
						if (!allow.has(read.name)) {
							context.report({
								node: read.node,
								messageId: "restrictedVariable",
								data: { name: read.name, allowed },
							});
						}
					}

					return;
				}

				// `import.meta.env` passed around, spread or indexed with a computed key.
				if (parent.type !== "MemberExpression" || parent.object !== node || parent.computed) {
					context.report({ node, messageId: "wholeObject", data: { allowed } });

					return;
				}

				const name = parent.property.type === "Identifier" ? parent.property.name : undefined;

				if (name !== undefined && !allow.has(name)) {
					context.report({
						node: parent,
						messageId: "restrictedVariable",
						data: { name, allowed },
					});
				}
			},
		};
	},
};
