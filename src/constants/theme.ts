import { Theme } from "@/@types/prompt";
import { chalk } from "@/utils/chalk";

export const selectTheme: Theme = {
  style: {
    highlight(text) {
      return chalk.underline(text);
    },
    disabled(text) {
      return chalk.gray.dim(text);
    },
  },
};
