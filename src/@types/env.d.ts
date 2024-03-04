declare module "bun" {
  interface Env {
    HOME: string;
    GITER_HOME?: string;
    FORCE_COLOR: number;
  }
}

export {};
