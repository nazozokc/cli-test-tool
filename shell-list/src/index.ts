import consola from "consola";
import { Command } from "commander";
import { readFileSync } from "fs";

const shells = readFileSync("/etc/shells", "utf-8").split("\n").filter(l => l.startsWith("/"));

const runCLI = () => {
  const program = new Command();

  program.name("shell").description("shell list view tool").version("1.0.0");

  program
    .command("view")
    .action(async () => {
      consola.log(shells);
    })
}
