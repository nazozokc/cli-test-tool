import os from "os";
import path from "path";
import fs from "fs";

type Config = {
  repos: string[];
};

export const getConfigPath = (): string => {
  return path.join(os.homedir(), ".config", "git-standup", "repos.json");
};

export const loadConfig = (): Config => {
  if (fs.existsSync(getConfigPath())) {
    const content = fs.readFileSync(getConfigPath(), "utf-8");
    const parsed = JSON.parse(content);
    return parsed;
  } else {
    return { repos: [] };
  }
};

export const saveConfig = (config: Config): void => {
  fs.mkdirSync(path.dirname(getConfigPath()), { recursive: true });
  const content = JSON.stringify(config);
  fs.writeFileSync(getConfigPath(), content);
};
