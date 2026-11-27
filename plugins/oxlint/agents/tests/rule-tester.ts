import { describe, it } from "node:test";

import { RuleTester } from "oxlint/plugins-dev";

RuleTester.describe = (name, fn) => {
	void describe(name, fn);
};
RuleTester.it = (name, fn) => {
	void it(name, fn);
};

export function createRuleTester(): RuleTester {
	return new RuleTester({ languageOptions: { parserOptions: { lang: "tsx" } } });
}
