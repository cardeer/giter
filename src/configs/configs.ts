import { loadConfigs } from "./loader";

export const configuration = loadConfigs() ?? {};

export function getConfigBranches() {
  if (!configuration.branches) {
    configuration.branches = {};
  }

  return configuration.branches;
}

export function getConfigBranch(name: string) {
  const branches = getConfigBranches();

  if (!branches[name]) {
    branches[name] = {};
  }

  return branches[name];
}
