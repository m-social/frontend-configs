import stylelint from "stylelint";

import { docsUrl, USE_OWN_NAMESPACE, useNamespace, WIDTH_MEDIA_QUERY } from "./messages.js";

export const USE_NAMESPACE = "m-social-agents/use-namespace";
export const NO_WIDTH_MEDIA_QUERY = "m-social-agents/no-width-media-query";

// The quoted URL of a `@use` and its `as` clause, when there is one. A `with (…)` may follow.
const USE_PARAMS = /^(\s*(["'])(.+?)\2)(?:\s+as\s+(\*|[^\s;]+))?/;
const SASS_IDENTIFIER = /^-?[a-z_][\w-]*$/i;

/**
 * The name of the module a `@use` loads, the way Sass makes a default namespace out of a URL:
 * its last component without the leading underscore and the extension.
 *
 * @param {string} url
 * @returns {string | undefined} `undefined` when the name cannot be a namespace
 */
function moduleName(url) {
	const start = Math.max(url.lastIndexOf("/"), url.lastIndexOf(":"), url.lastIndexOf("#")) + 1;
	const name = url.slice(start).replace(/^_/, "").replace(/\..*$/, "");

	return SASS_IDENTIFIER.test(name) ? name : undefined;
}

/**
 * @param {string} url
 * @param {string | undefined} namespace What follows `as`
 * @param {string | undefined} expected
 */
function isNamespaceAccepted(url, namespace, expected) {
	if (namespace === undefined) {
		// Only the built-in modules may rely on the default: `@use "sass:math"`
		return url.startsWith("sass:");
	}

	return expected === undefined ? namespace !== "*" : namespace === expected;
}

const useNamespaceMessages = stylelint.utils.ruleMessages(USE_NAMESPACE, {
	expected: useNamespace,
	expectedOwn: USE_OWN_NAMESPACE,
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

	root.walkAtRules("use", (node) => {
		const match = USE_PARAMS.exec(node.params);

		if (!match) {
			return;
		}

		const [, source, , url, namespace] = match;
		const expected = moduleName(url);

		if (isNamespaceAccepted(url, namespace, expected)) {
			return;
		}

		stylelint.utils.report({
			ruleName: USE_NAMESPACE,
			result,
			node,
			word: node.params,
			message:
				expected === undefined
					? useNamespaceMessages.expectedOwn
					: useNamespaceMessages.expected(expected),
			// Writing out the default namespace changes nothing for the rest of the file. Renaming
			// one would break every reference to it, so that is left to the author.
			fix:
				namespace === undefined && expected !== undefined
					? () => {
							node.params = `${source} as ${expected}${node.params.slice(source.length)}`;
						}
					: undefined,
		});
	});
};

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
				// Only the parameters are underlined: the node of an at-rule includes its whole block
				stylelint.utils.report({
					ruleName,
					result,
					node,
					word: node.params,
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
