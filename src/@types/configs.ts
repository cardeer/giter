export interface IBranch {
  parent: string;
  alias: string;
}

export interface IConfigurations {
  branchPrefix?: string;
  mainBranch?: string;
  epics?: Record<string, string>;
  branches?: Record<string, Partial<IBranch>>;
}
