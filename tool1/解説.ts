// ==============================
// 文字列処理のロジック集
// ==============================

// export を付けている理由：
// → 他のファイル（CLIやAPI）からこの関数を使えるようにするため
// → 「このファイル専用」ではなく「再利用する部品」にする意図

// const + アロー関数を使っている理由：
// → 関数を「値」として扱える
// → 変更されないことが保証される（安全）

// (text: string)
// → 引数 text は「文字列しか受け取らない」と型で明示
// → number や null を渡したら TypeScript がエラーにしてくれる

// : string
// → 戻り値は必ず文字列になると宣言
// → 後で中身を変更しても型がズレたら即エラーになる

export const toUpper = (text: string): string => {
  // JavaScript標準の toUpperCase() を使って
  // 文字列をすべて大文字に変換している
  return text.toUpperCase();
};

// ------------------------------

// 小文字にする関数
// 基本構造は toUpper と同じ
// 「処理内容だけが違う」のがポイント

export const toLower = (text: string): string => {
  // toLowerCase() は JavaScript標準
  // 英字をすべて小文字に変換
  return text.toLowerCase();
};

// ------------------------------

// 文字数を返す関数
// ここだけ戻り値の型が number になっている点に注目

export const length = (text: string): number => {
  // text.length は「文字列の長さ」を返す
  // 返り値は数値（number）
  return text.length;
};



---


// commander は CLIを作るためのライブラリ
// コマンド・引数・ヘルプ表示を全部やってくれる
import { Command } from "commander";

// ロジックを import
// .js になっている理由：
// → ビルド後は dist/core/text.js になるから
// → Node（ESM）は .js を見に行く
import { toUpper, toLower, length } from "../core/text.js";

// runCLI という関数にまとめている理由：
// → エントリーポイント（src/index.ts）から呼び出すため
// → テストや再利用がしやすくなる
export const runCLI = () => {

  // Command クラスのインスタンスを作成
  // これが CLI 全体の「司令塔」
  const program = new Command();

  // CLIの基本情報を設定
  program
    .name("text-util")               // コマンド名
    .description("Simple text utility") // 説明（--help に表示）
    .version("0.1.0");               // バージョン

  // ------------------------------
  // upper コマンド
  // ------------------------------

  program
    .command("upper")        // text-util upper
    .argument("<text>")      // 必須引数 text
    .action((text) => {
      // ユーザーが入力した text を
      // ロジック関数 toUpper に渡す
      // CLIは「処理しない」のがポイント
      console.log(toUpper(text));
    });

  // ------------------------------
  // lower コマンド
  // ------------------------------

  program
    .command("lower")
    .argument("<text>")
    .action((text) => {
      console.log(toLower(text));
    });

  // ------------------------------
  // length コマンド
  // ------------------------------

  program
    .command("length")
    .argument("<text>")
    .action((text) => {
      // length(text) は number を返す
      // console.log は number でも問題なく表示できる
      console.log(length(text));
    });

  // ------------------------------

  // process.argv を解析して
  // 実際にどのコマンドが呼ばれたかを判断・実行
  program.parse();
};


---

#!/usr/bin/env node
// ↑ これ超重要
// 「このファイルは Node.js で実行される」ことをOSに伝える
// npm link / npm install -g したときに効く

// CLIの本体を import
// index.ts 自身は「起動役」だけ
import { runCLI } from "./cli/index.js";

// CLIを起動
// ここで初めて処理が始まる
runCLI();
