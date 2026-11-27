import assert from "node:assert/strict";
import { test } from "node:test";

import packageJson from "../package.json" with { type: "json" };
import agents from "../src/index.ts";
import agentsReact from "../src/react.ts";

void test("root entry point exports oxlint and ESLint vite configs", () => {
	assert.equal(agents.meta.name, "@m-social/oxlint-plugin-agents");
	assert.equal(agents.meta.version, packageJson.version);
	assert.deepEqual(Object.keys(agents.configs).sort(), ["vite", "vite/eslint"].sort());
	assert.deepEqual(agents.configs.vite, {
		jsPlugins: [{ name: "@m-social/agents", specifier: "@m-social/oxlint-plugin-agents" }],
		rules: { "@m-social/agents/no-restricted-import-meta-env": "error" },
	});
	assert.equal(agents.configs["vite/eslint"].name, "m-social/agents/vite/eslint");
	assert.equal(agents.configs["vite/eslint"].plugins?.["@m-social/agents"], agents);
	assert.deepEqual(agents.configs["vite/eslint"].rules, {
		"@m-social/agents/no-restricted-import-meta-env": "error",
	});
});

void test("React entry point exports oxlint and ESLint recommended configs", () => {
	assert.equal(agentsReact.meta.name, "@m-social/oxlint-plugin-agents/react");
	assert.equal(agentsReact.meta.version, packageJson.version);
	assert.deepEqual(
		Object.keys(agentsReact.configs).sort(),
		["recommended", "recommended/eslint"].sort(),
	);
	assert.deepEqual(agentsReact.configs.recommended, {
		jsPlugins: [
			{
				name: "@m-social/agents-react",
				specifier: "@m-social/oxlint-plugin-agents/react",
			},
		],
		rules: {
			"@m-social/agents-react/no-literal-inline-style": "error",
			"@m-social/agents-react/no-manual-memoization": "error",
			"@m-social/agents-react/no-template-literal-class-name": "error",
		},
	});
	assert.equal(
		agentsReact.configs["recommended/eslint"].name,
		"m-social/agents/react/recommended/eslint",
	);
	assert.equal(
		agentsReact.configs["recommended/eslint"].plugins?.["@m-social/agents-react"],
		agentsReact,
	);
	assert.deepEqual(agentsReact.configs["recommended/eslint"].rules, {
		"@m-social/agents-react/no-literal-inline-style": "error",
		"@m-social/agents-react/no-manual-memoization": "error",
		"@m-social/agents-react/no-template-literal-class-name": "error",
	});
});
