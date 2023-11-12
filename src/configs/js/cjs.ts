/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolve } from "node:path";

import js from "@eslint/js";
import type { FlatESLintConfigItem } from "eslint-define-config";
import globals from "globals";

import { __root } from "../../constants/";

const cjsConfig = async (configs?: any): Promise<FlatESLintConfigItem> => {
  const pkg = (await import(resolve(__root, "./package.json"))) as {
    type?: "commonjs" | "module";
  };

  if (configs === "default" || configs === undefined) {
    return {
      files: pkg.type === "module" ? ["**/*.cjs"] : ["**/*.cjs", "**/*.js"],
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
          sourceType: "script",
        },
        sourceType: "script",
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
  }

  return {
    files: pkg.type === "module" ? ["**/*.cjs"] : ["**/*.cjs", "**/*.js"],
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
        sourceType: "script",
      },
      sourceType: "script",
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
};

export { cjsConfig };
