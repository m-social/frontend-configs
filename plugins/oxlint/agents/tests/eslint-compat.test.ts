import assert from "node:assert/strict";
import { test } from "node:test";

import { Linter } from "eslint";

import agents from "../src/index.ts";
import agentsReact from "../src/react.ts";

const linter = new Linter();
const languageOptions = {
	ecmaVersion: "latest",
	sourceType: "module",
	parserOptions: { ecmaFeatures: { jsx: true } },
} as const;

void test("eslintCompatPlugin adds create to every rule", () => {
	for (const plugin of [agents, agentsReact]) {
		for (const rule of Object.values(plugin.rules)) {
			assert.equal(typeof rule.create, "function");
		}
	}
});

void test("ESLint runs all React rules through the compatibility wrapper", () => {
	const messages = linter.verify(
		"import { useMemo } from 'react'; const C = () => <div className={`button ${variant}`} style={{ color: 'red' }} />;",
		[agentsReact.configs["recommended/eslint"], { languageOptions }],
	);

	assert.deepEqual(
		new Set(messages.map((message) => message.messageId)),
		new Set(["literalStyle", "manualMemoization", "templateLiteral"]),
	);
});

void test("ESLint preserves the React Compiler opt-out", () => {
	const messages = linter.verify('"use no memo"; import { useMemo } from "react";', [
		agentsReact.configs["recommended/eslint"],
		{ languageOptions },
	]);

	assert.deepEqual(messages, []);
});

void test("ESLint runs the Vite rule and merges custom options", () => {
	const invalid = linter.verify("import.meta.env.VITE_API_URL;", [
		agents.configs["vite/eslint"],
		{ languageOptions },
	]);
	const custom = linter.verify("import.meta.env.CUSTOM; import.meta.env.DEV;", [
		agents.configs["vite/eslint"],
		{
			languageOptions,
			rules: {
				"@m-social/agents/no-restricted-import-meta-env": ["error", { allow: ["CUSTOM"] }],
			},
		},
	]);

	assert.deepEqual(
		invalid.map((message) => message.messageId),
		["restrictedVariable"],
	);
	assert.deepEqual(
		custom.map((message) => message.messageId),
		["restrictedVariable"],
	);
});
