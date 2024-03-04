import { configuration } from "@/configs/configs";
import { writeConfig } from "@/configs/updater";
import { Git } from "@/utils/git";
import { input } from "@inquirer/prompts";
import { program } from "commander";

export const addEpicCommand = program
  .createCommand("add")
  .action(addEpicAction);

async function addEpicAction() {
  const branchName = await input({
    message: "Epic branch name",
  });

  const description = await input({
    message: "Description",
  });

  const trnasformedBranchName = `epic/${Git.branchPrefix}${branchName}`;

  if (!configuration.epics) {
    configuration.epics = {};
  }

  configuration.epics[trnasformedBranchName] = description;
  writeConfig();
}
