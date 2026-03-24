import { Command } from "commander";
import { consola } from "consola";

const runCLI = () => {
  const program = new Command();

  program.name("riaju").version("v1.0.0").argument("<text>").argument("<text2>").action((text, text2) => {
    consola.log(text + text2 + "は爆発してほしいが幸せになってほしいよーー、幸せになれーーーーーー！")
  })

  program.parse();
}

runCLI();
