import { consola } from "consola";
import { Command } from "commander";
import { exec, execSync } from "child_process";

const runCLI = () => {
  const program = new Command();
  program
    .name("nixlist")
    .description("nix installed package tool")
    .version("1.0.0")
    .action(async () => {
      try {
        const stdout = await execSync(`nix profile list` { encoding: `utf-8`});
        consola.log(stdout)
      } catch (error) {
        consola.error("エラーが発生しました");
      }
    });

    program.parse();
};

runCLI()
