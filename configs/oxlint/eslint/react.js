/**
 * @type import("eslint").Linter.Config
 */
export default {
	name: "m-social/oxlint-config-react",
	rules: {
		// react/forward-ref-uses-ref
		"@eslint-react/no-useless-forward-ref": "off",
		// react/jsx-key
		"@eslint-react/no-missing-key": "off",
		// react/jsx-no-duplicate-props
		"@eslint-react/jsx-no-duplicate-props": "off",
		// react/jsx-no-target-blank
		"@eslint-react/no-unsafe-target-blank": "off",
		// react/no-danger-with-children
		"@eslint-react/no-dangerously-set-innerhtml-with-children": "off",
		// react/no-direct-mutation-state
		"@eslint-react/no-direct-mutation-state": "off",
		// react/no-find-dom-node
		"@eslint-react/no-find-dom-node": "off",
		// react/no-render-return-value
		"@eslint-react/no-render-return-value": "off",
		// react/no-string-refs
		"@eslint-react/no-string-refs": "off",
		// react/void-dom-elements-no-children
		"@eslint-react/no-void-elements-with-children": "off",
		// react/no-array-index-key
		"@eslint-react/no-array-index-key": "off",
		// react/iframe-missing-sandbox
		"@eslint-react/no-missing-iframe-sandbox": "off",
		// react/no-script-url
		"@eslint-react/no-script-url": "off",
		// react/jsx-no-comment-textnodes
		"@eslint-react/jsx-no-comment-textnodes": "off",
		// react/no-danger
		"@eslint-react/no-dangerously-set-innerhtml": "off",
		// react/button-has-type
		"@eslint-react/no-missing-button-type": "off",
		// react/self-closing-comp
		"@stylistic/jsx-self-closing-comp": "off",
	},
};
