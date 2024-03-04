import { Theme as InquirerTheme, select } from "@inquirer/prompts";

export type Choice<T> = Parameters<typeof select<T>>[0]["choices"][0];

type ExtendedStyle = {
  style: {
    disabled: (text: string) => string;
  };
};

export type Theme<T = InquirerTheme<ExtendedStyle>> = {
  [K in keyof T]?: Theme<T[K]>;
};
