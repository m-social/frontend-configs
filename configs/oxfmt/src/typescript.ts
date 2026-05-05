import { defineConfig } from "oxfmt";

import {
  BUILTIN_EXTERNAL_GROUPS,
  FSD_DEFINITION,
  FSD_GROUPS,
  INTERNAL_RELATIVE_GROUPS,
} from "./import-groups.ts";

export default defineConfig({
  printWidth: 100,
  tabWidth: 2,
  useTabs: true,
  semi: true,
  singleQuote: false,
  quoteProps: "as-needed",
  jsxSingleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: "always",
  endOfLine: "lf",
  singleAttributePerLine: false,
  sortPackageJson: true,
  sortImports: {
    groups: [
      ...BUILTIN_EXTERNAL_GROUPS,
      { newlinesBetween: true },
      ...FSD_GROUPS,
      { newlinesBetween: true },
      ...INTERNAL_RELATIVE_GROUPS,
    ],
    customGroups: [...FSD_DEFINITION],
    internalPattern: ["#/", "$/", "@/"],
    newlinesBetween: false,
  },
});
