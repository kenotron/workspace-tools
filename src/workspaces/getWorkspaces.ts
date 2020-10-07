import { getWorkspaceImplementation } from "./implementations";

import { getPnpmWorkspaces } from "./implementations/pnpm";
import { getYarnWorkspaces } from "./implementations/yarn";
import { getRushWorkspaces } from "./implementations/rush";
import { WorkspaceInfo } from "../types/WorkspaceInfo";

export function getWorkspaces(cwd: string): WorkspaceInfo {
  const workspaceImplementation = getWorkspaceImplementation(cwd);

  if (!workspaceImplementation) {
    return [];
  }

  switch (workspaceImplementation) {
    case "yarn":
      return getYarnWorkspaces(cwd);
    case "pnpm":
      return getPnpmWorkspaces(cwd);
    case "rush":
      return getRushWorkspaces(cwd);
  }
}
