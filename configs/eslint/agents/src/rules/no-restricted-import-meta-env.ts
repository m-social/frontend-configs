import type { Rule } from "eslint";

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

export const noRestrictedImportMetaEnv: Rule.RuleModule = {
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
	create(context) {
		const [options] = context.options as [Options | undefined];
		const allow = new Set(options?.allow ?? VITE_BUILT_INS);
		const allowed = [...allow].map((name) => `\`${name}\``).join(", ");

		return {
			MemberExpression(node) {
				if (!isImportMetaEnv(node)) {
					return;
				}

				const parent = node.parent;

				// `import.meta.env` passed around, destructured or indexed with a computed key.
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
