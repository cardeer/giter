import { selectTheme } from "@/constants/theme";
import { select } from "@inquirer/prompts";
import { program } from "commander";
import { editBranchPrefix } from "./editBranchPrefix";
import { openConfigCommand } from "./openConfig";

export const configCommand = program
  .createCommand("config")
  .action(configAction)
  .addCommand(openConfigCommand);

async function configAction() {
  const result = await select({
    message: "Please choose a config type to edit",
    theme: selectTheme,
    choices: [
      {
        name: "Branch Prefix",
        value: "prefix",
      },
    ],
  });

  if (result === "prefix") {
    await editBranchPrefix();
  }
}
