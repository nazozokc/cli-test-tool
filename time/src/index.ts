#!/usr/bin/env node
import { Command } from "commander";
import { consola } from "consola";
import { getTime } from "./time.js";

const runCLI = () => {
  const program = new Command();

  program.name("time").description("watch time tool").version("v1.0.0");

  program
    .command("tokyo")
    .action(() => {
      consola.log(`tokyo: ${getTime()}`);
    });

  program.parse();
};

runCLI();
