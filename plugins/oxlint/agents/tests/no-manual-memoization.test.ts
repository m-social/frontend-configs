import assert from "node:assert/strict";
import { test } from "node:test";

import { noManualMemoization } from "../src/rules/no-manual-memoization.ts";
import { createRuleTester } from "./rule-tester.ts";

void test("no-manual-memoization uses createOnce", () => {
	assert.ok("createOnce" in noManualMemoization);
});

createRuleTester().run("no-manual-memoization", noManualMemoization, {
	valid: [
		"import { useMemo } from 'other';",
		"import React from 'react'; React['useMemo'](() => 1, []);",
		'"use no memo"; import { useMemo } from "react";',
		'"use no memo"; import * as React from "react"; React.useMemo(() => 1, []);',
	],
	invalid: [
		{
			code: "import { memo, useCallback, useMemo } from 'react';",
			errors: [
				{ messageId: "manualMemoization" },
				{ messageId: "manualMemoization" },
				{ messageId: "manualMemoization" },
			],
		},
		{
			code: "import { useMemo as memoize } from 'react';",
			errors: [{ messageId: "manualMemoization" }],
		},
		{
			code: "import React from 'react'; React.memo(() => null);",
			errors: [{ messageId: "manualMemoization" }],
		},
		{
			code: "import * as R from 'react'; R.useCallback(() => {}, []);",
			errors: [{ messageId: "manualMemoization" }],
		},
	],
});
