#!/usr/bin/env node
import { consola } from "consola";
import { Command } from "commander";

const runCLI = () => {
  const program = new Command();

  program.name("sisou").description("思想家の発言をするためのCLI").version("v1.0.0")
  .argument("<text>")
  .action((text) => {
    if (typeof text === "string") {
      consola.log(text + "は存在するんだ！、〇〇主義こそ正義だ‐‐‐‐‐‐‐‐‐‐‐‐‐‐！")
    } else {
      consola.log("どうやら文字ではないな、しっかり文字を入力したまえ")
    }
  })

  program.parse()
}

runCLI();
