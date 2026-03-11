#!/usr/bin/env node
import { consola } from "consola";
import { Command, CommanderError } from "commander";

const runCLI = () => {
  const program = new Command();

  program.name("fake-weather").description("git taiwa tool").version("v1.0.0");

  program
    .command("tokyo")
    .action(() => {
      consola.log("Tokyo");
      consola.log("weather: bag");
      consola.log("time: UTC+9:00")
    });

  program.parse();
}

runCLI();
