import { consola } from "consola";
import { Command } from "commander";
import { exec } from "exec";

const runCLI = () => {
  const program = new Command();
  program
    .name("nixlist")
    .description("nix installed package tool")
    .version("1.0.0");
};
