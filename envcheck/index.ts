import { consola } from "consola";
import { Command } from "commander";

const runCLI = () => {
  const program = new Command();

  program.parse();
};

runCLI();

