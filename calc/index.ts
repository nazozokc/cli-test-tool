import { consola } from "consola";
import { Command } from "commander";
import { calc } from "./calc/calc.ts";

const runCLI = () => {
  const program = new Command();

  program
    .name("calc")
    .description("calc tool")
    .version("v1.0.0")
    .argument("<arg...>")
    .action((arg) => {
      const arg = arg.join(" ");
      consola.success(calc(expr));
    });

  program.parse();
};

runCLI();
