import { program } from "commander";
import { swapBranchCommand } from "./swapBranch";

export const branchCommand = program
  .createCommand("branch")
  .addCommand(swapBranchCommand);
