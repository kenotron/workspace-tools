import findUp from "find-up";
import path from "path";
import { RushConfiguration } from "@microsoft/rush-lib";

import { WorkspaceInfo } from "../../types/WorkspaceInfo";

export function getRushWorkspaceRoot(cwd: string): string {
  const rushJsonPath = findUp.sync("rush.json", { cwd });

  if (!rushJsonPath) {
    throw new Error("Could not find rush workspaces root");
  }

  return path.dirname(rushJsonPath);
}

export function getRushWorkspaces(cwd: string): WorkspaceInfo {
  try {
    const rushWorkspaceRoot = getRushWorkspaceRoot(cwd);
    const rushJsonPath = path.join(rushWorkspaceRoot, "rush.json");

    const rushConfig = RushConfiguration.loadFromConfigurationFile(
      rushJsonPath
    );

    return rushConfig.projects.map((project) => {
      return {
        name: project.packageName,
        path: project.projectFolder,
        packageJson: {
          ...project.packageJson,
          packageJsonPath: path.join(project.projectFolder, "package.json"),
        },
      };
    });
  } catch {
    return [];
  }
}
