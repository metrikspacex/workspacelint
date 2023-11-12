import type { JSSupportedPlugins, TSSupportedPlugins } from ".";

type JavascriptModuleTypes = "commonjs" | "default" | "module";

interface PackageConfig {
  readonly js?: JavascriptModuleTypes | JSPackageConfigs;
  readonly ts?: JavascriptModuleTypes | TSPackageConfigs;
}

type PackageName = string;
type PackagePath = string;

export type JSPackageConfigs =
  | "default"
  | {
      cjs?: "default" | { plugins: JSSupportedPlugins };
      mjs?: "default" | { plugins: JSSupportedPlugins };
    };

export type TSPackageConfigs =
  | "commonjs"
  | "default"
  | "module"
  | {
      cts?: "default" | { plugins: TSSupportedPlugins };
      mts?: "default" | { plugins: TSSupportedPlugins };
    };

export type { PackageConfig, PackageName, PackagePath };
