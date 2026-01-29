import { Command } from "commander";
import fs from "fs";
import { countlines, countWords, countChars } from "../core/wc.js";

export const runCLI = () => {
  const program = new Command();

  program.name("my-cli").description("wc like tool").version("v0.1.0");

  program
    .command("wc")
    .argument("<filePath>", "count text in file")
    .action((filePath: string) => {
      if (!fs.existsSync(filePath)) {
        console.error("ファイルが存在しません", filePath);
        process.exit(1);
      }

      const text = fs.readFileSync(filePath, "utf-8");
      const lines = countlines(text);
      const words = countWords(text);
      const chars = countChars(text);

      console.log(`lines: ${lines}`);
      console.log(`words: ${words}`);
      console.log(`chars: ${chars}`);
    });

  program.parse();
};
