import { consola } from "consola";
import { Command } from "commander";

const runCLI = () => {
  const program = new Command();

  program
    .name("envcheck")
    .description("dev tools version check")
    .version("0.1.0")
    .action(() => {});

  program.parse();
};

runCLI();
