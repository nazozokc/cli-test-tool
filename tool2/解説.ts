// ==============================
// 行数を数える関数
// ==============================
export const countLines = (text: string): number => {
  // text はファイル全体を1つの文字列として受け取っている
  // "\n" は「改行文字」
  // split("\n") で「改行ごと」に文字列を分割する
  // 例:
  // "a\nb\nc" → ["a", "b", "c"]
  // その配列の長さが行数になる
  return text.split("\n").length;
};

// ==============================
// 単語数を数える関数
// ==============================
export const countWords = (text: string): number => {
  // trim() は前後の空白・改行を削除する
  // もし中身が空なら単語数は 0
  if (text.trim() === "") return 0;

// commander は CLI を作るためのライブラリ
// コマンド・引数・ヘルプ表示などを全部やってくれる
import { Command } from "commander";

// Node.js の標準モジュール
// ファイルの存在確認や読み込みに使う
import fs from "fs";

// ロジック部分を読み込む
// ../core/wc.js は「1つ上のディレクトリ → core → wc.js」
import { countLines, countWords, countChars } from "../core/wc.js";

// CLI 全体を起動する関数
export const runCLI = () => {
  // commander の本体オブジェクトを作る
  const program = new Command();

  // CLI 全体の基本情報
  program
    .name("my-cli")               // コマンド名
    .description("wc like tool")  // 説明
    .version("0.1.0");            // バージョン

  // wc コマンドの定義
  program
    .command("wc") // my-cli wc
    .argument("<filePath>", "count text in file") // 必須引数
    .action((filePath: string) => {
      // === ここから実行処理 ===

      // ファイルが存在しない場合
      if (!fs.existsSync(filePath)) {
        // エラーメッセージを表示
        console.error("ファイルが存在しません:", filePath);
        // 異常終了（0以外はエラー）
        process.exit(1);
      }

      // ファイルを UTF-8 として読み込む
      // 結果は文字列になる
      const text = fs.readFileSync(filePath, "utf-8");

      // core のロジック関数を呼び出す
      const lines = countLines(text);
      const words = countWords(text);
      const chars = countChars(text);

      // 結果を表示
      console.log(`lines: ${lines}`);
      console.log(`words: ${words}`);
      console.log(`chars: ${chars}`);
    });

  // コマンドライン引数を解析して実行
  program.parse();
};

  // 空白文字 = スペース、改行、タブなど
  // それで分割することで「単語ごと」に分けられる
  return text.trim().split(/\s+/).length;
};

// ==============================
// 文字数を数える関数
// ==============================
export const countChars = (text: string): number => {
  // JavaScriptの文字列は length で文字数を取得できる
  // 改行やスペースも 1 文字として数えられる
  return text.length;
};



// commander は CLI を作るためのライブラリ
// コマンド・引数・ヘルプ表示などを全部やってくれる
import { Command } from "commander";

// Node.js の標準モジュール
// ファイルの存在確認や読み込みに使う
import fs from "fs";

// ロジック部分を読み込む
// ../core/wc.js は「1つ上のディレクトリ → core → wc.js」
import { countLines, countWords, countChars } from "../core/wc.js";

// CLI 全体を起動する関数
export const runCLI = () => {
  // commander の本体オブジェクトを作る
  const program = new Command();

  // CLI 全体の基本情報
  program
    .name("my-cli")               // コマンド名
    .description("wc like tool")  // 説明
    .version("0.1.0");            // バージョン

  // wc コマンドの定義
  program
    .command("wc") // my-cli wc
    .argument("<filePath>", "count text in file") // 必須引数
    .action((filePath: string) => {
      // === ここから実行処理 ===

      // ファイルが存在しない場合
      if (!fs.existsSync(filePath)) {
        // エラーメッセージを表示
        console.error("ファイルが存在しません:", filePath);
        // 異常終了（0以外はエラー）
        process.exit(1);
      }

      // ファイルを UTF-8 として読み込む
      // 結果は文字列になる
      const text = fs.readFileSync(filePath, "utf-8");

      // core のロジック関数を呼び出す
      const lines = countLines(text);
      const words = countWords(text);
      const chars = countChars(text);

      // 結果を表示
      console.log(`lines: ${lines}`);
      console.log(`words: ${words}`);
      console.log(`chars: ${chars}`);
    });

  // コマンドライン引数を解析して実行
  program.parse();
};






#!/usr/bin/env node
// ↑ シバン
// このファイルを「nodeで実行するCLI」として扱わせる

// CLI 本体を読み込む
import { runCLI } from "./cli/index.js";

// CLI を起動
runCLI();
