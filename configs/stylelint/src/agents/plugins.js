import stylelint from "stylelint";

import {
	docsUrl,
	USE_UNNAMEABLE,
	useNamespace,
	useNamespaceTaken,
	WIDTH_MEDIA_QUERY,
} from "./messages.js";

export const USE_NAMESPACE = "m-social-agents/use-namespace";
export const NO_WIDTH_MEDIA_QUERY = "m-social-agents/no-width-media-query";

// The quoted URL of a `@use` and its `as` clause, when there is one. A `with (…)` may follow.
const USE_PARAMS = /^(\s*(["'])(.+?)\2)(?:\s*as(?:\s+|(?=\*))(\*|[^\s;]+))?/;
const SASS_IDENTIFIER = /^(?:--|-?[a-z_\u{80}-\u{10ffff}])[\w\u{80}-\u{10ffff}-]*$/iu;

/**
 * The name of the module a `@use` loads, the way Sass makes a default namespace out of a URL:
 * the last component of its path without the leading underscore and the extension.
 *
 * @param {string} url
 * @returns {string | undefined} `undefined` when the name cannot be a namespace
 */
function moduleName(url) {
	// A subpath import, `#shared/…`, is a URL of a fragment alone. Sass finds no path in it and
	// so no name; the name is read from the fragment.
	const path = url.startsWith("#") ? url.slice(1) : url.replace(/#.*$/, "");
	const start = Math.max(path.lastIndexOf("/"), path.lastIndexOf(":")) + 1;
	const name = path.slice(start).replace(/^_/, "").replace(/\..*$/, "");

	return SASS_IDENTIFIER.test(name) ? name : undefined;
}

/**
 * What a `@use` loads and under which namespace.
 *
 * @param {string} params
 */
function parseUse(params) {
	const match = USE_PARAMS.exec(params);

	if (!match) {
		return undefined;
	}

	// `source` is the URL as it is written, with its quotes; `namespace` is what follows `as`
	const [, source = "", , url = "", namespace] = match;

	return { source, url, namespace, name: moduleName(url), isBuiltIn: url.startsWith("sass:") };
}

/**
 * The range of the parameters of an at-rule, to underline them alone: the node of an at-rule
 * includes its whole block.
 *
 * @param {{ name: string, params: string, raws: { afterName?: string, params?: { raw: string, scss?: string } } }} node
 */
function paramsRange(node) {
	const index = 1 + node.name.length + (node.raws.afterName ?? "").length;
	// The parameters as they are in the source: `params` itself has the comments taken out, and
	// `raw` has the `//` ones rewritten
	const source = node.raws.params?.scss ?? node.raws.params?.raw ?? node.params;

	return { index, endIndex: index + source.length };
}

const useNamespaceMessages = stylelint.utils.ruleMessages(USE_NAMESPACE, {
	expected: useNamespace,
	unnameable: USE_UNNAMEABLE,
	taken: useNamespaceTaken,
});

/**
 * Reports a `@use` whose namespace is left to Sass, renamed or dropped with `as *`.
 *
 * @type {import('stylelint').Rule}
 */
const useNamespaceRule = (enabled) => (root, result) => {
	if (!stylelint.utils.validateOptions(result, USE_NAMESPACE, { actual: enabled })) {
		return;
	}

	// Sass does not load two modules under one namespace, so a name that a module of this file
	// already has is not asked of another one
	/** @type {Set<string | undefined>} */
	const taken = new Set();

	root.walkAtRules("use", (node) => {
		const use = parseUse(node.params);

		if (use) {
			taken.add(use.namespace ?? (use.isBuiltIn ? use.name : undefined));
		}
	});

	root.walkAtRules("use", (node) => {
		const use = parseUse(node.params);

		// A node without a source was put there by the fix of another rule in this very run and has
		// no position to report; it is checked on the next run
		if (!use || !node.source) {
			return;
		}

		const { source, namespace, name } = use;

		// Only the built-in modules may rely on the default: `@use "sass:math"`
		if (namespace === undefined ? use.isBuiltIn : namespace === name) {
			return;
		}

		const isNameFree = name !== undefined && !taken.has(name);

		// Without a name to take, any namespace of its own will do
		if (!isNameFree && namespace !== undefined && namespace !== "*") {
			return;
		}

		if (isNameFree) {
			taken.add(name);
		}

		stylelint.utils.report({
			ruleName: USE_NAMESPACE,
			result,
			node,
			...paramsRange(node),
			message: useNamespaceMessage(name, isNameFree),
			// Writing out the default namespace changes nothing for the rest of the file. Renaming
			// one would break every reference to it, so that is left to the author. Neither is a
			// `@use` with a comment in it rewritten: the comment would be lost.
			fix:
				isNameFree && namespace === undefined && node.raws.params === undefined
					? {
							node,
							apply: () => {
								node.params = `${source} as ${name}${node.params.slice(source.length)}`;
							},
						}
					: undefined,
		});
	});
};

/**
 * @param {string | undefined} name
 * @param {boolean} isNameFree
 */
function useNamespaceMessage(name, isNameFree) {
	if (name === undefined) {
		return useNamespaceMessages.unnameable;
	}

	return isNameFree ? useNamespaceMessages.expected(name) : useNamespaceMessages.taken(name);
}

useNamespaceRule.ruleName = USE_NAMESPACE;
useNamespaceRule.messages = useNamespaceMessages;
useNamespaceRule.meta = { url: docsUrl("use-imports"), fixable: true };

/**
 * A rule that reports every at-rule of the given name whose parameters match the pattern.
 *
 * @param {string} ruleName
 * @param {string} atRuleName
 * @param {RegExp} pattern
 * @param {string} message
 * @param {string} url
 */
function atRuleParamsRule(ruleName, atRuleName, pattern, message, url) {
	const messages = stylelint.utils.ruleMessages(ruleName, { rejected: message });

	/** @type {import('stylelint').Rule} */
	const rule = (enabled) => (root, result) => {
		if (!stylelint.utils.validateOptions(result, ruleName, { actual: enabled })) {
			return;
		}

		root.walkAtRules(atRuleName, (node) => {
			if (pattern.test(node.params)) {
				stylelint.utils.report({
					ruleName,
					result,
					node,
					...paramsRange(node),
					message: messages.rejected,
				});
			}
		});
	};

	rule.ruleName = ruleName;
	rule.messages = messages;
	rule.meta = { url };

	return stylelint.createPlugin(ruleName, rule);
}

export default [
	stylelint.createPlugin(USE_NAMESPACE, useNamespaceRule),
	atRuleParamsRule(
		NO_WIDTH_MEDIA_QUERY,
		"media",
		// `width` as a media feature — `(min-width: …)`, `(width >= …)`, `(… <= width)` — and not as
		// a part of a variable name such as `$header-width`
		/[(\s<>=](?:(?:min|max)-)?(?:device-)?width\s*[:<>=)]/i,
		WIDTH_MEDIA_QUERY,
		docsUrl("breakpoints"),
	),
];
