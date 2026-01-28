import { Command } from "commander";
import { toUpper, toLower, length } from "../core/text.js";

export const runCLI = () => {
  const program = new Command();

  program.name("text-util").description("Simple text utility").version("0.1.0");

  program
    .command("upper")
    .argument("<text>")
    .action((text) => {
      console.log(toUpper(text));
    });

  program
    .command("lower")
    .argument("<text>")
    .action((text) => {
      console.log(toLower(text));
    });

  program
    .command("length")
    .argument("<text>")
    .action((text) => {
      console.log(length(text));
    });

  program.parse();
};
