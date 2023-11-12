import * as _Configs from "./configs";
import * as _Constants from "./constants";
import { WorkspaceFactory } from "./factories";
import type { WorkspaceConfigs } from "./types";

namespace Lint {
  export const workspace = (workspaceConfigs: WorkspaceConfigs[]) => {
    const workspaceFactory = () => new WorkspaceFactory(workspaceConfigs);
    return workspaceFactory();
  };
}

Lint.workspace([
  {
    packageConfig: {
      js: {
        cjs: "default",
        mjs: "default",
      },
    },
    packageName: "backend",
    packagePath: "./backend/",
  },
]).setRules();
export { Lint };
