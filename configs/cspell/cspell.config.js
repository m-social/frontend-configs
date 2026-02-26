/** @type {import("@cspell/cspell-types").CSpellPackageSettings} */
const config = {
	version: "0.2",
	name: "m-social cspell settings .js",
	id: "m-social-cspell-js",
	readonly: true,
	language: "en, ru, ru-ru",
	description: "CSpell configuration used at M-Social.",
	import: ["@cspell/cspell-bundled-dicts", "@cspell/dict-ru_ru/cspell-ext.json"],
	useGitignore: true,
	ignorePaths: [
		"**/package.json",
		"**/patches",
		"**/pnpm-lock.yaml",
		"**/pnpm-workspace.yaml",
		"**/Jenkinsfile",
	],
	dictionaryDefinitions: [
		{
			name: "m-social:packages",
			path: "./dictionaries/packages.txt",
			addWords: false,
		},
		{
			name: "m-social:internal",
			path: "./dictionaries/internal.txt",
			addWords: false,
		},
		{
			name: "m-social:terms",
			path: "./dictionaries/terms.txt",
			addWords: false,
		},
	],
	dictionaries: ["m-social:packages", "m-social:internal", "m-social:terms"],
	overrides: [
		{
			filename: "**/*.svg",
			dictionaries: ["html", "css"],
		},
	],
};

export default config;
