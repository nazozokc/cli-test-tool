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
    .option("-n, --number", "行番号を表示")
    .action((files: string[], option: { number: boolean }) => {
      for (const file of files) {
        const view = readFileSync(file, "utf-8");

        if (option.number === true) {
          const line = view.split("\n");
          line.forEach((line, i) => {
            consola.log(`${i + 1}  ${line}`);
          });
        } else {
          consola.log(view);
        }
      }
    });

  program.parse();
};

runCLI();
