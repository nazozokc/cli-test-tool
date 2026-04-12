import { mkdirSync, existsSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { consola } from "consola";

export type memo = {
  id: number;
  text: string;
};

export const read = (): memo[] => {
  if (existsSync(`${homedir()}/.config/memo/memo.json`)) {
    const result = readFileSync(`${homedir()}/.config/memo/memo.json`, "utf-8");
    return JSON.parse(result);
  } else {
    return [];
  }
};

export const write = (memos: memo[]): void => {
  mkdirSync(`${homedir()}/.config/memo`, { recursive: true });
  const write = JSON.stringify(memos, null, 2);

  try {
    writeFileSync(`${homedir()}/.config/memo/memo.json`, write, "utf-8");
    consola.log("done write");
  } catch (err) {
    consola.error("保存することができませんでした");
  }
};
