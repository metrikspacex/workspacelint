type JSSupportedPlugins =
  | "default"
  | {
      "@eslint/js"?: boolean;
    };

type TSSupportedPlugins =
  | "default"
  | {
      "@eslint/js": boolean;
    };

export type { JSSupportedPlugins, TSSupportedPlugins };
