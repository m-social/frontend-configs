import { defineConfig } from "oxfmt";

import {
  BUILTIN_EXTERNAL_GROUPS,
  FSD_DEFINITION,
  FSD_GROUPS,
  INTERNAL_RELATIVE_GROUPS,
  STYLE_DEFINITION,
  STYLE_GROUPS,
} from "./import-groups.ts";
import typescriptConfig from "./typescript.ts";

export default defineConfig({
  ...typescriptConfig,
  sortImports: {
    ...typescriptConfig.sortImports,
    groups: [
      "react",
      "react-meta",
      ...BUILTIN_EXTERNAL_GROUPS,
      { newlinesBetween: true },
      ...FSD_GROUPS,
      { newlinesBetween: true },
      ...INTERNAL_RELATIVE_GROUPS,
      { newlinesBetween: true },
      ...STYLE_GROUPS,
    ],
    customGroups: [
      ...FSD_DEFINITION,
      ...STYLE_DEFINITION,
      {
        groupName: "react",
        elementNamePattern: ["react"],
      },
      {
        groupName: "react-meta",
        elementNamePattern: ["react-native", "next", "next/**"],
      },
    ],
  },
});
