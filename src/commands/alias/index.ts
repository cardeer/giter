import { program } from "commander";
import { listAliasCommand } from "./listAlias";
import { setAliasCommand } from "./setAlias";

export const aliasCommand = program
  .createCommand("alias")
  .addCommand(setAliasCommand)
  .addCommand(listAliasCommand);
