import { getConfigPath, loadConfig, saveConfig } from "./config.js";
import { getCommits } from "./git.js";
import { consola } from "consola";
import { Command } from "commander";

const runCLI = () => {
  const program = new Command();

  program.name("git-standup").description("commit log view").version("1.0.0");

  program
    .command("add")
    .argument("<path>")
    .action((path) => {
      const config = loadConfig();
      config.repos.push(path);
      saveConfig(config);
    });

  program.command("show").action(async () => {
    const config = loadConfig();
    for (const repoPath of config.repos) {
      const commits = await getCommits(repoPath, "1 day ago");
      consola.log(commits);
    }
  });

  program.parse();
};

runCLI();
