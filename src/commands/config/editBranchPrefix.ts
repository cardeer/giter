import { configuration } from "@/configs/configs";
import { writeConfig } from "@/configs/updater";
import { input } from "@inquirer/prompts";

export async function editBranchPrefix() {
  const result = await input({
    message: "Branch Prefix",
    default: configuration.branchPrefix,
  });

  configuration.branchPrefix = result;
  writeConfig();
}
