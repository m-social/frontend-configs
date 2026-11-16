import stylelint from "stylelint";

import { docsUrl, USE_ALIAS, WIDTH_MEDIA_QUERY } from "./messages.js";

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
				stylelint.utils.report({ ruleName, result, node, message: messages.rejected });
			}
		});
	};

	rule.ruleName = ruleName;
	rule.messages = messages;
	rule.meta = { url };

	return stylelint.createPlugin(ruleName, rule);
}

export const NO_USE_ALIAS = "m-social-agents/no-use-alias";
export const NO_WIDTH_MEDIA_QUERY = "m-social-agents/no-width-media-query";

export default [
	atRuleParamsRule(NO_USE_ALIAS, "use", /["']\s+as\s+/, USE_ALIAS, docsUrl("use-imports")),
	atRuleParamsRule(
		NO_WIDTH_MEDIA_QUERY,
		"media",
		/\bwidth\b/,
		WIDTH_MEDIA_QUERY,
		docsUrl("breakpoints"),
	),
];
