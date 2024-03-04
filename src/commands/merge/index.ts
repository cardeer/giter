import { configuration, getConfigBranch } from "@/configs/configs";
import { selectTheme } from "@/constants/theme";
import { chalk } from "@/utils/chalk";
import { Git } from "@/utils/git";
import { select } from "@inquirer/prompts";
import { program } from "commander";
import { MergeType } from "./types";

export const mergeCommand = program.createCommand("merge").action(mergeAction);

async function mergeAction() {
  const currentBranch = Git.currentBranch;

  const mergeType = await select<MergeType>({
    message: "Please choose a merge action",
    theme: selectTheme,
    choices: [
      {
        name: "Merge Feature Branch",
        disabled: !currentBranch.includes("-develop"),
        value: MergeType.FEATURE,
      },
      {
        name: "Merge with Epic",
        disabled: currentBranch.includes("-develop"),
        value: MergeType.EPIC,
      },
      {
        name: "Merge with Develop",
        disabled: !currentBranch.includes("-develop"),
        value: MergeType.DEVELOP,
      },
    ],
  });

  if (mergeType === MergeType.EPIC) {
    const currentBranchDetail = getConfigBranch(currentBranch);
    const epics = Object.entries(configuration.epics ?? {});

    if (currentBranchDetail) {
      epics.sort((a, _b) => {
        if (a[0] === currentBranchDetail.parent) {
          return -1;
        }

        return 0;
      });
    }

    const epic = await select({
      message: "Select epic which you want to merge",
      theme: selectTheme,
      choices: epics.map(([key, value]) => {
        return {
          name: `${key} ${chalk.magentaBright(value)}`,
          value: key,
        };
      }),
    });

    Git.pull(epic);
  } else if (mergeType === MergeType.FEATURE) {
    if (!currentBranch.includes("-develop")) {
      console.log(
        chalk.red("The current branch cannot be merged with feature branch"),
      );
      process.exit(0);
    }

    const splitted = currentBranch.split("-develop");
    const featureBranchName = splitted[0];

    Git.merge(featureBranchName);
  } else if (mergeType === MergeType.DEVELOP) {
    Git.pull("develop");
  }
}
