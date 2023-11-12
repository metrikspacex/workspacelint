import type { PackageConfig, PackageName, PackagePath } from "./packages.ts";

interface WorkspaceConfigs {
  packageConfig: PackageConfig;
  packageName: PackageName;
  packagePath: PackagePath;
}

export type { WorkspaceConfigs };
