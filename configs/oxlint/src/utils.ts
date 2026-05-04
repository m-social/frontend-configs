import { deepmerge as createDeepMerge } from "@fastify/deepmerge";
import type { OxlintConfig } from "oxlint";

const deepMerge = createDeepMerge({
	all: true,
	onlyDefinedProperties: true,
});

function dedupePlugins(plugins: OxlintConfig["plugins"]) {
	if (!plugins || plugins.length < 2) {
		return plugins;
	}

	return [...new Set(plugins)];
}

function dedupeJsPlugins(jsPlugins: OxlintConfig["jsPlugins"]) {
	if (!jsPlugins || jsPlugins.length < 2) {
		return jsPlugins;
	}

	const names = new Set<string>();

	return jsPlugins.filter((plugin) => {
		const name = typeof plugin === "string" ? plugin : plugin.name;
		const isDuplicate = names.has(name);

		if (isDuplicate) {
			return false;
		}

		names.add(name);
		return true;
	});
}

// Deprecate this utility when these issues are resolved:
// https://github.com/oxc-project/oxc/issues/10223
// https://github.com/oxc-project/oxc/issues/20087
// https://github.com/oxc-project/oxc/issues/20863
export function mergeConfigs(configs: OxlintConfig[]): OxlintConfig {
	if (configs.length === 0) {
		throw new Error("At least one config must be provided");
	}

	if (configs.length === 1) {
		return configs[0];
	}

	const result: OxlintConfig = deepMerge(...configs);
	result.plugins = dedupePlugins(result.plugins);
	result.jsPlugins = dedupeJsPlugins(result.jsPlugins);

	return result;
}
