import { IBranchMeta } from "@/@types/git";
import { configuration } from "@/configs/configs";
import { execSync } from "child_process";
import os from "os";
import { chalk } from "./chalk";

export class Git {
  static getBranchMeta(branchName?: string): IBranchMeta {
    const currentBranch = branchName ?? this.currentBranch;
    const branchMatcher =
      /(?<epic>epic\/)?(?<name>NCS-[\d]+)-?(?<suffix>(?<=-).+)?/;

    const match = currentBranch.match(branchMatcher);

    if (match) {
      return {
        name: match.groups?.name!,
        epic: !!match.groups?.epic,
        suffix: match.groups?.suffix,
      };
    }

    return {
      name: "",
    };
  }

  static pull(source: string) {
    try {
      const result = execSync(`git pull origin ${source} --no-ff`);
      console.log(result.toString());
    } catch (error) {
      console.log(chalk.red(error));
    }
  }

  static merge(source: string) {
    try {
      const result = execSync(`git merge ${source} --no-ff`);
      console.log(result.toString());
    } catch (error) {
      console.log(chalk.red(error));
    }
  }

  static get isRepository() {
    try {
      execSync("git rev-parse --git-dir");
      return true;
    } catch {
      return false;
    }
  }

  static get currentBranch() {
    const result = execSync("git branch --show-current");
    return result.toString().trim();
  }

  static get branchPrefix() {
    return configuration.branchPrefix ? `${configuration.branchPrefix}-` : "";
  }

  static get branches() {
    const result = execSync("git branch");
    const branchList = result.toString();
    return branchList.split(os.EOL);
  }
}
