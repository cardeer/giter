import { getConfigPath } from "@/configs/loader";
import { exec } from "child_process";
import { program } from "commander";

export const openConfigCommand = program.createCommand("open");
openConfigCommand.action(openConfigFileAction);

async function openConfigFileAction() {
  exec(`code ${getConfigPath()}`);
}
