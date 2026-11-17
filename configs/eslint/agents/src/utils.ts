import type { Rule } from "eslint";

import packageJson from "../package.json" with { type: "json" };

export const PACKAGE_NAME = packageJson.name;
export const PACKAGE_VERSION = packageJson.version;

// The tag of the installed version, so the link shows the docs of the rule as it was published
// rather than whatever `main` has moved on to.
const DOCS_BASE_URL = `https://github.com/m-social/frontend-configs/blob/${PACKAGE_NAME}@${PACKAGE_VERSION}/configs/eslint/agents/docs/rules`;

/** Link shown by editors next to a reported problem. */
export function docsUrl(ruleName: string): string {
	return `${DOCS_BASE_URL}/${ruleName}.md`;
}

/**
 * ESLint's own node types do not describe JSX, so the rules narrow what they receive to these
 * minimal shapes.
 */
export interface NodeLike {
	type: string;
	[key: string]: unknown;
}

export function asNodeLike(value: unknown): NodeLike | undefined {
	if (typeof value !== "object" || value === null) {
		return undefined;
	}

	return typeof (value as NodeLike).type === "string" ? (value as NodeLike) : undefined;
}

export function childNodes(node: NodeLike, key: string): NodeLike[] {
	const value = node[key];

	if (!Array.isArray(value)) {
		return [];
	}

	return value.map((item) => asNodeLike(item)).filter((item) => item !== undefined);
}

/** A node the rule did not get from an ESLint-typed listener, reported at its own location. */
export function asReportNode(node: NodeLike): Rule.Node {
	return node as unknown as Rule.Node;
}
