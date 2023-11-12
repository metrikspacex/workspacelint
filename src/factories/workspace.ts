import type { FlatESLintConfig } from "eslint-define-config";

import type { FilterRules, WorkspaceConfigs } from "../types/";
import { Package } from ".";

class WorkspaceFactory {
  private readonly packages!: Package[];
  private readonly workspaceConfigs!: WorkspaceConfigs[];

  private readonly RULES = {};

  public constructor(workspaceConfigs: readonly WorkspaceConfigs[]) {
    this.packages = [];
    this.workspaceConfigs = [...workspaceConfigs];
    this.build();
  }

  public generateRules() {}

  public setRules(
    _ruleSet: Partial<FilterRules<typeof this.RULES>> | {} = {}
  ): FlatESLintConfig[] {
    return [];
  }

  private build() {
    this.workspaceConfigs.forEach((packageConfig_) => {
      const _config = packageConfig_.packageConfig;
      const _name = packageConfig_.packageName;
      const _path = packageConfig_.packagePath;
      const _package = new Package(_config, _name, _path);

      _package.setFlatESLintConfig();
      this.packages.push(_package);
    });
  }
}

export { WorkspaceFactory };
