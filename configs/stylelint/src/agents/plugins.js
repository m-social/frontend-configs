import stylelint from "stylelint";

import { docsUrl, WIDTH_MEDIA_QUERY } from "./messages.js";

export const NO_WIDTH_MEDIA_QUERY = "m-social-agents/no-width-media-query";

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
