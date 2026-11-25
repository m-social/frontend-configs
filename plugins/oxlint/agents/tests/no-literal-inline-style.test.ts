import assert from "node:assert/strict";
import { test } from "node:test";

import { noLiteralInlineStyle } from "../src/rules/no-literal-inline-style.ts";
import { createRuleTester } from "./rule-tester.ts";

void test("no-literal-inline-style uses createOnce", () => {
	assert.ok("createOnce" in noLiteralInlineStyle);
});

createRuleTester().run("no-literal-inline-style", noLiteralInlineStyle, {
	valid: [
		"const C = () => <div style={{ color: value }} />;",
		"const C = () => <div style={{ width: `${progress}%` }} />;",
		"const C = () => <div style={{ display: null }} />;",
		"const C = () => <div style={styles} />;",
	],
	invalid: [
		{
			code: "const C = () => <div style={{ color: 'red' }} />;",
			errors: [{ messageId: "literalStyle" }],
		},
		{
			code: "const C = () => <div style={{ margin: 16, top: -1 }} />;",
			errors: [{ messageId: "literalStyle" }, { messageId: "literalStyle" }],
		},
		{
			code: "const C = () => <div style={{ color: `red` }} />;",
			errors: [{ messageId: "literalStyle" }],
		},
		{
			code: "const C = () => <div style={{ color: 'red' as const }} />;",
			errors: [{ messageId: "literalStyle" }],
		},
		{
			code: "const C = () => <div style={flag ? { color: 'red' } : { color: dynamic }} />;",
			errors: [{ messageId: "literalStyle" }],
		},
		{
			code: "const C = () => <div style={flag && { margin: 0 }} />;",
			errors: [{ messageId: "literalStyle" }],
		},
	],
});
