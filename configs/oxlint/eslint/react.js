/**
 * @type import("eslint").Linter.Config
 */
export default {
	name: "m-social/oxlint-config-react",
	rules: {
		// react/jsx-no-comment-textnodes
		"@eslint-react/jsx-no-comment-textnodes": "off",

		// react/no-array-index-key
		"@eslint-react/no-array-index-key": "off",

		// react/no-direct-mutation-state
		"@eslint-react/no-direct-mutation-state": "off",

		// react/no-redundant-should-component-update
		"@eslint-react/no-redundant-should-component-update": "off",

		// react/no-did-mount-set-state
		"@eslint-react/no-set-state-in-component-did-mount": "off",

		// react/jsx-key
		"@eslint-react/no-missing-key": "off",

		// react/no-string-refs
		"@eslint-react/no-string-refs": "off",

		// react/no-unsafe
		"@eslint-react/no-unsafe-component-will-mount": "warn",
		"@eslint-react/no-unsafe-component-will-receive-props": "warn",
		"@eslint-react/no-unsafe-component-will-update": "warn",

		// react/forward-ref-uses-ref
		"@eslint-react/no-useless-forward-ref": "off",

		// react/no-danger
		"@eslint-react/dom/no-dangerously-set-innerhtml": "off",

		// react/no-danger-with-children
		"@eslint-react/dom/no-dangerously-set-innerhtml-with-children": "off",

		// react/no-find-dom-node
		"@eslint-react/dom/no-find-dom-node": "off",

		// react/no-render-return-value
		"@eslint-react/dom/no-render-return-value": "off",

		// react/no-script-url
		"@eslint-react/dom/no-script-url": "off",

		// react/void-dom-elements-no-children
		"@eslint-react/dom/no-void-elements-with-children": "off",

		// react/self-closing-comp
		"@stylistic/jsx-self-closing-comp": "off",
	},
};
