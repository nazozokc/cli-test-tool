#!usr/bin/env node
import { consola } from "consola";
import { Command } from "commander";
import { execa } from "execa";

const runCLI = () => {
  const program = new Command();

  program
    .name("commit-bot")
    .description("git commit and push tools")
    .version("1.0.0")
    .argument("<branch>")
    .argument("<cms>") //cms => commit message
    .action(async (branch: string, cms: any) => {
      try {
        await execa("git", ["add", "."]);
        const result1 = await execa("git", ["commit", "-m", cms]);
        const result2 = await execa("git", ["push", "origin", branch]);
        consola.log(result1.stdout);
        consola.log(result2.stdout);
      } catch (err: any) {
        consola.error(err.stderr);
        process.exit(1);
      }
    });

  program.parse();
};

runCLI();

