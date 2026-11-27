import assert from "node:assert/strict";
import { test } from "node:test";

import { noTemplateLiteralClassName } from "../src/rules/no-template-literal-class-name.ts";
import { createRuleTester } from "./rule-tester.ts";

void test("no-template-literal-class-name uses createOnce", () => {
	assert.ok("createOnce" in noTemplateLiteralClassName);
});

createRuleTester().run("no-template-literal-class-name", noTemplateLiteralClassName, {
	valid: [
		"const C = () => <div className='button' />;",
		"const C = () => <div className={`button`} />;",
		"const C = () => <div className={cx(`button_${variant}`)} />;",
	],
	invalid: [
		{
			code: "const C = () => <div className={`button ${variant}`} />;",
			errors: [{ messageId: "templateLiteral" }],
		},
		{
			code: "const C = () => <div className={`${base} ${variant}`} />;",
			errors: [{ messageId: "templateLiteral" }],
		},
	],
});
