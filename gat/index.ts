#!/usr/bin/env node
import { consola } from "consola";
import { Command } from "commander";
import { readFileSync } from "fs";

const runCLI = () => {
  const program = new Command();

  program
    .name("gat")
    .description("file view tool")
    .argument("<files...>")
    .action((files: string[]) => {
      for (const file of files) {
        const view = readFileSync(file, "utf-8");
        consola.log(view);
      }
    });

  program.parse();
};

runCLI();

