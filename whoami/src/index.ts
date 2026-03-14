#!/usr/bin/env node
import os from "os";
import { consola } from "consola";
import { Command } from "commander";

const runCLI = () => {
  const program = new Command();

  program.name("name").description("host name check").version("v1.0.0");

  program
    .command("hostname")
    .action(() => {
      const hostname = os.hostname();
      consola.log(hostname);
    })

  program.parse();
}

runCLI();
