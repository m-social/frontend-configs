import assert from "node:assert/strict";
import { test } from "node:test";

import { noRestrictedImportMetaEnv } from "../src/rules/no-restricted-import-meta-env.ts";
import { createRuleTester } from "./rule-tester.ts";

void test("no-restricted-import-meta-env uses createOnce", () => {
	assert.ok("createOnce" in noRestrictedImportMetaEnv);
});

createRuleTester().run("no-restricted-import-meta-env", noRestrictedImportMetaEnv, {
	valid: [
		"import.meta.env.BASE_URL; import.meta.env.DEV; import.meta.env.MODE; import.meta.env.PROD; import.meta.env.SSR;",
		"const { DEV, MODE } = import.meta.env;",
		{ code: "import.meta.env.CUSTOM;", options: [{ allow: ["CUSTOM"] }] },
		{ code: "const { CUSTOM } = import.meta.env;", options: [{ allow: ["CUSTOM"] }] },
	],
	invalid: [
		{
			code: "import.meta.env.VITE_API_URL;",
			errors: [{ messageId: "restrictedVariable" }],
		},
		{
			code: "const { VITE_API_URL, VITE_SECRET } = import.meta.env;",
			errors: [{ messageId: "restrictedVariable" }, { messageId: "restrictedVariable" }],
		},
		{
			code: "console.log(import.meta.env);",
			errors: [{ messageId: "wholeObject" }],
		},
		{
			code: "import.meta.env[name];",
			errors: [{ messageId: "wholeObject" }],
		},
		{
			code: "const copy = { ...import.meta.env };",
			errors: [{ messageId: "wholeObject" }],
		},
		{
			code: "import.meta.env.DEV;",
			options: [{ allow: ["CUSTOM"] }],
			errors: [
				{
					message:
						"Read `DEV` through the project's typed env module. Only `CUSTOM` may be read from `import.meta.env`.",
				},
			],
		},
	],
});
