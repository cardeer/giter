import fs from "fs";
import yaml from "yaml";
import { configuration } from "./configs";
import { getConfigPath } from "./loader";

export function writeConfig() {
  const configPath = getConfigPath();
  fs.writeFileSync(configPath, yaml.stringify(configuration), "utf-8");
}
