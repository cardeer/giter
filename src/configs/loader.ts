import fs from "fs";
import path from "path";
import yaml from "yaml";
import { IConfigurations } from "../@types/configs";

const defaultGiterDirName = ".giter";
const configFileName = "config.yaml";

function getGiterHome(): string {
  const giterHome =
    process.env.GITER_HOME ??
    path.resolve(process.env.HOME, defaultGiterDirName);

  if (!fs.existsSync(giterHome)) {
    fs.mkdirSync(giterHome);
  }

  return giterHome;
}

export function getConfigPath(): string {
  return path.resolve(getGiterHome(), configFileName);
}

export function loadConfigs(): IConfigurations {
  const configFile = path.resolve(getGiterHome(), configFileName);

  if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, "", "utf-8");
  }

  const configContent = fs.readFileSync(configFile, "utf-8");
  return yaml.parse(configContent);
}
