import { resolve } from "node:path";

import js from "@eslint/js";
import type { FlatESLintConfigItem } from "eslint-define-config";
import globals from "globals";

import { __root } from "../../constants";

const pkg = (await import(resolve(__root, "./package.json"))) as {
  type?: "commonjs" | "module";
};

const config: FlatESLintConfigItem = {
  files: pkg.type === "module" ? ["**/*.mjs"] : ["**/*.js", "**/*.mjs"],
  languageOptions: {
    ecmaVersion: "latest",
    globals: {
      ...globals.es2021,
      ...globals.node,
    },
    parser: "@babel/eslint-parser",
    parserOptions: {
      ecmaFeatures: {},
      ecmaVersion: "latest",
      parser: "@babel/eslint-parser",
      sourceType: "module",
    },
    sourceType: "module",
  },
  linterOptions: {
    noInlineConfig: false,
    reportUnusedDisableDirectives: true,
  },
  plugins: {},
  rules: {
    ...js.configs.all.rules,
  },
};

export { config };
