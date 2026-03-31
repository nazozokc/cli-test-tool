import { consola } from "consola";
import { Command } from "commander";
import { getRandomHand, judge } from "./janken.js";

const runCLI = () => {
  const program = new Command();

  program
    .name("janken")
    .version("v1.0.0")
    .argument("<hand>") // プレイヤーの手
    .action((hand) => {
      const cpu = getRandomHand();
      const result = judge(hand, cpu);
      consola.log(`CPU: ${cpu}`);
      consola.log(`result: ${result}`);
    });

  program.parse();
};

runCLI();
