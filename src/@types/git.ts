export enum BranchType {
  EPIC = "epic",
  DEVELOP = "develop",
  FEATURE = "feature",
}

export interface IBranchMeta {
  name: string;
  epic?: boolean;
  suffix?: string;
}
