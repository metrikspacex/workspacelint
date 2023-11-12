/* eslint-disable capitalized-comments */
import type { FlatESLintConfig } from "eslint-define-config";

import { cjsConfig, mjsConfig } from "../configs";
import type { PackageConfig, PackageName, PackagePath } from "../types";

class Package {
  private readonly packageConfig!: PackageConfig;
  private readonly packageFlatESLintConfig!: FlatESLintConfig;
  private readonly packageName!: PackageName;
  private readonly packagePath!: PackagePath;

  public constructor(
    packageConfig: PackageConfig,
    packageName: PackageName,
    packagePath: PackagePath
  ) {
    this.packageConfig = packageConfig;
    this.packageName = packageName;
    this.packagePath = packagePath;
  }

  public getFlatESLintConfig(): FlatESLintConfig {
    return this.packageFlatESLintConfig;
  }

  public getPackageConfig(): PackageConfig {
    return this.packageConfig;
  }

  public getPackageName(): string {
    return this.packageName;
  }

  public getPackagePath() {
    return this.packagePath;
  }

  // TODO: Implement this method & Seperate the logic?
  public setFlatESLintConfig(): void {
    // Not defining is the same as defining "default"
    if (this.packageConfig.js === "commonjs") {
      // Only CJS + Default
      cjsConfig();
    } else if (
      this.packageConfig.js === "default" ||
      this.packageConfig.js === undefined
    ) {
      // Both CJS & ESM + Default
      cjsConfig();
      mjsConfig();
    } else if (this.packageConfig.js === "module") {
      // Only ESM + Default
      mjsConfig();
    } else if (typeof this.packageConfig.js === "object") {
      // CJS + Custom if exists -> otherwise Default
      // ESM + Custom if exists -> otherwise Default
      // CJS & ESM + Custom -> otherwise Default
      // this.packageConfig.js.cjs; -> default or { plugins: ... }

      // CJS
      if (
        this.packageConfig.js.cjs === "default" ||
        this.packageConfig.js.cjs === undefined
      ) {
        cjsConfig();
      } else cjsConfig(this.packageConfig.js.cjs);

      // MJS
      if (
        this.packageConfig.js.mjs === "default" ||
        this.packageConfig.js.mjs === undefined
      ) {
        mjsConfig();
      } else mjsConfig(this.packageConfig.js.mjs);
    }
  }
}
export { Package };
