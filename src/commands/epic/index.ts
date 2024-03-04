import { program } from "commander";
import { addEpicCommand } from "./addEpic";
import { listEpicsCommand } from "./listEpics";
import { setParentCommand } from "./setParent";

export const epicCommand = program
  .createCommand("epic")
  .addCommand(addEpicCommand)
  .addCommand(listEpicsCommand)
  .addCommand(setParentCommand);
