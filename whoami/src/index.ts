#!/usr/bin/env node
import { consola } from "consola";
import { Command } from "commander";

const runCLI = () => {
  const program = new Command();

  program.name("name").description("host name check").version("v1.0.0");

  program
    .command("hostname")
    .action(() => {

    })

  program.parse();
}

runCLI();
